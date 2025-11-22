import { useState, useEffect } from 'react';
import { useClockSettings } from './hooks/useClockSettings';
import { DigitalClock } from './components/DigitalClock';
import { AnalogClock } from './components/AnalogClock';
import { MatrixClock } from './components/MatrixClock';
import { SegmentClock } from './components/SegmentClock';
import { SettingsPanel } from './components/SettingsPanel';

function App() {
  const { settings, loading, updateSettings, resetSettings } = useClockSettings();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    const updateInterval = settings?.show_milliseconds ? 10 : 1000;
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, updateInterval);

    return () => clearInterval(timer);
  }, [settings?.show_milliseconds]);

  if (loading || !settings) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-green-500 text-2xl font-mono">Loading...</div>
      </div>
    );
  }

  const renderClock = () => {
    switch (settings.display_mode) {
      case 'analog':
        return <AnalogClock time={currentTime} settings={settings} />;
      case 'segment':
        return <SegmentClock time={currentTime} settings={settings} />;
      case 'matrix':
        return <MatrixClock time={currentTime} settings={settings} />;
      case 'digital':
      default:
        return <DigitalClock time={currentTime} settings={settings} />;
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center transition-colors duration-500 relative overflow-hidden"
      style={{
        backgroundColor: settings.color_scheme.background,
      }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{
            background: `radial-gradient(circle, ${settings.color_scheme.accent} 0%, transparent 70%)`,
          }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{
            background: `radial-gradient(circle, ${settings.color_scheme.text} 0%, transparent 70%)`,
          }}
        />
      </div>

      {renderClock()}

      <SettingsPanel
        settings={settings}
        onUpdate={updateSettings}
        onReset={resetSettings}
        isOpen={isSettingsOpen}
        onToggle={() => setIsSettingsOpen(!isSettingsOpen)}
      />

      <div
        className="absolute bottom-4 left-4 text-xs font-mono flex items-center space-x-2"
        style={{ color: `${settings.color_scheme.text}60` }}
      >
        <a
          href="https://github.com/lucolvin/overengineered-clock"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open GitHub repository"
          className="flex items-center"
          style={{ color: `${settings.color_scheme.text}` }}
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 .5a12 12 0 00-3.79 23.4c.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.55-1.4-1.34-1.77-1.34-1.77-1.09-.75.08-.74.08-.74 1.2.08 1.83 1.23 1.83 1.23 1.07 1.83 2.8 1.3 3.48.99.11-.77.42-1.3.76-1.6-2.66-.3-5.46-1.33-5.46-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.51.12-3.15 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 016 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.64.24 2.85.12 3.15.77.84 1.24 1.91 1.24 3.22 0 4.61-2.8 5.63-5.47 5.93.43.37.82 1.1.82 2.22v3.29c0 .32.22.69.83.57A12 12 0 0012 .5z"/>
          </svg>
        </a>
        <span>Clock v1.0 | Timezone: {settings.timezone}</span>
      </div>
    </div>
  );
}

export default App;
