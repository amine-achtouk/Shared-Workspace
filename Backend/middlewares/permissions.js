const Workspace = require('../models/Workspace')
const Note = require('../models/Note')
const { isWorkspaceOwner, isWorkspaceMember, isNoteCreator } = require('../utils/workspace.Note.Rules')



// - Does the workspace exist?
// - Is the current user a member or owner?
const requireWorkspaceMember = async (req, res, next) =>{
    try{
        const workspaceId = req.params.workspaceId
    const userId = req.user.id

    const workspace = await Workspace.findById(workspaceId)
    if(!workspace) return res.status(404).json({ message: 'Workspace not found' })

    if(!isWorkspaceMember(userId, workspace)) return res.status(403).json({ message: 'Access denied' })

    req.workspace = workspace
    next()
    }
    catch(err){
        res.status(500).json({ message: 'Server Error' });
    }
}


// - The user is the OWNER of the workspace
const requireWorkspaceOwner = async (req, res, next) =>{
    const workspace = req.workspace
    const userId = req.user.id

    if(!isWorkspaceOwner(userId, workspace)) return res.status(403).json({ message: 'Owner only' })

    next()
}


// For Check
// The User has the authority to modify or delete Note (based on being the owner or creator)
const ensureNotePermission = async (req, res, next) =>{
    try{
        const noteId = req.params.noteId
    const userId = req.user.id
    const workspace = req.workspace

    const note = await Note.findById(noteId)
    if (!note) return res.status(404).json({ message: "Note not found" });

    if(note.workspace.toString() !== workspace._id.toString()) return res.status(400).json({ message: "This note does not belong to the specified workspace" });

    const isOwner = isWorkspaceOwner(userId, workspace);
    const isCreator = isNoteCreator(userId, note);

    if (!isOwner && !isCreator) return res.status(403).json({ message: "Permission denied"});

    req.note = note
    next()
    }
    catch(err){
        res.status(500).json({ message: 'Server Error' }); 
    }

}

module.exports = { requireWorkspaceMember, requireWorkspaceOwner, ensureNotePermission}