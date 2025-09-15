import fastify from 'fastify'
import { PrismaClient } from 'generated/prisma'
export const app = fastify()

const prisma = new PrismaClient()
prisma.user.create({
  data: {
    name: 'John Doe',
    email: '5tH5w@example.com',
  },
})
