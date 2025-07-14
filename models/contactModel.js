import mongoose from "mongoose";

const contactSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    name: {
        type: String,
        required: [true, "Please add the contact name"]
    },
    email: {
        type: String,
        required: [true, "Please add the Email"]
    },
    phone: {
        type: String,
        required: [true, "Please add the Phone Number"]
    }
}, {
    timestamps: true
});

export default mongoose.model("Contact", contactSchema);