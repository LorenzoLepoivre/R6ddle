import React, { useState, useEffect } from "react";
import "./Page.css";
import Footer from "../Footer";
import Header from "../Header";
import QuizArea from "./QuizArea";
import CharacterAnswer from "./AnswerArea/CharacterAnswer";
import { getCharacters } from '../../models/firebase';
import { useTranslation } from 'react-i18next';

interface Character {
  name: string;
  type: string;
  camp: string;
  hp: number;
  speed: number;
  difficulty: number;
  year: number;
  birthplace: string;
  image: string;
  today: boolean;
}

const Character: React.FC = () => {
  const [answers, setAnswers] = useState<Character[]>([]);
  const [goodAnswers, setGoodAnswers] = useState<Character | null>(null);
  const [suggestions, setSuggestions] = useState<Character[]>([]);
  const [finish, setFinish] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchCharacters = async () => {
      const fetchedCharacters = await getCharacters("fr");
      console.log('Fetched Characters:', fetchedCharacters); // Ajouter un log ici
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
