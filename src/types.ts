import { LucidModel } from '@adonisjs/lucid/types/model'
import ReferralCode from './models/referral_code.js'

export interface ReferralConfig {
  referralCode: {
    length?: number
    autoCreate?: boolean
  }
  cookieName: string
  cookieExpire: string
  referralLink: {
    prefix?: string
    redirect?: string
  }
  tables: {
    referrals: string
    referral_codes: string
  }
  userModel: LucidModel
}

declare module '@adonisjs/core/types' {
  interface EventsList {
    'referral:visited': ReferralCode
    'referral::code_created': ReferralCode
  }
}
