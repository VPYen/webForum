var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema ({
  userName: {type: String, required: [true, "Username must be provided."]},
  message: {type: String, required: [true, "Cannot have empty post message."] },
}, {timestamps: true}, {capped: {size: 1000} } );

var ThreadSchema = new mongoose.Schema ({
    userName: {type: String, required: [true, "Username must be provided."]},
    threadName: {type: String, required: [true, "Thread name must be provided."] },
    posts: [PostSchema],
}, {timestamps: true}, {capped: {size: 10000} } );

var UserSchema = new mongoose.Schema ({
  userName: {type: String, required: [true, "Username must be provided."] },
  password: {type: String, required: [true, "Password must be provided."] },
  level: {type: Number,  default: 3},
  threads: [ThreadSchema],
  logintime: {type: Date, default: Date.now},

}, {timestamps: true}, {capped: {size: 100} } );

mongoose.model("Post", PostSchema);
mongoose.model("Thread", ThreadSchema);
mongoose.model("User", UserSchema);