import Joi from "joi";

const CoachStateSchema = Joi.object({
  cNum: Joi.string()
    .label("coach number")
    .min(5)
    .max(6)
    .required()
    .pattern(new RegExp(`^[0-9]{5,6}$`))
    .messages({
      "string.min": "{{#label}} must contain minimum 5 characters",
      "string.max": "{{#label}} must contain maximum 6 characters",
      "string.empty": "{{#label}} Cannot be empty",
    }),
  cType: Joi.string()
    .label("coach type")
    .required()
    .messages({ "string.empty": "{{#label}} Cannot be empty" }),
  cState: Joi.string()
    .required()
    .label("State")
    .messages({ "string.empty": "Please select a {{#label}}" }),
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
  password: Joi.string()
    .required()
    .min(8)
    .max(20)
    // .pattern(new RegExp("^[a-zA-z]{8,20}$"))
    .label("Password")
    .messages({
      "string.empty": "{{#label}} Cannot be empty",
      "string.pattern.base": "Invalid {{#label}}",
      "string.min": "{{#label}} must contain minimum 8 characters",
      "string.max": "{{#label}} must contain maximum 20 characters",
    }),
});

// export const LoginSchemaValidation = (data) => LoginSchema.validate(data);
export const RegisterSchemaValidation = (data) => RegisterSchema.validate(data);
export const CoachStateSchemaValidation = (data) =>
  CoachStateSchema.validate(data);
