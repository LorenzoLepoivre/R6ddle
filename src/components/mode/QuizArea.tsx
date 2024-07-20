import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import "./QuizArea.css";

interface Suggestion {
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

interface QuizAreaProps {
  suggestions: Suggestion[];
  answers: Suggestion[];
  setAnswers: React.Dispatch<React.SetStateAction<Suggestion[]>>;
  goodAnswers: Suggestion | null;
  setFinish: React.Dispatch<React.SetStateAction<boolean>>;
}

const QuizArea: React.FC<QuizAreaProps> = ({ suggestions = [], answers = [], setAnswers, goodAnswers, setFinish }) => {
  const { t } = useTranslation();
  const [input, setInput] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<Suggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    if (value) {
      const filtered = suggestions.filter((suggestion) => {
        const suggestionText = suggestion.name.toLowerCase();
        return suggestionText.startsWith(value.toLowerCase()) && !answers.some(answer => answer.name === suggestion.name);
      });
      console.log('Filtered Suggestions:', filtered); // Ajouter un log ici
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: Suggestion) => {
    sendAnswer(suggestion);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && filteredSuggestions.length > 0) {
      sendAnswer(filteredSuggestions[0]);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if ((event.target as HTMLElement).id !== "input-field" && !(event.target as HTMLElement).classList.contains("suggestion-item")) {
      setShowSuggestions(false);
    }
  };

  const sendAnswer = (answer: Suggestion) => {
    setAnswers((prevAnswers) => [answer, ...prevAnswers]);
    setInput("");
    setFilteredSuggestions([]);
    setShowSuggestions(false);
    if (goodAnswers && answer.name === goodAnswers.name) {
      setFinish(true);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="input-container">
      <input
        type="text"
        id="input-field"
        placeholder={t('start_typing')}
        value={input}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />

      {showSuggestions && filteredSuggestions.length > 0 && (
        <div id="suggestions">
          {filteredSuggestions.map((suggestion, index) => (
            !answers.some(answer => answer.name === suggestion.name) && (
              <div key={index} className="suggestion-item" onClick={() => handleSuggestionClick(suggestion)}>
                {suggestion.name}
              </div>
            )
          ))}
        </div>
      )}
      {showSuggestions && filteredSuggestions.length === 0 && (
        <div className="no-suggestions">{t('no_suggestions')}</div>
      )}
    </div>
  );
};

export default QuizArea;
