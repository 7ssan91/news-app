import React, { useContext, ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getHomePageUrl } from '../routingConstants/AppUrls';
import { LocaleContext } from '../LanguageRouter';
import { isAuthenticated } from '@app/lib/helpers/constants/helpers';

interface AuthRouteGuardProps {
  restricted: boolean;
  children?: ReactNode;
  redirect?: string;
}

const AuthRouteGuard: React.FC<AuthRouteGuardProps> = ({ children, redirect }) => {
  const location = useLocation();
  const { locale } = useContext(LocaleContext);

  // Redirect if specified
  return redirect ? (
    <Navigate replace to={redirect} />
  ) : isAuthenticated() ? (
    // Redirect to home page if authenticated
    <Navigate replace to={getHomePageUrl(locale)} state={{ from: location }} />
  ) : (
    // Render children if not authenticated
    <>{children}</>
  );
};

export default AuthRouteGuard;
