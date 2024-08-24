# AdonisJS referrals

> A referral system for AdonisJS projects

This is a simple package that handles referrals on the back-end.

## Installation

Execute the following in the root of your adonisjs project:
```
node ace add @michaelbelgium/adonisjs-referral
```

This will:

* create a config file `config/referrals.ts`
* add a migration for 2 tables in the migration folder
* add the `referral_provider` to providers
* regsiter  `referred_middelware` as named middleware in your project
* add the `referral.link` route (`/referral/:code`)

Next is to migrate the 2 tables:
```
node ace migration:run
```

This will add table `referral_codes` and `referrals`

## Configuration

The configuration file has some options that can be edited. Each option has a comment in case you don't know what it does.

See [the stub file](https://github.com/MichaelBelgium/adonisjs-referral/blob/main/stubs/configs/referrals.stub) or the `config/referrals.ts` file after adding the package.

Before you're starting with referrals, make sure the configuration is absolutely correct.

## hasReferrals mixin

The LucidModel you've set in the `userModel` setting must have the `hasReferrals` mixin added.

For example if you have the `User` model set:
```TS
import { compose } from '@adonisjs/core/helpers'
import { hasReferrals } from '@michaelbelgium/adonisjs-referral'

export default class User extends compose(BaseModel, hasReferrals) {
  //...
}
```

This will add an `afterCreate` hook and a relationship to the model:

```TS
@hasOne(() => ReferralCode, { foreignKey: 'userId' })
declare referralCode: HasOne<typeof ReferralCode>

@afterCreate()
static async createReferralCode(model: ModelWithReferrals) {
  if (config.get<boolean>('referrals.referralCode.autoCreate', true)) {
    model.related('referralCode').create({})
  }
}
```

## Referrals vs referral codes

The package does **not** know when you want to assign a user (the referee) to the user who shared the referral link (the referrer). It's *your decision* as it could be after registering, after paying a subscription, when ever.

So while the package handles saving and creating of referral codes, you must add and assign referrals yourself. 

This is why, also for flexiblity, the `ReferralCode` and `Referral` model from the package can be used.

## Events

The package provides 2 events [you can listen to](https://docs.adonisjs.com/guides/digging-deeper/emitter).

* `referral:code_created`: emitted when a referral code is created
* `referral:visited`: emitted when a referral code is visited through the referral link.

## Middleware

You can use the `referred` middleware to only allow referred users on a route.

```TS
router.get('/only-referrals', async ({ }: HttpContext) => {
    return 'Hello referred user!'
}).middleware(middleware.referred())
```

The middleware basicly checks if the user has the referred cookie set. Will show unauthorized HTTP error when not having the cookie.