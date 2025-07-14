import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please add the User name"]
    },
    email: {
        type: String,
        required: [true, "please add email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please add the password"]
    }
}, {
    timestamps: true
})

export default mongoose.model("User", userSchema);