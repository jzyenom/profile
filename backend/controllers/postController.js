import Post from "../models/post.model.js";

export const createPost = async (req, res) => {
  try {
    const image = req.file?.filename;
    const post = await Post.create({ ...req.body, image });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// export const getPosts = async (req, res) => {
//   try {
//     const posts = await Post.aggregate([
//       {
//         $project: {
//           title: 1,
//           desc: 1,
//           status: 1, // pending, ongoing, propose
//           createdAt: 1,
//           updatedAt: 1,
//           image: {
//             $concat: ["http://localhost:5000/public/assets/", "$image"],
//           },
//         },
//       },
//     ]);

//     if (posts.length) {
//       res.status(200).json(posts);
//     } else {
//       res.status(404).json({ message: "No posts found" });
//     }
//   } catch (err) {
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// };

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.aggregate([
      {
        $project: {
          title: 1,
          desc: 1,
          status: 1,
          createdAt: 1,
          image: {
            $cond: {
              if: { $ifNull: ["$image", false] },
              then: {
                $concat: ["http://localhost:5000/public/assets/", "$image"],
              },
              else: null,
            },
          },
        },
      },
    ]);

    if (posts.length) {
      res.status(200).json(posts);
    } else {
      res.status(404).json({ message: "No posts found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const image = req.file?.filename;
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { ...req.body, image },
      { new: true }
    );
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const getPostsByStatus = async (req, res) => {
  try {
    const { status } = req.query;
    const posts = await Post.find({ status });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
