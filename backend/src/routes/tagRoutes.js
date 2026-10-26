const express= require('express')
const tag= require('../controllers/tagController')
const router = express.Router()



router.get('/enlaces/:id/tags', tag.listTags );

router.get('/tags', tag.listAllTags);

router.post('/enlaces/:id/tags',tag.createTags);

module.exports=router