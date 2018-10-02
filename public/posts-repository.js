    /**
     * @class Responsible for storing and manipulating Spacebook posts, in-memory
     */
class PostsRepository {
    constructor() {
        this.posts = [];
    }

    getPosts(){
        return $.get('posts').then((data)=>{
            this.posts=data;
        })
    }

    addPost(postText) {
        return $.post('/addPost', { text: postText, comments: [] }).then((data)=>{
            this.posts.push(data);
        }).fail((err)=>{
            console.log(err);
        });
    }

    removePost(index) {
        let postId = this.posts[index]._id

        return $.ajax({
            url: '/removePost/'+postId,
            type: 'DELETE',
            success: (data)=>{
                this.posts.splice(index, 1);
            },
            fail: (err)=>{
                console.log(err);
            }
        });
    }
    
    addComment(newComment, postIndex) {
        let postId = this.posts[postIndex]._id
        return $.post('/addComment/'+postId, newComment).then((data)=>{
            this.posts[postIndex].comments.push(data);
        }).fail((err)=>{
            console.log(err);
        })
    };

    deleteComment(postIndex, commentIndex) {
        let postId = this.posts[postIndex]._id
        let commentId = this.posts[postIndex].comments[commentIndex]._id

        return $.ajax({
            url: '/removeComment/'+postId+'/'+commentId,
            method: 'DELETE',
            success: (data)=>{
                this.posts[postIndex].comments.splice(commentIndex, 1);
            },
            fail: (err)=>{
                console.log(err);
            }
        });
      };
}

export default PostsRepository