import React, { useContext, ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { LocaleContext } from '../LanguageRouter';
// routes
import { getLoginPageUrl } from '../routingConstants/AppUrls';
import { isAuthenticated } from '@app/lib/helpers/constants/helpers';

interface PrivateRouteGuardProps {
  children: ReactNode;
}

const PrivateRouteGuard: React.FC<PrivateRouteGuardProps> = ({ children }) => {
  const location = useLocation();
  const { locale } = useContext(LocaleContext);

  // Redirect to login page if not authenticated
  return isAuthenticated() ? (
    // Render children if authenticated
    <>{children}</>
  ) : (
    // Redirect to login page with the current location as the "from" state
    <Navigate replace to={getLoginPageUrl(locale)} state={{ from: location }} />
  );
};

export default PrivateRouteGuard;
