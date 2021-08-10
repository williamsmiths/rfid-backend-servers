import colors from 'colors'

const errors = {
  // -- system errors
  'SYSTEM_ERROR': { code: 'SYSTEM_ERROR' },
  'ENV_NOT_SET_ERROR': { code: 'ENV_NOT_SET_ERROR' },
  'NOT_IMPLEMENTED_ERROR': { code: 'NOT_IMPLEMENTED_ERROR' },
  'SERVER_SHUTTING_DOWN': { code: 'SERVER_SHUTTING_DOWN' },
  'SERVICE_CHECK_FAILED': { code: 'SERVICE_CHECK_FAILED' },
  'PREBOOT_ERROR': { code: 'PREBOOT_ERROR' },
  'BOOT_ERROR': { code: 'BOOT_ERROR' },
  'PREEXIT_ERROR': { code: 'PREEXIT_ERROR' },
  'EXIT_ERROR': { code: 'EXIT_ERROR' },
  'LISTEN_ERROR': { code: 'LISTEN_ERROR' },
  'SERVICE_BOOT_FAILED': { code: 'SERVICE_BOOT_FAILED' },
  'SEND_MAIL_VERIFY_ERROR': { code: 'SEND_MAIL_VERIFY_ERROR' },
  'CODE_CONFIRM_IN_CORRECT': { code: 'CODE_CONFIRM_IN_CORRECT' },
  'CODE_CONFIRM_NOT_EXIST': { code: 'CODE_CONFIRM_NOT_EXIST' },
  'NOT_AN_OBJECTID': { code: 'NOT_AN_OBJECTID' },
  'NOT_AUTHENTICATED_ERROR': { code: 'NOT_AUTHENTICATED_ERROR' },
  'INVALID_TOKEN': { code: 'INVALID_TOKEN' },
  'TOKEN_EXPIRED': { code: 'TOKEN_EXPIRED' },
  'ACCOUNT_IS_NOT_ACTIVATED':{code:'ACCOUNT_IS_NOT_ACTIVATED'},

  // -- user-defined errors  
  'USERNAME_EXISTED_ERROR': { code: 'USERNAME_EXISTED_ERROR' },
  'DISPLAY_NAME_EXISTED_ERROR': { code: 'DISPLAY_NAME_EXISTED_ERROR' },
  'EMAIL_EXISTED_ERROR': { code: 'EMAIL_EXISTED_ERROR' },
  'HASH_PASSWORD_ERROR': { code: 'HASH_PASSWORD_ERROR' },
  'USER_NOT_FOUND': { code: 'USER_NOT_FOUND' },
  'ORDER_NOT_FOUND': { code: 'ORDER_NOT_FOUND' },
  'ORDER_HAD_DISCOUNT_CODE': { code: 'ORDER_HAD_DISCOUNT_CODE' },

  // --admin-defined errors
  'ADMIN_NOT_FOUND': { code: 'ADMIN_NOT_FOUND' },
  'MERCHANT_EXISTED_ERROR': { code: 'MERCHANT_EXISTED_ERROR' },
  'PRODUCT_EXISTED_ERROR': { code: 'PRODUCT_EXISTED_ERROR' },
  'PRODUCT_NOT_FOUND': { code: 'PRODUCT_NOT_FOUND' },
  'DISCOUNT_CODE_EXISTED_ERROR': { code: 'DISCOUNT_CODE_EXISTED_ERROR' },
  'DISCOUNT_CODE_NOT_FOUND': { code: 'DISCOUNT_CODE_NOT_FOUND' }
}

const jsonSuccess = result => ({ success: true, result })

const jsonError = err => ({ success: false, error: err })

const logger = {
  verbose: (message) => {
    if (getEnv('FULL_LOG') !== 'true') return
    return console.log(colors.gray(`[VERB] ${JSON.stringify(message)}`))
  },
  warn: (message) => {
    if (getEnv('FULL_LOG') !== 'true') return
    return console.log(colors.yellow(`[WARN] ${JSON.stringify(message)}`))
  },
  error: message => console.log(colors.red(`[ERRO] ${JSON.stringify(message)}`)),
  info: message => console.log(`[INFO] ${JSON.stringify(message)}`)
}

const asyncWrap = (fn) => {
  async function asyncifyWrap(req, res, next) {
    try {
      // eslint-disable-next-line
      return await fn.apply(null, arguments)
    } catch (err) {
      next(err)
    }
  }
  return asyncifyWrap
}

export { errors, jsonSuccess, jsonError, logger, asyncWrap }
