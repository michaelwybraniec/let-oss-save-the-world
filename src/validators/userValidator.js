const Joi = require("joi");

const firstNameSchema = Joi.string().required();
const lastNameSchema = Joi.string().required();
const rolesSchema = Joi.array()
  .items()
  .required();
const emailSchema = Joi.string()
  .required()
  .email();
const passwordSchema = Joi.string()
  .required()
  .min(3)
  .max(30)
  .optional();
const statusSchema = Joi.boolean().required();

const userSchema = Joi.object().keys({
  first_name: firstNameSchema,
  last_name: lastNameSchema,
  roles: rolesSchema,
  email: emailSchema,
  password: passwordSchema,
  status_active: statusSchema
});

module.exports = userSchema;
