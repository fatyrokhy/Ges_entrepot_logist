import prisma from '../config/prisma.js';
import { createBaseRepository } from './base.repository.js';

const base = createBaseRepository('zone');

const zoneRepository = {
  ...base,

  async findByCode(code) {
    return prisma.zone.findUnique({ where: { code } });
  },

  async hasRelatedArticles(zoneId) {
    const count = await prisma.article.count({ where: { zoneId: Number(zoneId) } });
    return count > 0;
  },

  async hasRelatedPreparateurs(zoneId) {
    const count = await prisma.preparateur.count({ where: { zoneId: Number(zoneId) } });
    return count > 0;
  },
};

export default zoneRepository;