import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate-use-case'

export async function authenticate(req: FastifyRequest, rep: FastifyReply) {
  const authenticateBodySchema = z.object({
    email: z.email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(req.body)

  try {
    const authenticateUseCase = makeAuthenticateUseCase()
    const { user } = await authenticateUseCase.execute({
      email,
      password,
    })

    const token = await rep.jwtSign(
      {
        role: user.role,
      },
      {
        sign: {
          sub: user.id,
        },
      },
    )
    const refreshToken = await rep.jwtSign(
      {
        role: user.role,
      },
      {
        sign: {
          sub: user.id,
          expiresIn: '7d',
        },
      },
    )

    return rep
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true, // encripted by https
        sameSite: true, // cookie is only accessible on the same site
        httpOnly: true, // cookie is only accessible by the server
      })
      .status(200)
      .send({ token })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return rep.status(400).send({ message: err.message })
    }
    throw err
  }
}
