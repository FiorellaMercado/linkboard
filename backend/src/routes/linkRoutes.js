const express = require('express')
const  router = express.Router()
const link = require('../controllers/linkController')

router.get('/', link.listLinks)
router.post('/', link.createLink)

router.get('/:id/detalle', link.linkDetail)
router.patch('/:id/voto', link.voteLink)


module.exports=router;