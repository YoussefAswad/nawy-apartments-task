import { z } from "zod";
import parsePhoneNumberFromString from "libphonenumber-js";

export type ApartmentDetails = {
  id: number;
  description: string | null;
  contact_person: string;
  contact_email: string | null;
  contact_phone: string;
};

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

export const ApartmentDetailsCreate = z.object({
  contact_person: z.string().min(3),
  contact_email: z.string().email().optional(),
  contact_phone: zPhone,
  description: z.string().optional(),
});
