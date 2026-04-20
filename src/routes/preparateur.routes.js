import express from 'express';
import * as preparateurController from '../controllers/preparateur.controller.js';
import validate from '../middlewares/validate.middleware.js';
import { createPreparateurSchema } from '../validations/preparateur.validation.js';

const router = express.Router();

/**
 * @swagger
 * /preparateurs:
 *   post:
 *     summary: Créer un préparateur
 *     tags: [Préparateurs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Preparateur'
 *     responses:
 *       201:
 *         description: Préparateur créé
 *       400:
 *         description: Email déjà utilisé ou zone invalide
 */
router.post('/', validate(createPreparateurSchema), preparateurController.createPreparateur);

/**
 * @swagger
 * /preparateurs/{id}:
 *   delete:
 *     summary: Supprimer un préparateur (sans expéditions actives)
 *     tags: [Préparateurs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Préparateur supprimé
 *       400:
 *         description: Expéditions en cours
 *       404:
 *         description: Préparateur non trouvé
 */
router.delete('/:id', preparateurController.deletePreparateur);

/**
 * @swagger
 * /preparateurs:
 *   get:
 *     summary: Liste des préparateurs
 *     tags: [Préparateurs]
 *     responses:
 *       200:
 *         description: Succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Preparateur'
 */
router.get('/', preparateurController.getAllPreparateurs);

/**
 * @swagger
 * /preparateurs/{id}:
 *   get:
 *     summary: Détails d'un préparateur
 *     tags: [Préparateurs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Préparateur trouvé
 *       404:
 *         description: Non trouvé
 */
router.get('/:id', preparateurController.getPreparateurById);

export default router;