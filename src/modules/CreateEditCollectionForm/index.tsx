import React, { useState } from 'react';
import {
  Box,
  Button,
  Grid,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { Options } from 'easymde';
import { getDownloadURL, ref, uploadBytesResumable } from '@firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { StyledInput, StyledMDe } from '../../UI';
import { CollectionThemesEnum } from '../../types';
import { themes } from '../../helpers/assets/themes';
import { ICreateEditForm } from './create-edit-form.types';
import { storage } from '../../config/firebase';
import { ImageUploader } from '../../components';

export function CreateEditCollectionForm(props: ICreateEditForm) {
  const {
    isEdit = false,
    handleCancel,
    name,
    setName,
    setDescription,
    description,
    imgUrl,
    setImgUrl,
    setBoolean1Descr,
    setBoolean3Descr,
    boolean3descr,
    setText1Descr,
    boolean2descr,
    setBoolean2Descr,
    boolean1descr,
    date3descr,
    setDate3Descr,
    date2descr,
    setDate2Descr,
    number2descr,
    setNumber2Descr,
    number1descr,
    setNumber1Descr,
    number3descr,
    text1descr,
    text2descr,
    text3descr,
    setText3Descr,
    setNumber3Descr,
    setDate1Descr,
    setString1Descr,
    setString2Descr,
    setString3Descr,
    setText2Descr,
    string1descr,
    string2descr,
    string3descr,
    date1descr,
    theme,
    setTheme,
  } = props;

  const [currentProgress, setCurrentProgress] = useState<number>(0);
  const [currentFile, setCurrentFile] = useState<File | null>(null);

  const options = React.useMemo(
    (): Options => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: false,
      placeholder: 'Enter your description',
      status: false,
    }),
    []
  );

  const handleUpload = (file: File) => {
    if (!file) return;
    const storageRef = ref(storage, `/image/${file.name}${uuidv4()}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    setCurrentFile(file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setCurrentProgress(progress);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setImgUrl(url);
        });
      }
    );
  };
  return (
    <Box display="flex" flexDirection="column" gap="25px">
      <Typography component="h1" fontWeight="700" fontSize="40px">
        {isEdit ? 'Edit collection' : 'Create collection'}
      </Typography>
      <Box minWidth="280px" display="flex" justifyContent="start">
        <Button onClick={handleCancel} variant="contained" color="warning">
          Cancel
        </Button>
      </Box>

      <Box display="flex" flexDirection="column" gap="10px">
        <Typography component="h5" fontWeight="700" color="text.secondary">
          Collection name
        </Typography>
        <StyledInput
          value={name}
          onChange={(event) => setName(event.target.value)}
          type="text"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Box>

      <Box display="flex" flexDirection="column" gap="10px">
        <Typography component="h5" fontWeight="700" color="text.secondary">
          Collection theme
        </Typography>
        <Select
          value={theme}
          label="Theme"
          onChange={(event) => {
            setTheme(event.target.value as CollectionThemesEnum);
          }}
        >
          {themes.map((elem) => (
            <MenuItem key={elem} value={elem}>
              {elem}
            </MenuItem>
          ))}
        </Select>
      </Box>

      <ImageUploader
        imgUrl={imgUrl}
        currentFile={currentFile}
        handleUpload={handleUpload}
        currentProgress={currentProgress}
        setImgUrl={setImgUrl}
        setCurrentFile={setCurrentFile}
        setCurrentProgress={setCurrentProgress}
      />

      <Box display="flex" flexDirection="column" gap="10px">
        <Typography component="h5" fontWeight="700" color="text.secondary">
          Collection description (with markdown)
        </Typography>
        <StyledMDe
          options={options}
          value={description}
          onChange={(value) => setDescription(value)}
        />
      </Box>

      <Box display="flex" flexDirection="column" gap="10px">
        <Box display="flex" flexDirection="column" gap="5px">
          <Typography
            component="h5"
            fontSize="25px"
            fontWeight="700"
            color="text.secondary"
          >
            Optional fields for items
          </Typography>
          <Typography component="div" fontSize="15px" color="text.secondary">
            You can name 15 optional fields for items in collection: 3 string, 3
            number, 3 text (with markdown), 3 date and 3 boolean. If you dont
            need it just keep it empty
          </Typography>
        </Box>

        <Box display="flex" flexDirection="column" gap="10px">
          <Typography component="h5" fontWeight="700" color="text.secondary">
            String
          </Typography>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 2, sm: 8, md: 12 }}
          >
            <Grid item xs={2} sm={4} md={4}>
              <StyledInput
                value={string1descr ?? ''}
                onChange={(event) =>
                  setString1Descr(
                    event.target.value ? event.target.value : null
                  )
                }
                type="text"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={2} sm={4} md={4}>
              <StyledInput
                value={string2descr ?? ''}
                onChange={(event) => {
                  setString2Descr(
                    event.target.value ? event.target.value : null
                  );
                }}
                type="text"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={2} sm={4} md={4}>
              <StyledInput
                value={string3descr ?? ''}
                onChange={(event) =>
                  setString3Descr(
                    event.target.value ? event.target.value : null
                  )
                }
                type="text"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>

      <Box display="flex" flexDirection="column" gap="10px">
        <Typography component="h5" fontWeight="700" color="text.secondary">
          Number
        </Typography>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 2, sm: 8, md: 12 }}
        >
          <Grid item xs={2} sm={4} md={4}>
            <StyledInput
              value={number1descr ?? ''}
              onChange={(event) =>
                setNumber1Descr(event.target.value ? event.target.value : null)
              }
              type="text"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <StyledInput
              value={number2descr ?? ''}
              onChange={(event) => {
                setNumber2Descr(event.target.value ? event.target.value : null);
              }}
              type="text"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <StyledInput
              value={number3descr ?? ''}
              onChange={(event) =>
                setNumber3Descr(event.target.value ? event.target.value : null)
              }
              type="text"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
        </Grid>
      </Box>

      <Box display="flex" flexDirection="column" gap="10px">
        <Typography component="h5" fontWeight="700" color="text.secondary">
          Text
        </Typography>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 2, sm: 8, md: 12 }}
        >
          <Grid item xs={2} sm={4} md={4}>
            <StyledInput
              value={text1descr ?? ''}
              onChange={(event) =>
                setText1Descr(event.target.value ? event.target.value : null)
              }
              type="text"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <StyledInput
              value={text2descr ?? ''}
              onChange={(event) => {
                setText2Descr(event.target.value ? event.target.value : null);
              }}
              type="text"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <StyledInput
              value={text3descr ?? ''}
              onChange={(event) =>
                setText3Descr(event.target.value ? event.target.value : null)
              }
              type="text"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
        </Grid>
      </Box>

      <Box display="flex" flexDirection="column" gap="10px">
        <Typography component="h5" fontWeight="700" color="text.secondary">
          Date
        </Typography>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 2, sm: 8, md: 12 }}
        >
          <Grid item xs={2} sm={4} md={4}>
            <StyledInput
              value={date1descr ?? ''}
              onChange={(event) =>
                setDate1Descr(event.target.value ? event.target.value : null)
              }
              type="text"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <StyledInput
              value={date2descr ?? ''}
              onChange={(event) => {
                setDate2Descr(event.target.value ? event.target.value : null);
              }}
              type="text"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <StyledInput
              value={date3descr ?? ''}
              onChange={(event) =>
                setDate3Descr(event.target.value ? event.target.value : null)
              }
              type="text"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
        </Grid>
      </Box>

      <Box display="flex" flexDirection="column" gap="10px">
        <Typography component="h5" fontWeight="700" color="text.secondary">
          Boolean
        </Typography>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 2, sm: 8, md: 12 }}
        >
          <Grid item xs={2} sm={4} md={4}>
            <StyledInput
              value={boolean1descr ?? ''}
              onChange={(event) =>
                setBoolean1Descr(event.target.value ? event.target.value : null)
              }
              type="text"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <StyledInput
              value={boolean2descr ?? ''}
              onChange={(event) => {
                setBoolean2Descr(
                  event.target.value ? event.target.value : null
                );
              }}
              type="text"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <StyledInput
              value={boolean3descr ?? ''}
              onChange={(event) =>
                setBoolean3Descr(event.target.value ? event.target.value : null)
              }
              type="text"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
