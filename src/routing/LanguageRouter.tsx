import React, { createContext, useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getDefaultLanguage } from './routingConstants/RoutingHelpers';
import { allRoutes } from './routingConstants/RoutesConfig';
import { getHomePageUrl } from './routingConstants/AppUrls';
import NotFoundPage from '../pages/notfound';
import App from '../App';
import { isAuthenticated } from '../lib/helpers/constants/helpers';
interface LocaleContextProps {
  locale: string;
  setLocale: (newLocale: string) => void;
}

export const LocaleContext = createContext<LocaleContextProps>({
  locale: '',
  setLocale: () => { },
});

const LanguageRouter: React.FC = () => {
  const { i18n } = useTranslation();
  const { pathname, search, hash } = useLocation();
  const navigate = useNavigate();
  const availableLocales = ['en', 'ar'];
  const defaultLocale: any =
    getDefaultLanguage() === 'en' || getDefaultLanguage() === 'ar'
      ? getDefaultLanguage()
      : 'en';
  const pathnameLocale = pathname.substring(1, 3).toLowerCase();
  const [locale, setLocale] = useState(defaultLocale);
  const [isLoading, setIsLoading] = useState(true);

  // set body direction
  document.body.dir = i18n.dir(i18n.language);

  useEffect(() => {
    if (availableLocales.includes(pathnameLocale)) {
      updateLocale(pathnameLocale);
    } else if (pathname === '/') {
      updateLocale(defaultLocale);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    setIsLoading(true);
    let lang = defaultLocale;

    if (availableLocales.includes(pathnameLocale)) {
      lang = pathnameLocale;
      setLanguageHandler(lang);
    } else if (pathname === '/') {
      setLanguageHandler(lang);
    }
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale]);

  const setLanguageHandler = (lang: string) => {
    // set language attribute on HTML element
    document.documentElement.setAttribute('lang', lang);
    i18n.changeLanguage(lang);
  };

  const updateLocale = (newLocale: string) => {
    setIsLoading(true);
    const newPath = `/${newLocale}` + pathname.substring(3);

    if (locale !== newLocale) {
      if (newPath === `/${newLocale}/` || newPath === `/${newLocale}` || pathname === '/') {
        navigate(getHomePageUrl(newLocale));
      } else {
        navigate(`${newPath}${hash}${search}`);
      }
      setLocale(newLocale);
    } else if (newPath === `/${newLocale}/` || newPath === `/${newLocale}` || pathname === '/') {
      if (isAuthenticated()) {
        navigate(getHomePageUrl(newLocale));
      } else {
        navigate(`${newPath}${hash}${search}`);
      }
    }
    setIsLoading(false);
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale: updateLocale }}>
      <Routes>
        {!isLoading && (
          <>
            <Route path={`/${locale}`} element={<App />}>
              {allRoutes.map((route: any, routeIndex) => (
                <Route key={routeIndex} path={route.path(locale)} element={route.element}>
                  {route?.children &&
                    route.children.map((childRoute: any, childIndex: number) => (
                      <Route
                        key={childIndex}
                        path={childRoute.path(locale)}
                        element={childRoute.element}
                      />
                    ))}
                </Route>
              ))}
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </>
        )}
      </Routes>
    </LocaleContext.Provider>
  );
};

export default LanguageRouter;
