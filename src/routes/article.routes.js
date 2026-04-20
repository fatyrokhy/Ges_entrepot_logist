import express from 'express';
import * as articleController from '../controllers/article.controller.js';
import validate from '../middlewares/validate.middleware.js';
import { createArticleSchema } from '../validations/article.validation.js';

const router = express.Router();

/**
 * @swagger
 * /articles:
 *   post:
 *     summary: Créer un nouvel article
 *     tags: [Articles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Article'
 *     responses:
 *       201:
 *         description: Article créé
 *       400:
 *         description: Données invalides ou référence déjà existante
 */
router.post('/', validate(createArticleSchema), articleController.createArticle);

/**
 * @swagger
 * /articles/{id}:
 *   delete:
 *     summary: Supprimer un article (s'il n'a pas d'expéditions)
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Article supprimé
 *       400:
 *         description: Article a des expéditions
 *       404:
 *         description: Article non trouvé
 */
router.delete('/:id', articleController.deleteArticle);

/**
 * @swagger
 * /articles:
 *   get:
 *     summary: Liste tous les articles
 *     tags: [Articles]
 *     responses:
 *       200:
 *         description: Succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Article'
 */
router.get('/', articleController.getAllArticles);

/**
 * @swagger
 * /articles/{id}:
 *   get:
 *     summary: Récupérer un article par son ID
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Détails de l'article
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Article'
 *       404:
 *         description: Article non trouvé
 */
router.get('/:id', articleController.getArticleById);

export default router;