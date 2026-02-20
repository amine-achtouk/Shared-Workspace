const Note = require('../models/Note')

const createNote = async (req, res ) =>{
    try{
        const { title, content } = req.body
        if(!title || !content ) return res.status(400).json({ message: 'Title and Content are required' });

        const note = await Note.create({
            title,
            content,
            createdBy : req.user.id,
            workspace : req.workspace._id
        })
        res.status(201).json({note})
    }
    catch{
        res.status(500).json({ message : 'Server Error'})
    }
}

const getNotesByWorkspace = async (req, res ) =>{
    try{
        const { _id } = req.workspace
        const notes = await Note.find({ workspace: _id }).populate('createdBy', 'username email')
        res.status(200).json({ notes })
    }
    catch{
        res.status(500).json({ message : 'Server Error'})
    }
}


const updateNote = async (req, res ) =>{
    try{
        const note = req.note
        const { title, content } = req.body
        if (title === undefined && content === undefined) return res.status(400).json({ message: 'Nothing to update' })
        if (title !== undefined) note.title = title
        if (content !== undefined) note.content = content


        await note.save()

        res.status(200).json({ message: 'Note Updated successfully', note })
    }
    catch{
        res.status(500).json({ message : 'Server Error'})
    }
}

const deleteNote = async (req, res ) =>{
    try{
        const note = req.note
        await note.deleteOne()
        res.status(200).json({ message: 'Note deleted successfully' })
    }
    catch{
        res.status(500).json({ message : 'Server Error'})
    }
}

module.exports = { createNote, getNotesByWorkspace, updateNote, deleteNote}