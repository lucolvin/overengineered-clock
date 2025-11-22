const getTimeInTimezone = (date: Date, timezone: string): Date => {
  try {
    const formatter = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: timezone,
    });

    const parts = formatter.formatToParts(date);
    const values: Record<string, string> = {};

    parts.forEach((part) => {
      if (part.type !== 'literal') {
        values[part.type] = part.value;
      }
    });

    const tzDate = new Date(
      parseInt(values.year),
      parseInt(values.month) - 1,
      parseInt(values.day),
      parseInt(values.hour),
      parseInt(values.minute),
      parseInt(values.second),
      date.getMilliseconds()
    );

    return tzDate;
  } catch {
    return date;
  }
};

export const formatTime = (
  date: Date,
  format: '12h' | '24h' | 'unix' | 'binary' | 'hex',
  showSeconds: boolean,
  showMilliseconds: boolean,
  timezone?: string
): string => {
  const displayDate = timezone ? getTimeInTimezone(date, timezone) : date;

  switch (format) {
    case '12h': {
      const hours = displayDate.getHours() % 12 || 12;
      const minutes = displayDate.getMinutes().toString().padStart(2, '0');
      const seconds = displayDate.getSeconds().toString().padStart(2, '0');
      const ms = displayDate.getMilliseconds().toString().padStart(3, '0');
      const ampm = displayDate.getHours() >= 12 ? 'PM' : 'AM';

      let time = `${hours}:${minutes}`;
      if (showSeconds) time += `:${seconds}`;
      if (showMilliseconds) time += `.${ms}`;
      time += ` ${ampm}`;
      return time;
    }
    case '24h': {
      const hours = displayDate.getHours().toString().padStart(2, '0');
      const minutes = displayDate.getMinutes().toString().padStart(2, '0');
      const seconds = displayDate.getSeconds().toString().padStart(2, '0');
      const ms = displayDate.getMilliseconds().toString().padStart(3, '0');

      let time = `${hours}:${minutes}`;
      if (showSeconds) time += `:${seconds}`;
      if (showMilliseconds) time += `.${ms}`;
      return time;
    }
    case 'unix':
      return Math.floor(date.getTime() / 1000).toString();
    case 'binary': {
      const hours = displayDate.getHours().toString(2).padStart(5, '0');
      const minutes = displayDate.getMinutes().toString(2).padStart(6, '0');
      const seconds = displayDate.getSeconds().toString(2).padStart(6, '0');

      let time = `${hours}:${minutes}`;
      if (showSeconds) time += `:${seconds}`;
      return time;
    }
    case 'hex': {
      const hours = displayDate.getHours().toString(16).toUpperCase().padStart(2, '0');
      const minutes = displayDate.getMinutes().toString(16).toUpperCase().padStart(2, '0');
      const seconds = displayDate.getSeconds().toString(16).toUpperCase().padStart(2, '0');

      let time = `0x${hours}:${minutes}`;
      if (showSeconds) time += `:${seconds}`;
      return time;
    }
    default:
      return displayDate.toLocaleTimeString();
  }
};

export const formatDate = (date: Date, timezone?: string): string => {
  const displayDate = timezone ? getTimeInTimezone(date, timezone) : date;

  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return displayDate.toLocaleDateString(undefined, options);
};

export const getTimezones = (): string[] => {
  return [
    'UTC',
    'America/New_York',
    'America/Chicago',
    'America/Denver',
    'America/Los_Angeles',
    'Europe/London',
    'Europe/Paris',
    'Europe/Berlin',
    'Asia/Tokyo',
    'Asia/Shanghai',
    'Asia/Dubai',
    'Australia/Sydney',
    'Pacific/Auckland',
  ];
};
