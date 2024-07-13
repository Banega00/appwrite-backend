import { Transform, Type } from "class-transformer";
import { IsNotEmpty, IsDateString, Matches, IsInt, Min, IsString, IsOptional, IsArray } from "class-validator";

export class CreateReservationDto {
    @IsNotEmpty()
    @IsDateString()
    date: string;

    @IsNotEmpty()
    @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
        message: 'time must be in HH:mm format',
    })
    time: string;

    @IsInt()
    @Min(1)
    numberOfGuests: number;

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    specialRequests: string[];
}
