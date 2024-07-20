import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getCharacters } from '../models/firebase';
import './Home.css';
import Footer from './Footer';
import Header from './Header';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [suggestions, setSuggestions] = useState<any[]>([]);

  useEffect(() => {
    const fetchCharacters = async () => {
      const fetchedCharacters = await getCharacters(i18n.language);
      setSuggestions(fetchedCharacters);
    };
    fetchCharacters();
  }, [i18n.language]);

  const handleButtonClick = async () => {
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
