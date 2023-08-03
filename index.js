const express = require('express');
const { xss } = require('express-xss-sanitizer');
var cookieParser = require('cookie-parser')
const { graphqlHTTP } = require('express-graphql');
const { altairExpress } = require('altair-express-middleware');
const bodyParser = require('body-parser');
const cors = require('cors');
const {InitSetup} = require('./src/model/model')

InitSetup().then(() => {
    const app = express();
    const port = process.env.PORT || 4000;

    const lambdas = require('./src/schemas');

    app.use(bodyParser.json({limit: '5gb'}));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(xss())
    app.use(cors({origin: '*'}));
    app.use(cookieParser())

    app.use('/playground', altairExpress({
        endpointURL: '/'
    }));
    app.use('/docs', express.static('doc/schema'));

    app.use('/', graphqlHTTP(lambdas));
    // start the server
    app.listen(port);
    console.log('Server started! At http://0.0.0.0:' + port);

})
.catch(error => {
    console.error('Error setting up models:', error);
})
