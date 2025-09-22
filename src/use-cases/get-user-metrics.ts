import { CheckInsRepository } from '@/repositories/check-ins-repository'

interface GetUserMwtricsUseCaseRequest {
  userId: string
}

interface GetUserMwtricsUseCaseResponse {
  checkInsCount: number
}

export class GetUserMwtricsUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
  }: GetUserMwtricsUseCaseRequest): Promise<GetUserMwtricsUseCaseResponse> {
    const checkInsCount = await this.checkInsRepository.countByUserId(userId)

    return { checkInsCount }
  }
}
