import { Controller, Get, Post, Body, Req } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { Request } from 'express';
import { SessionGuard } from '../../../src/shared/guards/session.guard';
import { ApiOperation, ApiResponse, ApiCookieAuth } from '@nestjs/swagger';
import { CustomLoggingService } from '../../../src/shared/logger/logger.service';
import { Reservation } from './entities/reservation.entity';

@Controller()
export class ReservationController {
  constructor(
    private readonly reservationService: ReservationService,
    private readonly logger: CustomLoggingService,
  ) {}

  @ApiOperation({ summary: 'Create a reservation', description: 'Create a reservation on behalf current user session' })
  @ApiResponse({ status: 201, description: 'Successfully created reservation' })
  @ApiResponse({ status: 400, description: 'Invalid payload' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiCookieAuth('auth_token')
  @SessionGuard({ onlyRegisteredUser: true })
  @Post('/reservation')
  async create(@Req() request: Request, @Body() createReservationDto: CreateReservationDto) {
    const userId = request.user.$id;
    const reservation = await this.reservationService.create(userId, createReservationDto);

    this.logger.log('Successfully created reservation ✅');

    return {
      status: 201,
      message: 'Successfully created reservation',
      reservation: { id: reservation.$id, time: reservation.time, date: reservation.date, specialRequests: reservation.specialRequests },
    };
  }

  @ApiOperation({ summary: 'Get all reservations of a user', description: 'Get all reservations of a user from its session' })
  @ApiResponse({ status: 200, description: 'Users reservations' })
  @ApiResponse({ status: 400, description: 'Invalid payload' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiCookieAuth('auth_token')
  @SessionGuard({ onlyRegisteredUser: true })
  @Get('/reservations')
  async getAllUsersReservations(@Req() request: Request) {
    const userId = request.user.$id;
    const reservations = await this.reservationService.getAllUserReservations(userId);
    return reservations.map((reservation) => new Reservation(reservation).toResponseDto());
  }
}
