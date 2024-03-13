'use  strict';

const Hapi = require('@hapi/hapi');
const notesPlugin = require('./plugins/notes');
const UserPlugin = require('./plugins/userNotes');
// const pool = require('./utils/pool')
const NoteService = require('./services/inMemory/NoteService')

const init = async () => {

    // INI OBJEK SERVICES
    const noteServices = new NoteService()

    const server = Hapi.server({
        port: 3000,
        host: 'localhost',
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
            plugin : UserPlugin,
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