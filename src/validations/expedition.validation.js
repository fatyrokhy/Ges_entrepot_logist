import { z } from 'zod';

export const createExpeditionSchema = z.object({
  preparateurId: z.number().int().positive("ID préparateur invalide"),
  articleId: z.number().int().positive("ID article invalide"),
  quantite: z.number().int().positive("La quantité doit être > 0"),
  dateExpedition: z.string().datetime().or(z.date()).refine(d => new Date(d) <= new Date(), {
    message: "La date d'expédition doit être ≤ aujourd'hui",
  }),
  adresseLivraison: z.string().trim().min(1, "L'adresse de livraison est obligatoire"),
});