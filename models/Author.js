const { model, Schema } = require("mongoose");
const Post = require("./Post");

const AuthorSchema = new Schema({
  name: { type: String, require: true },
  posts: [{ type: Schema.Types.ObjectId, ref: Post }],
});

module.exports = model("Author", AuthorSchema);
