import { ICollection } from '../../../types';

export interface ICollectionDescription {
  collectionData: ICollection;
  handleEditButton: () => void;
  handleOpenDelete: () => void;
  deleteOpen: boolean;
  handleCloseDelete: () => void;
  handleDelete: () => void;
}
