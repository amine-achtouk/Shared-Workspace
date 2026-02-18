const express = require('express')
const router = express.Router()
const authMiddleware = require('../middlewares/userMiddleware')
const { requireWorkspaceMember, ensureNotePermission } = require('../middlewares/permissions')
const { createNote, getNotesByWorkspace, updateNote, deleteNote } = require('../controllers/noteController')

router.use(authMiddleware)

router.post('/', requireWorkspaceMember, createNote)
router.get('/', requireWorkspaceMember, getNotesByWorkspace)
router.put('/:noteId', requireWorkspaceMember, ensureNotePermission, updateNote)
router.delete('/:noteId', requireWorkspaceMember, ensureNotePermission, deleteNote)

module.exports = router