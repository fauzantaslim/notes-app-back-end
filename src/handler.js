/* eslint-disable linebreak-style */

/* eslint-disable indent */
const { nanoid } = require('nanoid');
const notes = require('./notes');
const addNoteHandler = (request, h) => {
    const { title, tags, body } = request.payload;
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;
    const newNote = {
        id: id,
        title: title,
        createdAt: createdAt,
        updatedAt: updatedAt,
        tags: tags,
        body: body,
    };

    notes.push(newNote);
    const isSuccess = notes.filter((note) => note.id === id).length > 0;

    if (isSuccess) {
        const res = h.response({
            status: 'success',
            message: 'Catatan berhasil ditambahkan',
            data: {
                noteId: id,
            },
        });

        res.code(201);

        return res;
    }

    const res = h.response({
        status: 'fail',
        message: 'Catatan gagal ditambahkan',
    });
    res.code(500);
    return res;

};


const getAllNotesHandler = () => ({
    status: 'success',
    data: {
        notes,
    }
});

const getNoteByIdHandler = (request, h) => {
    const { id } = request.params;
    const isFined = notes.filter((note) => note.id === id)[0];
    if (isFined !== undefined) {
        const res = h.response({
            status: 'success',
            message: 'Catatan berhasil didapatkan',
            data: {
                note: isFined,
            },
        });

        res.code(200);

        return res;

    }


    const res = h.response({
        status: 'fail',
        message: 'Catatan tidak ditemukan',
    });
    res.code(404);
    return res;

};


const editNoteByIdHandler = (request, h)=>{
    const { id } = request.params;
    const { title, tags, body } = request.payload;
    const updatedAt = new Date().toISOString();

    const index = notes.findIndex((note)=>note.id === id);

    if (index !== -1) {
        notes[index] = {
            ...notes[index],
            title:title,
            tags:tags,
            body:body,
            updatedAt:updatedAt,
        };

        const res = h.response({
            status: 'success',
            message: 'catatan berhasil diperbarui',
        });
        res.code(200);
        return res;
    };
    const res = h.response({
            status: 'fail',
            message: 'Gagal memperbarui catatan. Id tidak ditemukan',
        });
        res.code(404);
        return res;


};

const deleteNoteByIdHandler = (request, h)=>{
    const { id } = request.params;

    const index = notes.findIndex((note)=>note.id === id);
    if (index !== -1){
        notes.splice(index, 1);
        const res = h.response({
            status: 'success',
            message: 'catatan berhasil dihapus',
        });
        res.code(200);
        return res;
    };

    const res = h.response({
            status: 'fail',
            message: 'Gagal menghapus catatan. Id tidak ditemukan',
        });
        res.code(404);
        return res;

};

module.exports = { addNoteHandler, getAllNotesHandler, getNoteByIdHandler, editNoteByIdHandler, deleteNoteByIdHandler };
