import string from '@adonisjs/core/helpers/string'
import ReferralCode from '../models/referral_code.js'
import config from '@adonisjs/core/services/config'

export default class ReferralCodeGenerator {
  static async generate() {
    let code

    do {
      code = string.random(config.get('referral.referralCode.length', 8))
    } while ((await ReferralCode.findBy('code', code)) !== null)

    return code
  }
}
