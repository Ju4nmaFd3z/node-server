import type { Request, Response } from 'express';
import { createClient, listClients, findClientById, updateClient, deleteClient } from './clients.service.js';

export async function createClientCtrl(req: Request, res: Response) {
  try {
    const client = await createClient(req.body);
    res.status(201).json(client);
  } catch (error: any) {
    if (error.code === 'P2002') {
      return res.status(409).json({ message: 'El email ya está en uso' });
    }
    if (error.code === 'P2003') {
      return res.status(400).json({ message: 'El usuario indicado no existe' });
    }
    res.status(500).json({ message: error.message });
  }
}

export async function listClientsCtrl(_req: Request, res: Response) {
  try {
    const clients = await listClients();
    res.json(clients);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export async function getClientCtrl(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'ID inválido' });
    }

    const client = await findClientById(id);
    if (!client) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }

    res.json(client);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export async function updateClientCtrl(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'ID inválido' });
    }

    const client = await updateClient(id, req.body);
    res.json(client);
  } catch (error: any) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }
    if (error.code === 'P2002') {
      return res.status(409).json({ message: 'El email ya está en uso' });
    }
    res.status(500).json({ message: error.message });
  }
}

export async function deleteClientCtrl(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'ID inválido' });
    }

    await deleteClient(id);
    res.status(204).send();
  } catch (error: any) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }
    res.status(500).json({ message: error.message });
  }
}
