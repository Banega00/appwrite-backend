import { User } from '../../../../src/types/custom';
import { Models } from 'node-appwrite';

export class Reservation implements Models.Document {
  datetime: Date;
  date: string;
  time: string;
  numberOfGuests: number;
  specialRequests?: string[];
  userId: User['$id'];

  constructor(obj: { $id?: string; date: string; time: string; numberOfGuests: number; specialRequests?: string[]; userId: User['$id'] }) {
    this.date = obj.date;
    this.time = obj.time;
    this.numberOfGuests = obj.numberOfGuests;
    this.specialRequests = obj.specialRequests;
    this.userId = obj.userId;
    this.$id = obj.$id;

    this.datetime = new Date(`${this.date}T${this.time}:00`);

    if (this.datetime < new Date()) {
      throw new Error('Reservation date and time cannot be in the past');
    }
  }

  $id: string;
  $collectionId: string;
  $databaseId: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: string[];

  toResponseDto() {
    return {
      id: this.$id,
      date: this.date,
      time: this.time,
      numberOfGuests: this.numberOfGuests,
      specialRequests: this.specialRequests,
    };
  }
}
