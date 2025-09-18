import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'

import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let email: string
let password: string
let name: string

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    email = 'johndoe@example.com'
    password = '123456'
    name = 'John Doe'
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })

  it('should be able to authenticate', async () => {
    await usersRepository.create({
      name,
      email,
      password_hash: await hash(password, 6),
    })

    const { user } = await sut.execute({
      email,
      password,
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email,
        password,
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
  it('should not be able to authenticate with wrong password', async () => {
    await usersRepository.create({
      name,
      email,
      password_hash: await hash(password, 6),
    })

    await expect(() =>
      sut.execute({
        email,
        password: '123455',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
