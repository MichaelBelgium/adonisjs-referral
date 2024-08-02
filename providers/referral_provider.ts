import { ApplicationService } from '@adonisjs/core/types'
import ReferralCode from '../src/models/referral_code.js'
import { HttpContext } from '@adonisjs/core/http'

export default class RolePermissionProvider {
  constructor(protected app: ApplicationService) {}

  register() {}

  async boot() {
    const router = await this.app.container.make('router')
    const emitter = await this.app.container.make('emitter')

    router
      .get(
        `${this.app.config.get('referrals.referralLink.prefix', '')}/referral/:code`,
        async ({ params, request, response }: HttpContext) => {
          const redirect = this.app.config.get<string>('referrals.referralLink.redirect', '/')
          const cookieName = this.app.config.get<string>('referrals.cookieName')

          if (request.cookie(cookieName)) {
            return response.redirect(redirect)
          }

          const code = await ReferralCode.findByOrFail('code', params.code)

          code.visits++
          await code.save()

          response.cookie(cookieName, params.code, {
            maxAge: this.app.config.get('referrals.cookieExpire'),
          })

          emitter.emit('referral:visited', code)

          response.redirect(redirect)
        }
      )
      .as('referral.link')
  }
}
