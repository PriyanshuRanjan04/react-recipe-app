import mongoose from 'mongoose'

const reviewSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
    recipeId: { type: String, index: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    text: { type: String, maxlength: 500 },
    createdAt: { type: Date, default: Date.now }
})

export default mongoose.model('Review', reviewSchema)


