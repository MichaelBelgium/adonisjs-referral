import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import ReferralCode from './referral_code.js'
import config from '@adonisjs/core/services/config'
import { LucidModel } from '@adonisjs/lucid/types/model'

export default class Referral extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare referralCodeId: number

  @column()
  declare referredUserId: number

  @column({
    consume: (value) => JSON.parse(value),
    prepare: (value) => JSON.stringify(value),
  })
  declare metaData: object

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @belongsTo(() => ReferralCode)
  declare referralCode: BelongsTo<typeof ReferralCode>

  @belongsTo(() => config.get<LucidModel>('referrals.userModel'), { foreignKey: 'referredUserId' })
  declare referredUser: BelongsTo<LucidModel>
}
