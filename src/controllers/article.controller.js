import articleService from '../services/article.service.js';
import { success } from '../utils/response.utils.js';

export const createArticle = async (req, res, next) => {
  try {
    const article = await articleService.createArticle(req.body);
    success(res, article, 201, 'Article créé avec succès');
  } catch (err) {
    next(err);
  }
};

export const deleteArticle = async (req, res, next) => {
  try {
    await articleService.deleteArticle(parseInt(req.params.id));
    success(res, null, 200, 'Article supprimé');
  } catch (err) {
    next(err);
  }
};

export const getAllArticles = async (req, res, next) => {
  try {
    const articles = await articleService.getAllArticles();
    success(res, articles);
  } catch (err) {
    next(err);
  }
};

export const getArticleById = async (req, res, next) => {
  try {
    const article = await articleService.getArticleById(parseInt(req.params.id));
    success(res, article);
  } catch (err) {
    next(err);
  }
};