import React from 'react';
import { useTranslation } from 'react-i18next';
import "./Footer.css";

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer>
      <h1>{t('footer_title')}<a href="https://github.com/LorenzoLepoivre"> SupPepper</a></h1>
    </footer>
  );
};

export default Footer;
