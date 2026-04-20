import express from 'express';
import * as zoneController from '../controllers/zone.controller.js';
import validate from '../middlewares/validate.middleware.js';
import { createZoneSchema } from '../validations/zone.validation.js';

const router = express.Router();

/**
 * @swagger
 * /zones:
 *   post:
 *     summary: Créer une nouvelle zone
 *     tags: [Zones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Zone'
 *     responses:
 *       201:
 *         description: Zone créée avec succès
 *       400:
 *         description: Données invalides ou code déjà existant
 */
router.post('/', validate(createZoneSchema), zoneController.createZone);

/**
 * @swagger
 * /zones/{id}:
 *   delete:
 *     summary: Supprimer une zone (seulement si elle n'a ni articles ni préparateurs)
 *     tags: [Zones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la zone
 *     responses:
 *       200:
 *         description: Zone supprimée
 *       400:
 *         description: Zone non supprimable (liens existants)
 *       404:
 *         description: Zone non trouvée
 */
router.delete('/:id', zoneController.deleteZone);

/**
 * @swagger
 * /zones:
 *   get:
 *     summary: Récupérer toutes les zones
 *     tags: [Zones]
 *     responses:
 *       200:
 *         description: Liste des zones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Zone'
 */
router.get('/', zoneController.getAllZones);

/**
 * @swagger
 * /zones/{id}:
 *   get:
 *     summary: Récupérer une zone par son ID
 *     tags: [Zones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Détails de la zone
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Zone'
 *       404:
 *         description: Zone non trouvée
 */
router.get('/:id', zoneController.getZoneById);

export default router;