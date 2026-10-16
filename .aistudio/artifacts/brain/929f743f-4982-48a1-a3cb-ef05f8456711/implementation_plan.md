# Implementation Plan: OpenStreetMap Integration in GIS Feature

## Objective
Upgrade the GIS Cadastral Mouza Map module in the Bangladesh Integrated Land Services Portal (BILSP) to use **real interactive OpenStreetMap (OSM)** as the base mapping engine, with georeferenced cadastral parcel polygon overlays, regional Land Office markers, and layer controls.

---

## 1. Map Engine & OpenStreetMap Base Layer
- Integrate Leaflet (`leaflet` and `@types/leaflet`) or a robust, zero-flicker native Leaflet canvas/tile implementation configured for the AI Studio iframe environment.
- Use standard OpenStreetMap raster tile servers:
  - Base: `https://tile.openstreetmap.org/{z}/{x}/{y}.png`
  - Attribution: `© OpenStreetMap contributors`
  - High-resolution fallback / Topographic: CartoDB / OSM Humanitarian tiles.
- Provide a smooth layer switcher:
  - **OpenStreetMap Standard**
  - **OpenStreetMap Humanitarian / Terrain**
  - **Cadastral Vector Only**

---

## 2. Georeferenced Cadastral Mouza Plots
- Translate the surveyed Mouza plots (Dags 894, 895, 896, 897, 898, 899 in Chowrasta / Bhawal Mouza, Gazipur) into authentic geographic coordinates around Gazipur Sadar (`[23.998, 90.420]`).
- Color code plot polygons on OpenStreetMap:
  - **Emerald**: Private holding (Dag 894, 896, 897)
  - **Red**: Government Khas land / Public Roadway (Dag 895, 899)
  - **Blue**: Government Waterbody / Pond
  - **Gold/Purple**: Active Selected Plot
- Support click-to-inspect: Clicking any plot on the OpenStreetMap canvas opens its inspection card with owner details, khatian number, land area in decimals, and action buttons.

---

## 3. Land Office Geospatial Markers
- Render interactive map pins for nearby land administration institutions:
  - Upazila Land Office (AC Land Gazipur Sadar)
  - Sub-Registry Office
  - District Commissioner Record Room
  - DLRS Bhumi Bhaban
- Clicking an office pin displays popup info: office type, verified hotline 16122, address, and office hours.

---

## 4. UI Controls & Administrative Navigation
- Geolocation / Area Selector: Automatically centers and zooms the OpenStreetMap view when the user switches Division, District, or Upazila.
- Map Controls:
  - Pan, smooth zoom (+ / -)
  - Metric scale bar (meters / kilometers) and traditional mouza scale (16 inches = 1 mile)
  - North compass rose
  - Layer toggle checkboxes (Cadastral Boundaries, Land Offices, Khas Land highlighting)
- Statutory Disclaimer: Retain explicit statutory notice clarifying that OSM geometry overlays serve as digital reference previews, whereas binding boundary demarcations require on-site field surveys by authorized Kanungos/Amins.

---

## Verification & Testing
1. Install necessary dependencies (`leaflet`, `@types/leaflet`).
2. Run `compile_applet` and `lint_applet` to confirm zero build/type errors.
3. Test OpenStreetMap tile loading, panning, zooming, polygon click-to-select, and layer toggles.
