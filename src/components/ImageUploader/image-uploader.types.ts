import React from 'react';

export interface IImageUploader {
  imgUrl: string | null;
  setImgUrl: React.Dispatch<React.SetStateAction<string | null>>;
  currentFile: File | null;
  setCurrentFile: React.Dispatch<React.SetStateAction<File | null>>;
  handleUpload: (file: File) => void;
  currentProgress: number;
  setCurrentProgress: React.Dispatch<React.SetStateAction<number>>;
}
