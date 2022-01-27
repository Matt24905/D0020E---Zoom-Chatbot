const request = require('request')

var dict = {'tenta': 'today', 
            'lärare': 'Josef Hallberg',
            'kurskod': 'D0020E'}

 function removeInfo(chatbotToken, event, commandParamSplitted) {
    if (commandParamSplitted in dict) {
        delete dict[commandParamSplitted]
        textToUser = commandParamSplitted + ' has been removed from the dictionary'
    }
    else {
        textToUser = 'This key does not exist.'
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
              'text': 'Remove info'
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
    
    module.exports = removeInfo