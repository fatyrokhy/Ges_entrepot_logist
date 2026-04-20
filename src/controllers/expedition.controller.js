import expeditionService from '../services/expedition.service.js';
import { success } from '../utils/response.utils.js';

export const createExpedition = async (req, res, next) => {
  try {
    const expedition = await expeditionService.createExpedition(req.body);
    success(res, expedition, 201, 'Expédition créée (statut PREPAREE)');
  } catch (err) {
    next(err);
  }
};

export const getAllExpeditions = async (req, res, next) => {
  try {
    const expeditions = await expeditionService.getAllExpeditions();
    success(res, expeditions);
  } catch (err) {
    next(err);
  }
};

export const getExpeditionById = async (req, res, next) => {
  try {
    const expedition = await expeditionService.getExpeditionById(parseInt(req.params.id));
    success(res, expedition);
  } catch (err) {
    next(err);
  }
};