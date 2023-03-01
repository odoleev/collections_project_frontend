export interface IPageHeader {
  isDeleteButton?: boolean;
  titleText: string;
  buttonText: string;
  userId: string;
  handleClick: () => void;
  handleOpen?: () => void;
}
