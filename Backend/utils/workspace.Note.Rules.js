

// 1 For WorkSpace

const isWorkspaceOwner = (userId, workspace) =>{
    return workspace.owner.toString() === userId
}

const isWorkspaceMember = (userId, workspace) =>{
    const isOwner = isWorkspaceOwner(userId, workspace)
    const isMember = workspace.members.some(member => member.user.toString() === userId)

    return isOwner || isMember
}

const canViewWorkspace = (userId, workspace) =>{
    return isWorkspaceMember(userId, workspace)
}

const canDeleteWorkspace = (userId, workspace) =>{
    return isWorkspaceOwner(userId, workspace)
}

const canAddMembers = (userId, workspace) =>{
    return isWorkspaceOwner(userId, workspace)
}

const canRemoveMembers = (userId, workspace) =>{
    return isWorkspaceOwner(userId, workspace)
}

// 2 For Note

const isNoteCreator = (userId,note) =>{
    return note.createdBy.toString() === userId
}

const canCreateNote = (userId, workspace) =>{
    return isWorkspaceMember(userId, workspace)
}

const canViewNotesInWorkspace = (userId, workspace) =>{
    return isWorkspaceMember(userId, workspace)
}

const canModifyNote = (userId, workspace, note) =>{
    return isWorkspaceOwner(userId, workspace) || isNoteCreator(userId, note)
}

const canDeleteNote = (userId, workspace, note) =>{
    return canModifyNote(userId, workspace, note)
}


module.exports = {
    // for workspace
    isWorkspaceOwner,
    isWorkspaceMember,
    canViewWorkspace,
    canDeleteWorkspace,
    canAddMembers,
    canRemoveMembers,
    // for Note
    isNoteCreator,
    canCreateNote,
    canViewNotesInWorkspace,
    canModifyNote,
    canDeleteNote
}