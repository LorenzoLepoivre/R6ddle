import React from "react";
import { useTranslation } from 'react-i18next';
import "./Answer.css";

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

interface CharacterAnswerProps {
  answers: Character[];
  goodAnswers: Character | null;
}

const CharacterAnswer: React.FC<CharacterAnswerProps> = ({ answers = [], goodAnswers }) => {
  const { t } = useTranslation();

  return (
    <div id="answers">
      {answers.map((answer, index) => (
        <div key={index} className="character-details">
          <img src={`/src/assets/img/characters/${answer.image}`} alt={answer.name} />
          <div>
            <h3>{answer.name}</h3>
            <div className={`character-field ${goodAnswers?.camp === answer.camp ? 'good' : 'bad'}`}>
              <span className="label">{t('camp')}:</span> <span className="value">{t(`roles.${answer.camp}`)}</span>
            </div>
            <div className={`character-field ${goodAnswers?.type === answer.type ? 'good' : 'bad'}`}>
              <span className="label">{t('specialty')}:</span> <span className="value">{t(`types.${answer.type}`)}</span>
            </div>
            <div className={`character-field ${goodAnswers?.hp === answer.hp ? 'good' : 'bad'}`}>
              <span className="label">{t('hp')}:</span> <span className="value">{answer.hp}</span>
            </div>
            <div className={`character-field ${goodAnswers?.speed === answer.speed ? 'good' : 'bad'}`}>
              <span className="label">{t('speed')}:</span> <span className="value">{answer.speed}</span>
            </div>
            <div className={`character-field ${goodAnswers?.difficulty === answer.difficulty ? 'good' : 'bad'}`}>
              <span className="label">{t('difficulty')}:</span> <span className="value">{answer.difficulty}</span>
            </div>
            <div className={`character-field ${goodAnswers?.year === answer.year ? 'good' : 'bad'}`}>
              <span className="label">{t('year')}:</span> <span className="value">{answer.year}</span>
            </div>
            <div className={`character-field ${goodAnswers?.birthplace === answer.birthplace ? 'good' : 'bad'}`}>
              <span className="label">{t('birthplace')}:</span> <span className="value">{t(`countries.${answer.birthplace}`)}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CharacterAnswer;
