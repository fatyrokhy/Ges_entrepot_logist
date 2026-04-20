import { z } from 'zod';

export const createPreparateurSchema = z.object({
  prenom: z.string().trim().min(1, "Le prénom est requis"),
  nom: z.string().trim().min(1, "Le nom est requis"),
  email: z.string().trim().email("Email invalide"),
  telephone: z.string().min(1, "Le téléphone est requis").trim(),
  zoneId: z.number().int().positive("ID de zone invalide"),
});