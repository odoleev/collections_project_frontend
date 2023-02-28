import { useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Box, MenuItem, Select, Typography } from '@mui/material';
import { useAppSelector } from '../../store/hooks/redux';
import { CollectionThemesEnum, RolesEnum } from '../../types';
import { collectionsAPI } from '../../store/services';
import { StyledInput } from '../../UI';
import { themes } from '../../helpers/assets/themes';

export function CreateCollection() {
  const { role, id: authId } = useAppSelector((state) => state.authReducer);
  const { id } = useParams();
  const navigate = useNavigate();

  const [createCollection, { isSuccess, isError, isLoading, error }] =
    collectionsAPI.useCreateCollectionMutation();

  const [name, setName] = useState<string>('');
  const [theme, setTheme] = useState<string>(CollectionThemesEnum.OTHER);
  const [description, setDescription] = useState<string>('');
  const [string1descr, setString1Descr] = useState<string | null>(null);
  const [string2descr, setString2Descr] = useState<string | null>(null);
  const [string3descr, setString3Descr] = useState<string | null>(null);
  const [number1descr, setNumber1Descr] = useState<string | null>(null);
  const [number2descr, setNumber2Descr] = useState<string | null>(null);
  const [number3descr, setNumber3Descr] = useState<string | null>(null);
  const [text1descr, setText1Descr] = useState<string | null>(null);
  const [text2descr, setText2Descr] = useState<string | null>(null);
  const [text3descr, setText3Descr] = useState<string | null>(null);
  const [boolean1descr, setBoolean1Descr] = useState<string | null>(null);
  const [boolean2descr, setBoolean2Descr] = useState<string | null>(null);
  const [boolean3descr, setBoolean3Descr] = useState<string | null>(null);
  const [date1descr, setDate1Descr] = useState<string | null>(null);
  const [date2descr, setDate2Descr] = useState<string | null>(null);
  const [date3descr, setDate3Descr] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      if (id === authId || role === RolesEnum.ADMIN) {
        return;
      }
      navigate(`/personal-account/${id}`);
    }
  }, [id]);

  return (
    <Box padding="50px" display="flex" flexDirection="column" gap="50px">
      <Box>
        <Typography component="h1" fontWeight={700} fontSize="40px">
          Create collection
        </Typography>
      </Box>
      <Box display="flex" flexDirection="column" gap="15px">
        <StyledInput
          onChange={(event) => setName(event.target.value)}
          label="Collection name"
          type="text"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Select
          value={theme}
          label="Theme"
          onChange={(event) => {
            setTheme(event.target.value);
          }}
        >
          {themes.map((elem) => (
            <MenuItem key={elem} value={elem}>
              {elem}
            </MenuItem>
          ))}
        </Select>
      </Box>
    </Box>
  );
}
