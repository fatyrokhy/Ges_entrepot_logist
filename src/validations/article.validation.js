import { z } from 'zod';

export const createArticleSchema = z.object({
  reference: z.string().trim().min(1, "La référence est requise"),
  libelle: z.string().trim().min(1, "Le libellé est requis"),
  poids: z.number().positive("Le poids doit être > 0"),
  qteStock: z.number().int().min(0, "La quantité stock doit être ≥ 0"),
  zoneId: z.number().int().positive("ID de zone invalide"),
});