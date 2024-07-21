// src/models/firebase.d.ts

declare module '../models/firebase' {
    export function getCharacters(language: string): Promise<any>;
    export function addCharacter(language: string, character: any, id: string): Promise<void>;
    export function addCharacters(language: string, allCharacters: any[]): Promise<void>;
    export function selectRandomCharacter(language: string): void;
    export class Character {
      constructor(id: string, name: string, camp: string, type: string, hp: number, speed: number, difficulty: string, year: string, birthplace: string, image: string, today: boolean);
    }
  }
  