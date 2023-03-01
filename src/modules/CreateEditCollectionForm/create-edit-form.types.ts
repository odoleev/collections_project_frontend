import React from 'react';
import { CollectionThemesEnum } from '../../types';

export interface ICreateEditForm {
  isEdit?: boolean;
  handleCancel: () => void;

  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  theme: CollectionThemesEnum;
  setTheme: React.Dispatch<React.SetStateAction<CollectionThemesEnum>>;
  imgUrl: string | null;
  setImgUrl: React.Dispatch<React.SetStateAction<string | null>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;

  string1descr: string | null;
  setString1Descr: React.Dispatch<React.SetStateAction<string | null>>;
  string2descr: string | null;
  setString2Descr: React.Dispatch<React.SetStateAction<string | null>>;
  string3descr: string | null;
  setString3Descr: React.Dispatch<React.SetStateAction<string | null>>;

  number1descr: string | null;
  setNumber1Descr: React.Dispatch<React.SetStateAction<string | null>>;
  number2descr: string | null;
  setNumber2Descr: React.Dispatch<React.SetStateAction<string | null>>;
  number3descr: string | null;
  setNumber3Descr: React.Dispatch<React.SetStateAction<string | null>>;

  text1descr: string | null;
  setText1Descr: React.Dispatch<React.SetStateAction<string | null>>;
  text2descr: string | null;
  setText2Descr: React.Dispatch<React.SetStateAction<string | null>>;
  text3descr: string | null;
  setText3Descr: React.Dispatch<React.SetStateAction<string | null>>;

  date1descr: string | null;
  setDate1Descr: React.Dispatch<React.SetStateAction<string | null>>;
  date2descr: string | null;
  setDate2Descr: React.Dispatch<React.SetStateAction<string | null>>;
  date3descr: string | null;
  setDate3Descr: React.Dispatch<React.SetStateAction<string | null>>;

  boolean1descr: string | null;
  setBoolean1Descr: React.Dispatch<React.SetStateAction<string | null>>;
  boolean2descr: string | null;
  setBoolean2Descr: React.Dispatch<React.SetStateAction<string | null>>;
  boolean3descr: string | null;
  setBoolean3Descr: React.Dispatch<React.SetStateAction<string | null>>;
}
