const Author = require("../../../models/Author");

exports.fetchAuthor = async (authorId, next) => {
  try {
    const author = await Author.findById(authorId);
    return author;
  } catch (error) {
    next(error);
  }
};
exports.postsCreate = async (req, res) => {
  try {
    const { authorId } = req.params;
    const newPost = await Post.create(req.body, authorId);

    await Author.findByIdAndUpdate(authorId, { $push: { posts: newPost._id } });
    res.status(201).json(newPost);
  } catch (error) {
    next(error);
  }
};

exports.authorCreate = async (req, res) => {
  try {
    const newAuthor = await Author.create(req.body);
    res.status(201).json(newAuthor);
  } catch (error) {
    next(error);
  }
};

exports.authorDelete = async (req, res) => {
  try {
    await Author.findByIdAndRemove({ _id: req.author.id });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.authorUpdate = async (req, res) => {
  try {
    await Author.findByIdAndUpdate(req.author.id, req.body);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.authorsGet = async (req, res) => {
  try {
    const authors = await Author.find().populate("posts");
    res.json(authors);
  } catch (error) {
    next(error);
  }
};
