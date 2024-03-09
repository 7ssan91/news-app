import React from 'react';
//material icons
import DashboardIcon from '@mui/icons-material/Dashboard';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import { getHomePageUrl } from '@app/routing/routingConstants/AppUrls';

const accessLevel = {
  private: 0,
  global: 1,
}
export const sidebarItems = [
  {
    title: 'Dashboard',
    icon: <DashboardIcon style={{ minWidth: 45 }} />,
    path: (locale: string) => getHomePageUrl(locale),
    role: accessLevel.global
  },
  {
    title: 'Reports',
    icon: <RequestQuoteIcon style={{ minWidth: 45 }} />,
    hasChild: true,
    role: accessLevel.private,
    itemList: [
      {
        title: 'Total_Spending',
        path: (locale: string) => getHomePageUrl(locale),
      },
    ],
  },
];
