import mongoose from "mongoose";


const tweetSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true, 
        trim: true,
        maxlength: 280, // Twitter's character limit
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
},{timestamps: true});


export const Tweet = mongoose.model("Tweet", tweetSchema);