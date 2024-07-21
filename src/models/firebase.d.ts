// src/models/firebase.d.ts

declare module '../models/firebase' {
    export function getCharacters(language: string): Promise<any>;
    export function addCharacter(language: string, character: any, id: string): Promise<void>;
    export function addCharacters(language: string, allCharacters: any[]): Promise<void>;
    export function selectRandomCharacter(language: string): void;
  }
  