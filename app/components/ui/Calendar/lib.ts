import dayjs, { Dayjs } from 'dayjs';

export function getMonthMatrix(year: number, month: number) {
  const firstDay = dayjs().year(year).month(month).date(1);
  const daysInMonth = firstDay.daysInMonth();
  const startDayOfWeek = (firstDay.day() + 6) % 7; // Пн=0, Вс=6

  let matrix: { date: Dayjs; isCurrentMonth: boolean }[][] = [];
  let day = 1 - startDayOfWeek;

  for (let week = 0; week < 6; week++) {
    let row = [];
    for (let d = 0; d < 7; d++, day++) {
      let isCurrentMonth = day > 0 && day <= daysInMonth;
      let date: Dayjs;
      if (day <= 0) {
        date = firstDay.subtract(startDayOfWeek - d, 'day');
      } else if (day > daysInMonth) {
        date = firstDay.add(day - 1, 'day');
      } else {
        date = firstDay.date(day);
      }
      row.push({ date, isCurrentMonth });
    }
    matrix.push(row);
    if (day > daysInMonth) break;
  }
  return matrix;
}
