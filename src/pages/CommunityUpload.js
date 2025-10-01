import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { toast } from 'react-hot-toast'

export default function CommunityUpload() {
    const { token } = useAuth()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [region, setRegion] = useState('')
    const [ingredients, setIngredients] = useState([{ name: '', amount: '' }])
    const [instructions, setInstructions] = useState([''])
    const [loading, setLoading] = useState(false)

    function updateIngredient(i, key, val) {
        const arr = [...ingredients]; arr[i][key] = val; setIngredients(arr)
    }
    function addIngredient() { setIngredients([...ingredients, { name: '', amount: '' }]) }
    function addInstruction() { setInstructions([...instructions, '']) }

    async function onSubmit(e) {
        e.preventDefault()
        setLoading(true)
        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:4000'}/api/community`, {
                method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({ title, description, image, region, ingredients, instructions })
            })
            if (!res.ok) { const d = await res.json().catch(() => ({ message: 'Upload failed' })); throw new Error(d.message) }
            toast.success('Recipe uploaded!')
            setTitle(''); setDescription(''); setImage(''); setRegion(''); setIngredients([{ name: '', amount: '' }]); setInstructions([''])
        } catch (e) { toast.error(e.message) } finally { setLoading(false) }
    }

    return (
        <div className="section d-block">
            <h1 className="title">Upload Family Recipe</h1>
            <form onSubmit={onSubmit} className="community-form">
                <label>Title<input value={title} onChange={(e) => setTitle(e.target.value)} required /></label>
                <label>Description<textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} /></label>
                <label>Image URL<input value={image} onChange={(e) => setImage(e.target.value)} /></label>
                <label>Region<input value={region} onChange={(e) => setRegion(e.target.value)} /></label>
                <div>
                    <h3>Ingredients</h3>
                    {ingredients.map((ing, i) => (
                        <div key={i} style={{ display: 'flex', gap: '.5rem' }}>
                            <input placeholder="Amount" value={ing.amount} onChange={(e) => updateIngredient(i, 'amount', e.target.value)} />
                            <input placeholder="Name" value={ing.name} onChange={(e) => updateIngredient(i, 'name', e.target.value)} />
                        </div>
                    ))}
                    <button type="button" className="btn" onClick={addIngredient}>Add Ingredient</button>
                </div>
                <div>
                    <h3>Instructions</h3>
                    {instructions.map((txt, i) => (
                        <input key={i} placeholder={`Step ${i + 1}`} value={txt} onChange={(e) => { const arr = [...instructions]; arr[i] = e.target.value; setInstructions(arr) }} />
                    ))}
                    <button type="button" className="btn" onClick={addInstruction}>Add Step</button>
                </div>
                <button className="btn" type="submit" disabled={loading}>{loading ? 'Uploading...' : 'Upload'}</button>
            </form>
        </div>
    )
}


