import { CheckIn } from 'generated/prisma'

import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { GymsRepository } from '@/repositories/gyms-repository'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordnates'

import { ResourceNotFoundError } from './errors/resource-not-found'

interface CheckInUseCaseRequest {
  userId: string
  gymId: string
  userLatitude: number
  userLongitude: number
}

interface CheckInUseCaseResponse {
  checkIn: CheckIn
}

export class CheckInUseCase {
  constructor(
    private checkInsRepository: CheckInsRepository,
    private gymsRepository: GymsRepository,
  ) {}

  async execute({
    gymId,
    userId,
    userLatitude,
    userLongitude,
  }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const gyms = await this.gymsRepository.findById(gymId)

    if (!gyms) {
      throw new ResourceNotFoundError()
    }

    // calculate distance between user and gym
    const userCoordinate = {
      latitude: userLatitude,
      longitude: userLongitude,
    }
    const gymCoordinate = {
      latitude: gyms.latitude.toNumber(),
      longitude: gyms.longitude.toNumber(),
    }
    const distance = getDistanceBetweenCoordinates(
      userCoordinate,
      gymCoordinate,
    )

    const MAX_DISTANCE_IN_KM = 0.1
    if (distance > MAX_DISTANCE_IN_KM) {
      throw new Error()
    }

    const checkInOnSameDate = await this.checkInsRepository.findByUserIdOnDate(
      userId,
      new Date(),
    )

    if (checkInOnSameDate) {
      throw new Error('Check-in already exists')
    }

    const checkIn = await this.checkInsRepository.create({
      gym_id: gymId,
      user_id: userId,
    })

    return { checkIn }
  }
}
