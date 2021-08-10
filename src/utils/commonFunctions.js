import jwt from 'jsonwebtoken'
import { jsonError, errors } from 'app/utils/system'
import randomstring from 'randomstring'

const generateCode = (length) => {
  const code = randomstring.generate(length)

  return code
}

const generateUserToken = (user) => {
  try {
    return jwt.sign(user, getEnv('JWT_SECRET'), { expiresIn: getEnv('JWT_EXPIRE_SEC') })
  } catch (error) {
    throw error
  }
}

const paginate = async ({ model, condition = {}, pageNo = 1, size = 10, field = '', populate = '', sort = { createdAt: -1 } }) => {
  try {
    const skipPage = size * (pageNo - 1)
    const countDoc = await model.countDocuments(condition)

    const totalPages = Math.ceil(countDoc / size)
    if (totalPages < pageNo) return jsonError(errors.PAGE_CURRENT_NOT_FOUND)

    const list = await model.find(condition).select(field).limit(size).skip(skipPage)
      .sort(sort)
      .populate(populate)

    const result = {
      totalDoc: countDoc,
      totalPages,
      pageCurrent: pageNo,
      limit: size,
      data: list
    }

    return result
  } catch (error) {
    console.log(`TIME: ${new Date()}-- ERROR_GET_LIST: ${error}`)
    return jsonError(errors.SYSTEM_ERROR)
  }
}

export {
  generateUserToken,
  paginate,
  generateCode
}
