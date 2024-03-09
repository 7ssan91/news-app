import React, { useContext, useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { LocaleContext } from './routing/LanguageRouter';
import { useAppSelector } from './lib/hooks/useStore';
import { AppLoader } from '@app/ui/AppLoader';
import { Header } from '@app/ui//header';
import SideBar from '@app/ui/sidebar/Sidebar';
import { getDecodedToken } from './store/auth/AuthSelectors';
import { isAuthenticated } from './lib/helpers/constants/helpers';
import { getHomePageUrl, getLoginPageUrl } from './routing/routingConstants/AppUrls';

function App() {
  const appTitle = import.meta.env.VITE_APP_NAME || 'Default Title';
  const navigate = useNavigate();
  const { locale } = useContext(LocaleContext);
  const decodedToken = useAppSelector((state: unknown) => getDecodedToken({ state }));
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = appTitle;
    const mediaQuery = window.matchMedia('(max-width: 600px)');
    setIsMobile(mediaQuery?.matches);
    const handleResize = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };

    mediaQuery.addEventListener('change', handleResize);

    return () => {
      mediaQuery.removeEventListener('change', handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setIsOpen(!isMobile);
  }, [isMobile]);

  const handleToggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const handleMinimizeSidebar = () => {
    setIsMinimized(!isMinimized)
  }

  const appBodyStyle: React.CSSProperties = {
    height: '100%',
    marginInlineStart: `${isAuthenticated() && pathname !== '/login' && !isMobile ? isMinimized ? '50px' : '230px' : '0px'}`,
    padding: `${isAuthenticated() && pathname !== '/login' ? '20px' : ''}`,
  };

 

  return (
    <div className="App">
      <AppLoader />
      {isAuthenticated() && (
        <>
          <Header toggleSidebar={handleToggleSidebar} />
          {isOpen && <SideBar userInfo={decodedToken} minimized={isMinimized} minimizeSidebar={handleMinimizeSidebar} />}
        </>
      )}
      <div className={`${isAuthenticated() ? 'app-body' : ''}`} style={appBodyStyle}>
        <Outlet />
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default App;
