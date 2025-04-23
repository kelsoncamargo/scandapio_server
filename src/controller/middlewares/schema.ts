import { Joi } from "celebrate";

export const schema = {
  headers: Joi.object()
    .keys({
      authorization: Joi.string()
        .pattern(/^Bearer\s[\w-]+\.[\w-]+\.[\w-]+$/)
        .required()
        .messages({
          "string.pattern.base": "Authorization header not are default",
          "any.required": "Authorization header is required",
        }),
    })
    .unknown(), // Permite outros headers
};
