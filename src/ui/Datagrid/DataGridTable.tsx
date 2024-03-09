import * as React from 'react';
import MaterialTable from 'material-table';
import classes from './DataGrid.module.scss';
import { createTheme, ThemeProvider } from '@mui/material';
import { DataGridProps } from './DataGrid.types';



export const DataGridTable: React.FC<DataGridProps> = ({
  data = [],
  columns,
  options,
  actions,
  onRowClick = () => { },
  onSelectionChange,
}) => {
  const theme = createTheme();
  return (
    <div className={classes.materialTableWrapper}>
      <ThemeProvider theme={theme}>
        <MaterialTable
          data={data}
          columns={columns}
          options={options}
          actions={actions}
          onRowClick={(evt, row) => onRowClick(evt, row)}
          onSelectionChange={(rows) => onSelectionChange && onSelectionChange(rows)}
        />
      </ThemeProvider>
    </div>
  );
};
