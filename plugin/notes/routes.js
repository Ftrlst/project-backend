// const { addNoteHandler, showNoteHandler, updateNoteHandler, deleteNoteHandler, showOneNoteHandler } = require("./handler");

// const routes = [
//     {
//         method: 'POST',
//         path: '/notes',
//         handler: addNoteHandler
//     },
//     {
//         method: 'GET',
//         path: '/showNotes',
//         handler: showNoteHandler
//     },
//     {
//         method : 'GET',
//         path : '/shownotes/{id}',
//         handler : showOneNoteHandler
//     },
//     {
//         method: 'PUT',
//         path: '/showNotes/{id}',
//         handler: updateNoteHandler
//     },
//     {
//         method: 'DELETE',
//         path: '/notes/showNotes/{id}',
//         handler: deleteNoteHandler
//     }
// ]



// module.exports = routes


const routes = (handler) =>[
    {
        method: 'POST',
        path:'/notes',
        handler:handler.addNoteHandler
    },
    {
        method: 'GET',
        path:'/notes',
        handler:handler.getNoteHandler
    },
    {
        method: 'PUT',
        path:'/notes/{id}',
        handler:handler.updateNoteHandler
    },
    {
        method: 'DELETE',
        path:'/notes/{id}',
        handler:handler.deleteNoteHandler
    }
]

module.exports = routes