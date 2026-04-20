import preparateurService from '../services/preparateur.service.js';
import { success } from '../utils/response.utils.js';

export const createPreparateur = async (req, res, next) => {
  try {
    const preparateur = await preparateurService.createPreparateur(req.body);
    success(res, preparateur, 201, 'Préparateur créé avec succès');
  } catch (err) {
    next(err);
  }
};

export const deletePreparateur = async (req, res, next) => {
  try {
    await preparateurService.deletePreparateur(parseInt(req.params.id));
    success(res, null, 200, 'Préparateur supprimé');
  } catch (err) {
    next(err);
  }
};

export const getAllPreparateurs = async (req, res, next) => {
  try {
    const preparateurs = await preparateurService.getAllPreparateurs();
    success(res, preparateurs);
  } catch (err) {
    next(err);
  }
};

export const getPreparateurById = async (req, res, next) => {
  try {
    const preparateur = await preparateurService.getPreparateurById(parseInt(req.params.id));
    success(res, preparateur);
  } catch (err) {
    next(err);
  }
};