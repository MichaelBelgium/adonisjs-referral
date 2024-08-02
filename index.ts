/*
|--------------------------------------------------------------------------
| Package entrypoint
|--------------------------------------------------------------------------
|
| Export values from the package entrypoint as you see fit.
|
*/

import modelReferral from './src/models/referral.js'
import modelReferralCode from './src/models/referral_code.js'

export { configure } from './configure.js'

export const Referral = modelReferral
export const ReferralCode = modelReferralCode

export { hasReferrals } from './src/mixins/has_referrals.js'
