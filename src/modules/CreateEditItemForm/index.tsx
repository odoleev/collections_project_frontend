import React, { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import CreatableSelect from 'react-select/creatable';
import { MultiValue, StylesConfig } from 'react-select';
import { useTranslation } from 'react-i18next';
import { ICreateEditItems } from './create-edit-items.types';
import { StyledInput } from '../../UI';
import { OptionalStrings } from './OptionalStrings';
import { OptionalDates } from './OptionalDates';
import { OptionalNumbers } from './OptionalNumbers';
import { OptionalBooleans } from './OptionalBooleans';
import { OptionalMDs } from './OptionalMDs';
import { itemsAPI } from '../../store/services';

const customStyles: StylesConfig<{ label: string; value: string }> = {
  option: (base, state) => ({
    ...base,
    color: '#1e2022',
  }),
};

export function CreateEditItemForm(props: ICreateEditItems) {
  const { t } = useTranslation();
  const {
    isEdit = false,
    name,
    setName,
    tags,
    setTags,
    handleCancel,
    boolean1,
    boolean3,
    boolean2,
    setBoolean1,
    setBoolean2,
    setBoolean3,
    date2,
    date1,
    date3,
    setDate1,
    setDate2,
    setDate3,
    number2,
    number1,
    number3,
    setNumber2,
    setNumber3,
    setNumber1,
    setString2,
    setString3,
    setString1,
    string1,
    string2,
    string3,
    setText2,
    setText3,
    text1,
    text2,
    text3,
    setText1,
    string1descr,
    string2descr,
    string3descr,
    number1descr,
    number2descr,
    number3descr,
    text1descr,
    text2descr,
    text3descr,
    date1descr,
    date2descr,
    date3descr,
    boolean1descr,
    boolean2descr,
    boolean3descr,
  } = props;

  const properTags = tags.map((tag) => {
    return { label: tag, value: tag };
  });

  console.log(name)

  const [tagsSelect, setTagsSelect] =
    useState<MultiValue<{ label: string; value: string }>>(properTags);

  const [options, setOptions] = useState<
    Array<{ value: string; label: string }>
  >([]);

  const [getTags, { data, isSuccess }] = itemsAPI.useGetTagsMutation();

  const onTagChange = (
    newValue: MultiValue<{ label: string; value: string }>
  ) => {
    if (newValue.length < 4) {
      setTagsSelect(newValue);
      const valueToTags = newValue.map((tag) => {
        return tag.value as string;
      });
      setTags(valueToTags);
    }
  };

  useEffect(() => {
    async function fetchTags() {
      await getTags(null);
    }
    fetchTags();
  }, []);

  useEffect(() => {
    if (isSuccess) {
      const toOptions = Object.keys(data).map((key) => {
        return { value: key, label: key };
      });
      setOptions(toOptions);
    }
  }, [isSuccess]);

  return (
    <Box display="flex" flexDirection="column" gap="25px">
      <Typography component="h1" fontWeight="700" fontSize="40px">
        {isEdit ? 'Edit item' : 'Create item'}
      </Typography>
      <Box minWidth="280px" display="flex" justifyContent="start">
        <Button onClick={handleCancel} variant="contained" color="warning">
          {t('cancel')}
        </Button>
      </Box>
      <Box display="flex" flexDirection="column" gap="10px">
        <Typography component="h5" fontWeight="700" color="text.secondary">
          {t('item.name')}
        </Typography>
        <StyledInput
          required
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
          {t('item.tags_pick')}
        </Typography>
        <Box maxWidth="500px">
          <CreatableSelect
            styles={customStyles}
            options={options}
            value={tagsSelect}
            isMulti
            onChange={onTagChange}
          />
        </Box>
      </Box>
      <OptionalStrings
        string1={string1}
        setString1={setString1}
        string2={string2}
        setString2={setString2}
        string3={string3}
        setString3={setString3}
        string1descr={string1descr}
        string2descr={string2descr}
        string3descr={string3descr}
      />
      <OptionalDates
        date1={date1}
        setDate1={setDate1}
        date2={date2}
        setDate2={setDate2}
        date3={date3}
        setDate3={setDate3}
        date1descr={date1descr}
        date2descr={date2descr}
        date3descr={date3descr}
      />
      <OptionalNumbers
        number1={number1}
        setNumber1={setNumber1}
        number2={number2}
        setNumber2={setNumber2}
        number3={number3}
        setNumber3={setNumber3}
        number1descr={number1descr}
        number2descr={number2descr}
        number3descr={number3descr}
      />
      <OptionalBooleans
        boolean1={boolean1}
        setBoolean1={setBoolean1}
        boolean2={boolean2}
        setBoolean2={setBoolean2}
        boolean3={boolean3}
        setBoolean3={setBoolean3}
        boolean1descr={boolean1descr}
        boolean2descr={boolean2descr}
        boolean3descr={boolean3descr}
      />
      <OptionalMDs
        text1={text1}
        setText1={setText1}
        text2={text2}
        setText2={setText2}
        text3={text3}
        setText3={setText3}
        text1descr={text1descr}
        text2descr={text2descr}
        text3descr={text3descr}
      />
    </Box>
  );
}
