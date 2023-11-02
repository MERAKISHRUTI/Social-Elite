const Post = require("../models/post");

module.exports.home = function (req, res) {
  //     Post.find({})
  //   .then((posts) => {
  //     // console.log(posts);
  //     return res.render('home', {
  //       title: "Codial || Home",
  //       posts: posts
  //     });
  //   })
  //   .catch(err => {
  //     console.error(err);
  //   });

  //populate the user of each post
  Post.find({})
    .populate("user")
    .populate({
      path:'comments',
      populate:{
        path:'user'
      }
    })
    .exec()
    .then((posts) => {
      // console.log(posts);
      return res.render("home", {
        title: "Social || Home",
        posts: posts,
      });
    })
    .catch((err) => {
      console.error(err);
    });
};
