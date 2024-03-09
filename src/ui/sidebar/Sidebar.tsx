// Importing dependencies and styles
import React, { useContext, useEffect, useState } from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Collapse, Tooltip, Typography } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ClassIcon from '@mui/icons-material/Class';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Importing styles
import styles from './Sidebar.module.scss';

// Importing sidebar items
import { sidebarItems } from '@app/lib/helpers/constants/sidebarItems';

// Importing custom hooks
import { useTranslator } from '@app/lib/hooks/useTranslator';
import { LocaleContext } from '@app/routing/LanguageRouter';
import Button from '../Button/Button';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// SidebarProps interface
interface SidebarProps {
  userInfo: any;
  minimized: boolean;
  minimizeSidebar: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void

}

// SideBar component
const SideBar: React.FC<SidebarProps> = ({ userInfo, minimized, minimizeSidebar }) => {
  const branchId = +userInfo?.branchId;
  const navigate = useNavigate();
  const location = useLocation();
  const { i18n } = useTranslation();
  const { __T } = useTranslator();
  const { locale } = useContext(LocaleContext);
  const [openItems, setOpenItems] = useState<string[]>([]);
  const [listItems, setListItems] = useState<any[]>([]);

  // Function to toggle item open state
  const toggleOpen = (index: string) => {
    const isOpen = openItems.includes(index);
    if (isOpen) {
      setOpenItems(openItems.filter((i) => i !== index));
    } else {
      setOpenItems([...openItems, index]);
    }
  };

  // Function to check if item is open
  const isItemOpen = (index: string) => openItems.includes(index);

  // Function to set list items based on branchId
  const setItems = () => {
    setListItems(branchId !== 0 ? sidebarItems.filter((x) => x.role === 1) : sidebarItems);
  };

  useEffect(() => {
    setItems();
  }, []);

  // JSX structure
  return (
    <Drawer
      className={styles.drawerWrapper}
      anchor="left"
      variant="persistent"
      open={true}
      sx={{
        '& .MuiDrawer-paperAnchorLeft': {
          top: { xs: '56px', sm: '65px' },
          borderRight: 'none',
          left: i18n.dir() === 'ltr' ? 0 : 'unset',
          overflow: 'inherit'
        },
      }}
    >
      <div className={minimized ? styles.drawerContainerMini : styles.drawerContainer}>
        <Typography sx={{ visibility: { xs: 'hidden', sm: 'hidden', md: 'visible' } }}>
          <Button
            className={styles.toggleMiniSidebarBtn}
            onClick={minimizeSidebar}
            buttonStyle='primary'
          >
            {i18n.dir() === 'ltr' ? (<ChevronLeftIcon />) : (<ChevronRightIcon />)}
          </Button>
        </Typography>
        <List
          sx={{
            '& .MuiListItem-root:hover': {
              backgroundColor: '#2A5E741A',
              borderEndEndRadius: '15px',
              borderStartEndRadius: '15px',
            },
            '& .MuiListItem-root': { color: 'var(--primary-color)', padding: '0' },
            '& .MuiListItemButton-root': {
              paddingInlineStart: '0',
              padding: '8px 0',
              borderEndEndRadius: '15px',
              borderStartEndRadius: '15px',
            },
          }}
        >
          {listItems.map((item, i) => (
            <React.Fragment key={`sidebar-item-${i}`}>
              {!item?.hasChild ? (
                <ListItem
                  onClick={() => navigate(item.path(locale))}
                  key={`list-item-${i}`}
                  disablePadding
                  className={item.path(locale) === location.pathname ? styles.activeParent : ''}
                  sx={{ paddingInlineStart: 0 }}
                >
                  <ListItemButton>
                    <i
                      className={
                        'bg-brand-100 h-5 ltr:rounded-r-lg rtl:rounded-l-lg rtl:ml-2 ltr:mr-2 w-1'
                      }
                    ></i>
                    <Tooltip title={__T(item.title)}>
                      <ListItemIcon>{item.icon}</ListItemIcon>
                    </Tooltip>
                    <ListItemText primary={__T(item.title)} style={{ textAlign: 'start' }} />
                  </ListItemButton>
                </ListItem>
              ) : (
                <>
                  <ListItem onClick={() => toggleOpen(`${i}-parent`)} key={`list-item-${i}`} disablePadding>
                    <ListItemButton>
                      <i
                        className={
                          'bg-brand-100 h-5 ltr:rounded-r-lg rtl:rounded-l-lg rtl:ml-2 ltr:mr-2 w-1'
                        }
                      ></i>
                      <Tooltip title={__T(item?.title)}>
                        <ListItemIcon>{item?.icon}</ListItemIcon>
                      </Tooltip>
                      <ListItemText primary={__T(item.title)} style={{ textAlign: 'start' }} />
                      <ListItemIcon>
                        {isItemOpen(`${i}-parent`) ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                      </ListItemIcon>
                    </ListItemButton>
                  </ListItem>
                  <Collapse in={isItemOpen(`${i}-parent`)} key={`collapse-${i}`}>
                    {item.itemList.map((subItem: any, j: number) => (
                      <ListItem
                        onClick={() => navigate(subItem.path(locale))}
                        key={`list-item-${i}-${j}`}
                        disablePadding
                        className={!minimized ? `${styles.activeChild + ' ' + styles.activeMinChild}` : styles.activeChild}
                      >
                        <ListItemButton key={`list-item-button-${i}-${j}`}>
                          <Tooltip title={__T(subItem?.title)}>
                            <ListItemIcon sx={{ paddingInlineStart: minimized ? '10px' : '', minWidth: '20px' }}>
                              {subItem?.icon ? subItem?.icon : <ClassIcon />}
                            </ListItemIcon>
                          </Tooltip>
                          {!minimized && (
                            <ListItemText primary={__T(subItem?.title)} style={{ textAlign: 'start' }} />
                          )}
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </Collapse>
                </>
              )}
            </React.Fragment>
          ))}
        </List>
      </div>
    </Drawer>
  );
};

// Exporting the component
export default SideBar;
