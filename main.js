const posts = []
let postID = 0

$('.add-post').click(function() {
    let postText = $('#post-name').val()
    let newPost = {text: postText, id: postID}
    posts.push(newPost)
    postID++
})