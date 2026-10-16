import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { TRANSLATIONS, Language } from '../i18n/translations';
import { apiClient } from '../api/client';

interface AuthContextType {
  user: User;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof TRANSLATIONS['bn'];
  switchRole: (role: UserRole) => Promise<void>;
  fontSize: 'normal' | 'large' | 'larger';
  setFontSize: (size: 'normal' | 'large' | 'larger') => void;
  highContrast: boolean;
  setHighContrast: (val: boolean) => void;
}

const defaultUser: User = {
  id: 'usr-1',
  name: 'Tusher Hossen',
  nameBn: 'তুষার হোসেন',
  email: 'mdtusherhossen701@gmail.com',
  phone: '01712345678',
  nid: '19952691234567890',
  role: 'CITIZEN',
  division: 'Dhaka',
  district: 'Gazipur',
  upazila: 'Gazipur Sadar',
  createdAt: '2026-01-10T09:00:00Z',
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(defaultUser);
  const [language, setLanguage] = useState<Language>('bn');
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'larger'>('normal');
  const [highContrast, setHighContrast] = useState<boolean>(false);

  // Initialize or sync session
  useEffect(() => {
    apiClient.login(defaultUser.email).then(data => {
      if (data?.user) {
        setUser(data.user);
      }
    }).catch(() => {});
  }, []);

  const switchRole = async (role: UserRole) => {
    try {
      const res = await apiClient.switchRole(role);
      if (res?.user) {
        setUser(res.user);
      }
    } catch {
      // Fallback local update
      setUser(prev => ({ ...prev, role }));
    }
  };

  const t = TRANSLATIONS[language];

  return (
    <AuthContext.Provider
      value={{
        user,
        language,
        setLanguage,
        t,
        switchRole,
        fontSize,
        setFontSize,
        highContrast,
        setHighContrast
      }}
    >
      <div className={`${fontSize === 'large' ? 'text-lg' : fontSize === 'larger' ? 'text-xl' : 'text-base'} ${highContrast ? 'contrast-125' : ''}`}>
        {children}
      </div>
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
