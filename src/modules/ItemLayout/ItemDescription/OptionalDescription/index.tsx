import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import Markdown from 'markdown-to-jsx';
import { IOptionalDescription } from './optional-description.types';
import { InfoContainer, MDWrapper } from '../../../../UI';

export function OptionalDescription({
  string1,
  date1,
  date1descr,
  date2descr,
  date3descr,
  boolean1descr,
  boolean2descr,
  boolean3descr,
  boolean2,
  boolean3,
  date2,
  date3,
  number1descr,
  number2descr,
  number3descr,
  text1descr,
  text2descr,
  text3descr,
  number1,
  number2,
  number3,
  string1descr,
  string2descr,
  string3descr,
  string2,
  string3,
  text1,
  text2,
  text3,
  boolean1,
}: IOptionalDescription) {
  return (
    <Box display="flex" flexDirection="column" gap="25px">
      {string1descr && (
        <InfoContainer>
          <Typography color="text.secondary">{string1descr}:</Typography>
          <Typography fontWeight={600}>{string1}</Typography>
        </InfoContainer>
      )}
      {string2descr && (
        <InfoContainer>
          <Typography color="text.secondary">{string2descr}:</Typography>
          <Typography fontWeight={600}>{string2}</Typography>
        </InfoContainer>
      )}
      {string3descr && (
        <InfoContainer>
          <Typography color="text.secondary">{string3descr}:</Typography>
          <Typography fontWeight={600}>{string3}</Typography>
        </InfoContainer>
      )}
      {number1descr && (
        <InfoContainer>
          <Typography color="text.secondary">{number1descr}:</Typography>
          <Typography fontWeight={600}>{number1}</Typography>
        </InfoContainer>
      )}
      {number2descr && (
        <InfoContainer>
          <Typography color="text.secondary">{number2descr}:</Typography>
          <Typography fontWeight={600}>{number2}</Typography>
        </InfoContainer>
      )}
      {number3descr && (
        <InfoContainer>
          <Typography color="text.secondary">{number3descr}:</Typography>
          <Typography fontWeight={600}>{number3}</Typography>
        </InfoContainer>
      )}
      {date1descr && (
        <InfoContainer>
          <Typography color="text.secondary">{date1descr}:</Typography>
          <Typography fontWeight={600}>{date1}</Typography>
        </InfoContainer>
      )}
      {date2descr && (
        <InfoContainer>
          <Typography color="text.secondary">{date2descr}:</Typography>
          <Typography fontWeight={600}>{date2}</Typography>
        </InfoContainer>
      )}
      {date3descr && (
        <InfoContainer>
          <Typography color="text.secondary">{date3descr}:</Typography>
          <Typography fontWeight={600}>{date3}</Typography>
        </InfoContainer>
      )}
      {boolean1descr && (
        <InfoContainer>
          <Typography color="text.secondary">{boolean1descr}:</Typography>
          <Typography fontWeight={600}>{boolean1 ? 'Yes' : 'No'}</Typography>
        </InfoContainer>
      )}
      {boolean2descr && (
        <InfoContainer>
          <Typography color="text.secondary">{boolean2descr}:</Typography>
          <Typography fontWeight={600}>{boolean2 ? 'Yes' : 'No'}</Typography>
        </InfoContainer>
      )}
      {boolean3descr && (
        <InfoContainer>
          <Typography color="text.secondary">{boolean3descr}:</Typography>
          <Typography fontWeight={600}>{boolean3 ? 'Yes' : 'No'}</Typography>
        </InfoContainer>
      )}
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 2, sm: 8, md: 12 }}
      >
        <Grid item xs={2} sm={4} md={4}>
          {text1descr && (
            <MDWrapper>
              <InfoContainer flexDirection="column">
                <Typography color="text.secondary">{text1descr}:</Typography>
                <Markdown>{text1 || ''}</Markdown>
              </InfoContainer>
            </MDWrapper>
          )}
        </Grid>

        <Grid item xs={2} sm={4} md={4}>
          {text2descr && (
            <MDWrapper>
              <InfoContainer flexDirection="column">
                <Typography color="text.secondary">{text2descr}:</Typography>
                <Markdown>{text2 || ''}</Markdown>
              </InfoContainer>
            </MDWrapper>
          )}
        </Grid>

        <Grid item xs={2} sm={4} md={4}>
          {text3descr && (
            <MDWrapper>
              <InfoContainer flexDirection="column">
                <Typography color="text.secondary">{text3descr}:</Typography>
                <Markdown>{text3 || ''}</Markdown>
              </InfoContainer>
            </MDWrapper>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
