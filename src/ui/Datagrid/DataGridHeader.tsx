import React, { FunctionComponent } from 'react';
import classes from './DataGrid.module.scss';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
//material ui
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { IDataGridHeaderProps } from './DataGrid.types';



const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  color: 'var(--primary-color)',
  backgroundColor: 'white',
  marginInlineStart: theme.spacing(2),
  marginLeft: 0,
  border: '1px solid #E4E4E4',
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingInlineStart: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const DataGridHeader: FunctionComponent<IDataGridHeaderProps> = ({
  title,
  btnTitle = '',
  addNewUrl,
  handleSearch,
  params,
  isSearchAllowed = true,
  children,
  walletTransfer,
  openTransferModal,
}) => {
  const navigate = useNavigate();
  const { t }: any = useTranslation();

  return (
    <div className={classes.dateGridHeaderWrapper}>
      <Grid className={classes.searchInputWrapper} container>
        <Grid
          sx={{ display: 'flex', alignItems: 'center', marginBottom: { xs: 1, md: 0 } }}
          item
          xs={12}
          md={6}
        >
          <Typography
            variant="h6"
            fontSize={'20px'}
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            {title}
          </Typography>
          {isSearchAllowed && (
            <Search onChange={handleSearch} defaultValue={params?.searchKey}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                defaultValue={params?.searchKey}
                placeholder={t(`search_here`)}
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
          )}
        </Grid>
        {btnTitle && (
          <Grid
            sx={{ display: 'flex', justifyContent: { md: 'end', xs: 'start' } }}
            item
            xs={12}
            md={6}
          >
            <Button
              className={classes.addNewBtn}
              onClick={() => (!walletTransfer ? navigate(addNewUrl!) : openTransferModal!())}
            >
              {btnTitle}
            </Button>
          </Grid>
        )}
        {children}
      </Grid>
    </div>
  );
};

export default DataGridHeader;