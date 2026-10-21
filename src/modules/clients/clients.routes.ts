import { Router } from 'express';
import { validate } from '../../middleware/validate.js';
import { createClientSchema, updateClientSchema } from './clients.schema.js';
import {
  createClientCtrl,
  listClientsCtrl,
  getClientCtrl,
  updateClientCtrl,
  deleteClientCtrl,
} from './clients.controller.js';

const router = Router();

router.get('/', listClientsCtrl);
router.get('/:id', getClientCtrl);
router.post('/', validate(createClientSchema), createClientCtrl);
router.patch('/:id', validate(updateClientSchema), updateClientCtrl);
router.delete('/:id', deleteClientCtrl);

export default router;
