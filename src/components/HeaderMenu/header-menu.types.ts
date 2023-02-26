import {IPageLink} from "../../types";

export interface IHeaderMenu {
options: IPageLink[];
handleClose: () => void;
}