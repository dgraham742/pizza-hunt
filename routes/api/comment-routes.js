const router = require('express').Router();
const { addComment, removeComment } = require('../../controllers/comment-controller');
const {
    addComment,
    removeComment,
    addReply,
    removeReply,
}=require('../../contollers/comment-controller');
const { put } = require('./pizza-routes');

// /api/comments/<pizzaId>
router.route('/:pizzaId').post(addComment);

// /api/comments/<pizzaId>/<commentId>
router.route('/:pizzaId/:commentId').delete(removeComment);

router
    .route('/:pizzaId/:commentId')
    .put(addReply)
    .delete(removeComment)
    
router.route('/:pizzaId/:commentId/:replyId').delete(removeReply);

module.exports = router;