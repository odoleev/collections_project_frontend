import styled from '@emotion/styled';
import { Box } from '@mui/material';

export const ResponsiveWrapper = styled(Box)`
  display: flex;
  margin-bottom: 35px;
  gap: 15px;
  align-items: center;
  @media(max-width: 780px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;
