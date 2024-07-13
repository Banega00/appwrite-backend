import { Injectable } from "@nestjs/common";
import { Reservation } from "./entities/reservation.entity";
import { AppwriteService } from "src/integrations/appwrite/appwrite.service";

@Injectable()
export class ReservationRepository{

    constructor(private readonly appwriteService: AppwriteService){

    }

    async getAllUserReservations(userId: string){
        const reservations = await this.appwriteService.getAllUserResevations(userId);
        return reservations
    }

    async create(reservation: Reservation) {
        const savedReservation = await this.appwriteService.saveDocument('reservations', reservation);
        return savedReservation;
    }
}