const express = require('express')
const router = express.Router()
const authMiddleware = require('../middlewares/userMiddleware')
const { requireWorkspaceMember, requireWorkspaceOwner} = require('../middlewares/permissions')
const { createWorkspace, getMyWorkspaces, updateWorkspace, deleteWorkspace, addMembers, removeMembers} = require('../controllers/workspaceController')

router.use(authMiddleware)

router.get('/', getMyWorkspaces)
router.post('/',  createWorkspace)
router.put('/:workspaceId', requireWorkspaceMember ,requireWorkspaceOwner ,updateWorkspace)
router.delete('/:workspaceId', requireWorkspaceMember ,requireWorkspaceOwner ,deleteWorkspace)
// For Members
router.post('/:workspaceId/members', requireWorkspaceMember, requireWorkspaceOwner, addMembers)
router.delete('/:workspaceId/members', requireWorkspaceMember, requireWorkspaceOwner, removeMembers)

module.exports = router