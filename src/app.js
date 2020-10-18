import meow from 'meow'
import _ from 'lodash'
import Xpubs from './xpubs'
// import { shell, thro, read, exists, exec, filesPaths, resolvePath, getPwd } from './utils'


;(async () => {

  const cli = meow(`
    Usage
      $ xpubs <xpub> --flags

    Options
      --ack,          dry run by default, specify this option to run real
      --clean,        delete kit files

    Examples
      $ okk script heroku:log
  `, {
    flags: {
        ack: { type: 'boolean' }
    }
  })


  // ARGS
  const { input, flags } = cli
  let [ xpub, range ] = input


  try {
    let [ start, end ] = (range || '').split(',')
    const result = Xpubs.derive(xpub, { start, end })
    // console.log('apppp', input, flags)
    console.log(result)

  }catch(e){
    console.log(e.message || e)
  }

})()