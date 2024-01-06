import mongoose from "mongoose"
const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        unique:false
    },
    isCompleted: {
        type: Boolean,
        select: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true,
    },
    // password: {
    //     // required:true,
    //     type: String,
    //     select: false,
    // },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

export const Task = mongoose.model("Task", schema);