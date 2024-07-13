import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Session } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { Request } from 'express';
import { SessionGuard } from 'src/shared/guards/session.guard';

@Controller()
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @SessionGuard({onlyRegisteredUser: true})
  @Post('/reservation')
  create(@Req() request: Request, @Body() createReservationDto: CreateReservationDto) {
    const userId = request.user.$id;
    return this.reservationService.create(userId, createReservationDto);
  }

  @SessionGuard({onlyRegisteredUser: true})
  @Get('/reservations')
  getAllUsersReservations(@Req() request: Request) {
    const userId = request.user.$id;
    return this.reservationService.getAllUserReservations(userId);
  }
}
