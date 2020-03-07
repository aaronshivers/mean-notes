const Joi = require('@hapi/joi')

const userValidator = async user => {
  const regex = /((?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)).{8,100}/

  const schema = Joi.object({
    email:
      Joi
        .string()
        .min(20)
        .max(100)
        .email({ minDomainSegments: 2 }),
    password:
      Joi
        .string()
        .regex(regex)
        .required()
  })

  return schema.validate(user)
}

module.exports = userValidator
