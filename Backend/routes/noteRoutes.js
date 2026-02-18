const express = require('express')
const router = express.Router()
const authMiddleware = require('../middlewares/userMiddleware')
const { requireWorkspaceMember, ensureNotePermission } = require('../middlewares/permissions')
const { createNote, getNotesByWorkspace, updateNote, deleteNote } = require('../controllers/noteController')

router.use(authMiddleware)

router.post('/:workspaceId', requireWorkspaceMember, createNote)
router.get('/:workspaceId', requireWorkspaceMember, getNotesByWorkspace)
router.put('/:workspaceId/:noteId', requireWorkspaceMember, ensureNotePermission, updateNote)
router.delete('/:workspaceId/:noteId', requireWorkspaceMember, ensureNotePermission, deleteNote)

module.exports = router