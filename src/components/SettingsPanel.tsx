import { Settings, X } from 'lucide-react';
import { ClockSettings } from '../hooks/useClockSettings';
import { getTimezones } from '../utils/timeFormatters';

interface SettingsPanelProps {
  settings: ClockSettings;
  onUpdate: (updates: Partial<ClockSettings>) => void;
  onReset: () => void;
  isOpen: boolean;
  onToggle: () => void;
}

export const SettingsPanel = ({ settings, onUpdate, onReset, isOpen, onToggle }: SettingsPanelProps) => {
  const timezones = getTimezones();

  return (
    <>
      <button
        onClick={onToggle}
        className="fixed top-4 right-4 p-3 rounded-lg backdrop-blur-sm z-50 transition-all hover:scale-110"
        style={{
          backgroundColor: `${settings.color_scheme.accent}30`,
          border: `2px solid ${settings.color_scheme.accent}`,
          color: settings.color_scheme.text,
        }}
      >
        {isOpen ? <X size={24} /> : <Settings size={24} />}
      </button>

      <div
        className={`fixed top-0 right-0 h-full w-96 backdrop-blur-md border-l-2 overflow-y-auto transition-transform duration-300 z-40 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{
          backgroundColor: `${settings.color_scheme.background}e6`,
          borderColor: settings.color_scheme.accent,
        }}
      >
        <div className="p-6 space-y-6">
          <div className="flex items-center gap-4">
            <h2
              className="text-2xl font-bold"
              style={{ color: settings.color_scheme.text }}
            >
              Clock Settings
            </h2>
          </div>

          <div className="space-y-2">
            <label className="block font-semibold" style={{ color: settings.color_scheme.text }}>
              Display Mode
            </label>
            <select
              value={settings.display_mode}
              onChange={(e) => onUpdate({ display_mode: e.target.value as ClockSettings['display_mode'] })}
              className="w-full p-2 rounded border-2"
              style={{
                backgroundColor: `${settings.color_scheme.accent}20`,
                borderColor: settings.color_scheme.accent,
                color: settings.color_scheme.text,
              }}
            >
              <option value="digital">Digital</option>
              <option value="analog">Analog</option>
              <option value="segment">7-Segment</option>
              <option value="matrix">Matrix</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block font-semibold" style={{ color: settings.color_scheme.text }}>
              Time Format
            </label>
            <select
              value={settings.time_format}
              onChange={(e) => onUpdate({ time_format: e.target.value as ClockSettings['time_format'] })}
              className="w-full p-2 rounded border-2"
              style={{
                backgroundColor: `${settings.color_scheme.accent}20`,
                borderColor: settings.color_scheme.accent,
                color: settings.color_scheme.text,
              }}
            >
              <option value="12h">12 Hour</option>
              <option value="24h">24 Hour</option>
              <option value="unix">Unix Timestamp</option>
              <option value="binary">Binary</option>
              <option value="hex">Hexadecimal</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block font-semibold" style={{ color: settings.color_scheme.text }}>
              Timezone
            </label>
            <select
              value={settings.timezone}
              onChange={(e) => onUpdate({ timezone: e.target.value })}
              className="w-full p-2 rounded border-2"
              style={{
                backgroundColor: `${settings.color_scheme.accent}20`,
                borderColor: settings.color_scheme.accent,
                color: settings.color_scheme.text,
              }}
            >
              {timezones.map((tz) => (
                <option key={tz} value={tz}>
                  {tz}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.show_seconds}
                onChange={(e) => onUpdate({ show_seconds: e.target.checked })}
                className="w-5 h-5"
              />
              <span style={{ color: settings.color_scheme.text }}>Show Seconds</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.show_milliseconds}
                onChange={(e) => onUpdate({ show_milliseconds: e.target.checked })}
                className="w-5 h-5"
                disabled={settings.display_mode !== 'digital'}
              />
              <span style={{ color: settings.color_scheme.text }}>Show Milliseconds</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.show_date}
                onChange={(e) => onUpdate({ show_date: e.target.checked })}
                className="w-5 h-5"
                disabled={settings.display_mode !== 'digital'}
              />
              <span style={{ color: settings.color_scheme.text }}>Show Date</span>
            </label>
          </div>

          <div className="space-y-2">
            <label className="block font-semibold" style={{ color: settings.color_scheme.text }}>
              Font Size: {settings.font_size}px
            </label>
            <input
              type="range"
              min="24"
              max="200"
              value={settings.font_size}
              onChange={(e) => onUpdate({ font_size: parseInt(e.target.value) })}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label className="block font-semibold" style={{ color: settings.color_scheme.text }}>
              Font Family
            </label>
            <select
              value={settings.font_family}
              onChange={(e) => onUpdate({ font_family: e.target.value })}
              className="w-full p-2 rounded border-2"
              style={{
                backgroundColor: `${settings.color_scheme.accent}20`,
                borderColor: settings.color_scheme.accent,
                color: settings.color_scheme.text,
              }}
            >
              <option value="monospace">Monospace</option>
              <option value="'Courier New', monospace">Courier New</option>
              <option value="'Roboto Mono', monospace">Roboto Mono</option>
              <option value="'Orbitron', sans-serif">Orbitron</option>
              <option value="'Share Tech Mono', monospace">Share Tech Mono</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block font-semibold" style={{ color: settings.color_scheme.text }}>
              Background Color
            </label>
            <input
              type="color"
              value={settings.color_scheme.background}
              onChange={(e) =>
                onUpdate({
                  color_scheme: { ...settings.color_scheme, background: e.target.value },
                })
              }
              className="w-full h-12 rounded border-2 cursor-pointer"
              style={{ borderColor: settings.color_scheme.accent }}
            />
          </div>

          <div className="space-y-2">
            <label className="block font-semibold" style={{ color: settings.color_scheme.text }}>
              Text Color
            </label>
            <input
              type="color"
              value={settings.color_scheme.text}
              onChange={(e) =>
                onUpdate({
                  color_scheme: { ...settings.color_scheme, text: e.target.value },
                })
              }
              className="w-full h-12 rounded border-2 cursor-pointer"
              style={{ borderColor: settings.color_scheme.accent }}
            />
          </div>

          <div className="space-y-2">
            <label className="block font-semibold" style={{ color: settings.color_scheme.text }}>
              Accent Color
            </label>
            <input
              type="color"
              value={settings.color_scheme.accent}
              onChange={(e) =>
                onUpdate({
                  color_scheme: { ...settings.color_scheme, accent: e.target.value },
                })
              }
              className="w-full h-12 rounded border-2 cursor-pointer"
              style={{ borderColor: settings.color_scheme.accent }}
            />
          </div>

          <div className="space-y-3">
            <label className="block font-semibold" style={{ color: settings.color_scheme.text }}>
              Effects
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.effects.glow}
                onChange={(e) =>
                  onUpdate({
                    effects: { ...settings.effects, glow: e.target.checked },
                  })
                }
                className="w-5 h-5"
              />
              <span style={{ color: settings.color_scheme.text }}>Glow Effect</span>
            </label>
          </div>

          <button
            onClick={() => {
              if (window.confirm('Reset settings to defaults?')) {
                onReset();
              }
            }}
            className="w-full px-4 py-2 rounded border-2 text-sm mt-6"
            style={{
              backgroundColor: `${settings.color_scheme.accent}20`,
              borderColor: settings.color_scheme.accent,
              color: settings.color_scheme.text,
            }}
          >
            Reset Defaults
          </button>
        </div>
      </div>
    </>
  );
};
