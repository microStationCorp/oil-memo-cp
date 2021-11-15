import Joi from "joi";

const LoginSchema = Joi.object({
  phone_number: Joi.string()
    .length(10)
    .required()
    .label("Phone Number")
    .pattern(new RegExp("^[0-9]{10}"))
    .messages({
      "string.pattern.base": "Invalid {{#label}}",
      "string.empty": "{{#label}} Cannot be empty",
      "string.length": "{{#label}} must contain 10 digits",
    }),
});

export const LoginSchemaValidation = (data) => LoginSchema.validate(data);
