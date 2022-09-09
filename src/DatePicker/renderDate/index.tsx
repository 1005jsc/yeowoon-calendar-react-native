import {
  add,
  addDays,
  endOfMonth,
  startOfDay,
  startOfMonth,
  startOfWeek,
} from 'date-fns';

function takeWeek(start = new Date()) {
  let date = startOfWeek(startOfDay(start));

  return function () {
    const week = [...Array(7)].map((_, index) => addDays(date, index));
    date = addDays(week[6], 1);
    return week;
  };
}

function lastDayOfRange(range: Date[][]) {
  return range[range.length - 1][6];
}

function renderMonthDate(start: Date) {
  let month: Date[][] = [];
  let date = start;

  return function () {
    const startDate = startOfMonth(date);
    const endDate = startOfDay(endOfMonth(date));
    const weekGen = takeWeek(startDate);

    month.push(weekGen());

    while (lastDayOfRange(month) < endDate) {
      month.push(weekGen());
    }

    const range = month;
    month = [];
    date = addDays(lastDayOfRange(range), 1);
    return [range, startDate, endDate];
  };
}

export const addCurrentDate = (curDate: Date, duration: Duration) => {
  return add(curDate, duration);
};

export default renderMonthDate;
