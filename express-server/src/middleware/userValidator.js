const Joi = require('@hapi/joi')

const userValidator = async user => {

  const schema = Joi.object({
    email:
      Joi
        .string()
        .min(20)
        .max(100)
        .email({ minDomainSegments: 2 }),
    password: Joi.string()
  })

  return schema.validate(user)
}

module.exports = userValidator
