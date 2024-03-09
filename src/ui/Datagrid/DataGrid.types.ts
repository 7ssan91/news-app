import { Options } from "material-table";

export interface DataGridProps {
  data: any[];
  columns: any[];
  options: Options<any>;
  actions?: any[];
  onRowClick?: (rowData: any, rowMeta: any) => void;
  onSelectionChange?: (rows: any) => void;
}
export interface IDataGridHeaderProps {
  title: string;
  btnTitle?: string;
  addNewUrl?: string;
  handleSearch?: React.ChangeEventHandler<HTMLInputElement>;
  params?: any;
  isSearchAllowed?: boolean;
  walletTransfer?: boolean;
  openTransferModal?: () => void;
  children?: any
}