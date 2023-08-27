const Article = require('../models/Article');

exports.store = (req, res) => {
    try {
        let article = new Article(req.body);
        if (!article) {
            return res.status(422).json({ message: 'Error creating the article' })
        } else {
            article.save()
                .then(() => res.status(201).json({ message: 'Article créé !' }))
                .catch(error => res.status(400).json({ error }));
        }
    } catch (error) {
        res.status(500).json({ error });
    }
}

exports.update = (req, res) => {
    try {
        const articleObject = { ...req.body };

        delete articleObject._userId;
        Article.findOne({ _id: req.params.id })
            .then(() => {
                Article.updateOne({ _id: req.params.id }, { ...articleObject, _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Article modifié!' }))
                    .catch(error => res.status(401).json({ error }));
            })
            .catch((error) => {
                res.status(400).json({ error });
            });
    } catch (error) {
        res.status(500).json({ error });
    }
}

exports.getOneArticle = (req, res) => {
    try {
        Article.findOne({
            _id: req.params.id
        }).then(
            (article) => {
                res.status(200).json(article);
            }
        ).catch(
            (error) => {
                res.status(404).json({
                    error: error
                });
            }
        );
    } catch (error) {
        res.status(500).json({ error });
    }
};

exports.getAllArticle = (req, res) => {
    try {
        Article.find().then(
            (articles) => {
                res.status(200).json(articles);
            }
        ).catch(
            (error) => {
                res.status(400).json({
                    error: error
                });
            }
        );
    } catch (error) {
        res.status(500).json({ error });
    }
};

exports.delete = (req, res) => {
    Article.findOne({ _id: req.params.id })
        .then(() => {
            Article.deleteOne({ _id: req.params.id })
                .then(() => { res.status(200).json({ message: 'Article supprimé !' }) })
                .catch(error => res.status(401).json({ error }));
        })
        .catch(error => {
            res.status(500).json({ error });
        });
};

