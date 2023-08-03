const fs = require('fs');
const glob = require('glob');
var lambdas = {};
var normalizedPath = require("path").join(__dirname, "."); 

const getDirectories = source =>
    fs.readdirSync(source, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name)

// merged resolver
getDirectories(normalizedPath).forEach((file)=>{
    const lambdaPath = normalizedPath+"/"+file;
    if(fs.existsSync(lambdaPath+"/resolver.js")){
        const lambda = require("./"+file+"/resolver.js");
        Object.assign(lambdas, lambda)
    }
});

// merged schemas
let schemas = [];
const gql = glob.sync(__dirname + '/**/*.gql', {})

gql.forEach( (file)=>{
    const schema = fs.readFileSync(file, 'utf-8');
    schemas.push(schema);
})

module.exports = {
    lambdas,
    schemas
}