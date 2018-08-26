const posts = []
let postID = 0

$('.add-post').click(function() {
    let postText = $('#post-name').val()
    let newPost = {text: postText, id: postID}
    posts.push(newPost)
    $('#post-name').val("")
    postID++
    renderPosts()
})

const renderPosts = function () {
    $('.posts').empty()
    for (let post of posts) {
        let postToPrint = $('<p class="post" data-id="' + post.id + '">' + post.text + '</p>')
        $('.posts').append(postToPrint)
    }
}