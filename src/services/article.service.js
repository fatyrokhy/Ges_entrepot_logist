import articleRepository from '../repositories/article.repository.js';
import zoneRepository from '../repositories/zone.repository.js';
import HttpError from '../exceptions/http-error.exception.js';

class ArticleService {
  async createArticle(data) {
    const existing = await articleRepository.findByReference(data.reference);
    if (existing) throw new HttpError(400, 'Référence article déjà existante');

    const zone = await zoneRepository.findById(data.zoneId);
    if (!zone) throw new HttpError(400, 'Zone de stockage invalide');

    return articleRepository.create(data);
  }

  async deleteArticle(id) {
    const article = await articleRepository.findById(id);
    if (!article) throw new HttpError(404, 'Article non trouvé');

    const hasExpeditions = await articleRepository.hasExpeditions(id);
    if (hasExpeditions) {
      throw new HttpError(400, 'Impossible de supprimer un article ayant des expéditions');
    }

    return articleRepository.remove(id);
  }

  async getAllArticles() {
    return articleRepository.findAll();
  }

  async getArticleById(id) {
    const article = await articleRepository.findById(id);
    if (!article) throw new HttpError(404, 'Article non trouvé');
    return article;
  }
}

export default new ArticleService();