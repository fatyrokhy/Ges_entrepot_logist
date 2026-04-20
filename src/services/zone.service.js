import zoneRepository from '../repositories/zone.repository.js';
import HttpError from '../exceptions/http-error.exception.js';
import prisma from '../config/prisma.js';

class ZoneService {

  async createZone(data) {
    const existing = await zoneRepository.findByCode(data.code);
    if (existing) throw new HttpError(400, 'Code zone déjà existant');

    const existingLibelle = await prisma.zone.findUnique({ where: { libelle: data.libelle } });
  if (existingLibelle) throw new HttpError(400, 'Ce libellé est déjà utilisé par une autre zone');

    return zoneRepository.create(data);
  }

  async deleteZone(id) {
    const zone = await zoneRepository.findById(id);
    if (!zone) throw new HttpError(404, 'Zone non trouvée');

    const hasArticles = await zoneRepository.hasRelatedArticles(id);
    const hasPreparateurs = await zoneRepository.hasRelatedPreparateurs(id);
    if (hasArticles || hasPreparateurs) {
      throw new HttpError(400, 'Impossible de supprimer une zone contenant des articles ou préparateurs');
    }

    return zoneRepository.remove(id);
  }

  async getAllZones() {
    return zoneRepository.findAll();
  }

  async getZoneById(id) {
    const zone = await zoneRepository.findById(id);
    if (!zone) throw new HttpError(404, 'Zone non trouvée');
    return zone;
  }
}

export default new ZoneService();