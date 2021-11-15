import Joi from "joi";

const LoginSchema = Joi.object({
  empId: Joi.string()
    .length(11)
    .required()
    .label("Employee Id")
    .pattern(new RegExp("^[0-9]{11}"))
    .messages({
      "string.pattern.base": "Invalid {{#label}}",
      "string.empty": "{{#label}} Cannot be empty",
      "string.length": "{{#label}} must contain 11 digits",
    }),
});

export const LoginSchemaValidation = (data) => LoginSchema.validate(data);
