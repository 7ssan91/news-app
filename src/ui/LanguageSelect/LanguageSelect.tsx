import React, { useEffect, useState, useContext } from 'react';
// Contexts
import { LocaleContext } from '@app/routing/LanguageRouter';
import { useTranslation } from 'react-i18next';
import { ArrowDropDown } from '@mui/icons-material';
import Button from '@mui/material/Button';
import { List, ListItem, ListSubheader, Popover } from '@mui/material';

interface LanguageMap {
  [key: string]: { label: string };
}

const languageMap: LanguageMap = {
  en: { label: 'English' },
  ar: { label: 'العربية' },
};

export const LanguageSelect: React.FC = () => {
  const { t } = useTranslation();
  const { locale, setLocale } = useContext(LocaleContext);
  const [lang, setLang] = useState<string>(locale);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

  useEffect(() => {
    setLang(locale);
  }, [locale]);

  const changeLanguageHandler = (value: string) => {
    setLocale(value);
    setLang(value);
    setMenuAnchor(null);
  };

  return (
    <div className="language-select-root">
      <Button
        onClick={({ currentTarget }) => setMenuAnchor(currentTarget)}
        style={{ color: '#000' }}
      >
        {languageMap[lang].label}
        <ArrowDropDown fontSize="small" />
      </Button>
      <Popover
        open={!!menuAnchor}
        anchorEl={menuAnchor}
        onClose={() => setMenuAnchor(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <div>
          <List>
            <ListSubheader>
              {t('select_language')}
            </ListSubheader>
            {Object.entries(languageMap)?.map(([key, value]) => (
              <ListItem
                button
                key={key}
                onClick={() => {
                  changeLanguageHandler(key);
                }}
              >
                {value.label}
              </ListItem>
            ))}
          </List>
        </div>
      </Popover>
    </div>
  );
};

