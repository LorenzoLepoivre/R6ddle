import cron from 'node-cron';
import { selectRandomCharacter } from './firebase.js';
import dotenv from 'dotenv';

// Charger les variables d'environnement à partir du fichier .env
dotenv.config();

// Planifier la tâche pour qu'elle s'exécute tous les jours à minuit
cron.schedule('0 0 * * *', () => {
  console.log('Running selectRandomCharacter at midnight');
  selectRandomCharacter('fr'); // Remplacez 'fr' par la langue souhaitée
}, {
  timezone: "Europe/Paris" // Remplacez par votre fuseau horaire si nécessaire
});

console.log('Scheduler is running...');
