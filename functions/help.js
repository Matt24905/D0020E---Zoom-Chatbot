const request = require('request')

var dict = {'tenta': 'today', 
            'lärare': 'Josef Hallberg',
            'kurskod': 'D0020E'}

var all = {}


 function help(chatbotToken, event, commandParamSplitted) {


    if(commandParamSplitted == 'info') {
      const keys = Object.keys(dict)
      textToUser = 'You can get information about the following things: ' + keys
    }
    else if (commandParamSplitted == 'printAll') {
      for (var key in dict) {
        value = dict[key]
        all[key] = value
      
    }
    textToUser = 'All info currently avaliable is ' + JSON.stringify(all)
  }
    else {
      textToUser = 'Key does not exist'
  }

 request({
    url: 'https://api.zoom.us/v2/im/chat/messages',
    method: 'POST',
    json: true,
    body: {
      'robot_jid': process.env.bot_jid,
      'to_jid': event.payload.toJid,
      'account_id': event.payload.accountId,
      'content': {
        'head': {
          'text': 'infohelp'
        },
        'body': [{
          'type': 'message',
          'text': textToUser
        }]
      }
    },
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + chatbotToken
    }
  }, (error, httpResponse, body) => {
    if (error) {
      console.log('Error sending chat.', error)
    } else {
      console.log(body)
    }
  })
}

module.exports = help