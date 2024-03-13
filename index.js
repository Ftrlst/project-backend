'use strict';

const Hapi = require('@hapi/hapi');
// const routes = require('./routes');
const notesPlugin = require('./plugin/notes');
const userPlugin = require('./plugin/user');
const NotesService = require('./services/inMemory/NoteService');
const { pool } = require('./utils/database/pool');

const init = async () => {

    const noteServices = new NotesService(pool)

    const server = Hapi.server({
        port : 1177,
        host : 'localhost'
    });

    await server.register(
        {
            plugin : notesPlugin,
            options : {
                service: noteServices
            }
        }
    )
    await server.register(
        {
            plugin : userPlugin,
            options : {}
        }
    )

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});


init();