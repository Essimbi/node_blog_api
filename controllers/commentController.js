const Comment = require('../models/Comment');
const Article = require('../models/Article');

exports.makeComment = (req, res) => {
    try {
        let comment = new Comment(req.body);
        if (!comment) {
            return res.status(422).json({ message: 'Error creating the comment' });
        }
        comment.save()
            .then(() => res.status(201).json({ message: 'Commentaire enrégistré !' }))
            .catch(error => res.status(400).json({ error }));
    }
    catch (error) {
        res.status(500).json({ error });
    }
}

exports.getCommentsByArticleId = async (req, res) => {
    try {
        const articleId = req.params.id;

        // Vérification de l'id
        if (!articleId) {
            return res.status(400).send({
                message: 'Id de l\'article non précisé'
            });
        }

        // Récupération de l'article
        const article = await Article.findById(articleId);

        // Vérification que l'article existe
        if (!article) {
            return res.status(404).send({
                message: 'Article introuvable'
            });
        }

        // Récupération des comments liés à l'article
        const comments = await Comment.find({ article: articleId });

        res.send(comments);

    } catch (error) {
        res.status(500).send({
            message: error.message
        });
    }

}
