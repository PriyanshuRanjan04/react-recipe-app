import { Router } from 'express'
import { requireAuth } from '../middleware/auth.js'
import CommunityRecipe from '../models/CommunityRecipe.js'

const router = Router()

router.get('/', async (req, res) => {
    const items = await CommunityRecipe.find().sort({ createdAt: -1 }).limit(100)
    res.json({ items })
})

router.post('/', requireAuth, async (req, res) => {
    const { title, description, image, region, ingredients = [], instructions = [] } = req.body
    if (!title) return res.status(400).json({ message: 'Title required' })
    const item = await CommunityRecipe.create({ userId: req.user.sub, title, description, image, region, ingredients, instructions })
    res.status(201).json({ item })
})

export default router


