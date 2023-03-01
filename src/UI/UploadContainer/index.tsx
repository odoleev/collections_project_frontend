import styled from '@emotion/styled';
import { Box } from '@mui/material';

export const UploadContainer = styled(Box)`
  display: flex;
  align-items: center;
  gap: 10px;
  @media (max-width: 500px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;
