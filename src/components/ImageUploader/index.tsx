import React from 'react';
import { Box, CircularProgress, IconButton, Typography } from '@mui/material';
import { FileUploader } from 'react-drag-drop-files';
import { Close } from '@mui/icons-material';
import { StyledUploadImage, UploadContainer} from '../../UI';
import { fileTypes } from '../../helpers/assets/fileType';
import { IImageUploader } from './image-uploader.types';

export function ImageUploader({
  imgUrl,
  setImgUrl,
  handleUpload,
  setCurrentFile,
  currentFile,
  setCurrentProgress,
  currentProgress,
}: IImageUploader) {
  return (
    <Box display="flex" flexDirection="column" gap="10px">
      <Typography component="h5" fontWeight="700" color="text.secondary">
        Collection image
      </Typography>
      {imgUrl ? (
        <Box display="flex" flexDirection="column" gap="5px">
          <StyledUploadImage src={imgUrl} alt="Collection image" loading="lazy" />
        </Box>
      ) : null}
      <UploadContainer>
        <FileUploader
          fileOrFiles={currentFile}
          multiple={false}
          handleChange={handleUpload}
          name="file"
          types={fileTypes}
        />
        {currentProgress === 100 && currentFile ? (
          <Box display="flex" alignItems="center" gap="5px">
            <Typography>File: {currentFile.name}</Typography>
            <IconButton
              onClick={() => {
                setImgUrl(null);
                setCurrentFile(null);
                setCurrentProgress(0);
              }}
            >
              <Close />
            </IconButton>
          </Box>
        ) : (
          <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress variant="determinate" value={currentProgress} />
            <Box
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography
                variant="caption"
                component="div"
                color="text.secondary"
              >{`${currentProgress}%`}</Typography>
            </Box>
          </Box>
        )}
      </UploadContainer>
    </Box>
  );
}
