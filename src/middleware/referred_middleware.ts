import type { HttpContext } from '@adonisjs/core/http'
import config from '@adonisjs/core/services/config'
import type { NextFn } from '@adonisjs/core/types/http'

export default class ReferredMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const referralCode = ctx.request.cookie(config.get('referrals.cookieName'))

    if (!referralCode) {
      return ctx.response.unauthorized('You have not been referred.')
    }

    await next()
  }
}
