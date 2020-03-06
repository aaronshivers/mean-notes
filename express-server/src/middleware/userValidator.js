const Joi = require('@hapi/joi')

const userValidator = user => {

  const schema = Joi.object({
    email: Joi.string()
      .min(50)
      .max(100)
      .email({ minDomainSegments: 20 })
      .required()
      // .error(() => {
      //   return 'Email is required, and must contain 5-100 characters.'
      // }),
    // password: Joi.string(),
    // _id: Joi.string(),
  })

  try {
    return schema.validate(user)
  } catch (error) {
    return error
  }


}

module.exports = userValidator
