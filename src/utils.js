const { v4: uuidv4 } = require('uuid'),
    logError = require('debug')('MAYAR_ERROR'),
    logInfo = require('debug')('MAYAR_INFO');

var m = new Date();
var dateString = m.getUTCFullYear() + "/" + (m.getUTCMonth() + 1) + "/" + m.getUTCDate() + " " + m.getUTCHours() + ":" + m.getUTCMinutes() + ":" + m.getUTCSeconds();

module.exports = {
    logError: (err) => {
        var trackId = uuidv4();
        logError(dateString + " : " + trackId + JSON.stringify(err))
        return {
            "error": {
                "trackId": trackId
            }
        }
    },
    logInfo: (args,sessionId) => {
        if(!sessionId){
            var sessionId = uuidv4()
        }
        logInfo(dateString + " : " + sessionId + " : " + args)
    },
}