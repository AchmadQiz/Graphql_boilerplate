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
    getVariableSelection: (queryJson,queryName)=>{
        const variableMapping = []
        const querySelection = queryJson.definitions.find(el=>el.operation === 'query')
        if(!querySelection) {
            return variableMapping
        }
        const variableDefinitions = querySelection.selectionSet.selections.filter(el=>el.name.value === queryName)
        if(variableDefinitions.length == 0){
            return variableMapping
        }
        variableDefinitions.forEach(item=>{
            item.arguments.forEach(el=>{
                const keyName = el.name.value
                let value
                if(el.value.kind === 'Variable'){
                    value = el.value.name.value
                } else {
                    value = el.value.value
                }
                variableMapping.push({
                    value: value,
                    name: keyName,
                    kind: el.value.kind
                })
            })
        })
        return variableMapping
    }
}