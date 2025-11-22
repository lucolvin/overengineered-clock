import { useState, useEffect } from 'react';

export type ClockSettings = {
  time_format: '12h' | '24h' | 'unix' | 'binary' | 'hex';
  display_mode: 'analog' | 'digital' | 'flip' | 'matrix' | 'segment';
  show_seconds: boolean;
  show_milliseconds: boolean;
  show_date: boolean;
  timezone: string;
  color_scheme: {
    background: string;
    text: string;
    accent: string;
  };
  font_family: string;
  font_size: number;
  effects: {
    glow: boolean;
    shadow: boolean;
    scanlines: boolean;
  };
};

const defaultSettings: ClockSettings = {
  time_format: '24h',
  display_mode: 'digital',
  show_seconds: true,
  show_milliseconds: false,
  show_date: true,
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  color_scheme: {
    background: '#000000',
    text: '#00ff00',
    accent: '#00ff00',
  },
  font_family: 'monospace',
  font_size: 72,
  effects: {
    glow: true,
    shadow: false,
    scanlines: false,
  },
};

const STORAGE_KEY = 'techie_clock_settings';

export const useClockSettings = () => {
  const [settings, setSettings] = useState<ClockSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setSettings(JSON.parse(stored));
      } else {
        setSettings(defaultSettings);
      }
    } catch {
      setSettings(defaultSettings);
    } finally {
      setLoading(false);
    }
  };

  const updateSettings = (updates: Partial<ClockSettings>) => {
    setSettings((prev) => {
      if (!prev) return defaultSettings;
      const newSettings = { ...prev, ...updates };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newSettings));
      return newSettings;
    });
  };

  return { settings, loading, updateSettings };
};
