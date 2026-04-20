import prisma from '../config/prisma.js';
import { createBaseRepository } from './base.repository.js';

const base = createBaseRepository('article');

const articleRepository = {
  ...base,

  async findByReference(reference) {
    return prisma.article.findUnique({ where: { reference } });
  },

  async decrementStock(articleId, quantite) {
    return prisma.article.update({
      where: { id: Number(articleId) },
      data: { qteStock: { decrement: quantite } },
    });
  },

  async hasExpeditions(articleId) {
    const count = await prisma.expedition.count({
      where: { articleId: Number(articleId) },
    });
    return count > 0;
  },
};

export default articleRepository;