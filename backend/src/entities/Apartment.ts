import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { ApartmentDetails, ApartmentDetailsCreate } from "./ApartmentDetails";
import { z } from "zod";
import { CurrencyCode } from "../enums/CurrencyCode.enum";

@Entity()
export class Apartment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  price: number;

  @Column({ type: "enum", enum: CurrencyCode, default: CurrencyCode.EGP })
  currency: string;

  @Column("integer")
  area: number;

  @Column("integer")
  bed_rooms: number;

  @Column("integer")
  bath_rooms: number;

  @Column("integer")
  floor: number;

  @Column()
  location: string;

  @OneToOne(() => ApartmentDetails, (details) => details.apartment) // specify inverse side as a second parameter
  details: ApartmentDetails;

  // @OneToOne(() => Coordinates, (coordinates) => coordinates.apartment) // specify inverse side as a second parameter
  // coordinates: Coordinates;
}

export const ApartmentCreate = z.object({
  title: z.string().min(3),
  price: z.number(),
  currency: z.nativeEnum(CurrencyCode),
  area: z.number().min(0),
  bed_rooms: z.number().min(0),
  bath_rooms: z.number().min(0),
  floor: z.number().min(0),
  location: z.string(),
  ...ApartmentDetailsCreate.shape,
  // ...CoordinatesCreate.shape,
});
