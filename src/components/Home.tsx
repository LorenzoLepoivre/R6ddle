import "./Home.css";
import Footer from "./Footer";
import Header from "./Header";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getCharacters } from "../models/firebase";
import { useTranslation } from 'react-i18next';

const Home = () => {
  const navigate = useNavigate();
  const [suggestions, setSuggestions] = useState([]);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const fetchCharacters = async () => {
      const fetchedCharacters = await getCharacters(i18n.language);
      setSuggestions(fetchedCharacters);
    };
    fetchCharacters();
  }, [i18n.language]);

  const handleButtonClick = () => {
    navigate('/character');
  };

  return (
    <div>
      <Header />
      <main>
        <h2>{t('choose_category')}</h2>
        <button onClick={handleButtonClick}>{t('character_button')}</button>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
