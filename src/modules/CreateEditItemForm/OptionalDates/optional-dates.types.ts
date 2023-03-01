import React from 'react';

export interface IOptionalDates {
  date1: string | null;
  setDate1: React.Dispatch<React.SetStateAction<string | null>>;
  date2: string | null;
  setDate2: React.Dispatch<React.SetStateAction<string | null>>;
  date3: string | null;
  setDate3: React.Dispatch<React.SetStateAction<string | null>>;
  date1descr: string | null;
  date2descr: string | null;
  date3descr: string | null;
}
