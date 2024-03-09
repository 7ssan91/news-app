import React from 'react';
import PublicRouteGuard from '../guards/PublicRouteGuard';
import PrivateRouteGuard from '../guards/PrivateRouteGuard';
//urls
import {
  getLoginPageUrl,
  getHomePageUrl,
  getSuccessPageUrl,
  getResetPasswordPageUrl,
} from './AppUrls';
//pages
import LoginPage from '@app/pages/login';
import SuccessPage from '@app/pages/success';
import ResetPasswordPage from '@app/pages/resetPassword';
import DashboardPage from '@app/pages/dashboard';

const publicRoutes = [
  {
    element: (
      <PublicRouteGuard restricted >
        <LoginPage />
      </PublicRouteGuard>
    ),
    path: (locale: string) => getLoginPageUrl(locale),
  },
  {
    element: (
      <PublicRouteGuard restricted>
        <SuccessPage />
      </PublicRouteGuard>
    ),
    path: (locale: string) => getSuccessPageUrl(locale),
  },
  {
    element: (
      <PublicRouteGuard restricted>
        <ResetPasswordPage />
      </PublicRouteGuard>
    ),
    path: (locale: string) => getResetPasswordPageUrl(locale),
  },
];
const privateRoutes = [
  {
    element: (
      <PrivateRouteGuard>
        <DashboardPage />
      </PrivateRouteGuard>
    ),
    path: (locale: string) => getHomePageUrl(locale),
  },
];

export const allRoutes = [...publicRoutes, ...privateRoutes];
