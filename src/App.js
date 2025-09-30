import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'

import { AuthProvider } from "./context/AuthContext"
import { RecipeProvider } from "./context/RecipeContext"

import Navbar from "./components/Navbar"
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Recipes from "./pages/Recipes";
import Settings from "./pages/Settings";
import AuthPage from "./pages/auth/AuthPage";
import RecipeDetail from "./pages/recipe/RecipeDetail";

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RecipeProvider>
          <Router>
            <Navbar />
            <div className="container main">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/recipes" element={<Recipes />} />
                <Route path="/recipe/:id" element={<RecipeDetail />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/auth" element={<AuthPage />} />
              </Routes>
            </div>
            <Footer />
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: 'var(--background-light)',
                  color: 'var(--text-color)',
                  border: '1px solid var(--shadow-color)',
                },
              }}
            />
          </Router>
        </RecipeProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App;
