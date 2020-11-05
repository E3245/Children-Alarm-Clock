export const to12hClock = (hour: number): number => {
  return hour > 12 ? hour - 12 : hour;
};

type TimeObject = {
  hours: number;
  minutes: number;
  seconds: number;
};

export const getTime = (): TimeObject => {
  const date = new Date();
  const hours = to12hClock(date.getHours());
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  return {hours, minutes, seconds};
};

export const addMilliseconds = (date: Date, millis: number): Date => {
  return new Date(date.getTime() + millis);
};

export const isTimePast = (endDate: Date): boolean => {
  const date = new Date();
  return date.getTime() >= endDate.getTime();
};

export const formatTime = (date: Date): String => {
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const seconds = date.getUTCSeconds();
  return (
    hours.toString().padStart(2, '0') +
    ':' +
    minutes.toString().padStart(2, '0') +
    ':' +
    seconds.toString().padStart(2, '0')
  );
};

// Return number of millis to a certain date
export const getTimeTo = (endDate: Date): number => {
  return endDate.getTime() - Date.now();
};

export const getTimeInAngles = (): TimeObject => {
  const date = new Date();
  const hours = (to12hClock(date.getHours()) / 12) * 360;
  const minutes = (date.getMinutes() / 60) * 360;
  const seconds = (date.getSeconds() / 60) * 360;
  return {hours, minutes, seconds};
};

export const getDateTimeInAngles = (dateTime: Date): TimeObject => {
  const hours = (to12hClock(dateTime.getHours()) / 12) * 360;
  const minutes = (dateTime.getMinutes() / 60) * 360;
  const seconds = (dateTime.getSeconds() / 60) * 360;
  return {hours, minutes, seconds};
};
