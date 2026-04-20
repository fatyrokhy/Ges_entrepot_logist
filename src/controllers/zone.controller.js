import zoneService from '../services/zone.service.js';
import { success } from '../utils/response.utils.js';

export const createZone = async (req, res, next) => {
  try {
    const zone = await zoneService.createZone(req.body);
    success(res, zone, 201, 'Zone créée avec succès');
  } catch (err) {
    next(err);
  }
};

export const deleteZone = async (req, res, next) => {
  try {
    await zoneService.deleteZone(parseInt(req.params.id));
   success(res, null, 200, 'Zone supprimée');
  } catch (err) {
    next(err);
  }
};

export const getAllZones = async (req, res, next) => {
  try {
    const zones = await zoneService.getAllZones();
    success(res, zones);
  } catch (err) {
    next(err);
  }
};

export const getZoneById = async (req, res, next) => {
  try {
    const zone = await zoneService.getZoneById(parseInt(req.params.id));
    success(res, zone);
  } catch (err) {
    next(err);
  }
};