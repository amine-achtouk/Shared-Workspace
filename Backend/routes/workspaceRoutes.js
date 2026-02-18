const express = require('express')
const router = express.Router()
const authMiddleware = require('../middlewares/userMiddleware')
const { requireWorkspaceMember, requireWorkspaceOwner} = require('../middlewares/permissions')
const { createWorkspace, getMyWorkspaces, updateWorkspace, deleteWorkspace} = require('../controllers/workspaceController')

router.use(authMiddleware)

router.get('/', getMyWorkspaces)
router.post('/',  createWorkspace)
router.put('/:workspaceId', requireWorkspaceMember ,requireWorkspaceOwner ,updateWorkspace)
router.delete('/:workspaceId', requireWorkspaceMember ,requireWorkspaceOwner ,deleteWorkspace)

module.exports = router