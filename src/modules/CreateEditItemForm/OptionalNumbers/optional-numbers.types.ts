import React from 'react';

export interface IOptionalNumbers {
  number1: number | null;
  setNumber1: React.Dispatch<React.SetStateAction<number | null>>;
  number2: number | null;
  setNumber2: React.Dispatch<React.SetStateAction<number | null>>;
  number3: number | null;
  setNumber3: React.Dispatch<React.SetStateAction<number | null>>;
  number1descr: string | null;
  number2descr: string | null;
  number3descr: string | null;
}
