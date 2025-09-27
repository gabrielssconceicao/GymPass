import { FastifyReply, FastifyRequest } from 'fastify'

type Role = 'ADMIN' | 'MEMBER'

export function verifyUserRole(roleToVerify: Role) {
  return async (req: FastifyRequest, reply: FastifyReply) => {
    const { role } = req.user

    if (role !== roleToVerify) {
      return reply.status(401).send({ message: 'Unauthorized' })
    }
  }
}
