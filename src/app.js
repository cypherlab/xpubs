import meow from 'meow'
import _ from 'lodash'
import Xpubs from './xpubs'


;(async () => {

  const cli = meow(`
    Usage
      $ xpubs <xpub> [range]

    Examples
      $ xpubs xpub6B....aZs4Wh
      $ xpubs xpub6B....aZs4Wh 0,50
  `)


  const { input, flags } = cli
  let [ xpub, range ] = input


  try {
    let [ start, end ] = (range || '').split(',')
    const result = Xpubs.derive(xpub, { start, end })

    console.log(result)

  }catch(e){
    console.log(e.message || e)
  }

})()