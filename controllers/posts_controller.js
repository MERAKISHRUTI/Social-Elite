const Post = require('../models/post')

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

  


module.exports.destroy= function(req,res){
   
}