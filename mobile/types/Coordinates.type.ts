import { z } from "zod";

type Coordinates = {
  latitude: number;
  longitude: number;
}

export const CoordinatesCreate = z.object({
  latitude: z.coerce.number().min(-90).max(90),
  longitude: z.coerce.number().min(-180).max(180),
});

