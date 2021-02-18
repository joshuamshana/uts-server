const {BFast} = require('bfastnode');

exports.helloWorld = BFast.functions().onHttpRequest('/', (request, response) => {
    // your logic
    response.send("UTS-Server");
});

