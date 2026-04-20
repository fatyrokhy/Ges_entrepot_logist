import prisma from '../config/prisma.js';
import { createBaseRepository } from './base.repository.js';

const base = createBaseRepository('preparateur');

const preparateurRepository = {
  ...base,

  async findByEmail(email) {
    return prisma.preparateur.findUnique({ where: { email } });
  },

  async hasActiveExpeditions(preparateurId) {
    const count = await prisma.expedition.count({
      where: {
        preparateurId: Number(preparateurId),
        statut: { in: ['PREPAREE', 'EXPEDIEE'] },
      },
    });
    return count > 0;
  },
};

export default preparateurRepository;