const { Schema,model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const { addReply } = require('../contollers/comment-controller');

const ReplySchema = new Schema(
    {
        //set custom id to avoid confusion with parent comment _id
        replyId:{
            type:Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        replyBody:{
            type:String,
            required:true,
            trim:true
        },
        writtenBy:{
            type:String,
            required:true
        },
        createdAt:{
            type:Date,
            default:Date.now,
            get:createdAtVal => dateFormat(createdAtVal)
        }
    },
    {
        toJson: {
            getters:true
        }
    }, 
);

const CommentSchema = new Schema(
    {
    writtenBy: {
        type:String
    },
    commentBody: {
        type:String
    },
    createdAt: {
        type:Date,
        default:Date.now
    },
    replies:[ReplySchema]
},
{
    toJson: {
        virtuals:true,
        getters:true
    },
    id:false
}
);
add
CommentSchema.virtual('replyCount').get(function(){
    return this.replies.length;
});

const Comment = model('Comment', CommentSchema);

module.exports = Comment;