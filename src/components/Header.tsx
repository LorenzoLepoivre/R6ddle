import React from 'react';
import { useTranslation } from 'react-i18next';
import "./Header.css";

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <header>
      <h1>{t('header_title')}</h1>
      <h3>{t('work_in_progress')}</h3>
      <div>
        <select onChange={(e) => changeLanguage(e.target.value)} defaultValue={i18n.language}>
          <option value="en">English</option>
          <option value="fr">Français</option>
        </select>
      </div>
    </header>
  );
};

export default Header;
