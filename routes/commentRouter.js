const express = require('express') ;
const commentCtl = require('../controllers/commentController') ;

const router = express.Router() ;

router.post('/', commentCtl.makeComment) ;
router.get('/article/:id', commentCtl.getCommentsByArticleId) ;

module.exports = router ;