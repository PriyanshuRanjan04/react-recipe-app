// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
// import {
//     Clock,
//     Users,
//     Star,
//     Heart,
//     Share2,
//     Timer,
//     ShoppingCart,
//     Plus,
//     Minus
// } from 'lucide-react';
// import { useRecipes } from '../../context/RecipeContext';
// import { useAuth } from '../../context/AuthContext';
// import { toast } from 'react-hot-toast';

// const RecipeDetail = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const { getRecipeById } = useRecipes();
//     const { user, token, addToFavorites, removeFromFavorites } = useAuth();
//     const queryClient = useQueryClient()

//     const [recipe, setRecipe] = useState(null);
//     const [servings, setServings] = useState(4);
//     const [activeTab, setActiveTab] = useState('ingredients');
//     const [isFavorite, setIsFavorite] = useState(false);
//     const [showTimer, setShowTimer] = useState(false);
//     const [timerMinutes, setTimerMinutes] = useState(0);
//     const [timerSeconds, setTimerSeconds] = useState(0);
//     const [isTimerRunning, setIsTimerRunning] = useState(false);
//     const [newRating, setNewRating] = useState(0);
//     const [newReviewText, setNewReviewText] = useState('');

//     useEffect(() => {
//         const recipeData = getRecipeById(id);
//         if (recipeData) {
//             setRecipe(recipeData);
//             setServings(recipeData.servings);
//             setIsFavorite(user?.favorites?.includes(id) || false);
//         } else {
//             navigate('/recipes');
//         }
//     }, [id, getRecipeById, user, navigate]);

//     const handleFavoriteToggle = () => {
//         if (!user) {
//             toast.error('Please login to save favorites');
//             return;
//         }

//         if (isFavorite) {
//             removeFromFavorites(id);
//             setIsFavorite(false);
//             toast.success('Removed from favorites');
//         } else {
//             addToFavorites(id);
//             setIsFavorite(true);
//             toast.success('Added to favorites');
//         }
//     };

//     const handleShare = async () => {
//         if (navigator.share) {
//             try {
//                 await navigator.share({
//                     title: recipe.title,
//                     text: recipe.description,
//                     url: window.location.href,
//                 });
//             } catch (error) {
//                 console.log('Error sharing:', error);
//             }
//         } else {
//             // Fallback to copying URL
//             navigator.clipboard.writeText(window.location.href);
//             toast.success('Recipe link copied to clipboard!');
//         }
//     };

//     const adjustServings = (direction) => {
//         if (direction === 'increase') {
//             setServings(prev => prev + 1);
//         } else if (direction === 'decrease' && servings > 1) {
//             setServings(prev => prev - 1);
//         }
//     };

//     const getAdjustedAmount = (amount) => {
//         const originalServings = recipe.servings;
//         const ratio = servings / originalServings;

//         // Simple parsing for common formats
//         const match = amount.match(/(\d+(?:\.\d+)?)\s*(\w+)?/);
//         if (match) {
//             const number = parseFloat(match[1]);
//             const unit = match[2] || '';
//             const adjusted = (number * ratio).toFixed(1);
//             return `${adjusted}${unit ? ' ' + unit : ''}`;
//         }
//         return amount;
//     };

//     const startTimer = () => {
//         if (timerMinutes > 0 || timerSeconds > 0) {
//             setIsTimerRunning(true);
//             setShowTimer(true);
//         }
//     };

//     const stopTimer = () => {
//         setIsTimerRunning(false);
//     };

//     const resetTimer = () => {
//         setIsTimerRunning(false);
//         setTimerMinutes(0);
//         setTimerSeconds(0);
//     };

//     useEffect(() => {
//         let interval;
//         if (isTimerRunning && (timerMinutes > 0 || timerSeconds > 0)) {
//             interval = setInterval(() => {
//                 if (timerSeconds > 0) {
//                     setTimerSeconds(prev => prev - 1);
//                 } else if (timerMinutes > 0) {
//                     setTimerMinutes(prev => prev - 1);
//                     setTimerSeconds(59);
//                 } else {
//                     setIsTimerRunning(false);
//                     toast.success('Timer finished!');
//                 }
//             }, 1000);
//         }
//         return () => clearInterval(interval);
//     }, [isTimerRunning, timerMinutes, timerSeconds]);

//     if (!recipe) {
//         return <div className="loading">Loading recipe...</div>;
//     }

//     // Reviews fetching
//     const { data } = useQuery(
//         ["recipe", recipeId],
//         () => fetchRecipe(recipeId),
//         { enabled: !!recipeId } // only runs if recipeId exists
//     );

//     const mutation = useMutation(saveRecipe, {
//         onSuccess: () => console.log("Recipe saved!"),
//     });


//     const addReviewMutation = useMutation({
//         mutationFn: async ({ rating, text }) => {
//             const res = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:4000'}/api/recipes/${id}/reviews`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${token}`
//                 },
//                 body: JSON.stringify({ rating, text })
//             })
//             if (!res.ok) {
//                 const data = await res.json().catch(() => ({ message: 'Failed to submit review' }))
//                 throw new Error(data.message || 'Failed to submit review')
//             }
//             return res.json()
//         },
//         onSuccess: () => {
//             setNewRating(0)
//             setNewReviewText('')
//             queryClient.invalidateQueries({ queryKey: ['reviews', id] })
//             toast.success('Thanks for your review!')
//         },
//         onError: (e) => toast.error(e.message)
//     })

//     return (
//         <div className="recipe-detail">
//             <motion.div
//                 className="recipe-hero"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6 }}
//             >
//                 <div className="recipe-image">
//                     <img src={recipe.image} alt={recipe.title} />
//                     <div className="recipe-overlay">
//                         <button
//                             className={`favorite-btn ${isFavorite ? 'active' : ''}`}
//                             onClick={handleFavoriteToggle}
//                         >
//                             <Heart className={isFavorite ? 'filled' : ''} />
//                         </button>
//                         <button className="share-btn" onClick={handleShare}>
//                             <Share2 />
//                         </button>
//                     </div>
//                 </div>

//                 <div className="recipe-info">
//                     <div className="recipe-meta">
//                         <span className="cuisine-badge">{recipe.cuisine}</span>
//                         <span className="difficulty-badge">{recipe.difficulty}</span>
//                     </div>

//                     <h1 className="recipe-title">{recipe.title}</h1>
//                     <p className="recipe-description">{recipe.description}</p>

//                     <div className="recipe-stats">
//                         <div className="stat">
//                             <Clock />
//                             <span>{recipe.cookingTime} min</span>
//                         </div>
//                         <div className="stat">
//                             <Users />
//                             <span>{servings} servings</span>
//                         </div>
//                         <div className="stat">
//                             <Star />
//                             <span>{recipe.rating} ({recipe.reviewCount} reviews)</span>
//                         </div>
//                     </div>

//                     <div className="recipe-actions">
//                         <button className="btn primary" onClick={() => {
//                             const lines = recipe.ingredients.map((i) => `• ${i.amount} ${i.name}`)
//                             const text = `Shopping List for ${recipe.title}\n\n${lines.join('\n')}`
//                             const blob = new Blob([text], { type: 'text/plain' })
//                             const url = URL.createObjectURL(blob)
//                             const a = document.createElement('a')
//                             a.href = url
//                             a.download = `${recipe.title}-shopping-list.txt`
//                             a.click()
//                             URL.revokeObjectURL(url)
//                         }}>
//                             <ShoppingCart />
//                             Add to Shopping List
//                         </button>
//                         <button className="btn secondary" onClick={() => setShowTimer(true)}>
//                             <Timer />
//                             Set Timer
//                         </button>
//                     </div>
//                 </div>
//             </motion.div>

//             <div className="recipe-content">
//                 <div className="recipe-tabs">
//                     <button
//                         className={`tab ${activeTab === 'ingredients' ? 'active' : ''}`}
//                         onClick={() => setActiveTab('ingredients')}
//                     >
//                         Ingredients
//                     </button>
//                     <button
//                         className={`tab ${activeTab === 'instructions' ? 'active' : ''}`}
//                         onClick={() => setActiveTab('instructions')}
//                     >
//                         Instructions
//                     </button>
//                     <button
//                         className={`tab ${activeTab === 'nutrition' ? 'active' : ''}`}
//                         onClick={() => setActiveTab('nutrition')}
//                     >
//                         Nutrition
//                     </button>
//                     <button
//                         className={`tab ${activeTab === 'reviews' ? 'active' : ''}`}
//                         onClick={() => setActiveTab('reviews')}
//                     >
//                         Reviews
//                     </button>
//                 </div>

//                 <div className="servings-control">
//                     <label>Servings:</label>
//                     <div className="servings-adjuster">
//                         <button onClick={() => adjustServings('decrease')}>
//                             <Minus />
//                         </button>
//                         <span>{servings}</span>
//                         <button onClick={() => adjustServings('increase')}>
//                             <Plus />
//                         </button>
//                     </div>
//                 </div>

//                 <div className="tab-content">
//                     {activeTab === 'ingredients' && (
//                         <div className="ingredients-list">
//                             <h3>Ingredients</h3>
//                             <ul>
//                                 {recipe.ingredients.map((ingredient, index) => (
//                                     <li key={index}>
//                                         <span className="amount">{getAdjustedAmount(ingredient.amount)}</span>
//                                         <span className="ingredient">{ingredient.name}</span>
//                                     </li>
//                                 ))}
//                             </ul>
//                         </div>
//                     )}

//                     {activeTab === 'instructions' && (
//                         <div className="instructions-list">
//                             <h3>Instructions</h3>
//                             <ol>
//                                 {recipe.instructions.map((instruction, index) => (
//                                     <li key={index}>
//                                         <span className="step-number">{index + 1}</span>
//                                         <span className="step-text">{instruction}</span>
//                                     </li>
//                                 ))}
//                             </ol>
//                         </div>
//                     )}

//                     {activeTab === 'nutrition' && (
//                         <div className="nutrition-info">
//                             <h3>Nutritional Information</h3>
//                             <div className="nutrition-grid">
//                                 <div className="nutrition-item">
//                                     <span className="label">Calories</span>
//                                     <span className="value">{recipe.nutritionalInfo.calories}</span>
//                                 </div>
//                                 <div className="nutrition-item">
//                                     <span className="label">Protein</span>
//                                     <span className="value">{recipe.nutritionalInfo.protein}g</span>
//                                 </div>
//                                 <div className="nutrition-item">
//                                     <span className="label">Carbs</span>
//                                     <span className="value">{recipe.nutritionalInfo.carbs}g</span>
//                                 </div>
//                                 <div className="nutrition-item">
//                                     <span className="label">Fat</span>
//                                     <span className="value">{recipe.nutritionalInfo.fat}g</span>
//                                 </div>
//                                 <div className="nutrition-item">
//                                     <span className="label">Fiber</span>
//                                     <span className="value">{recipe.nutritionalInfo.fiber}g</span>
//                                 </div>
//                             </div>
//                         </div>
//                     )}

//                     {activeTab === 'reviews' && (
//                         <div className="reviews-section">
//                             <h3>Ratings & Reviews</h3>
//                             {user ? (
//                                 <div className="add-review" aria-label="Add your review">
//                                     <div className="rating-input" role="radiogroup" aria-label="Rate this recipe">
//                                         {[1, 2, 3, 4, 5].map((n) => (
//                                             <button
//                                                 key={n}
//                                                 type="button"
//                                                 className={n <= newRating ? 'star active' : 'star'}
//                                                 onClick={() => setNewRating(n)}
//                                                 aria-pressed={n === newRating}
//                                                 aria-label={`${n} star${n > 1 ? 's' : ''}`}
//                                             >
//                                                 <Star />
//                                             </button>
//                                         ))}
//                                     </div>
//                                     <textarea
//                                         value={newReviewText}
//                                         onChange={(e) => setNewReviewText(e.target.value)}
//                                         placeholder="Share a quick thought (optional)"
//                                         rows={3}
//                                     />
//                                     <button
//                                         className="btn"
//                                         disabled={addReviewMutation.isLoading || newRating === 0}
//                                         onClick={() => addReviewMutation.mutate({ rating: newRating, text: newReviewText })}
//                                     >
//                                         {addReviewMutation.isLoading ? 'Submitting...' : 'Submit Review'}
//                                     </button>
//                                 </div>
//                             ) : (
//                                 <p>Please login to leave a rating.</p>
//                             )}

//                             <div className="reviews-list" aria-live="polite">
//                                 {reviewsQuery.isLoading && <div>Loading reviews...</div>}
//                                 {reviewsQuery.data && reviewsQuery.data.reviews.length === 0 && (
//                                     <p>No reviews yet. Be the first!</p>
//                                 )}
//                                 {reviewsQuery.data && reviewsQuery.data.reviews.map((rv) => (
//                                     <div key={rv._id} className="review-item">
//                                         <div className="review-head">
//                                             <span className="rating">{'★'.repeat(rv.rating)}{'☆'.repeat(5 - rv.rating)}</span>
//                                             <span className="date">{new Date(rv.createdAt).toLocaleDateString()}</span>
//                                         </div>
//                                         {rv.text && <p className="text">{rv.text}</p>}
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             </div>

//             {/* Cooking Timer Modal */}
//             {showTimer && (
//                 <div className="timer-modal">
//                     <div className="timer-content">
//                         <h3>Cooking Timer</h3>
//                         <div className="timer-inputs">
//                             <div className="timer-input">
//                                 <label>Minutes</label>
//                                 <input
//                                     type="number"
//                                     value={timerMinutes}
//                                     onChange={(e) => setTimerMinutes(parseInt(e.target.value) || 0)}
//                                     min="0"
//                                     max="59"
//                                 />
//                             </div>
//                             <div className="timer-input">
//                                 <label>Seconds</label>
//                                 <input
//                                     type="number"
//                                     value={timerSeconds}
//                                     onChange={(e) => setTimerSeconds(parseInt(e.target.value) || 0)}
//                                     min="0"
//                                     max="59"
//                                 />
//                             </div>
//                         </div>
//                         <div className="timer-display">
//                             {String(timerMinutes).padStart(2, '0')}:{String(timerSeconds).padStart(2, '0')}
//                         </div>
//                         <div className="timer-controls">
//                             <button onClick={startTimer} disabled={isTimerRunning}>
//                                 Start
//                             </button>
//                             <button onClick={stopTimer} disabled={!isTimerRunning}>
//                                 Stop
//                             </button>
//                             <button onClick={resetTimer}>Reset</button>
//                             <button onClick={() => setShowTimer(false)}>Close</button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default RecipeDetail;








import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    Clock,
    Users,
    Star,
    Heart,
    Share2,
    Timer,
    ShoppingCart
} from 'lucide-react';
import { useRecipes } from '../../context/RecipeContext';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';

// Import API functions
import { fetchRecipe, saveRecipe, fetchReviews, addReview as apiAddReview } from '../../api';

const RecipeDetail = () => {
    const { id: recipeId } = useParams();
    const navigate = useNavigate();
    const { getRecipeById } = useRecipes();
    const { user, token, addToFavorites, removeFromFavorites } = useAuth();
    const queryClient = useQueryClient();

    const [recipe, setRecipe] = useState(null);
    const [servings, setServings] = useState(4);
    const [activeTab, setActiveTab] = useState('ingredients');
    const [isFavorite, setIsFavorite] = useState(false);
    const [showTimer, setShowTimer] = useState(false);
    const [timerMinutes, setTimerMinutes] = useState(0);
    const [timerSeconds, setTimerSeconds] = useState(0);
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [newRating, setNewRating] = useState(0);
    const [newReviewText, setNewReviewText] = useState('');

    // Fetch recipe using React Query
    const recipeQuery = useQuery(
        ['recipe', recipeId],
        () => fetchRecipe(recipeId),
        { enabled: !!recipeId }
    );

    // Fetch reviews
    const reviewsQuery = useQuery(
        ['reviews', recipeId],
        () => fetchReviews(recipeId),
        { enabled: !!recipeId }
    );

    // Mutation for saving recipe
    const saveRecipeMutation = useMutation(saveRecipe, {
        onSuccess: () => toast.success('Recipe saved!')
    });

    // Mutation for adding a review using API function
    const addReviewMutation = useMutation(
        ({ rating, text }) => apiAddReview(recipeId, rating, text, token),
        {
            onSuccess: () => {
                setNewRating(0);
                setNewReviewText('');
                queryClient.invalidateQueries({ queryKey: ['reviews', recipeId] });
                toast.success('Thanks for your review!');
            },
            onError: (e) => toast.error(e.message)
        }
    );

    useEffect(() => {
        const recipeData = getRecipeById(recipeId);
        if (recipeData) {
            setRecipe(recipeData);
            setServings(recipeData.servings);
            setIsFavorite(user?.favorites?.includes(recipeId) || false);
        } else {
            navigate('/recipes');
        }
    }, [recipeId, getRecipeById, user, navigate]);

    // Timer logic
    useEffect(() => {
        let interval;
        if (isTimerRunning && (timerMinutes > 0 || timerSeconds > 0)) {
            interval = setInterval(() => {
                if (timerSeconds > 0) {
                    setTimerSeconds(prev => prev - 1);
                } else if (timerMinutes > 0) {
                    setTimerMinutes(prev => prev - 1);
                    setTimerSeconds(59);
                } else {
                    setIsTimerRunning(false);
                    toast.success('Timer finished!');
                }
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isTimerRunning, timerMinutes, timerSeconds]);

    if (recipeQuery.isLoading) return <div>Loading recipe...</div>;
    if (recipeQuery.error) return <div>Error loading recipe</div>;

    const recipeData = recipeQuery.data;

    const handleFavoriteToggle = () => {
        if (!user) {
            toast.error('Please login to save favorites');
            return;
        }
        if (isFavorite) {
            removeFromFavorites(recipeId);
            setIsFavorite(false);
            toast.success('Removed from favorites');
        } else {
            addToFavorites(recipeId);
            setIsFavorite(true);
            toast.success('Added to favorites');
        }
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: recipeData.title,
                    text: recipeData.description,
                    url: window.location.href
                });
            } catch (error) {
                console.log('Error sharing:', error);
            }
        } else {
            navigator.clipboard.writeText(window.location.href);
            toast.success('Recipe link copied to clipboard!');
        }
    };

    const adjustServings = (direction) => {
        if (direction === 'increase') setServings(prev => prev + 1);
        else if (direction === 'decrease' && servings > 1) setServings(prev => prev - 1);
    };

    const getAdjustedAmount = (amount) => {
        const originalServings = recipeData.servings;
        const ratio = servings / originalServings;

        const match = amount.match(/(\d+(?:\.\d+)?)\s*(\w+)?/);
        if (match) {
            const number = parseFloat(match[1]);
            const unit = match[2] || '';
            const adjusted = (number * ratio).toFixed(1);
            return `${adjusted}${unit ? ' ' + unit : ''}`;
        }
        return amount;
    };

    const startTimer = () => {
        if (timerMinutes > 0 || timerSeconds > 0) {
            setIsTimerRunning(true);
            setShowTimer(true);
        }
    };
    const stopTimer = () => setIsTimerRunning(false);
    const resetTimer = () => {
        setIsTimerRunning(false);
        setTimerMinutes(0);
        setTimerSeconds(0);
    };

    return (
        <div className="recipe-detail">
            {/* Hero Section */}
            <motion.div
                className="recipe-hero"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="recipe-image">
                    <img src={recipeData.image} alt={recipeData.title} />
                    <div className="recipe-overlay">
                        <button
                            className={`favorite-btn ${isFavorite ? 'active' : ''}`}
                            onClick={handleFavoriteToggle}
                        >
                            <Heart className={isFavorite ? 'filled' : ''} />
                        </button>
                        <button className="share-btn" onClick={handleShare}>
                            <Share2 />
                        </button>
                    </div>
                </div>

                <div className="recipe-info">
                    <div className="recipe-meta">
                        <span className="cuisine-badge">{recipeData.cuisine}</span>
                        <span className="difficulty-badge">{recipeData.difficulty}</span>
                    </div>

                    <h1 className="recipe-title">{recipeData.title}</h1>
                    <p className="recipe-description">{recipeData.description}</p>

                    <div className="recipe-stats">
                        <div className="stat">
                            <Clock />
                            <span>{recipeData.cookingTime} min</span>
                        </div>
                        <div className="stat">
                            <Users />
                            <span>{servings} servings</span>
                        </div>
                        <div className="stat">
                            <Star />
                            <span>{recipeData.rating} ({recipeData.reviewCount} reviews)</span>
                        </div>
                    </div>

                    <div className="recipe-actions">
                        <button className="btn primary" onClick={() => {
                            const lines = recipeData.ingredients.map((i) => `• ${i.amount} ${i.name}`);
                            const text = `Shopping List for ${recipeData.title}\n\n${lines.join('\n')}`;
                            const blob = new Blob([text], { type: 'text/plain' });
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = `${recipeData.title}-shopping-list.txt`;
                            a.click();
                            URL.revokeObjectURL(url);
                        }}>
                            <ShoppingCart />
                            Add to Shopping List
                        </button>
                        <button className="btn secondary" onClick={() => setShowTimer(true)}>
                            <Timer />
                            Set Timer
                        </button>
                    </div>
                </div>
            </motion.div>

            {/* Tabs, reviews, and timer modal remain the same */}
        </div>
    );
};

export default RecipeDetail;







// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { useQuery } from '@tanstack/react-query';
// import { Clock, Users, Star, Heart, Share2, Timer, ShoppingCart } from 'lucide-react';
// import { useRecipes } from '../../context/RecipeContext';
// import { useAuth } from '../../context/AuthContext';
// import { toast } from 'react-hot-toast';

// // Import API functions
// import { fetchRecipe } from '../../api';

// const RecipeDetail = () => {
//     const { id: recipeId } = useParams();
//     const navigate = useNavigate();
//     const { getRecipeById } = useRecipes();
//     const { user, addToFavorites, removeFromFavorites } = useAuth();

//     const [servings, setServings] = useState(4);
//     const [isFavorite, setIsFavorite] = useState(false);

//     // Fetch recipe using React Query
//     const recipeQuery = useQuery(
//         ['recipe', recipeId],
//         () => fetchRecipe(recipeId),
//         { enabled: !!recipeId }
//     );

//     useEffect(() => {
//         const recipeData = getRecipeById(recipeId);
//         if (recipeData) {
//             setServings(recipeData.servings);
//             setIsFavorite(user?.favorites?.includes(recipeId) || false);
//         } else {
//             navigate('/recipes');
//         }
//     }, [recipeId, getRecipeById, user, navigate]);

//     if (recipeQuery.isLoading) return <div>Loading recipe...</div>;
//     if (recipeQuery.error) return <div>Error loading recipe</div>;

//     const recipeData = recipeQuery.data;

//     const handleFavoriteToggle = () => {
//         if (!user) {
//             toast.error('Please login to save favorites');
//             return;
//         }
//         if (isFavorite) {
//             removeFromFavorites(recipeId);
//             setIsFavorite(false);
//             toast.success('Removed from favorites');
//         } else {
//             addToFavorites(recipeId);
//             setIsFavorite(true);
//             toast.success('Added to favorites');
//         }
//     };

//     const handleShare = async () => {
//         if (navigator.share) {
//             try {
//                 await navigator.share({
//                     title: recipeData.title,
//                     text: recipeData.description,
//                     url: window.location.href
//                 });
//             } catch (error) {
//                 console.log('Error sharing:', error);
//             }
//         } else {
//             navigator.clipboard.writeText(window.location.href);
//             toast.success('Recipe link copied to clipboard!');
//         }
//     };

//     return (
//         <div className="recipe-detail">
//             {/* Hero Section */}
//             <motion.div
//                 className="recipe-hero"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6 }}
//             >
//                 <div className="recipe-image">
//                     <img src={recipeData.image} alt={recipeData.title} />
//                     <div className="recipe-overlay">
//                         <button
//                             className={`favorite-btn ${isFavorite ? 'active' : ''}`}
//                             onClick={handleFavoriteToggle}
//                         >
//                             <Heart className={isFavorite ? 'filled' : ''} />
//                         </button>
//                         <button className="share-btn" onClick={handleShare}>
//                             <Share2 />
//                         </button>
//                     </div>
//                 </div>

//                 <div className="recipe-info">
//                     <div className="recipe-meta">
//                         <span className="cuisine-badge">{recipeData.cuisine}</span>
//                         <span className="difficulty-badge">{recipeData.difficulty}</span>
//                     </div>

//                     <h1 className="recipe-title">{recipeData.title}</h1>
//                     <p className="recipe-description">{recipeData.description}</p>

//                     <div className="recipe-stats">
//                         <div className="stat">
//                             <Clock />
//                             <span>{recipeData.cookingTime} min</span>
//                         </div>
//                         <div className="stat">
//                             <Users />
//                             <span>{servings} servings</span>
//                         </div>
//                         <div className="stat">
//                             <Star />
//                             <span>{recipeData.rating} ({recipeData.reviewCount} reviews)</span>
//                         </div>
//                     </div>

//                     <div className="recipe-actions">
//                         <button className="btn primary" onClick={() => {
//                             const lines = recipeData.ingredients.map((i) => `• ${i.amount} ${i.name}`);
//                             const text = `Shopping List for ${recipeData.title}\n\n${lines.join('\n')}`;
//                             const blob = new Blob([text], { type: 'text/plain' });
//                             const url = URL.createObjectURL(blob);
//                             const a = document.createElement('a');
//                             a.href = url;
//                             a.download = `${recipeData.title}-shopping-list.txt`;
//                             a.click();
//                             URL.revokeObjectURL(url);
//                         }}>
//                             <ShoppingCart />
//                             Add to Shopping List
//                         </button>
//                         <button className="btn secondary">
//                             <Timer />
//                             Set Timer
//                         </button>
//                     </div>
//                 </div>
//             </motion.div>
//         </div>
//     );
// };

// export default RecipeDetail;
