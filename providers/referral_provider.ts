import { ApplicationService } from '@adonisjs/core/types'
import ReferralCode from '../src/models/referral_code.js'

export default class RolePermissionProvider {
  constructor(protected app: ApplicationService) {}

  register() {}

  async boot() {
    const router = await this.app.container.make('router')

    router
      .get(
        `${this.app.config.get('referrals.routerPrefix', '')}/referral/:code`,
        async ({ params, response }) => {
          const code = await ReferralCode.findByOrFail('code', params.code)

          code.visits++
          await code.save()

          response.cookie(this.app.config.get('referrals.cookieName'), params.code, {
            maxAge: this.app.config.get('referrals.cookieExpire'),
          })

          response.redirect('/')
        }
      )
      .as('referral.handle')
  }
}
