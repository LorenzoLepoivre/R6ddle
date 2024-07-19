import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, setDoc } from "firebase/firestore"; // Ajout de getDocs
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDkOcpH-Wchl2VPh94bntSZb5g7yWW51n0",
  authDomain: "r6dle-9e79e.firebaseapp.com",
  projectId: "r6dle-9e79e",
  storageBucket: "r6dle-9e79e.appspot.com",
  messagingSenderId: "730559455758",
  appId: "1:730559455758:web:3937b60d9be61532c7925f",
  measurementId: "G-93VEK77BST"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export const getCharacters = (language) => {
  const charactersCollection = collection(db, 'characters_' + language);
  return getDocs(charactersCollection).then(snapshot => {
    const characters = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    console.log(characters);
    return characters;
  });
};

export const addCharacter = (language, character, id) => {
  const characterId = String(id); // Convertir l'identifiant en chaîne
  const charactersDoc = doc(db, 'characters_' + language, characterId);
  const payload = {
    name: character.name,
    type: character.type,
    camp: character.camp,
    hp: character.hp,
    speed: character.speed,
    difficulty: character.difficulty,
    year: character.year,
    birthplace: character.birthplace,
    image: character.image,
    today: character.today
  };
  return setDoc(charactersDoc, payload);
}

export const addCharacters = (language, allCharacters) => {
  const promises = allCharacters.map(character =>
    addCharacter(language, character, character.id)
  );
  return Promise.all(promises);
}

export const selectRandomCharacter = (language) => {
  getCharacters(language).then(charactersList => {
    if (charactersList.length === 0) {
      console.log("Character list is empty");
      return;
    }

    // Réinitialiser la propriété "today" pour tous les personnages
    const resetPromises = charactersList.map(character => {
      character.today = false;
      return addCharacter(language, character, character.id);
    });

    Promise.all(resetPromises).then(() => {
      // Sélectionner un nouveau personnage aléatoire
      const randomIndex = Math.floor(Math.random() * charactersList.length);
      const randomCharacter = charactersList[randomIndex];
      randomCharacter.today = true;
      addCharacter(language, randomCharacter, randomCharacter.id).then(() => {
        console.log("Today's character: ", randomCharacter);
      });
    });
  });
};
