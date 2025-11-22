import { formatTime, formatDate } from '../utils/timeFormatters';
import { ClockSettings } from '../hooks/useClockSettings';

interface DigitalClockProps {
  time: Date;
  settings: ClockSettings;
}

export const DigitalClock = ({ time, settings }: DigitalClockProps) => {
  const { time_format, show_seconds, show_milliseconds, show_date, timezone, color_scheme, font_family, font_size, effects } = settings;

  const timeString = formatTime(time, time_format, show_seconds, show_milliseconds, timezone);
  const dateString = formatDate(time, timezone);

  const textShadow = effects.glow
    ? `0 0 20px ${color_scheme.accent}, 0 0 40px ${color_scheme.accent}`
    : effects.shadow
    ? '2px 2px 4px rgba(0,0,0,0.5)'
    : 'none';

  return (
    <div className="relative flex flex-col items-center justify-center">
      {effects.scanlines && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="w-full h-full" style={{
            backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.15) 0px, rgba(0,0,0,0.15) 1px, transparent 1px, transparent 2px)',
          }} />
        </div>
      )}
      <div
        className="font-bold tracking-wider relative z-10"
        style={{
          color: color_scheme.text,
          fontFamily: font_family,
          fontSize: `${font_size}px`,
          textShadow,
          transition: 'all 0.3s ease',
        }}
      >
        {timeString}
      </div>
      {show_date && (
        <div
          className="mt-4 tracking-wide relative z-10"
          style={{
            color: color_scheme.accent,
            fontFamily: font_family,
            fontSize: `${Math.floor(font_size / 4)}px`,
            textShadow: effects.glow ? `0 0 10px ${color_scheme.accent}` : 'none',
          }}
        >
          {dateString}
        </div>
      )}
    </div>
  );
};
