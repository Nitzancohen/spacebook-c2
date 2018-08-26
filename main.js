let posts = []
let autoPostID = 0

$('.add-post').on ('click', function () {
    let postText = $('#post-name').val()
    let newPost = {text: postText, id: autoPostID}
    posts.push(newPost)
    renderPosts()
    $('#post-name').val("")
    autoPostID++
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

const renderPosts = function () {
    $('.posts').empty()
    for (let i=0; i<posts.length; i++) {
        let postToPrint = createPostElement(posts[i])
        addRemoveButton(postToPrint, i)
        $('.posts').append(postToPrint)
    }
}

const createPostElement = function (post) { return $('<p class="post" data-id="' + post.id + '">' + post.text + '</p>') }

const addRemoveButton = function (post, index) { post.append($('<button type="button" class="remove">REMOVE</button>')) }