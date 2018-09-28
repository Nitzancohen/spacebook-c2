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
        // let post = this.posts(index);
        return $.post('/removePost', this.posts[index]).then((data)=>{
            this.posts.splice(index, 1);
        }).fail((err)=>{
            console.log(err);
        });
    }
    
    addComment(newComment, postIndex) {
        this.posts[postIndex].comments.push(newComment);
    };

    deleteComment(postIndex, commentIndex) {
        this.posts[postIndex].comments.splice(commentIndex, 1);
      };
}

export default PostsRepository