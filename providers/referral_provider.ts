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
        `${this.app.config.get('referrals.routerPrefix', '')}/referral/:code`,
        async ({ params, response }: HttpContext) => {
          const code = await ReferralCode.findByOrFail('code', params.code)

          code.visits++
          await code.save()

          response.cookie(this.app.config.get('referrals.cookieName'), params.code, {
            maxAge: this.app.config.get('referrals.cookieExpire'),
          })

          emitter.emit('referral:visited', code)

          response.redirect('/')
        }
      )
      .as('referral.handle')
  }
}
