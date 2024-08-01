import { afterCreate, BaseModel, hasOne } from '@adonisjs/lucid/orm'
import type { HasOne } from '@adonisjs/lucid/types/relations'
import ReferralCode from '../models/referral_code.js'
import { NormalizeConstructor } from '@adonisjs/core/types/helpers'

export function hasReferrals<T extends NormalizeConstructor<typeof BaseModel>>(superclass: T) {
  class ModelWithReferrals extends superclass {
    getModelId(): number {
      throw new Error('Method getModelId not implemented.')
    }

    @hasOne(() => ReferralCode)
    declare referralCode: HasOne<typeof ReferralCode>

    @afterCreate()
    static async createReferralCode(model: InstanceType<typeof ModelWithReferrals>) {
      ReferralCode.create({ userId: model.getModelId() })
    }
  }

  return ModelWithReferrals
}
