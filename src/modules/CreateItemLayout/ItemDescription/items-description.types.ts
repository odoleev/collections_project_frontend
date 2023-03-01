import { IItem } from '../../../types/items';
import { ICollection } from '../../../types';

export interface IItemsDescription {
  itemData: IItem;
  collectionData: ICollection;
  handleEditButton: () => void;
  handleOpenDelete: () => void;
  deleteOpen: boolean;
  handleCloseDelete: () => void;
  handleDelete: () => void;
  userId: string;
}
