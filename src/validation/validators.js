import Joi from 'joi'

import { jsonError } from '../utils/system'

class Validator {

  ///////////Lịch sử quét///////////////
 static HistoryScan(req, res, next) {
     const schema = Joi.object().keys({
      che_do_may_quet: Joi.string().required(),
      ID_thiet_bi: Joi.number().min(1).required(),
      ds_vi_tri_quet: Joi.string().min(1).required(),
    })

    const data = { ...req.body }
    const result = Joi.validate(data, schema)
    if (result.error) return res.json(jsonError(result.error.message))

    return next()
  }

  //////////////////////
  static login(req, res, next) {
    const schema = Joi.object().keys({
      user_name: Joi.string().required(),
      password: Joi.string().min(6).required()
    })

    const data = { ...req.body }
    const result = Joi.validate(data, schema)
    if (result.error) return res.json(jsonError(result.error.message))

    return next()
  }

  

  static objectId(req, res, next) {
    const isValid = mongoose.Types.ObjectId.isValid(req.params.id)
    if (!isValid) return res.json(jsonError('ID param invalid'))

    return next()
  }

  static checkId(req, res, next) {
    const schema = Joi.object().keys({
      id: Joi.string().required().regex(/^[0-9a-fA-F]{24}$/)
    })

    const id = { ...req.query.id }

    const result = Joi.validate(id, schema)
    if (result.error) return res.json(jsonError(result.error.message))

    return next()
  }

  static verifyRegister(req, res, next) {
    const schema = Joi.object().keys({
      email: Joi.string().email().required(),
      codeActive: Joi.string().required().length(6)
    })

    const data = { ...req.body }

    const result = Joi.validate(data, schema)
    if (result.error) return res.json(jsonError(result.error.message))

    return next()
  }

  static register(req, res, next) {
    const schema = Joi.object().keys({
      user_name: Joi.string().required().min(3),
      password: Joi.string().min(6).required(),
      display_name: Joi.string().max(100).required(),
      role: Joi.number().min(0).max(1),
      address: Joi.string().max(100).required(),
      actived: Joi.number().integer().min(0).max(1)
 
    })

    const result = Joi.validate(req.body, schema)
    if (result.error) return res.json(jsonError(result.error.message))
    return next()
  }

  static getListWithPaginate(req, res, next) {
    const schema = Joi.object().keys({
      page: Joi.number().required(),
      limit: Joi.number().required()
    })

    const data = { ...req.query }
    const result = Joi.validate(data, schema)
    if (result.error) return res.json(jsonError(result.error.message))

    return next()
  }

  static uploadSingle(req, res, next) {
    const schema = Joi.object().keys({
      name: Joi.string().required()
    })

    const data = { ...req.query }
    const result = Joi.validate(data, schema)
    if (result.error) return res.json(jsonError(result.error.message))

    return next()
  }

  static uploadMultiple(req, res, next) {
    const schema = Joi.object().keys({
      name: Joi.string().required(),
      quality: Joi.string().required()
    })

    const data = { ...req.query }
    const result = Joi.validate(data, schema)
    if (result.error) return res.json(jsonError(result.error.message))

    return next()
  }

  static product(req, res, next) {
    const schema = Joi.object().keys({
      name: Joi.string().required(),
      quantity: Joi.number().required(),
      price: Joi.number().required(),
      merchantId: Joi.string().required()
    })

    const result = Joi.validate(req.body, schema)
    if (result.error) return res.json(jsonError(result.error.message))

    return next()
  }

  static discountCode(req, res, next) {
    const schema = Joi.object().keys({
      code: Joi.string().required(),
      expireDate: Joi.string().required(),
      percent: Joi.number().required()
    })

    const result = Joi.validate(req.body, schema)
    if (result.error) return res.json(jsonError(result.error.message))

    return next()
  }

  static returnProduct(req, res, next) {
    const schema = Joi.object().keys({
      productId: Joi.string().required(),
      orderId: Joi.string().required(),
      quantity: Joi.number()
    })

    const result = Joi.validate(req.body, schema)
    if (result.error) return res.json(jsonError(result.error.message))

    
    return next()
  }

  static merchant(req, res, next) {
    const schema = Joi.object().keys({
      name: Joi.string().required()
    })

    const result = Joi.validate(req.body, schema)
    if (result.error) return res.json(jsonError(result.error.message))

    return next()
  }

  static comment(req, res, next) {
    const schema = Joi.object().keys({
      title: Joi.string().required(),
      content: Joi.string().required(),
      productId: Joi.string().required()
    })

    const result = Joi.validate(req.body, schema)
    if (result.error) return res.json(jsonError(result.error.message))

    return next()
  }

  static order(req, res, next) {
    const schema = Joi.object().keys({
      userId: Joi.string().required(),
      products: Joi.array().required()
    })

    const result = Joi.validate(req.body, schema)
    if (result.error) return res.json(jsonError(result.error.message))

    return next()
  }
}
// module.exports = Validator;

export { Validator }
