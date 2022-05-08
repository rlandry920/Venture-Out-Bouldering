const db = require('../_helpers/database');
const ForumPost = db.ForumPost;
const ForumComment = db.ForumComment
const User = db.User



module.exports = {
    getAllPosts,
    addComment,
    addPost
}


async function getAllPosts() {
    return await ForumPost.find().populate({ path: 'comments', model: ForumComment });
}
async function addComment({post, comment},userid){
    let user = await User.find({_id: userid});
    user = user[0]

    const commentParams = {
        "body": comment,
        "datePosted": new Date(),
        "postedByName": user['firstName'] + " " + user['lastName'],
        "postedByUsername": user['username']
    }
    const newComment = new ForumComment(commentParams)
    await newComment.save()

    console.log(newComment)

    await ForumPost.updateOne({_id: post._id}, { $push: { comments: newComment._id }})


    return await ForumPost.findOne({_id: post._id}).populate({ path: 'comments', model: ForumComment })
}

async function addPost({title, body},userid){
    let user = await User.find({_id: userid});
    user = user[0]

    const postParams = {
        "title": title,
        "body": body,
        "datePosted": new Date(),
        "postedByName": user['firstName'] + " " + user['lastName'],
        "postedByUsername": user['username'],
        "comments":[]
    }
    const newPost = new ForumPost(postParams)
    await newPost.save()
    return newPost
}
