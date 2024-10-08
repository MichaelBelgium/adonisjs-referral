/*
|--------------------------------------------------------------------------
| Configure hook
|--------------------------------------------------------------------------
|
| The configure hook is called when someone runs "node ace configure <package>"
| command. You are free to perform any operations inside this function to
| configure the package.
|
| To make things easier, you have access to the underlying "ConfigureCommand"
| instance and you can use codemods to modify the source files.
|
*/

import ConfigureCommand from '@adonisjs/core/commands/configure'
import { stubsRoot } from './stubs/main.js'

export async function configure(_command: ConfigureCommand) {
  const codemods = await _command.createCodemods()

  await codemods.makeUsingStub(stubsRoot, 'migrations/create_db.stub', {
    prefix: new Date().getTime(),
  })

  await codemods.makeUsingStub(stubsRoot, 'configs/referrals.stub', {})

  await codemods.updateRcFile((rcFile) => {
    rcFile.addProvider('@michaelbelgium/adonisjs-referral/referral_provider')
  })

  await codemods.registerMiddleware('named', [
    { name: 'referred', path: '@michaelbelgium/adonisjs-referral/referred_middelware' },
  ])
}
