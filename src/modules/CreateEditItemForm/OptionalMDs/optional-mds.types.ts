import React from 'react';

export interface IOptionalMDs {
  text1: string | null;
  setText1: React.Dispatch<React.SetStateAction<string | null>>;
  text2: string | null;
  setText2: React.Dispatch<React.SetStateAction<string | null>>;
  text3: string | null;
  setText3: React.Dispatch<React.SetStateAction<string | null>>;
  text1descr: string | null;
  text2descr: string | null;
  text3descr: string | null;
}
