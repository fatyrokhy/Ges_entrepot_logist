import expeditionRepository from '../repositories/expedition.repository.js';
import articleRepository from '../repositories/article.repository.js';
import preparateurRepository from '../repositories/preparateur.repository.js';
import HttpError from '../exceptions/http-error.exception.js';

class ExpeditionService {
  async createExpedition(data) {
    const { preparateurId, articleId, quantite, dateExpedition, adresseLivraison } = data;

    const preparateur = await preparateurRepository.findById(preparateurId);
    if (!preparateur) throw new HttpError(400, 'Préparateur inexistant');

    const article = await articleRepository.findById(articleId);
    if (!article) throw new HttpError(400, 'Article inexistant');

    if (article.qteStock < quantite) {
      throw new HttpError(400, `Stock insuffisant. Disponible: ${article.qteStock}`);
    }

    // Décrémenter le stock
    await articleRepository.decrementStock(articleId, quantite);

    // Créer l'expédition avec statut = PREPAREE (géré par défaut dans le modèle Prisma)
    const expedition = await expeditionRepository.create({
      preparateurId,
      articleId,
      quantite,
      dateExpedition: new Date(dateExpedition),
      adresseLivraison,
      statut: 'PREPAREE', // ou laisser le default dans Prisma
    });

    return expedition;
  }

  async getAllExpeditions() {
    return expeditionRepository.findAll();
  }

  async getExpeditionById(id) {
    const expedition = await expeditionRepository.findById(id);
    if (!expedition) throw new HttpError(404, 'Expédition non trouvée');
    return expedition;
  }
}

export default new ExpeditionService();