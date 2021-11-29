const model = require("./posts-model");
const express = require("express");
const router = express.Router();
router.use(express.json());

router.get("", async (req, res) => {
  try {
    const result = await model.find();
    res.status(200).json(result);
  } catch (err) {
    res
      .status(500)
      .json({ message: "The posts information could not be retrieved" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await model.findById(id);
    if (Boolean(result) === false) {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist" });
    } else {
      res.status(200).json(result);
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "The posts information could not be retrieved" });
  }
});

router.post("", async (req, res) => {
  try {
    const { title, contents } = req.body;

    if (!title || !contents) {
      res
        .status(400)
        .json({ message: "Please provide title and contents for the post" });
    } else {
      const result = await model.insert({ title, contents });
      if (Boolean(result) === false) {
        res.status(500).json({
          message: "There was an error while saving the post to the database",
        });
      } else {
        const newPost = await model.findById(result.id);
        res.status(201).json(newPost);
      }
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "The posts information could not be retrieved" });
  }
});

module.exports = router;
