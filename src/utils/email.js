import nodemailer from 'nodemailer'
import fs from 'fs'

require.extensions['.html'] = (module, filename) => {
  module.exports = fs.readFileSync(filename, 'utf8')
}

let emailRegister = require('./registerEmail.html')

const emailTemple = emailRegister

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'bapsystemhue',
    pass: 'Bap@2018'
  }
})

class SendEmail {
  static register(receiverEmail, codeToActivate) {
    try {
      emailRegister = emailRegister.replace('<%code>', codeToActivate)

      const messageRegister = {
        from: 'bapsystemhue@gmail.com',
        to: receiverEmail,
        subject: 'Confirm account',
        text: '',
        html: emailRegister
      }

      transporter.sendMail(messageRegister, error => error && false)

      emailRegister = emailTemple

      return true
    } catch (error) {
      return false
    }
  }
}

export { SendEmail }
