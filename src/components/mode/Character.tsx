import React, { useState, useEffect } from "react";
import "./Page.css";
import Footer from "../Footer";
import Header from "../Header";
import QuizArea from "./QuizArea";
import CharacterAnswer from "./AnswerArea/CharacterAnswer";
import { getCharacters, Character as CharacterType } from '../../models/firebase';
import { useTranslation } from 'react-i18next';

const Character: React.FC = () => {
  const [answers, setAnswers] = useState<CharacterType[]>([]);
  const [goodAnswers, setGoodAnswers] = useState<CharacterType | null>(null);
  const [suggestions, setSuggestions] = useState<CharacterType[]>([]);
  const [finish, setFinish] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchCharacters = async () => {
      const fetchedCharacters = await getCharacters("fr");
      console.log('Fetched Characters:', fetchedCharacters);
      setSuggestions(fetchedCharacters);
    };
    fetchCharacters();
  }, []);

  useEffect(() => {
    for (let i = 0; i < suggestions.length; i++) {
      if (suggestions[i].today) {
        setGoodAnswers(suggestions[i]);
        break;
      }
    }
  }, [suggestions]);

  return (
    <div>
      <Header />
      <main>
        <h2>{t('guess_character')}</h2>
        <div className="container">
          {!finish &&
            <QuizArea suggestions={suggestions} answers={answers} setAnswers={setAnswers} goodAnswers={goodAnswers} setFinish={setFinish} />
          }
          <CharacterAnswer answers={answers} goodAnswers={goodAnswers} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Character;
