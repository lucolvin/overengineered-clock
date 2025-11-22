import { ClockSettings } from '../hooks/useClockSettings';

interface SegmentClockProps {
  time: Date;
  settings: ClockSettings;
}

const SevenSegmentDigit = ({ value, color, glow }: { value: string; color: string; glow: boolean }) => {
  const segments = {
    '0': [true, true, true, false, true, true, true],
    '1': [false, false, true, false, false, true, false],
    '2': [true, false, true, true, true, false, true],
    '3': [true, false, true, true, false, true, true],
    '4': [false, true, true, true, false, true, false],
    '5': [true, true, false, true, false, true, true],
    '6': [true, true, false, true, true, true, true],
    '7': [true, false, true, false, false, true, false],
    '8': [true, true, true, true, true, true, true],
    '9': [true, true, true, true, false, true, true],
  };

  const active = segments[value] || [false, false, false, false, false, false, false];

  const segmentStyle = (isActive: boolean) => ({
    fill: isActive ? color : `${color}20`,
    filter: isActive && glow ? `drop-shadow(0 0 5px ${color})` : 'none',
    transition: 'all 0.2s ease',
  });

  return (
    <svg width="50" height="80" viewBox="0 0 50 80">
      <polygon points="10,5 40,5 35,10 15,10" style={segmentStyle(active[0])} />
      <polygon points="5,10 10,15 10,35 5,40" style={segmentStyle(active[1])} />
      <polygon points="40,10 45,15 45,35 40,40" style={segmentStyle(active[2])} />
      <polygon points="10,40 15,35 35,35 40,40 35,45 15,45" style={segmentStyle(active[3])} />
      <polygon points="5,45 10,50 10,70 5,75" style={segmentStyle(active[4])} />
      <polygon points="40,45 45,50 45,70 40,75" style={segmentStyle(active[5])} />
      <polygon points="10,75 15,70 35,70 40,75" style={segmentStyle(active[6])} />
    </svg>
  );
};

export const SegmentClock = ({ time, settings }: SegmentClockProps) => {
  const { time_format, show_seconds, timezone, color_scheme, effects } = settings;

  const tzDate = timezone
    ? new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: timezone,
      })
        .formatToParts(time)
        .reduce((acc, part) => {
          if (part.type !== 'literal') acc[part.type] = part.value;
          return acc;
        }, {} as Record<string, string>)
    : {
        hour: time.getHours().toString().padStart(2, '0'),
        minute: time.getMinutes().toString().padStart(2, '0'),
        second: time.getSeconds().toString().padStart(2, '0'),
      };

  const hours = time_format === '12h' ? (parseInt(tzDate.hour) % 12 || 12) : parseInt(tzDate.hour);
  const minutes = parseInt(tzDate.minute);
  const seconds = parseInt(tzDate.second);

  const h1 = Math.floor(hours / 10).toString();
  const h2 = (hours % 10).toString();
  const m1 = Math.floor(minutes / 10).toString();
  const m2 = (minutes % 10).toString();
  const s1 = Math.floor(seconds / 10).toString();
  const s2 = (seconds % 10).toString();

  const colonStyle = {
    color: color_scheme.accent,
    fontSize: '60px',
    fontWeight: 'bold',
    textShadow: effects.glow ? `0 0 20px ${color_scheme.accent}` : 'none',
  };

  return (
    <div className="flex items-center gap-2 relative z-10">
      {hours >= 10 && <SevenSegmentDigit value={h1} color={color_scheme.text} glow={effects.glow} />}
      <SevenSegmentDigit value={h2} color={color_scheme.text} glow={effects.glow} />
      <div style={colonStyle}>:</div>
      <SevenSegmentDigit value={m1} color={color_scheme.text} glow={effects.glow} />
      <SevenSegmentDigit value={m2} color={color_scheme.text} glow={effects.glow} />
      {show_seconds && (
        <>
          <div style={colonStyle}>:</div>
          <SevenSegmentDigit value={s1} color={color_scheme.text} glow={effects.glow} />
          <SevenSegmentDigit value={s2} color={color_scheme.text} glow={effects.glow} />
        </>
      )}
    </div>
  );
};
