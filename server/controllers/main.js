require("../models/models.js");
var mongoose = require("mongoose");
var bcrypt = require('bcryptjs');
var User = mongoose.model("User");
var Post = mongoose.model("Post");
var Thread = mongoose.model("Thread");

module.exports = {

// Standard Error
    index: function(req, res) {
      res.json("Error 500 -- Internal Server Error");
    },

// User Functions
    getOneUser: function(req, res) {
      User.findOne({userName: req.body.username}, function(err, user) {
          if(err) {
            console.log("Find user error", err);
            res.json({error: "User login error"})
          }else if (user == null) {
            console.log("Login error: User value: ", user)
            res.json({error: "Invalid Login"});
          }else {
            console.log(user);
            bcrypt.compare(req.body.password, user.password, function (err, check){
              if(check) {
                console.log("Login Success", check);
                res.json({message: "Login Successful", user: user});
              }else {
                console.log("Bcrypt error: ", err)
                res.json({error: "Invalid Login"})
              }
            })
          }
      });
    },

    checkToken: function(req, res) {
      User.findOne({userName: req.body.username}, function(err, user) {
          if(err) {
            console.log("Find user error", err);
            res.json({error: "Unable to validate user"})
          }else if (user == null) {
            console.log("Login error: User value: ", user)
            res.json({error: "Unable to validate user"});
          }else{
            if (req.body.user == user.user && req.body.password == user.password){
              res.json({success: "Validation Successful"});
            }else{
              res.json({error: "Unable to validate user"})
            }
          }
      });
    },

    getAllUsers: function(req, res) {
      User.find({}, function(err, users) {
        if(err) {
          console.log("Find allUser error " + err);
          res.json({error: "Unable To Retrieve request for users"});
        }else {
          // Security flaw: Entire users object being passed back. Must filter out password from object.
          res.json({users: users});
        }
      });
    },

    newUser: function(req, res) {
      User.findOne({userName: req.body.username}, function(err, user){
        if(user){
          console.log("User exists\n", "Request Body:", req.body, "\nUser From DB: ", user);
          res.json({error:"User exists"});
        }else if (err) {
          console.log(err);
          res.json({error:"New User error", err});
        }
        else{
          if (req.body.password.length < 8) {
            res.json({message: "New User error", error: "Password must be at least 8 characters in length"});
          }else{
            bcrypt.hash(req.body.password, 10, function(err, hashedPass){
              if(err) {
                res.json({error:"An Error Occurred While Creating an Account"});
                console.log({message: "New User error\n", error: "Unable to hash password"});
              }else {
                var user = new User();
                user.userName = req.body.username;
                user.password = hashedPass;
                user.save(function(err) {
                  if(err) {
                      console.log("New User error ", err);
                      console.log(user);
                      res.json({error: "New User error"});
                  }else {
                    res.json({message: "New User success", user: user})
                  }
                });
              }
            });
          }
        }
      });
    },

// Thread Functions
  getOneThread: function(req, res) {
    console.log(req.params)
    Thread.findOne({_id: req.params.threadId}, function(err, thread) {
      console.log(thread)
        if(err) {
            console.log("Find Thread error" + err);
            res.json({error: "Find Thread error"})
        }else if(thread == null){
            console.log("getOneThread: " + thread);
            res.json({error: "Unable to find thread"})
          }else{
            res.json({message:"Get thread success", thread:thread});
        }
    });
  },

  getAllThreads: function(req, res) {
    Thread.find({}, function(err, threads) {
      if(err) {
        console.log("Find allThreads error ", err);
        res.json({error: "Find allThreads error"});
      }else {
        res.json({message:"Get all threads success", threads: threads});
      }
    });
  },

  newThread: function(req, res) {
    console.log(req.body);
    Thread.findOne({threadName:req.body.threadname}, function (err, thread){
      if(thread){
        console.log("Thread already exists\n", "Request Body: ", req.body, "\nThread from DB: ", thread);
        res.json({error: "Thread already exists"});
      }else if (err){
        console.log("New thread error", err);
        res.json({error: "New thread error"});
      }else {
        var thread = new Thread();
        thread.userName = req.body.username;
        thread.threadName = req.body.threadname;
        thread.save(function(err) {
          if(err) {
              console.log("New thread error ", err);
              res.json({error: "New thread error"});
            }else{
              User.findOneAndUpdate(req.body.username, {$push: {threads: thread}, runValidators: true}, function(err){
                if(err) {
                  console.log("New thread error.", err);
                  res.json({error: "New thread error"});
                }else{
                  res.json({message: "New thread success"});
                }
              })
            }
        });
      }
    });
  },

// Post Functions
  getPost: function(req, res) {
    Post.findById(req.params.id, function(err, post) {
        if(err) {
            console.log("Find Post error", err);
            res.json({error: "Find Post error"});
        }else {
            res.json({message:"Get post success",post:post});
        }
    });
  },

  newPost: function(req, res) {
    console.log(req.body);
    var post = new Post();
    post.userName = req.body.username;
    post.message = req.body.message;
    post.save(function(err) {
      if(err) {
          console.log("New Post error ", err);
          res.json({error: "New Post error"});
        }else{
          Thread.findOneAndUpdate(req.body.threadname, {$push: {posts: post}, runValidators: true}, function(err){
            if(err) {
              console.log("Thread new post error.", err);
              res.json({error: "New post error"});
            }else{
              res.json({message: "New post success"});
            }
          })
        }
      });
  },

}
