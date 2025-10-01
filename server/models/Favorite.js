import mongoose from 'mongoose'

const favoriteSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
    recipeId: { type: String, index: true },
    createdAt: { type: Date, default: Date.now }
})

export default mongoose.model('Favorite', favoriteSchema)


