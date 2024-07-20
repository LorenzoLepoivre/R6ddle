// Declaration file for '../models/firebase' module

declare module '../models/firebase' {

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
  
    function getCharacters(language: string): Promise<Character[]>;
  
    function addCharacter(language: string, character: Character, id: number): Promise<void>;
  
    function addCharacters(language: string, allCharacters: Character[]): Promise<void[]>;
  
    function selectRandomCharacter(language: string): void;
  
    export { Character, getCharacters, addCharacter, addCharacters, selectRandomCharacter };
  }
  