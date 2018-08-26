let posts = []
let autoPostID = 0

$('.add-post').on ('click', function () {
    let postText = $('#post-name').val()
    if(postText){
        let newPost = {text: postText, id: autoPostID, comments: [], commentsCount: 0}
        posts.push(newPost)
        renderPosts()
        autoPostID++
    }
})

$('.posts').on('click', '.remove', function () {
    let postId = $(this).closest('p').data('id')
    for (let i in posts) {
        if (posts[i].id == postId) {
            posts.splice(i, 1)
            break;
        }
    }
    renderPosts()
})

$('.posts').on('click', '.comment-btn', function () {
    let id = $(this).closest('form').closest('p').data('id')
    let comment = $(this).closest('form').find('.comment').val()
    let username = $(this).closest('form').find('.username').val()
    for (let post of posts) {
        if (post.id == id) {
            post.comments.push({username: username, comment: comment, commentId: post.commentsCount})
            post.commentsCount++
            break;
        }
    }
    renderPosts()
})

$('.posts').on('click', '.remove-comment', function () {
    let postId = $(this).closest('form').closest('p').data('id')
    let commentId = $(this).closest('li').data('id')
    for (let post of posts) {
        if (post.id == postId) {
            for (let i in post.comments) {
                if (post.comments[i].commentId == commentId) {
                    post.comments.splice(i, 1)
                    break;
                }
            }
            break;
        }
    }    
    renderPosts()
})

const renderPosts = function () {
    $('#post-name').val("")
    $('.posts').empty()
    for (let i=0; i<posts.length; i++) {
        let postToPrint = createPostElement(posts[i])
        addRemoveButton(postToPrint)
        addCommentsForm(postToPrint)
        addPostComments(postToPrint)
        $('.posts').append(postToPrint)
    }
}

const createPostElement = function (post) { return $('<p class="post" data-id="' + post.id + '">' + post.text + '</p>') }

const addRemoveButton = function (post) { post.prepend($('<button type="button" class="remove">REMOVE</button>')) }

const addCommentsForm = function (post) {
    let form = $('<form class="comment-form">' +
    '<input type="text" class="username" placeholder="Username">' +
    '<input type="text" class="comment" placeholder="Write a comment...">' +
    '<button type="button" class="comment-btn">Comment</button><div class="post-comments"></div></form>')
    post.append(form)
}

const addPostComments = function (post) {
    let postId = post.data('id')
    let comments
    for (let p of posts) {
        if (p.id == postId) {
            comments = p.comments
            break;
        }
    }
    let commentsDiv = post.find('.post-comments')
    commentsDiv.empty()
    for (let comment of comments) {
        commentsDiv.append('<li data-id="' + comment.commentId + '">' + comment.username + ' says: "' + comment.comment + '"<button type="button" class="remove-comment">Remove</button></li>')
    }
}