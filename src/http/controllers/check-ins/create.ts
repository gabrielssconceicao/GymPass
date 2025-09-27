import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeChecInkUseCase } from '@/use-cases/factories/make-check-in-use-case'
export async function create(req: FastifyRequest, rep: FastifyReply) {
  const createCheckInParamsSchema = z.object({
    gymId: z.uuid(),
  })
  const createCheckInBodySchema = z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { latitude, longitude } = createCheckInBodySchema.parse(req.body)

  const { gymId } = createCheckInParamsSchema.parse(req.params)

  const createGymUseCase = makeChecInkUseCase()
  await createGymUseCase.execute({
    gymId,
    userId: req.user.sub,
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return rep.status(201).send()
}
