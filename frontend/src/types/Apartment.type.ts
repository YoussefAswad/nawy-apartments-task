import { ApartmentDetails } from "./ApartmentDetails.type";
import { ApartmentDetailsCreate } from "./ApartmentDetails.type";
import { CoordinatesCreate } from "./Coordinates.type";
import { z } from "zod";
import { CurrencyCode } from "../enums/CurrencyCode.enum";

export type Apartment = {
  id: number;
  title: string;
  price: number;
  currency: string;
  location: string;
  floor: number;
  area: number;
  bath_rooms: number;
  bed_rooms: number;
  details: ApartmentDetails;
};

export const ApartmentCreate = z.object({
  title: z.string().min(3),
  price: z.coerce.number(),
  currency: z.nativeEnum(CurrencyCode),
  area: z.coerce.number().min(0),
  bed_rooms: z.coerce.number().min(0),
  bath_rooms: z.coerce.number().min(0),
  floor: z.coerce.number().min(0),
  location: z.string().min(3),
  ...ApartmentDetailsCreate.shape,
  // ...CoordinatesCreate.shape,
});
