var SpacebookApp = function () {
  return {
    posts: [
      {
        text: "Hello world111", id: 1, comments: [
          { text: "Man, this is 1st comment!", id: 1 },
          { text: "Man, this is 2nd comment!", id: 2 },
          { text: "Man, this is 3rd comment!", id: 3 }
        ],
        currentCommentId: 4
      },
      {
        text: "Hello world222", id: 2, comments: [
          { text: "Man, this is a comment!!", id: 1 },
          { text: "Man, this is a comment??", id: 2 },
          { text: "Man, this is a comment~~", id: 3 }
        ],
        currentCommentId: 4
      },
      {
        text: "Hello world333", id: 3, comments: [
          { text: "Woman, this is a comment!", id: 1 },
          { text: "Girl, this is a comment!", id: 2 },
          { text: "Lady, this is a comment!", id: 3 }
        ],
        currentCommentId: 4
      }
    ],

    // the current id to assign to a post
    currentId: 4,
    $posts: $('.posts'),

    _findPostById: function (id) {
      for (var i = 0; i < this.posts.length; i += 1) {
        if (this.posts[i].id === id) {
          return this.posts[i];
        }
      }
    },

    createPost: function (text) {
      var post = {
        text: text,
        id: this.currentId,
        comments: [],
        currentCommentId: 1
      }

      this.currentId += 1;

      this.posts.push(post);
    },

    renderPosts: function () {
      this.$posts.empty();

      for (var i = 0; i < this.posts.length; i += 1) {
        var post = this.posts[i];

        var commentsContainer = `<div class="comments-container">
                                  <input type="text" class="comment-name">
                                  <button class="btn btn-primary add-comment">Post Comment</button> 
                                  ${this.getCommentsHTML(post)}
                                </div>`;

        this.$posts.append('<div class="post" data-id=' + post.id + '>'
          + '<a href="#" class="remove">remove</a> ' + '<a href="#" class="show-comments">comments</a> ' + post.text +
          commentsContainer + '</div>');
      }
    },

    removePost: function (postID) {

      var post = this._findPostById(postID);

      this.posts.splice(this.posts.indexOf(post), 1);
    },

    toggleComments: function (currentPost) {
      let $clickedPost = $(currentPost).closest('.post');
      $clickedPost.find('.comments-container').toggleClass('show');
    },
    createComment: function (postId, text) {
      let clickedPost = this._findPostById(postId)
      const comment = {
        text: text,
        id: clickedPost.currentCommentId
      }
      clickedPost.comments.push(comment)
      clickedPost.currentCommentId++
    },
    removeComment: function (postId, commentId) {
      let clickedPost = this._findPostById(postId)
      for (let index in clickedPost.comments) {
        if (clickedPost.comments[index].id == commentId) {
          clickedPost.comments.splice(index, 1)
          return;
        }
      }
    },
    getCommentsHTML: function (post) {
      let commentsHTML = ""
      for (let comment of post.comments) {
        commentsHTML += '<li data-id="'+comment.id+'">'+comment.text+'<button class="btn btn-danger btn-sm remove-comment">remove comment</button></li>'
      }
      return commentsHTML
    }
  };
}

var app = SpacebookApp();

// immediately invoke the render method
app.renderPosts();

// Events
$('.add-post').on('click', function () {
  var text = $('#post-name').val();

  app.createPost(text);
  app.renderPosts();
});

$('.posts').on('click', '.remove', function () {
  
  var $clickedPost = $(this).closest('.post');
  var postID = $clickedPost.data().id;

  app.removePost(postID);
  app.renderPosts();
});

$('.posts').on('click', '.show-comments', function () {
  app.toggleComments(this);
});

// my events
$('.posts').on('click', '.add-comment', function () {
  let postId = $(this).closest('.post').data('id')
  let text = $(this).closest('.comments-container').find('.comment-name').val();

  app.createComment(postId, text);
  app.renderPosts();
})

$('.posts').on('click', '.remove-comment', function () {
  let postId = $(this).closest('.post').data('id')
  let commentId = $(this).closest('li').data('id')
  
  app.removeComment(postId, commentId);
  app.renderPosts()
})