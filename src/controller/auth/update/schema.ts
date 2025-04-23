import { AccountRole } from "@prisma/client";
import { Segments, Joi } from "celebrate";

export const update = {
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().uuid().required(),
  }),
  [Segments.BODY]: Joi.object()
    .keys({
      fullName: Joi.string().trim().min(3).max(30),
      email: Joi.string().trim().email(),
      phone: Joi.string().trim().pattern(/^\d{13}$/),
      password: Joi.string().trim().min(6).max(18),
      role: Joi.string().trim().valid(...Object.values(AccountRole)),
    })
    .min(1)
};