import React from 'react';
import Pagination from '@mui/material/Pagination';
import classes from './Pagination.module.scss';

interface Props {
  pageCount?: number;
  currentPage?: number;
  handlePageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

const PaginationComponent = ({ pageCount = 1, currentPage = 1, handlePageChange }: Props): JSX.Element => {
  return (
    <Pagination
      className={classes.paginationCustomStyle}
      color="primary"
      variant="outlined"
      shape="rounded"
      count={+pageCount}
      page={+currentPage}
      onChange={(event, value) => handlePageChange(event, value)}
    />
  );
};

export default PaginationComponent;