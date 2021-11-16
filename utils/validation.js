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

const RegisterSchema = Joi.object({
  name: Joi.array().items(
    Joi.string()
      .min(3)
      .max(15)
      .pattern(new RegExp("^[a-zA-z]{3,15}$"))
      .required()
      .label("Name")
      .messages({
        "string.pattern.base": "Invalid {{#label}}",
        "string.min": "{{#label}} must contain minimum 3 characters",
        "string.max": "{{#label}} must contain maximum 15 characters",
        "string.empty": "{{#label}} Cannot be empty",
        "string.trim": "{{#label}} has an extra whitespace before or after",
      })
  ),
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
  des: Joi.string()
    .required()
    .label("Designation")
    .messages({ "string.empty": "Please select a {{#label}}" }),
});

export const LoginSchemaValidation = (data) => LoginSchema.validate(data);
export const RegisterSchemaValidation = (data) => RegisterSchema.validate(data);
