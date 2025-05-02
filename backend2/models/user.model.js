import mongoose from "mongoose"


const userSchema = mongoose.Schema({
    name: {
      type: String,
      required: true, // fixed spelling
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Others"],
      default: "Others"
    }
  }, {
    timestamps: true
  });
  

const User = mongoose.model("User",userSchema);

export default User;
