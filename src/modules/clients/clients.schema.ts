import { z } from 'zod';

export const createClientSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().max(20, 'El teléfono no puede pasar de 20 caracteres').optional(),
  userId: z.number('userId debe ser un número').int().positive('userId debe ser positivo'),
});

// En el PATCH todo es opcional; phone admite null para borrarlo
export const updateClientSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres').optional(),
  email: z.string().email('Email inválido').optional(),
  phone: z.string().max(20, 'El teléfono no puede pasar de 20 caracteres').nullable().optional(),
});

export type CreateClientInput = z.infer<typeof createClientSchema>;
export type UpdateClientInput = z.infer<typeof updateClientSchema>;
