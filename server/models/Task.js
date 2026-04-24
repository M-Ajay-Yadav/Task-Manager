const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    // title: {
    //     type: String,
    //     required: true,
    // },
    title:{
        type:String,
        required:true,
        trim: true,
        minlength: 3,
        maxlength: 100,
    },
    description: {
        type: String,
        maxlength: 300,
        trim: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Task', taskSchema);
