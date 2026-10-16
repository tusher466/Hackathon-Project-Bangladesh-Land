import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { BANGLADESH_DIVISIONS, DISTRICTS_BY_DIVISION, UPAZILAS_BY_DISTRICT, MOUZA_GIS_PLOTS, LAND_OFFICES } from '../../data/seedData';
import { MouzaPlot, LandOffice } from '../../types';
import L from 'leaflet';
import { 
  MapPin, 
  Layers, 
  ZoomIn, 
  ZoomOut, 
  Compass, 
  Info, 
  CheckCircle2, 
  AlertTriangle, 
  FileText,
  ShieldAlert,
  Building2,
  ExternalLink,
  Sliders,
  Map as MapIcon,
  Ruler,
  Maximize2,
  Search,
  Trash2,
  Crosshair
} from 'lucide-react';

interface MouzaMapViewerProps {
  onApplyForPorcha?: (khatianNumber: string, dagNumber: string) => void;
  onReportDiscrepancy?: (dagNumber: string) => void;
}

const UPAZILA_COORDINATES: Record<string, [number, number]> = {
  'Gazipur Sadar': [23.9989, 90.4203],
  'Kaliakair': [24.0722, 90.2185],
  'Sreepur': [24.2000, 90.4667],
  'Dhaka Sadar': [23.7118, 90.4124],
  'Tejgaon': [23.7639, 90.3951],
  'Mirpur': [23.8071, 90.3686],
  'Savar': [23.8442, 90.2588],
  'Keraniganj': [23.6844, 90.3125],
  'Chattogram Sadar': [22.3384, 91.8317],
  'Panchlaish': [22.3683, 91.8383],
  'Hathazari': [22.5089, 91.8083],
  'Sylhet Sadar': [24.8949, 91.8687],
  'Boalia': [24.3636, 88.6241],
  'Khulna Sadar': [22.8456, 89.5403],
  'Barishal Sadar': [22.7010, 90.3535],
  'Rangpur Sadar': [25.7439, 89.2752],
  'Mymensingh Sadar': [24.7471, 90.4203]
};

// Geodesic distance calculation in meters using Haversine formula
function calculateHaversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371e3; // Earth radius in meters
  const phi1 = (lat1 * Math.PI) / 180;
  const phi2 = (lat2 * Math.PI) / 180;
  const deltaPhi = ((lat2 - lat1) * Math.PI) / 180;
  const deltaLambda = ((lon2 - lon1) * Math.PI) / 180;

  const a = Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
            Math.cos(phi1) * Math.cos(phi2) *
            Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

// Spherical polygon area calculation in square meters
function calculateSphericalPolygonArea(coords: [number, number][]): number {
  if (coords.length < 3) return 0;
  const R = 6371e3;
  let total = 0;

  for (let i = 0; i < coords.length; i++) {
    const j = (i + 1) % coords.length;
    const lat1 = (coords[i][0] * Math.PI) / 180;
    const lon1 = (coords[i][1] * Math.PI) / 180;
    const lat2 = (coords[j][0] * Math.PI) / 180;
    const lon2 = (coords[j][1] * Math.PI) / 180;
    total += (lon2 - lon1) * (2 + Math.sin(lat1) + Math.sin(lat2));
  }

  const area = Math.abs((total * R * R) / 2);
  return area;
}

export const MouzaMapViewer: React.FC<MouzaMapViewerProps> = ({ onApplyForPorcha, onReportDiscrepancy }) => {
  const { language, t } = useAuth();

  const [division, setDivision] = useState('Dhaka');
  const [district, setDistrict] = useState('Gazipur');
  const [upazila, setUpazila] = useState('Gazipur Sadar');
  const [mouza, setMouza] = useState('Chowrasta Mouza (JL 42)');
  const [surveyType, setSurveyType] = useState<'CS' | 'SA' | 'RS' | 'BS'>('RS');
  const [sheetNumber, setSheetNumber] = useState('Sheet 01');

  const [selectedPlot, setSelectedPlot] = useState<MouzaPlot>(MOUZA_GIS_PLOTS[0]);
  const [mapStyle, setMapStyle] = useState<'osm-standard' | 'osm-humanitarian' | 'satellite-aerial' | 'cadastral-vector'>('osm-standard');

  // Layer Visibility
  const [showPlots, setShowPlots] = useState(true);
  const [showOffices, setShowOffices] = useState(true);
  const [highlightKhas, setHighlightKhas] = useState(true);

  // In-Map Search State
  const [mapSearchQuery, setMapSearchQuery] = useState('');

  // Live GPS Cursor Coordinates
  const [cursorCoords, setCursorCoords] = useState<{ lat: number; lng: number } | null>(null);

  // Measuring Tool State
  const [measureMode, setMeasureMode] = useState<boolean>(false);
  const [measurePoints, setMeasurePoints] = useState<[number, number][]>([]);
  const [measuredDistanceMeters, setMeasuredDistanceMeters] = useState<number>(0);
  const [measuredAreaSqMeters, setMeasuredAreaSqMeters] = useState<number>(0);

  // Leaflet map instance ref
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const polygonLayersRef = useRef<{ polygon: L.Polygon; plot: MouzaPlot }[]>([]);
  const officeMarkersRef = useRef<L.Marker[]>([]);
  const measureLayersRef = useRef<L.Layer[]>([]);

  // Initialize Leaflet map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const centerCoords = UPAZILA_COORDINATES[upazila] || [23.9989, 90.4203];
      const map = L.map(mapContainerRef.current, {
        center: centerCoords,
        zoom: 17,
        zoomControl: false
      });

      // Scale control
      L.control.scale({ imperial: false, metric: true, position: 'bottomleft' }).addTo(map);

      // Track cursor coordinates
      map.on('mousemove', (e: L.LeafletMouseEvent) => {
        setCursorCoords({ lat: e.latlng.lat, lng: e.latlng.lng });
      });

      map.on('mouseout', () => {
        setCursorCoords(null);
      });

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    // Invalidate size after rendering to eliminate grey tile artifacts
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 150);

    return () => clearTimeout(timer);
  }, []);

  // Handle Layer Style Changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current);
    }

    let tileUrl = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
    let attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Ministry of Land GIS';

    if (mapStyle === 'osm-humanitarian') {
      tileUrl = 'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png';
      attribution = '&copy; OpenStreetMap contributors, Humanitarian Style';
    } else if (mapStyle === 'satellite-aerial') {
      tileUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
      attribution = 'Tiles &copy; Esri, Maxar, Earthstar Geographics | Ground Satellite View';
    } else if (mapStyle === 'cadastral-vector') {
      tileUrl = 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';
      attribution = '&copy; OpenStreetMap &copy; CARTO | Neutral Cadastral Sheet';
    }

    tileLayerRef.current = L.tileLayer(tileUrl, {
      maxZoom: 19,
      attribution
    }).addTo(map);

    map.invalidateSize();
  }, [mapStyle]);

  // Handle Polygons and Office Markers Rendering
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clean up previous polygons
    polygonLayersRef.current.forEach(item => map.removeLayer(item.polygon));
    polygonLayersRef.current = [];

    // Render Cadastral Mouza Plots
    if (showPlots) {
      MOUZA_GIS_PLOTS.forEach(plot => {
        if (!plot.geoCoordinates) return;

        const isSelected = selectedPlot.dagNumber === plot.dagNumber;
        const isKhas = plot.khatianNumber.includes('Khas') || plot.khatianNumber.includes('Roadway');
        const isWater = plot.landClass.includes('Pond') || plot.landClass.includes('Water');

        let fillColor = '#0f766e';
        if (isSelected) {
          fillColor = '#059669';
        } else if (isWater) {
          fillColor = '#0284c7';
        } else if (isKhas && highlightKhas) {
          fillColor = '#dc2626';
        }

        const polygon = L.polygon(plot.geoCoordinates, {
          color: isSelected ? '#10b981' : isKhas ? '#ef4444' : '#334155',
          weight: isSelected ? 4 : 2,
          fillColor,
          fillOpacity: isSelected ? 0.75 : mapStyle === 'satellite-aerial' ? 0.45 : 0.55,
          dashArray: isKhas ? '6, 6' : undefined
        }).addTo(map);

        polygon.bindTooltip(`
          <div style="font-family: inherit; font-size: 11px;">
            <strong style="color: #065f46;">Dag #${plot.dagNumber}</strong> (${plot.surveyType})<br/>
            <span>${language === 'bn' ? plot.landClassBn : plot.landClass}</span> • 
            <span>${plot.areaDecimal} Decimal</span>
          </div>
        `, { sticky: true, opacity: 0.95 });

        polygon.on('click', () => {
          setSelectedPlot(plot);
        });

        polygonLayersRef.current.push({ polygon, plot });
      });
    }

    // Clean up previous office markers
    officeMarkersRef.current.forEach(marker => map.removeLayer(marker));
    officeMarkersRef.current = [];

    // Render Land Offices as markers on OpenStreetMap
    if (showOffices) {
      LAND_OFFICES.forEach(office => {
        if (office.latitude && office.longitude) {
          const customIcon = L.divIcon({
            className: 'custom-osm-pin',
            html: `
              <div style="
                background-color: #065f46;
                color: white;
                width: 32px;
                height: 32px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                border: 2px solid white;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.35);
                font-size: 15px;
                cursor: pointer;
              ">
                🏛️
              </div>
            `,
            iconSize: [32, 32],
            iconAnchor: [16, 16],
            popupAnchor: [0, -16]
          });

          const marker = L.marker([office.latitude, office.longitude], { icon: customIcon }).addTo(map);

          marker.bindPopup(`
            <div style="font-family: inherit; font-size: 12px; min-width: 190px;">
              <strong style="color: #065f46; font-size: 13px;">${language === 'bn' ? office.nameBn : office.name}</strong>
              <div style="color: #64748b; font-size: 11px; margin-top: 2px;">${language === 'bn' ? office.typeNameBn : office.typeName}</div>
              <div style="margin-top: 6px; font-size: 11px;">📍 ${language === 'bn' ? office.addressBn : office.address}</div>
              <div style="margin-top: 4px; font-size: 11px;">📞 <strong>${office.hotline}</strong> (${office.phone})</div>
              <div style="margin-top: 4px; font-size: 10px; color: #475569;">⏰ ${office.officeHours}</div>
            </div>
          `);

          officeMarkersRef.current.push(marker);
        }
      });
    }

  }, [upazila, mapStyle, showPlots, showOffices, highlightKhas, selectedPlot, language]);

  // Handle Measurement Click Tool
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clean up previous measurement layers
    measureLayersRef.current.forEach(layer => map.removeLayer(layer));
    measureLayersRef.current = [];

    if (!measureMode) {
      map.off('click', handleMapMeasureClick);
      return;
    }

    function handleMapMeasureClick(e: L.LeafletMouseEvent) {
      const newPt: [number, number] = [e.latlng.lat, e.latlng.lng];
      setMeasurePoints(prev => {
        const updated = [...prev, newPt];

        // Calculate total perimeter / polyline distance
        let totalDist = 0;
        for (let i = 0; i < updated.length - 1; i++) {
          totalDist += calculateHaversineDistance(
            updated[i][0], updated[i][1],
            updated[i + 1][0], updated[i + 1][1]
          );
        }
        setMeasuredDistanceMeters(totalDist);

        // Calculate polygon area if 3+ points
        if (updated.length >= 3) {
          const areaSqM = calculateSphericalPolygonArea(updated);
          setMeasuredAreaSqMeters(areaSqM);
        } else {
          setMeasuredAreaSqMeters(0);
        }

        return updated;
      });
    }

    map.on('click', handleMapMeasureClick);

    // Draw active measurement points, lines, and polygon on map
    if (measurePoints.length > 0) {
      // Markers for each point
      measurePoints.forEach((pt, idx) => {
        const pointMarker = L.circleMarker(pt, {
          radius: 5,
          fillColor: '#f59e0b',
          color: '#ffffff',
          weight: 2,
          fillOpacity: 1
        }).addTo(map);
        pointMarker.bindTooltip(`Pt ${idx + 1}`);
        measureLayersRef.current.push(pointMarker);
      });

      // Line
      if (measurePoints.length >= 2) {
        const polyline = L.polyline(measurePoints, {
          color: '#f59e0b',
          weight: 3,
          dashArray: '5, 5'
        }).addTo(map);
        measureLayersRef.current.push(polyline);
      }

      // Closed Polygon if 3+
      if (measurePoints.length >= 3) {
        const poly = L.polygon(measurePoints, {
          color: '#d97706',
          fillColor: '#f59e0b',
          fillOpacity: 0.25,
          weight: 2
        }).addTo(map);
        measureLayersRef.current.push(poly);
      }
    }

    return () => {
      map.off('click', handleMapMeasureClick);
    };
  }, [measureMode, measurePoints]);

  const handleClearMeasurement = () => {
    setMeasurePoints([]);
    setMeasuredDistanceMeters(0);
    setMeasuredAreaSqMeters(0);
  };

  // Search by Dag # or Khatian on map
  const handleMapSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mapSearchQuery.trim()) return;

    const query = mapSearchQuery.trim().toLowerCase();
    const matched = MOUZA_GIS_PLOTS.find(p => 
      p.dagNumber.toLowerCase() === query ||
      p.khatianNumber.toLowerCase().includes(query) ||
      p.ownerName.toLowerCase().includes(query)
    );

    if (matched && matched.geoCoordinates && mapInstanceRef.current) {
      setSelectedPlot(matched);
      const avgLat = matched.geoCoordinates.reduce((sum, pt) => sum + pt[0], 0) / matched.geoCoordinates.length;
      const avgLng = matched.geoCoordinates.reduce((sum, pt) => sum + pt[1], 0) / matched.geoCoordinates.length;
      mapInstanceRef.current.flyTo([avgLat, avgLng], 18, { duration: 1.2 });
    }
  };

  // Upazila selection handling
  const handleUpazilaChange = (newUpazila: string) => {
    setUpazila(newUpazila);
    const coords = UPAZILA_COORDINATES[newUpazila];
    if (coords && mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(coords, 16, { duration: 1.2 });
    }
  };

  const handleDivisionChange = (div: string) => {
    setDivision(div);
    const distList = DISTRICTS_BY_DIVISION[div] || [];
    const firstDist = distList[0]?.id || '';
    setDistrict(firstDist);
    const upazilaList = UPAZILAS_BY_DISTRICT[firstDist] || [];
    const firstUpazila = upazilaList[0]?.id || '';
    handleUpazilaChange(firstUpazila);
  };

  const handleDistrictChange = (dist: string) => {
    setDistrict(dist);
    const upazilaList = UPAZILAS_BY_DISTRICT[dist] || [];
    const firstUpazila = upazilaList[0]?.id || '';
    handleUpazilaChange(firstUpazila);
  };

  const handleZoomIn = () => {
    if (mapInstanceRef.current) mapInstanceRef.current.zoomIn();
  };

  const handleZoomOut = () => {
    if (mapInstanceRef.current) mapInstanceRef.current.zoomOut();
  };

  const handleRecenter = () => {
    const coords = UPAZILA_COORDINATES[upazila] || [23.9989, 90.4203];
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(coords, 17, { duration: 1.0 });
    }
  };

  // Precision conversion helpers for the selected plot
  const kathaArea = (selectedPlot.areaDecimal * 0.605).toFixed(2);
  const sqFtArea = (selectedPlot.areaDecimal * 435.6).toFixed(1);
  const sqMeterArea = (selectedPlot.areaDecimal * 40.4686).toFixed(1);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      {/* Title & Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-800 text-xs font-semibold uppercase tracking-wider">
            <MapIcon className="w-4 h-4" />
            <span>{language === 'bn' ? 'ওপেন স্ট্রিট ম্যাপ জিআইএস ক্যাডাস্ট্রাল ভিউয়ার' : 'OpenStreetMap (OSM) Cadastral GIS Platform'}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
            {language === 'bn' ? 'ওপেন স্ট্রিট ম্যাপে মৌজা নকশা ও দাগ পরিদর্শন' : 'Cadastral Mouza Maps on OpenStreetMap'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
            {language === 'bn'
              ? 'উচ্চ নির্ভুলতা সম্পন্ন ওপেন স্ট্রিট ম্যাপ ও স্যাটেলাইট ভিউতে ক্যাডাস্ট্রাল মৌজা সীমানা, সরকারি খাস জমি ও দূরত্ব পরিমাপ করুন।'
              : 'Precision OpenStreetMap & Satellite base layers with georeferenced cadastral boundaries, land offices, and on-map measurement tools.'}
          </p>
        </div>

        {/* Base Layer Switcher */}
        <div className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200 text-xs font-semibold shadow-xs flex-wrap gap-1">
          <button
            onClick={() => setMapStyle('osm-standard')}
            className={`px-3 py-1.5 rounded-xl transition-colors ${
              mapStyle === 'osm-standard' ? 'bg-emerald-800 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {language === 'bn' ? 'ওএসএম স্ট্যান্ডার্ড' : 'OSM Standard'}
          </button>
          <button
            onClick={() => setMapStyle('satellite-aerial')}
            className={`px-3 py-1.5 rounded-xl transition-colors ${
              mapStyle === 'satellite-aerial' ? 'bg-emerald-800 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {language === 'bn' ? 'স্যাটেলাইট ভিউ' : 'Satellite View'}
          </button>
          <button
            onClick={() => setMapStyle('osm-humanitarian')}
            className={`px-3 py-1.5 rounded-xl transition-colors ${
              mapStyle === 'osm-humanitarian' ? 'bg-emerald-800 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {language === 'bn' ? 'টোপোগ্রাফিক' : 'OSM Topo'}
          </button>
          <button
            onClick={() => setMapStyle('cadastral-vector')}
            className={`px-3 py-1.5 rounded-xl transition-colors ${
              mapStyle === 'cadastral-vector' ? 'bg-emerald-800 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {language === 'bn' ? 'ক্যাডাস্ট্রাল ক্যানভাস' : 'Cadastral Vector'}
          </button>
        </div>
      </div>

      {/* Administrative Selection & Quick Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
        <div>
          <label className="block text-slate-500 font-semibold mb-1">{t.selectDivision}</label>
          <select
            value={division}
            onChange={e => handleDivisionChange(e.target.value)}
            className="w-full p-2 border border-slate-300 rounded-lg bg-white"
          >
            {BANGLADESH_DIVISIONS.map(d => (
              <option key={d.id} value={d.id}>{language === 'bn' ? d.nameBn : d.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-slate-500 font-semibold mb-1">{t.selectDistrict}</label>
          <select
            value={district}
            onChange={e => handleDistrictChange(e.target.value)}
            className="w-full p-2 border border-slate-300 rounded-lg bg-white"
          >
            {(DISTRICTS_BY_DIVISION[division] || []).map(d => (
              <option key={d.id} value={d.id}>{language === 'bn' ? d.nameBn : d.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-slate-500 font-semibold mb-1">{t.selectUpazila}</label>
          <select
            value={upazila}
            onChange={e => handleUpazilaChange(e.target.value)}
            className="w-full p-2 border border-slate-300 rounded-lg bg-white font-semibold text-emerald-900"
          >
            {(UPAZILAS_BY_DISTRICT[district] || []).map(u => (
              <option key={u.id} value={u.id}>{language === 'bn' ? u.nameBn : u.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-slate-500 font-semibold mb-1">{t.selectMouza}</label>
          <select
            value={mouza}
            onChange={e => setMouza(e.target.value)}
            className="w-full p-2 border border-slate-300 rounded-lg bg-white"
          >
            <option value="Chowrasta Mouza (JL 42)">Chowrasta (JL 42)</option>
            <option value="Bhawal Estate Mouza (JL 19)">Bhawal Estate (JL 19)</option>
            <option value="Aminbazar Mouza (JL 08)">Aminbazar (JL 08)</option>
          </select>
        </div>

        <div>
          <label className="block text-slate-500 font-semibold mb-1">{t.selectSurveyType}</label>
          <select
            value={surveyType}
            onChange={e => setSurveyType(e.target.value as any)}
            className="w-full p-2 border border-slate-300 rounded-lg bg-white font-semibold text-emerald-800"
          >
            <option value="RS">RS (Revisional Survey)</option>
            <option value="BS">BS / City Survey</option>
            <option value="SA">SA (State Acquisition)</option>
            <option value="CS">CS (Cadastral Survey)</option>
          </select>
        </div>

        {/* Quick Dag Search */}
        <div>
          <label className="block text-slate-500 font-semibold mb-1">
            {language === 'bn' ? 'দাগ নম্বর খুঁজুন' : 'Search Dag #'}
          </label>
          <form onSubmit={handleMapSearch} className="relative">
            <input
              type="text"
              placeholder="e.g. 894, 895"
              value={mapSearchQuery}
              onChange={e => setMapSearchQuery(e.target.value)}
              className="w-full p-2 pr-7 border border-slate-300 rounded-lg font-mono text-xs focus:border-emerald-600 outline-none"
            />
            <button
              type="submit"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-700"
            >
              <Search className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>

      {/* Layer Toggles & Interactive Measurement Toolbar */}
      <div className="bg-slate-100 px-4 py-2.5 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-4">
          <span className="font-semibold text-slate-700 flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-emerald-700" />
            <span>{language === 'bn' ? 'লেয়ার নিয়ন্ত্রণ:' : 'Layers:'}</span>
          </span>

          <label className="flex items-center gap-1.5 cursor-pointer text-slate-800">
            <input
              type="checkbox"
              checked={showPlots}
              onChange={e => setShowPlots(e.target.checked)}
              className="rounded text-emerald-700"
            />
            <span>{language === 'bn' ? 'মৌজা দাগ (Polygons)' : 'Cadastral Plots'}</span>
          </label>

          <label className="flex items-center gap-1.5 cursor-pointer text-slate-800">
            <input
              type="checkbox"
              checked={showOffices}
              onChange={e => setShowOffices(e.target.checked)}
              className="rounded text-emerald-700"
            />
            <span>{language === 'bn' ? 'ভূমি অফিস (🏛️)' : 'Land Offices'}</span>
          </label>

          <label className="flex items-center gap-1.5 cursor-pointer text-slate-800">
            <input
              type="checkbox"
              checked={highlightKhas}
              onChange={e => setHighlightKhas(e.target.checked)}
              className="rounded text-red-600"
            />
            <span className="text-red-700 font-medium">
              {language === 'bn' ? 'খাস জমি হাইলাইট' : 'Highlight Khas'}
            </span>
          </label>
        </div>

        {/* Measurement Tool Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setMeasureMode(!measureMode);
              if (measureMode) handleClearMeasurement();
            }}
            className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-colors ${
              measureMode
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-white hover:bg-slate-200 text-slate-700 border border-slate-300'
            }`}
          >
            <Ruler className="w-3.5 h-3.5" />
            <span>{measureMode ? (language === 'bn' ? 'পরিমাপ চলছে' : 'Measuring...') : (language === 'bn' ? 'সীমানা পরিমাপ' : 'Measure Tool')}</span>
          </button>

          {measureMode && measurePoints.length > 0 && (
            <button
              onClick={handleClearMeasurement}
              className="p-1.5 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg text-xs"
              title="Clear Points"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Measurement Real-time Telemetry Bar */}
      {measureMode && (
        <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl flex flex-wrap items-center justify-between gap-3 text-xs text-amber-950">
          <div className="flex items-center gap-2">
            <Crosshair className="w-4 h-4 text-amber-700" />
            <span>
              {language === 'bn'
                ? 'ম্যাপে ক্লিক করে বিন্দু (Points) যুক্ত করুন। ৩ বা ততোধিক বিন্দু দিয়ে জমির ক্ষেত্রফল বের হবে।'
                : 'Click points on the OpenStreetMap to measure perimeter distance and parcel polygon area.'}
            </span>
          </div>

          <div className="flex items-center gap-4 font-mono font-bold text-slate-900">
            <div>
              <span className="text-[10px] text-slate-500 block font-normal">
                {language === 'bn' ? 'দূরত্ব / পরিধি:' : 'Distance / Perimeter:'}
              </span>
              <span>{measuredDistanceMeters.toFixed(1)} m ({(measuredDistanceMeters * 3.28084).toFixed(1)} ft)</span>
            </div>
            {measuredAreaSqMeters > 0 && (
              <div>
                <span className="text-[10px] text-slate-500 block font-normal">
                  {language === 'bn' ? 'জমির ক্ষেত্রফল:' : 'Measured Area:'}
                </span>
                <span className="text-emerald-800">
                  {(measuredAreaSqMeters / 40.4686).toFixed(2)} {language === 'bn' ? 'শতক' : 'Decimal'}{' '}
                  <span className="text-xs text-slate-500 font-normal">({measuredAreaSqMeters.toFixed(1)} m²)</span>
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Main Map Viewer & Plot Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive OpenStreetMap Container */}
        <div className="lg:col-span-2 bg-slate-900 rounded-2xl overflow-hidden border border-slate-300 shadow-md relative flex flex-col min-h-[520px]">
          {/* Top Bar with coordinates and controls */}
          <div className="bg-slate-900/90 text-white px-4 py-2.5 flex items-center justify-between text-xs border-b border-slate-700 z-10 backdrop-blur-xs">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-emerald-400 font-mono">
                {mouza} • {upazila}
              </span>
              <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-300 hidden sm:inline">
                OpenStreetMap GIS
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={handleRecenter}
                className="p-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-200 border border-slate-700 transition-colors"
                title="Recenter"
              >
                <Crosshair className="w-4 h-4" />
              </button>
              <button
                onClick={handleZoomIn}
                className="p-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-200 border border-slate-700 transition-colors"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={handleZoomOut}
                className="p-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-200 border border-slate-700 transition-colors"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Leaflet DOM Node */}
          <div 
            ref={mapContainerRef} 
            className="w-full flex-1 z-0 min-h-[460px] bg-slate-200"
          />

          {/* Floating Compass Rose */}
          <div className="absolute top-14 right-4 bg-white/90 p-2 rounded-full border border-slate-200 text-slate-800 shadow-md z-10 backdrop-blur-xs">
            <Compass className="w-5 h-5 text-emerald-800" />
            <div className="text-[9px] font-bold text-center text-slate-600">N</div>
          </div>

          {/* Real-time Cursor Coordinates Readout */}
          {cursorCoords && (
            <div className="absolute top-14 left-4 bg-slate-900/85 text-emerald-300 px-2.5 py-1 rounded-md text-[11px] font-mono border border-slate-700 z-10 pointer-events-none backdrop-blur-xs">
              Lat: {cursorCoords.lat.toFixed(6)}° N • Lng: {cursorCoords.lng.toFixed(6)}° E
            </div>
          )}

          {/* Bottom Legend Overlay on Map */}
          <div className="absolute bottom-6 left-3 right-3 bg-white/95 text-slate-800 px-3.5 py-2.5 rounded-xl text-[11px] border border-slate-300/80 shadow-md flex flex-wrap items-center justify-between gap-3 z-10 backdrop-blur-xs">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-xs bg-[#0f766e] border border-slate-400"></span>
                <span>{language === 'bn' ? 'ব্যক্তিগত জোত' : 'Private Holding'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-xs bg-[#dc2626] border border-red-700"></span>
                <span>{language === 'bn' ? '১ নং খাস জমি / রাস্তা' : 'No. 1 Khas / Road'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-xs bg-[#0284c7]"></span>
                <span>{language === 'bn' ? 'সরকারি জলমহাল / পুকুর' : 'Waterbody'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-xs bg-[#10b981] border-2 border-emerald-700"></span>
                <span>{language === 'bn' ? 'নির্বাচিত দাগ' : 'Selected Plot'}</span>
              </div>
            </div>
            <span className="text-[10px] text-slate-500 font-medium hidden md:inline">
              {language === 'bn' ? 'ম্যাপে যেকোনো দাগের ওপর ক্লিক করে বিবরণ দেখুন' : 'Click any plot on OpenStreetMap to inspect record'}
            </span>
          </div>
        </div>

        {/* Selected Plot Details Card with Full Bangladesh Land Measurements */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-600"></span>
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                  {t.plotDetailsTitle}
                </h3>
              </div>
              <span className="text-xs font-mono font-bold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-lg">
                Dag #{selectedPlot.dagNumber}
              </span>
            </div>

            <div className="mt-4 space-y-3 text-xs">
              <div>
                <span className="text-slate-500 block font-medium">
                  {language === 'bn' ? 'মালিকানা রেকর্ড (খতিয়ান অনুযায়ী):' : 'Owner Record:'}
                </span>
                <span className="font-bold text-slate-900 text-sm">
                  {language === 'bn' ? selectedPlot.ownerNameBn : selectedPlot.ownerName}
                </span>
              </div>

              {/* Precise Survey Metric Conversion Table */}
              <div className="bg-emerald-50/60 p-3 rounded-xl border border-emerald-100 space-y-1.5">
                <div className="text-[11px] font-bold text-emerald-950 uppercase tracking-wider flex items-center justify-between">
                  <span>{language === 'bn' ? 'সার্ভে ক্ষেত্রফল হিসাব:' : 'Precise Area Metrics:'}</span>
                  <span className="font-mono text-emerald-800">{selectedPlot.areaDecimal} Decimal</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-slate-700 pt-1 font-mono">
                  <div className="bg-white p-1.5 rounded border border-emerald-200/60">
                    <span className="text-[10px] text-slate-400 block font-sans">{language === 'bn' ? 'কাঠা' : 'Katha'}</span>
                    <span className="font-bold text-xs">{kathaArea}</span>
                  </div>
                  <div className="bg-white p-1.5 rounded border border-emerald-200/60">
                    <span className="text-[10px] text-slate-400 block font-sans">{language === 'bn' ? 'বর্গফুট' : 'Sq. Ft.'}</span>
                    <span className="font-bold text-xs">{sqFtArea}</span>
                  </div>
                  <div className="bg-white p-1.5 rounded border border-emerald-200/60">
                    <span className="text-[10px] text-slate-400 block font-sans">{language === 'bn' ? 'বর্গমিটার' : 'Sq. M.'}</span>
                    <span className="font-bold text-xs">{sqMeterArea}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                <div>
                  <span className="text-slate-500 block text-[11px]">{language === 'bn' ? 'খতিয়ান নম্বর:' : 'Khatian:'}</span>
                  <span className="font-semibold text-slate-800 font-mono">{selectedPlot.khatianNumber}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">{language === 'bn' ? 'জমির শ্রেণি:' : 'Classification:'}</span>
                  <span className="font-semibold text-slate-800">{language === 'bn' ? selectedPlot.landClassBn : selectedPlot.landClass}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">{language === 'bn' ? 'জরিপ ভলিউম:' : 'Survey Type:'}</span>
                  <span className="font-semibold text-slate-800">{selectedPlot.surveyType} Survey</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">{language === 'bn' ? 'এখতিয়ারধীন এসিল্যান্ড:' : 'AC Land Office:'}</span>
                  <span className="font-semibold text-slate-800">{upazila}</span>
                </div>
              </div>

              {selectedPlot.geoCoordinates && (
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-[11px] text-slate-700">
                  <span className="font-semibold block">{language === 'bn' ? 'ওপেন স্ট্রিট ম্যাপ স্থানাঙ্ক (GPS):' : 'OSM Geocoordinates:'}</span>
                  <span className="font-mono text-[10px]">
                    Lat: {selectedPlot.geoCoordinates[0][0].toFixed(5)}° N, Lng: {selectedPlot.geoCoordinates[0][1].toFixed(5)}° E
                  </span>
                </div>
              )}

              <div>
                <span className="text-slate-500 block font-medium">{language === 'bn' ? 'মন্তব্য ও রেকর্ড স্ট্যাটাস:' : 'Remarks & Record Notes:'}</span>
                <p className="text-slate-700 mt-0.5 bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-xs">
                  {selectedPlot.remarks || 'No registered dispute or lis pendens recorded.'}
                </p>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-2 pt-3 border-t border-slate-200">
            {onApplyForPorcha && (
              <button
                onClick={() => onApplyForPorcha(selectedPlot.khatianNumber, selectedPlot.dagNumber)}
                className="w-full bg-emerald-800 hover:bg-emerald-900 text-white font-semibold py-2.5 px-4 rounded-xl text-xs transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <FileText className="w-4 h-4" />
                <span>{language === 'bn' ? 'এই দাগের সার্টিফাইড পর্চা চান' : 'Request Certified Porcha for this Dag'}</span>
              </button>
            )}

            {onReportDiscrepancy && (
              <button
                onClick={() => onReportDiscrepancy(selectedPlot.dagNumber)}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2 px-4 rounded-xl text-xs transition-colors flex items-center justify-center gap-2"
              >
                <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
                <span>{language === 'bn' ? 'রেকর্ড গরমিল বা দখল রিপোর্ট' : 'Report Discrepancy or Encroachment'}</span>
              </button>
            )}

            <p className="text-[10px] text-slate-400 text-center leading-tight pt-1">
              {language === 'bn'
                ? '* প্রদর্শিত ওপেন স্ট্রিট ম্যাপ ও ক্যাডাস্ট্রাল সীমানা দিকনির্দেশনামূলক। সীমানা নির্ধারণে আমিন/সার্ভেয়ার কর্তৃক সরেজমিনে পরিমাপ বাধ্যতামূলক।'
                : '* OpenStreetMap overlays are demonstrative previews. Statutory boundary determinations require on-site cadastral measurement.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
