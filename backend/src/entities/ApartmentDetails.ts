import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { z } from "zod";
import { Apartment } from "./Apartment";
import parsePhoneNumberFromString from "libphonenumber-js";

export const zPhone = z.string().transform((arg, ctx) => {
  const phone = parsePhoneNumberFromString(arg, {
    // set this to use a default country when the phone number omits country code
    defaultCountry: "EG",

    // set to false to require that the whole string is exactly a phone number,
    // otherwise, it will search for a phone number anywhere within the string
    extract: false,
  });

  // when it's good
  if (phone && phone.isValid()) {
    return phone.format("E.164");
  }

  // when it's not
  ctx.addIssue({
    code: z.ZodIssueCode.custom,
    message: "Invalid phone number",
  });
  return z.NEVER;
});

@Entity()
export class ApartmentDetails {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  contact_person: string;

  @Column({ nullable: true })
  contact_email: string;

  @Column()
  contact_phone: string;

  @Column({ nullable: true })
  description: string;

  @OneToOne(() => Apartment, (apartment) => apartment.details, {
    nullable: false,
  })
  @JoinColumn()
  apartment: Apartment;
}

export const ApartmentDetailsCreate = z.object({
  contact_person: z.string().min(3),
  contact_email: z.string().email().optional(),
  contact_phone: zPhone,
  description: z.string().optional(),
});
