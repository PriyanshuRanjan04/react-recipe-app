import mongoose from 'mongoose'

const communityRecipeSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    region: { type: String },
    ingredients: [{ name: String, amount: String }],
    instructions: [String],
    createdAt: { type: Date, default: Date.now }
})

export default mongoose.model('CommunityRecipe', communityRecipeSchema)


