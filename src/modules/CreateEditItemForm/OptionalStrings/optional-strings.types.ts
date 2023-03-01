import React from 'react';

export interface IOptionalStrings {
  string1: string | null;
  setString1: React.Dispatch<React.SetStateAction<string | null>>;
  string2: string | null;
  setString2: React.Dispatch<React.SetStateAction<string | null>>;
  string3: string | null;
  setString3: React.Dispatch<React.SetStateAction<string | null>>;
  string1descr: string | null;
  string2descr: string | null;
  string3descr: string | null;
}
