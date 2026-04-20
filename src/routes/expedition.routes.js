import express from 'express';
import * as expeditionController from '../controllers/expedition.controller.js';
import validate from '../middlewares/validate.middleware.js';
import { createExpeditionSchema } from '../validations/expedition.validation.js';

const router = express.Router();

/**
 * @swagger
 * /expeditions:
 *   post:
 *     summary: Créer une expédition (décrémente le stock)
 *     tags: [Expéditions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Expedition'
 *     responses:
 *       201:
 *         description: Expédition créée
 *       400:
 *         description: Stock insuffisant, dates invalides, etc.
 */
router.post('/', validate(createExpeditionSchema), expeditionController.createExpedition);

/**
 * @swagger
 * /expeditions:
 *   get:
 *     summary: Liste toutes les expéditions
 *     tags: [Expéditions]
 *     responses:
 *       200:
 *         description: Succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Expedition'
 */
router.get('/', expeditionController.getAllExpeditions);

/**
 * @swagger
 * /expeditions/{id}:
 *   get:
 *     summary: Détails d'une expédition
 *     tags: [Expéditions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Expédition trouvée
 *       404:
 *         description: Non trouvée
 */
router.get('/:id', expeditionController.getExpeditionById);

export default router;