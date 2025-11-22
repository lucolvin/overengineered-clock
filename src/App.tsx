import { useState, useEffect } from 'react';
import { useClockSettings } from './hooks/useClockSettings';
import { DigitalClock } from './components/DigitalClock';
import { AnalogClock } from './components/AnalogClock';
import { MatrixClock } from './components/MatrixClock';
import { SegmentClock } from './components/SegmentClock';
import { SettingsPanel } from './components/SettingsPanel';

function App() {
  const { settings, loading, updateSettings } = useClockSettings();
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
        isOpen={isSettingsOpen}
        onToggle={() => setIsSettingsOpen(!isSettingsOpen)}
      />

      <div
        className="absolute bottom-4 left-4 text-xs font-mono"
        style={{ color: `${settings.color_scheme.text}60` }}
      >
        Clock v1.0 | Timezone: {settings.timezone}
      </div>
    </div>
  );
}

export default App;
