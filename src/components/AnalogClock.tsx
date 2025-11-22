import { ClockSettings } from '../hooks/useClockSettings';

interface AnalogClockProps {
  time: Date;
  settings: ClockSettings;
}

export const AnalogClock = ({ time, settings }: AnalogClockProps) => {
  const { color_scheme, effects } = settings;

  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours() % 12;

  const secondAngle = (seconds * 6) - 90;
  const minuteAngle = (minutes * 6 + seconds * 0.1) - 90;
  const hourAngle = (hours * 30 + minutes * 0.5) - 90;

  const size = 300;
  const center = size / 2;

  const filter = effects.glow
    ? `drop-shadow(0 0 10px ${color_scheme.accent})`
    : effects.shadow
    ? 'drop-shadow(2px 2px 4px rgba(0,0,0,0.5))'
    : 'none';

  return (
    <svg width={size} height={size} className="relative z-10">
      <circle
        cx={center}
        cy={center}
        r={center - 10}
        fill="none"
        stroke={color_scheme.accent}
        strokeWidth="2"
        style={{ filter }}
      />

      {[...Array(12)].map((_, i) => {
        const angle = (i * 30 - 90) * (Math.PI / 180);
        const x1 = center + (center - 30) * Math.cos(angle);
        const y1 = center + (center - 30) * Math.sin(angle);
        const x2 = center + (center - 15) * Math.cos(angle);
        const y2 = center + (center - 15) * Math.sin(angle);

        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={color_scheme.text}
            strokeWidth="3"
            style={{ filter }}
          />
        );
      })}

      <line
        x1={center}
        y1={center}
        x2={center + (center - 80) * Math.cos(hourAngle * (Math.PI / 180))}
        y2={center + (center - 80) * Math.sin(hourAngle * (Math.PI / 180))}
        stroke={color_scheme.text}
        strokeWidth="8"
        strokeLinecap="round"
        style={{ filter, transition: 'all 0.5s ease' }}
      />

      <line
        x1={center}
        y1={center}
        x2={center + (center - 50) * Math.cos(minuteAngle * (Math.PI / 180))}
        y2={center + (center - 50) * Math.sin(minuteAngle * (Math.PI / 180))}
        stroke={color_scheme.text}
        strokeWidth="6"
        strokeLinecap="round"
        style={{ filter, transition: 'all 0.5s ease' }}
      />

      {settings.show_seconds && (
        <line
          x1={center}
          y1={center}
          x2={center + (center - 30) * Math.cos(secondAngle * (Math.PI / 180))}
          y2={center + (center - 30) * Math.sin(secondAngle * (Math.PI / 180))}
          stroke={color_scheme.accent}
          strokeWidth="2"
          strokeLinecap="round"
          style={{ filter }}
        />
      )}

      <circle
        cx={center}
        cy={center}
        r="8"
        fill={color_scheme.accent}
        style={{ filter }}
      />
    </svg>
  );
};
