import React, { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { LocaleContext } from '@app/routing/LanguageRouter';
//material ui
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import MoreIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { getDecodedToken } from '@app/store/auth/AuthSelectors';
import { LocalStorageKeys } from '@app/lib/helpers/constants/helpers';
import { getLoginPageUrl, getUserProfilePageUrl } from '@app/routing/routingConstants/AppUrls';
import { LanguageSelect } from '@app/ui/LanguageSelect';
import { LogoIcon } from '@app/ui/Icons';
import Button from '@app/ui/Button/Button';
import { useTranslator } from '@app/lib/hooks/useTranslator';
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  color: '#4A565E',
  backgroundColor: '#E6E6EB7A',
  marginInlineEnd: theme.spacing(2),
  marginInlineStart: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginInlineStart: theme.spacing(3),
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
interface Props {
  toggleSidebar: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}
export const Header: React.FC<Props> = ({ toggleSidebar }) => {
  const menuId = 'primary-search-account-menu';
  const mobileMenuId = 'primary-search-account-menu-mobile';
  const { locale } = useContext(LocaleContext);
  const navigate = useNavigate();
  const decodedToken = useSelector((state) => getDecodedToken({ state }));
  const userId = useSelector((state) => getDecodedToken({ state }))?.id;
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { __T } = useTranslator();

  const handleOpenUserMenu = (event: any) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogOut = () => {
    localStorage.removeItem(LocalStorageKeys.TOKEN);
    localStorage.removeItem(LocalStorageKeys.REFRESHTOKEN);
    navigate(getLoginPageUrl(locale), { replace: true });
  };

  const redirectUserPage = () => {
    navigate(getUserProfilePageUrl({ locale, id: userId }));
  };
  return (
    <AppBar style={{ backgroundColor: 'white', boxShadow: 'none' }} position="fixed">
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ display: { xs: 'none', sm: 'block' }, marginInlineEnd: 10 }}
        >
          <Link to={'/'}>
            <LogoIcon color='var(--primary-color)' />
          </Link>
        </Typography>
        {/* mobile toggle sidebar */}
        <Typography sx={{ visibility: { md: 'hidden', sm: 'visible' }, }}>
          <Button
            buttonStyle='transparent'
            onClick={toggleSidebar}
          >
            <MenuIcon />
          </Button>
        </Typography>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase placeholder="Search here..." inputProps={{ 'aria-label': 'search' }} />
        </Search>
        <Box sx={{ flexGrow: 1 }} />
        <Button  buttonStyle='transparent'>
          <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Flag_of_Egypt.svg/800px-Flag_of_Egypt.svg.png?20231030035225' alt='flag' height={20} />
        </Button>
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
          <Box sx={{ alignSelf: 'center' }}>
            <LanguageSelect />
          </Box>
          <Box sx={{ flexGrow: 0 }}>

            <Button
              onClick={handleOpenUserMenu}
              size='sm'
              buttonStyle='transparent'
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              color='inherit'
            >
              <AccountCircle style={{ color: 'var(primary-color', marginInlineEnd: '4px' }} />
              {decodedToken?.name}
            </Button>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >

              <MenuItem onClick={redirectUserPage}>
                <Typography textAlign="center">{__T('Profile')}</Typography>
              </MenuItem>
              <MenuItem onClick={handleLogOut}>
                <Typography textAlign="center">{__T('Logout')}</Typography>
              </MenuItem>
            </Menu>

          </Box>
        </Box>
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size="large"
            aria-label="show more"
            aria-controls={mobileMenuId}
            aria-haspopup="true"
            color="inherit"
          >
            <MoreIcon />
          </IconButton>
        </Box>
      </Toolbar>
   
    </AppBar>
  );
}
