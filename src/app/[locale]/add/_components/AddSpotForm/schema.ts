import { z } from "zod";

const frequencySchema = z.array(z.number().min(0).max(1)).length(3);

export const schema = z.object({
  id: z.string().nonempty(),
  name: z.string().nonempty(),
  address: z.string().nonempty(),
  Jan: z.number().min(0),
  Feb: z.number().min(0),
  Mar: z.number().min(0),
  Apr: z.number().min(0),
  May: z.number().min(0),
  Jun: z.number().min(0),
  Jul: z.number().min(0),
  Aug: z.number().min(0),
  Sep: z.number().min(0),
  Oct: z.number().min(0),
  Nov: z.number().min(0),
  Dec: z.number().min(0),
  birds: z.array(
    z.object({
      id: z.number().nonnegative(),
      name: z.string().nonempty(),
      imageUrl: z.string().nonempty(),
      JanFrequency: frequencySchema,
      FebFrequency: frequencySchema,
      MarFrequency: frequencySchema,
      AprFrequency: frequencySchema,
      MayFrequency: frequencySchema,
      JunFrequency: frequencySchema,
      JulFrequency: frequencySchema,
      AugFrequency: frequencySchema,
      SepFrequency: frequencySchema,
      OctFrequency: frequencySchema,
      NovFrequency: frequencySchema,
      DecFrequency: frequencySchema,
    })
  ),
});

export type Schema = z.infer<typeof schema>;
