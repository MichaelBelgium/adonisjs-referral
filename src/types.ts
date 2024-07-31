import { LucidModel } from '@adonisjs/lucid/types/model'

export interface ReferralConfig {
  referralCodeLength: number
  cookieName: string
  cookieExpire: string
  routerPrefix?: string
  tables: {
    referrals: string
    referral_codes: string
  }
  userModel: LucidModel
}
