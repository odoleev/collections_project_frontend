import React from 'react';

export interface ICreateEditItems {
  isEdit?: boolean;
  handleCancel: () => void;

  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;

  string1: string | null;
  setString1: React.Dispatch<React.SetStateAction<string | null>>;
  string2: string | null;
  setString2: React.Dispatch<React.SetStateAction<string | null>>;
  string3: string | null;
  setString3: React.Dispatch<React.SetStateAction<string | null>>;

  number1: number | null;
  setNumber1: React.Dispatch<React.SetStateAction<number | null>>;
  number2: number | null;
  setNumber2: React.Dispatch<React.SetStateAction<number | null>>;
  number3: number | null;
  setNumber3: React.Dispatch<React.SetStateAction<number | null>>;

  text1: string | null;
  setText1: React.Dispatch<React.SetStateAction<string | null>>;
  text2: string | null;
  setText2: React.Dispatch<React.SetStateAction<string | null>>;
  text3: string | null;
  setText3: React.Dispatch<React.SetStateAction<string | null>>;

  date1: string | null;
  setDate1: React.Dispatch<React.SetStateAction<string | null>>;
  date2: string | null;
  setDate2: React.Dispatch<React.SetStateAction<string | null>>;
  date3: string | null;
  setDate3: React.Dispatch<React.SetStateAction<string | null>>;

  boolean1: boolean | null;
  setBoolean1: React.Dispatch<React.SetStateAction<boolean | null>>;
  boolean2: boolean | null;
  setBoolean2: React.Dispatch<React.SetStateAction<boolean | null>>;
  boolean3: boolean | null;
  setBoolean3: React.Dispatch<React.SetStateAction<boolean | null>>;

  string1descr: string | null;
  string2descr: string | null;
  string3descr: string | null;

  number1descr: string | null;
  number2descr: string | null;
  number3descr: string | null;

  text1descr: string | null;
  text2descr: string | null;
  text3descr: string | null;

  date1descr: string | null;
  date2descr: string | null;
  date3descr: string | null;

  boolean1descr: string | null;
  boolean2descr: string | null;
  boolean3descr: string | null;
}
