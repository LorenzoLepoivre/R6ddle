import React, { useState, useEffect } from "react";
import "./QuizArea.css";
import { useTranslation } from 'react-i18next';

const QuizArea = ({ suggestions = [], answers = [], setAnswers, goodAnswers, setFinish }) => {
  const { t } = useTranslation();
  const [input, setInput] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
    if (value) {
      const filtered = suggestions.filter((suggestion) => {
        const suggestionText = typeof suggestion === "string" ? suggestion : suggestion.name;
        return suggestionText.toLowerCase().startsWith(value.toLowerCase()) && !answers.includes(suggestion);
      });
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    sendAnswer(suggestion);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && filteredSuggestions.length > 0) {
      sendAnswer(filteredSuggestions[0]);
    }
  };

  const handleClickOutside = (event) => {
    if (event.target.id !== "input-field" && !event.target.classList.contains("suggestion-item")) {
      setShowSuggestions(false);
    }
  };

  const sendAnswer = (answer) => {
    setAnswers((prevAnswers) => [answer, ...prevAnswers]);
    setInput("");
    setFilteredSuggestions([]);
    setShowSuggestions(false);
    if(answer === goodAnswers) {
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
            !answers.includes(suggestion) && (
              <div key={index} className="suggestion-item" onClick={() => handleSuggestionClick(suggestion)}>
                {typeof suggestion === "string" ? suggestion : suggestion.name}
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
