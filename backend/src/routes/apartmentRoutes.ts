import { Router, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Apartment, ApartmentCreate } from "../entities/Apartment";
import { validateData } from "../middleware";
import { ApartmentDetails, zPhone } from "../entities/ApartmentDetails";
import { z } from "zod";

const router = Router();

// List apartments
router.get("/apartments", async (req: Request, res: Response) => {
  const apartments = await AppDataSource.getRepository(Apartment).find({});
  console.log(apartments);
  res.json(apartments);
});

// Get apartment details
router.get("/apartments/:id", async (req: Request, res: Response) => {
  const apartment = await AppDataSource.getRepository(Apartment).findOne({
    where: { id: parseInt(req.params.id) },
    relations: ["details"],
  });
  if (apartment) {
    res.json(apartment);
  } else {
    res.status(404).json({ message: "Apartment not found" });
  }
});

// Add an apartment
router.post(
  "/apartments",
  validateData(ApartmentCreate),
  async (req: Request, res: Response) => {
    const {
      title,
      price,
      currency,
      floor,
      bath_rooms,
      bed_rooms,
      area,
      // latitude,
      // longitude,
      contact_person,
      contact_email,
      contact_phone,
      location,
      description,
    }: z.infer<typeof ApartmentCreate> = req.body;

    // Create the apartment
    const apartment = new Apartment();
    apartment.title = title;
    apartment.price = price;
    apartment.currency = currency;
    apartment.floor = floor;
    apartment.bath_rooms = bath_rooms;
    apartment.bed_rooms = bed_rooms;
    apartment.area = area;
    apartment.location = location;

    // Create the details
    const details = new ApartmentDetails();
    if (description) {
      details.description = description;
    }
    details.contact_person = contact_person;
    if (contact_email) {
      details.contact_email = contact_email;
    }
    details.contact_phone = zPhone.parse(contact_phone);
    details.apartment = apartment;

    // Create the coordinates
    // const coordinates = new Coordinates();
    // coordinates.latitude = latitude;
    // coordinates.longitude = longitude;
    // coordinates.apartment = apartment;
    //
    // Save the apartment
    await AppDataSource.getRepository(Apartment).save(apartment);
    await AppDataSource.getRepository(ApartmentDetails).save(details);
    // await AppDataSource.getRepository(Coordinates).save(coordinates);

    // const finalApartment = await AppDataSource.getRepository(Apartment).findOne(
    //   {
    //     where: { id: apartment.id },
    //     relations: ["details", "location"],
    //   },
    // );

    res.status(201).json(apartment);
  },
);

export default router;
