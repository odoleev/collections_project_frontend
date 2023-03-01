import React from 'react';

export interface IOptionalBooleans {
  boolean1: boolean | null;
  setBoolean1: React.Dispatch<React.SetStateAction<boolean | null>>;
  boolean2: boolean | null;
  setBoolean2: React.Dispatch<React.SetStateAction<boolean | null>>;
  boolean3: boolean | null;
  setBoolean3: React.Dispatch<React.SetStateAction<boolean | null>>;
  boolean1descr: string | null;
  boolean2descr: string | null;
  boolean3descr: string | null;
}
