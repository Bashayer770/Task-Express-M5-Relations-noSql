const express = require("express");
const router = express.Router();
const {
  //   fetchAuthor,
  authorCreate,
  //   authorDelete,
  //   authorGet,
  //   authorUpdate,
  postsCreate,
} = require("../posts.controllers");

router.param("authorId", async (req, res, next, authorId) => {
  const author = await fetchAuthor(authorId, next);
  if (author) {
    req.author = author;
    next();
  } else {
    const err = new Error("Author Not Found");
    err.status = 404;
    next(err);
  }
});

router.post("/:authorId", postsCreate);
router.post("/", authorCreate);

// router.delete("/:authorId", authorDelete);

// router.put("/:authorId", authorUpdate);
