import { createBaseRepository } from './base.repository.js';

const base = createBaseRepository('expedition');

const expeditionRepository = {
  ...base,
  // méthodes spécifiques si besoin
};

export default expeditionRepository;