import styled from '@emotion/styled';
import SimpleMdeReact from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';

export const StyledMDe = styled(SimpleMdeReact)`
  .editor {
    margin: 30px -30px;

    :global {
      .cm-s-easymde {
        border: 0;
        font-size: 22px;
      }
      .editor-toolbar {
        border: 0;
        background-color: rgb(0 0 0 / 2%);
      }
    }
  }
`;
