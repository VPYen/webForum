const main = require("../controllers/main.js");
let baseURL = "/api"

module.exports = function(app) {
  // Home
  app.get(baseURL+"/", function(req, res)  {
    main.index(req,res);
  });
// Users
  // All Users
  app.get(baseURL+"/user/all", function(req, res)  {
    main.getAllUsers(req, res);
  });

  // New User
  app.post(baseURL+"/user/new", function(req, res) {
    main.newUser(req, res);
  });

  // Login User
  app.post(baseURL+"/user/login", function(req, res) {
    main.getOneUser(req, res);
  });

  // Check Token
  app.post(baseURL+"/user/check", function(req, res) {
    main.checkToken(req, res);
  });

// Threads
  // New Thread
  app.post(baseURL+"/threads/new", function(req, res) {
    main.newThread(req, res);
  });

  // One Thread
  app.get(baseURL+"/thread/:threadId", function(req, res)  {
    main.getOneThread(req, res);
  });

  // All Threads
  app.get(baseURL+"/threads/all", function(req, res)  {
    main.getAllThreads(req, res);
  });

// Posts
  // New Post
  app.post(baseURL+"/threads/posts/new", function(req, res){
    main.newPost(req, res);
  });
  // One Post
  app.get(baseURL+"/threads/post/:id", function(req, res){
    main.getPost(req, res);
  });
}
