import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsNotEmpty, IsDateString, Matches, IsInt, Min, IsString, IsOptional, IsArray } from "class-validator";

export class CreateReservationDto {
    @ApiProperty({ example: '2024-12-31', type: String })
    @IsNotEmpty()
    @IsDateString()
    date: string;

    @ApiProperty({ example: '12:00', type: String })
    @IsNotEmpty()
    @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
        message: 'time must be in HH:mm format',
    })
    time: string;

    @ApiProperty({ example: 2, type: Number })
    @IsInt()
    @Min(1)
    numberOfGuests: number;

    @ApiProperty({ example: ['table inside'], type: Array })
    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    specialRequests: string[];
}
