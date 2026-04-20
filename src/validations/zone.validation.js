// validations/zone.validation.js
import { z } from 'zod';

export const createZoneSchema = z.object({
  code: z.string().trim().min(1, "Le code est requis"),
  libelle: z.string().trim().min(1, "Le libellé est requis"),
  capacite: z.number().positive("La capacité doit être un nombre positif"),
  type: z.enum(['sec', 'frais', 'surgele'], {
    errorMap: () => ({ message: "Le type doit être 'sec', 'frais' ou 'surgele'" })
  })
});