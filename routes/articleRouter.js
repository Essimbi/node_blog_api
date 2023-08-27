const express = require('express');
// const auth = require('../middleware/auth');

const articleCtl = require('../controllers/articleController');

const router = express.Router();

router.get('/', articleCtl.getAllArticle);
router.post('/', articleCtl.store);
router.get('/:id', articleCtl.getOneArticle);
router.put('/:id', articleCtl.update);
router.delete('/:id', articleCtl.delete);

module.exports = router;