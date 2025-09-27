import { FastifyReply, FastifyRequest } from 'fastify'

import { makeGetUserProfileUseCase } from '@/use-cases/factories/make-get-user-profile-use-case'

export async function profile(req: FastifyRequest, rep: FastifyReply) {
  // await req.jwtVerify()

  const getUserProfile = makeGetUserProfileUseCase()

  const { user } = await getUserProfile.execute({
    userId: req.user.sub,
  })

  return rep.status(200).send({
    user: {
      ...user,
      password_hash: undefined,
    },
  })
}
