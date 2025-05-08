const express = require('express');
const router = express.Router();
const memberController = require('../controllers/MemberController.js');

// Create a new member
router.post('/', memberController.createMember);

// Get all members
router.get('/', memberController.getAllMembers);

// Get a single member by ID
router.get('/:id', memberController.getMemberById);

// Update a member
router.put('/:id', memberController.updateMember);

// Delete a member
router.delete('/:id', memberController.deleteMember);

module.exports = router;
