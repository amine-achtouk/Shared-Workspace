const Workspace = require('../models/Workspace')
const Note = require('../models/Note')
const User = require('../models/User')


const createWorkspace = async (req, res) =>{
    try{
        const {name} = req.body

        if(!name) return res.status(400).json({ message: 'Name is required' });

        const workspace = await Workspace.create({
            name,
            owner: req.user.id,
            members : []
        })
        res.status(201).json({workspace})
    }
    catch(err){
        res.status(500).json({ message : 'Server Error'})
    }
}


const getMyWorkspaces = async (req, res) =>{
    try{
        const userId = req.user.id
        const workspaces = await Workspace.find({ $or: [{ owner: userId }, { 'members.user': userId }]}).populate('owner', 'username email');
        res.status(200).json(workspaces || []);

    }
    catch(err){
        res.status(500).json({ message : 'Server Error'})
    }
}

const updateWorkspace = async (req, res) =>{
    try{
        const workspace = req.workspace
        const { name } = req.body;

        if (!name) return res.status(400).json({ message: 'Name is required' })

        workspace.name = name;
        await workspace.save();

        res.status(200).json({ message: 'Workspace Updated successfully', workspace })
    }
    catch(err){
        res.status(500).json({ message : 'Server Error'})
    }
}


const deleteWorkspace = async (req, res) =>{
    try{
        const workspace = req.workspace

        await Note.deleteMany({ workspace : workspace._id})
        await workspace.deleteOne()

        res.status(200).json({ message: 'Workspace deleted successfully' })
    }
    catch(err){
        res.status(500).json({ message : 'Server Error'})
    }
}

const addMembers = async (req, res) =>{
    try{
        const workspace = req.workspace
        const { email } = req.body


        const userToAdd = await User.findOne({ email})
        if (!userToAdd) return res.status(404).json({ message: 'User not found' })

        const isAlreadyMember = workspace.members.some(member => member.user.toString() === userToAdd._id.toString())
        const isOwner = workspace.owner.toString() === userToAdd._id.toString();
        if(isAlreadyMember || isOwner) return res.status(400).json({  message: 'User is already a member' })

        workspace.members.push({user : userToAdd._id})
        await workspace.save()
        res.status(200).json({ message: 'Member added successfully',workspace })
    }
    catch(err){
        res.status(500).json({ message : 'Server Error'})
    }
}

const removeMembers = async (req, res) =>{
    try{
        const workspace = req.workspace
        const { email } = req.body

        const userToRemove = await User.findOne({ email})
        if (!userToRemove) return res.status(404).json({ message: 'User not found' })

        if (workspace.owner.toString() === userToRemove._id.toString()) return res.status(400).json({ message: 'Cannot remove the owner' });

        const memberIndex = workspace.members.findIndex(member => member.user.toString() === userToRemove._id.toString());
        if (memberIndex === -1) return res.status(400).json({ message: 'User is not a member' })

        workspace.members.splice(memberIndex, 1)
        await workspace.save()

        res.status(200).json({ message: 'Member removed successfully' });
    }
    catch(err){
        res.status(500).json({ message : 'Server Error'})
    }
}

module.exports = { createWorkspace, getMyWorkspaces, updateWorkspace, deleteWorkspace, addMembers, removeMembers }