import { DataSource } from "typeorm";
import { Country } from "../entities/Country";

export const dataSource = new DataSource({
  type: "sqlite",
  database: "database/countries.sqlite", // Le fichier SQLite sera créé automatiquement
  synchronize: true, // Crée automatiquement les tables (à désactiver en production)
  logging: true, // Affiche les requêtes SQL dans la console
  entities: [Country], // Liste des entités
});

// Fonction pour initialiser la base de données
export async function initializeDatabase() {
  try {
    await dataSource.initialize();
    console.log("✅ Base de données SQLite connectée avec succès");
  } catch (error) {
    console.error(
      "❌ Erreur lors de la connexion à la base de données:",
      error
    );
    process.exit(1);
  }
}
