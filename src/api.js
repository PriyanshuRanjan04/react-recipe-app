const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:4000/api';

export const fetchRecipe = async (recipeId) => {
  const res = await fetch(`${API_BASE}/recipes/${recipeId}`);
  if (!res.ok) throw new Error('Failed to fetch recipe');
  return res.json();
};

export const saveRecipe = async (recipe) => {
  const res = await fetch(`${API_BASE}/recipes/${recipe.id || ''}`, {
    method: recipe.id ? 'PUT' : 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(recipe),
  });
  if (!res.ok) throw new Error('Failed to save recipe');
  return res.json();
};

export const fetchReviews = async (recipeId) => {
  const res = await fetch(`${API_BASE}/recipes/${recipeId}/reviews`);
  if (!res.ok) throw new Error('Failed to fetch reviews');
  return res.json();
};

export const addReview = async (recipeId, rating, text, token) => {
  const res = await fetch(`${API_BASE}/recipes/${recipeId}/reviews`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ rating, text }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({ message: 'Failed to submit review' }));
    throw new Error(data.message || 'Failed to submit review');
  }
  return res.json();
};
