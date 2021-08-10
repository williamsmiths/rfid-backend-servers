import bcrypt from 'bcrypt'
import { errors, jsonError, jsonSuccess, logger } from './system'

const hashPassword = async (password) => {
  const saltResult = await new Promise((resolve) => {
    bcrypt.genSalt(Number(getEnv('SALT_ROUND')), (err, salt) => {
      if (err) {
        logger.error(err)
        return resolve(jsonError(errors.SYSTEM_ERROR))
      }
      return resolve(jsonSuccess(salt))
    })
  })

  if (!saltResult.success) return saltResult

  return new Promise((resolve) => {
    bcrypt.hash(password, saltResult.result, (err, hash) => {
      if (err) {
        logger.error(err)
        return resolve(jsonError(errors.SYSTEM_ERROR))
      }
      return resolve(jsonSuccess({salt:saltResult.result,hash: hash}))
    })
  })
}

const comparePassword = async (password, passwordHash) => new Promise((resolve) => {
  bcrypt.compare(password, passwordHash, (err, result) => {
    if (err) {
      logger.error(err)
      return resolve(jsonError(errors.SYSTEM_ERROR))
    }
    return resolve(jsonSuccess(result))
  })
})

export { hashPassword, comparePassword }
