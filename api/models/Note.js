const mongoose = require("mongoose")
const AutoIncrement = require("mongoose-sequence")(mongoose)

const noteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },

    completed: {
        type: Boolean,
        default: false
    },

}, { timestamps: true })

// noteSchema.plugin(AutoIncrement, {
//     id: "ticket-No",
//     inc_field: "id",
//     start_seq: 1000,
//     reference_fields: ["title"],
//     inc_amount: 10,
//     disable_hooks: true,
//     collection_name: "note-counter",
//     parallel_hooks: true
// })
module.exports = mongoose.model("Note", noteSchema)
