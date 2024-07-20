import "./Footer.css";
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t, i18n } = useTranslation();

  return (
    <footer>
      <h1>{t('footer_title')}<a href="https://github.com/LorenzoLepoivre"> SupPepper</a></h1>
    </footer>
  );
};

export default Footer;
