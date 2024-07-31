import { DateTime } from 'luxon'
import { afterCreate, BaseModel, beforeCreate, belongsTo, column } from '@adonisjs/lucid/orm'
import ReferralCodeGenerator from '../helpers/referral_code_generator.js'
import emitter from '@adonisjs/core/services/emitter'
import { ReferralConfig } from '../types.js'
import { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class ReferralCode extends BaseModel {
  static config: ReferralConfig

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @belongsTo(() => ReferralCode.config.userModel)
  declare user: BelongsTo<typeof ReferralCode.config.userModel>

  @column()
  declare code: string

  @column()
  declare visits: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @beforeCreate()
  static async createReferralCode(referralCode: ReferralCode) {
    referralCode.code = await ReferralCodeGenerator.generate()
  }

  @afterCreate()
  static async emitCodeCreated(referralCode: ReferralCode) {
    emitter.emit('referral::code_created', referralCode)
  }
}
