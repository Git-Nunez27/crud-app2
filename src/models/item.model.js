const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: [true, "Title is required"],
    trim: true,
    maxlength: [100, "Title too long"]
  },
  detail: { 
    type: String, 
    default: "",
    maxlength: [500, "Detail too long"]
  }
}, { timestamps: true });

module.exports = mongoose.model("Item", itemSchema);
