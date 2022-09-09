import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DateType } from '../logics/CalendarLogics';

type StateType = {
  chosenDate: DateType | undefined;
  //   clicked: boolean;
};

const initialState: StateType = {
  chosenDate: undefined,
};

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    determineChosenDate: (
      state,
      action: PayloadAction<DateType | undefined>
    ) => {
      state.chosenDate = action.payload;
      if (state.chosenDate) {
        console.log('값이 잘 들어 왔어용~! ' + state.chosenDate);
      } else {
        console.log('값이 undefined로 들어온 듯! ' + state.chosenDate);
      }
    },
    determineChosenDates: (
      state,
      action: PayloadAction<DateType | undefined>
    ) => {
      console.log('redux');
    },
  },
});

export const calendarReducer = calendarSlice.reducer;

export const calendarActions = calendarSlice.actions;
