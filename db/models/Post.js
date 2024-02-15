import mongoose from "mongoose";

const { Schema } = mongoose;

const postSchema = new Schema({
  // Reference author using their objectId
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  building: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Building",
    required: true,
  },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);

export default Post;
