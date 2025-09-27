import 'dotenv/config'

import { execSync } from 'node:child_process'
import { randomUUID } from 'node:crypto'

import { PrismaClient } from 'generated/prisma'
import type { Environment } from 'vitest/environments'

let prisma: PrismaClient

// it's a good idea to use a different schema for each test
function generateDatabaseUrl(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('Please provide a DATABASE_URL environment variable.')
  }

  const url = new URL(process.env.DATABASE_URL)

  url.searchParams.set('schema', schema)

  return url.toString()
}

export default <Environment>{
  name: 'prisma',
  transformMode: 'ssr',

  async setup() {
    // custom setup
    const schema = randomUUID()
    const databaseUrl = generateDatabaseUrl(schema)

    // it'll set the DATABASE_URL environment variable for each test
    process.env.DATABASE_URL = databaseUrl

    // run migrations
    execSync('npx prisma db push', {
      stdio: 'inherit',
    })
    prisma = new PrismaClient()

    return {
      async teardown() {
        // clean up
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE`,
        )
        await prisma.$disconnect()
      },
    }
  },
}
