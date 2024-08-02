import { afterCreate, BaseModel, hasOne } from '@adonisjs/lucid/orm'
import type { HasOne } from '@adonisjs/lucid/types/relations'
import ReferralCode from '../models/referral_code.js'
import { NormalizeConstructor } from '@adonisjs/core/types/helpers'
import config from '@adonisjs/core/services/config'

export function hasReferrals<T extends NormalizeConstructor<typeof BaseModel>>(superclass: T) {
  class ModelWithReferrals extends superclass {
    getModelId(): number {
      throw new Error('Method getModelId not implemented.')
    }

    @hasOne(() => ReferralCode, { foreignKey: 'userId' })
    declare referralCode: HasOne<typeof ReferralCode>

    @afterCreate()
    static async createReferralCode(model: InstanceType<typeof ModelWithReferrals>) {
      if (config.get<boolean>('referrals.referralCode.autoCreate', true)) {
        ReferralCode.create({ userId: model.getModelId() })
      }
    }
  }

  return ModelWithReferrals
}
