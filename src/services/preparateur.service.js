import preparateurRepository from '../repositories/preparateur.repository.js';
import zoneRepository from '../repositories/zone.repository.js';
import HttpError from '../exceptions/http-error.exception.js';

class PreparateurService {
  async createPreparateur(data) {
    const existing = await preparateurRepository.findByEmail(data.email);
    if (existing) throw new HttpError(400, 'Email déjà utilisé');

    const zone = await zoneRepository.findById(data.zoneId);
    if (!zone) throw new HttpError(400, 'Zone affectée invalide');

    return preparateurRepository.create(data);
  }

  async deletePreparateur(id) {
    const preparateur = await preparateurRepository.findById(id);
    if (!preparateur) throw new HttpError(404, 'Préparateur non trouvé');

    const hasActive = await preparateurRepository.hasActiveExpeditions(id);
    if (hasActive) {
      throw new HttpError(400, 'Impossible de supprimer un préparateur avec des expéditions PREPAREE ou EXPEDIEE');
    }

    return preparateurRepository.remove(id);
  }

  async getAllPreparateurs() {
    return preparateurRepository.findAll();
  }

  async getPreparateurById(id) {
    const preparateur = await preparateurRepository.findById(id);
    if (!preparateur) throw new HttpError(404, 'Préparateur non trouvé');
    return preparateur;
  }
}

export default new PreparateurService();