export interface IDeleteDialog {
    open: boolean;
    handleClose: () => void;
    handleConfirm: () => void;
}