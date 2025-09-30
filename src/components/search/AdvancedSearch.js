import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, X, Clock, ChefHat, Tag } from 'lucide-react';
import { useRecipes } from '../../context/RecipeContext';

const AdvancedSearch = ({ onSearch }) => {
    const { filterRecipes, filters } = useRecipes();
    const [showFilters, setShowFilters] = useState(false);
    const [searchQuery, setSearchQuery] = useState(filters.search || '');

    const cuisines = ['Italian', 'American', 'Indian', 'Japanese', 'Mexican', 'French', 'Chinese', 'Thai'];
    const difficulties = ['Easy', 'Medium', 'Hard'];
    const cookingTimes = [
        { label: 'Quick (0-30 min)', value: 'quick' },
        { label: 'Medium (31-60 min)', value: 'medium' },
        { label: 'Long (60+ min)', value: 'long' }
    ];
    const popularTags = ['vegetarian', 'vegan', 'gluten-free', 'dairy-free', 'keto', 'low-carb', 'high-protein', 'comfort food', 'healthy', 'quick', 'dessert', 'breakfast', 'lunch', 'dinner'];

    const handleSearch = (e) => {
        e.preventDefault();
        const newFilters = {
            ...filters,
            search: searchQuery
        };
        filterRecipes(newFilters);
        onSearch?.(newFilters);
    };

    const handleFilterChange = (filterType, value) => {
        const newFilters = {
            ...filters,
            [filterType]: value
        };
        filterRecipes(newFilters);
        onSearch?.(newFilters);
    };

    const handleTagToggle = (tag) => {
        const newTags = filters.tags.includes(tag)
            ? filters.tags.filter(t => t !== tag)
            : [...filters.tags, tag];

        const newFilters = {
            ...filters,
            tags: newTags
        };
        filterRecipes(newFilters);
        onSearch?.(newFilters);
    };

    const clearFilters = () => {
        const clearedFilters = {
            cuisine: '',
            difficulty: '',
            cookingTime: '',
            search: '',
            tags: []
        };
        setSearchQuery('');
        filterRecipes(clearedFilters);
        onSearch?.(clearedFilters);
    };

    const activeFiltersCount = Object.values(filters).filter(value =>
        value && (Array.isArray(value) ? value.length > 0 : true)
    ).length;

    return (
        <div className="advanced-search">
            <form onSubmit={handleSearch} className="search-form">
                <div className="search-input-group">
                    <Search className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search recipes, ingredients, or chefs..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input"
                    />
                    <button type="submit" className="search-btn">
                        Search
                    </button>
                </div>

                <button
                    type="button"
                    className="filter-toggle"
                    onClick={() => setShowFilters(!showFilters)}
                >
                    <Filter />
                    Filters
                    {activeFiltersCount > 0 && (
                        <span className="filter-count">{activeFiltersCount}</span>
                    )}
                </button>
            </form>

            {showFilters && (
                <motion.div
                    className="filters-panel"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                >
                    <div className="filters-header">
                        <h3>Filter Recipes</h3>
                        <button onClick={clearFilters} className="clear-filters">
                            <X /> Clear All
                        </button>
                    </div>

                    <div className="filters-grid">
                        {/* Cuisine Filter */}
                        <div className="filter-group">
                            <label className="filter-label">
                                <ChefHat className="filter-icon" />
                                Cuisine
                            </label>
                            <div className="filter-options">
                                {cuisines.map(cuisine => (
                                    <button
                                        key={cuisine}
                                        type="button"
                                        className={`filter-option ${filters.cuisine === cuisine ? 'active' : ''}`}
                                        onClick={() => handleFilterChange('cuisine', filters.cuisine === cuisine ? '' : cuisine)}
                                    >
                                        {cuisine}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Difficulty Filter */}
                        <div className="filter-group">
                            <label className="filter-label">
                                <ChefHat className="filter-icon" />
                                Difficulty
                            </label>
                            <div className="filter-options">
                                {difficulties.map(difficulty => (
                                    <button
                                        key={difficulty}
                                        type="button"
                                        className={`filter-option ${filters.difficulty === difficulty ? 'active' : ''}`}
                                        onClick={() => handleFilterChange('difficulty', filters.difficulty === difficulty ? '' : difficulty)}
                                    >
                                        {difficulty}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Cooking Time Filter */}
                        <div className="filter-group">
                            <label className="filter-label">
                                <Clock className="filter-icon" />
                                Cooking Time
                            </label>
                            <div className="filter-options">
                                {cookingTimes.map(time => (
                                    <button
                                        key={time.value}
                                        type="button"
                                        className={`filter-option ${filters.cookingTime === time.value ? 'active' : ''}`}
                                        onClick={() => handleFilterChange('cookingTime', filters.cookingTime === time.value ? '' : time.value)}
                                    >
                                        {time.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Tags Filter */}
                        <div className="filter-group">
                            <label className="filter-label">
                                <Tag className="filter-icon" />
                                Tags
                            </label>
                            <div className="tags-container">
                                {popularTags.map(tag => (
                                    <button
                                        key={tag}
                                        type="button"
                                        className={`tag ${filters.tags.includes(tag) ? 'active' : ''}`}
                                        onClick={() => handleTagToggle(tag)}
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default AdvancedSearch;
