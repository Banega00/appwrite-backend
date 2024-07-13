import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationRepository } from './reservation.repository';
import { Reservation } from './entities/reservation.entity';

@Injectable()
export class ReservationService {
  
  constructor(private readonly reservationRepository: ReservationRepository) {

  }

  getAllUserReservations(userId: string) {
    return this.reservationRepository.getAllUserReservations(userId);
  }

  create(userId: string, createReservationDto: CreateReservationDto) {
    const reservation = new Reservation({
      ...createReservationDto,
      userId
    });

    return this.reservationRepository.create(reservation);
  }
}
