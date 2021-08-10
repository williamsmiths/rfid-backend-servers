import redis from 'redis'

const client = redis.createClient()

class RedisCommon {
  static setValue(key, value, expire = 3600) {
    client.set(key, value, 'EX', expire)
  }

  static getValue = async key => new Promise((resolve) => {
    client.get(key, (err, data) => {
      if (err) {
        resolve(null)
      } else {
        resolve(data)
      }
    })
  })

  static deleteKey = async key => new Promise((resolve, reject) => {
    client.del(key, (err, result) => {
      if (err) return reject(err)
      resolve(result)
    })
  })
}

export { RedisCommon }
