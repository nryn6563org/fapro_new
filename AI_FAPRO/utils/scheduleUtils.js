/**
 * 기능: 캘린더 날짜 관련 유틸리티
 */

export const getDaysInMonth = (date) => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
};

export const getFirstDayOfMonth = (date) => {
  return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
};

export const isSameDay = (date1, date2) => {
  if (!date1 || !date2) return false;
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

export const getWeekDays = (date) => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day;
  const sunday = new Date(d.setDate(diff));

  return Array.from({ length: 7 }, (_, i) => {
    const temp = new Date(sunday);
    temp.setDate(sunday.getDate() + i);
    return temp;
  });
};

export const formatTime = (hour) => {
  return `${hour.toString().padStart(2, "0")}:00`;
};

export const timeSlots = Array.from({ length: 24 }, (_, i) => i); // 0:00 - 23:00
