import styled from '@emotion/styled';

export const StyledUploadImage = styled.img`
  max-height: 300px;
  width: 200px;
`;

export const StyledCollectionImage = styled.img`
  max-width: 500px;
  @media(max-width: 1000px) {
    max-width: 400px;
  }
  @media(max-width: 850px) {
    max-width: 250px;
  }
`;
