import { Router } from 'express'
import { requireAuth } from '../middleware/auth.js'
import Favorite from '../models/Favorite.js'
import Review from '../models/Review.js'

const router = Router()

// Favorites
router.get('/:recipeId/favorites', requireAuth, async (req, res) => {
    const { recipeId } = req.params
    const exists = await Favorite.findOne({ userId: req.user.sub, recipeId })
    return res.json({ favorite: !!exists })
})

router.post('/:recipeId/favorite', requireAuth, async (req, res) => {
    const { recipeId } = req.params
    const exists = await Favorite.findOne({ userId: req.user.sub, recipeId })
    if (exists) {
        await Favorite.deleteOne({ _id: exists._id })
        return res.json({ favorite: false })
    }
    await Favorite.create({ userId: req.user.sub, recipeId })
    return res.json({ favorite: true })
})

// Reviews
router.get('/:recipeId/reviews', async (req, res) => {
    const { recipeId } = req.params
    const reviews = await Review.find({ recipeId }).sort({ createdAt: -1 }).limit(100)
    return res.json({ reviews })
})

router.post('/:recipeId/reviews', requireAuth, async (req, res) => {
    const { recipeId } = req.params
    const { rating, text } = req.body
    if (!rating) return res.status(400).json({ message: 'Rating required' })
    const review = await Review.create({ userId: req.user.sub, recipeId, rating, text })
    return res.status(201).json({ review })
})

export default router


