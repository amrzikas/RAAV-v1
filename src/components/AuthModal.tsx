import { motion, AnimatePresence } from 'motion/react';
import { X, Lock, Mail, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '../context/ToastContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { addToast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      // Mock login/registration success
      addToast(isLogin ? 'Successfully logged in!' : 'Account created successfully!', 'success');
      
      // Clear form and close
      setEmail('');
      setPassword('');
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-[80] backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white z-[90] shadow-2xl overflow-hidden"
          >
            {/* Header / Tabs */}
            <div className="flex border-b border-gray-100">
              <button 
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-4 text-sm font-bold uppercase tracking-widest transition-colors ${isLogin ? 'bg-white text-black' : 'bg-gray-50 text-gray-400 hover:text-black'}`}
              >
                Sign In
              </button>
              <button 
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-4 text-sm font-bold uppercase tracking-widest transition-colors ${!isLogin ? 'bg-white text-black' : 'bg-gray-50 text-gray-400 hover:text-black'}`}
              >
                Register
              </button>
              <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-black transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form Content */}
            <div className="p-8">
              <h2 className="text-2xl font-serif font-bold mb-2">
                {isLogin ? 'Welcome Back' : 'Create an Account'}
              </h2>
              <p className="text-sm font-light text-gray-500 mb-8">
                {isLogin ? 'Sign in to access your orders and wishlist.' : 'Join us to track orders and save your favorites.'}
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div>
                    <label className="block text-xs font-medium text-gray-700 uppercase tracking-wider mb-2">Full Name</label>
                    <input type="text" required className="w-full border border-gray-300 px-4 py-3 outline-none focus:border-black transition-colors" />
                  </div>
                )}
                
                <div>
                  <label className="block text-xs font-medium text-gray-700 uppercase tracking-wider mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input 
                      type="email" 
                      required 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full border border-gray-300 pl-10 pr-4 py-3 outline-none focus:border-black transition-colors" 
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-xs font-medium text-gray-700 uppercase tracking-wider">Password</label>
                    {isLogin && <a href="#" className="text-xs text-gray-500 hover:text-black underline transition-colors">Forgot password?</a>}
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input 
                      type="password" 
                      required 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full border border-gray-300 pl-10 pr-4 py-3 outline-none focus:border-black transition-colors" 
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button type="submit" className="w-full bg-black text-white h-12 flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors">
                    {isLogin ? 'Sign In' : 'Create Account'} <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
            
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
