import { formatTime } from '../utils/timeFormatters';
import { ClockSettings } from '../hooks/useClockSettings';

interface MatrixClockProps {
  time: Date;
  settings: ClockSettings;
}

export const MatrixClock = ({ time, settings }: MatrixClockProps) => {
  const { time_format, show_seconds, show_milliseconds, timezone, color_scheme, effects } = settings;

  const timeString = formatTime(time, time_format, show_seconds, show_milliseconds, timezone);
  const chars = timeString.split('');

  const textShadow = effects.glow
    ? `0 0 20px ${color_scheme.accent}, 0 0 40px ${color_scheme.accent}`
    : 'none';

  return (
    <div className="flex flex-wrap justify-center gap-2 relative z-10">
      {chars.map((char, index) => (
        <div
          key={index}
          className="font-mono font-bold border-2 flex items-center justify-center"
          style={{
            color: color_scheme.text,
            borderColor: color_scheme.accent,
            backgroundColor: `${color_scheme.accent}15`,
            width: char === ':' || char === '.' ? '30px' : '60px',
            height: '80px',
            fontSize: '48px',
            textShadow,
            boxShadow: effects.glow ? `0 0 20px ${color_scheme.accent}` : 'none',
            animation: `fadeIn 0.3s ease ${index * 0.05}s backwards`,
          }}
        >
          {char}
        </div>
      ))}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};
