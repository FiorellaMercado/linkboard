const express = require('express')
const router = express.Router({mergeParams:true})

const comment = require('../controllers/commentController')

router.get('/',comment.listComments)
router.post('/',comment.createComment)



module.exports=router