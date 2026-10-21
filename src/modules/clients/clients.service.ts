import { prisma } from '../../config/db.js';

// Tipos escritos a mano: con exactOptionalPropertyTypes, los de z.infer suelen chocar con los de Prisma
export async function createClient(data: { name: string; email: string; phone?: string; userId: number }) {
  return prisma.client.create({ data });
}

export async function listClients() {
  return prisma.client.findMany({ orderBy: { id: 'asc' } });
}

export async function findClientById(id: number) {
  return prisma.client.findUnique({ where: { id } });
}

export async function updateClient(id: number, data: { name?: string; email?: string; phone?: string | null }) {
  return prisma.client.update({ where: { id }, data });
}

export async function deleteClient(id: number) {
  return prisma.client.delete({ where: { id } });
}
