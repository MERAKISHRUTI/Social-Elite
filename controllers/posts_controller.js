const Post = require('../models/post')
const Comment =require('../models/comment')

module.exports.create = async function (req, res) {
    try {
      // Make sure req.user is populated, possibly by using user authentication middleware
  
      // Create a new post using the Post model and await the result
      const post = await Post.create({
        content: req.body.content,
        user: req.user._id, // Assuming you have a user object in req
        
      });
  
      // Redirect to the previous page after successful post creation
      return res.redirect('back');
    } catch (err) {
      console.error("Error in creating the post:", err);
      return ;
    }
  };

  



module.exports.destroy = async function (req, res) {
    try {
        const postId = req.params.id.trim(); // Trim extra spaces from the ID
        const post = await Post.findById(postId);

        if (!post) {
            console.log(req.params);
            return res.redirect('back');
        }

        if (post.user.toString() === req.user.id) {
            await post.deleteOne();
            await Comment.deleteMany({ post: postId }); // Use the trimmed ID here

            console.log(req.params);
            return res.redirect('back');
        } else {
            return res.status(403).send('Permission denied'); // Or handle the unauthorized access in some way
        }
    } catch (err) {
        console.error('Error:', err.message);
        return res.redirect('back');
    }
};


