export const months = [
  'January',
  'Febuary',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

// 년도와 월이 주워질때 달력표 만들기

export type DateType = {
  year: number;
  month: number;
  date: number | undefined;
};

export type EveryDateType = {
  date: DateType;
  today: boolean;
};

export const returnFirstDates = (givenDate: DateType) => {
  const dateDayNow = new Date();

  const date = new Date(givenDate.year, givenDate.month);

  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const firstDayOfDay = firstDay.getDay();

  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const lastDateOfDay = lastDay.getDate();
  const lastDayOfDay = lastDay.getDay();
  const everyDates = [] as EveryDateType[];

  for (let i = 0; i < firstDayOfDay; i++) {
    everyDates.push({
      date: { year: givenDate.year, month: givenDate.month, date: undefined },
      today: false,
    });
  }

  for (let i = 0; i < lastDateOfDay; i++) {
    if (
      givenDate.year !== dateDayNow.getFullYear() ||
      givenDate.month !== dateDayNow.getMonth() ||
      givenDate.date !== i + 1
    ) {
      everyDates.push({
        date: { year: givenDate.year, month: givenDate.month, date: i + 1 },
        today: false,
      });
    } else {
      everyDates.push({
        date: { year: givenDate.year, month: givenDate.month, date: i + 1 },
        today: true,
      });
    }
  }
  for (let i = 0; i < 6 - lastDayOfDay; i++) {
    everyDates.push({
      date: { year: givenDate.year, month: givenDate.month, date: undefined },
      today: false,
    });
  }

  return everyDates;
};

export const checkClickedAndReturnDates = (
  everyDates: EveryDateType[],
  clickedDate: DateType
) => {
  let everyDateClickedUpdated = [] as EveryDateType[];
  for (let i = 0; i < everyDates.length; i++) {
    if (
      everyDates[i].date.year === clickedDate.year &&
      everyDates[i].date.month === clickedDate.month &&
      everyDates[i].date.date === clickedDate.date
    ) {
      everyDateClickedUpdated.push({
        date: {
          year: everyDates[i].date.year,
          month: everyDates[i].date.month,
          date: everyDates[i].date.date,
        },
        today: everyDates[i].today,
      });
    } else {
      everyDateClickedUpdated.push({
        date: {
          year: everyDates[i].date.year,
          month: everyDates[i].date.month,
          date: everyDates[i].date.date,
        },
        today: everyDates[i].today,
      });
    }
  }

  return everyDateClickedUpdated;
};

export const checkClickedDate = (
  clickedDate: DateType | undefined,
  dateNow: DateType
) => {
  if (dateNow.date) {
    if (clickedDate) {
      if (
        clickedDate.year === dateNow.year &&
        clickedDate.month === dateNow.month &&
        clickedDate.date === dateNow.date
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } else {
    return false;
  }
};
