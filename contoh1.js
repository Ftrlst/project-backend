'use strict';

const Hapi = require('@hapi/hapi');

const init = async () => {

    const server = Hapi.server({
        port : 1122,
        host : 'localhost'
    });

    server.route([{
        method : 'GET',
        path : '/',
        handler :(request, h) => {
            return '<h1>Hello World! its mee</h1> <p>aku gabut</p>';
        }
    },
    {
        method : 'GET',
        path : '/users/{user?}',
        handler : (request, h) => {
            return `<h1>Hello ${request.params.user}</h1>`
        }
    },
    {
        method : 'GET',
        path : '/{any*}',
        handler : (request, h) => {
            return `<h1>Oh no! You must be lost!</h1>`
        }
    }]);


    await server.start();
    console.log(`Server running on %s ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();
//kamu fitri yaa
