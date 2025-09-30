# 🍳 FoodiesHub - Recipe App

A modern, full-featured recipe application built with React 19, featuring advanced search, user authentication, and interactive cooking features.

## ✨ Features

### 🔍 Search & Discovery
- Advanced search with multiple filters
- Filter by cuisine, difficulty, cooking time, and tags
- Trending and popular recipes sections
- Smart search across titles, descriptions, and tags

### 👤 User Features
- User authentication (login/signup)
- User profiles with avatars
- Favorites and personal recipe collections
- Recipe rating and review system

### 🍽️ Recipe Management
- Detailed recipe pages with full instructions
- Ingredient lists with measurements
- Step-by-step cooking instructions
- Nutritional information
- Cooking time and difficulty indicators
- Recipe categories and tags

### 🛠️ Interactive Features
- Shopping list generator
- Recipe scaling (adjust servings)
- Built-in cooking timer
- Photo upload support
- Recipe sharing on social media

### 🎨 Modern UI/UX
- Responsive design for all devices
- Dark/light theme support
- Smooth animations and transitions
- Modern, clean interface
- Accessibility compliant

## 🚀 Tech Stack

- **React 19.1.1** - Latest React with createRoot API
- **React Router 7.9.3** - Client-side routing
- **Tailwind CSS 3.4.0** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Hook Form** - Form management
- **React Query** - Data fetching and caching
- **Lucide React** - Modern icon library
- **React Hot Toast** - Notification system

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/react-recipe-app.git
cd react-recipe-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## 🏗️ Build for Production

```bash
npm run build
```

This builds the app for production to the `build` folder.

## 🌐 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Vercel will automatically deploy your app

### Netlify
1. Build your project: `npm run build`
2. Upload the `build` folder to Netlify
3. Configure build settings if needed

### Other Platforms
- **Heroku**: Use the `create-react-app-buildpack`
- **AWS S3**: Upload the `build` folder to an S3 bucket
- **GitHub Pages**: Use `gh-pages` package

## 📱 Pages

- **Home** (`/`) - Landing page with hero section and featured content
- **Recipes** (`/recipes`) - Browse and search all recipes
- **Recipe Detail** (`/recipe/:id`) - Individual recipe page
- **Authentication** (`/auth`) - Login and registration
- **Settings** (`/settings`) - User preferences and theme settings

## 🎯 Key Components

- **AdvancedSearch** - Multi-criteria search and filtering
- **RecipeCard** - Enhanced recipe preview cards
- **RecipeDetail** - Comprehensive recipe view
- **AuthForms** - Login and registration forms
- **UserProfile** - User management and preferences

## 🔧 Configuration

The app uses environment variables for configuration. Create a `.env` file in the root directory:

```env
REACT_APP_API_URL=your_api_url_here
REACT_APP_APP_NAME=FoodiesHub
```

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.

---

Made with ❤️ and React