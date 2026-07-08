import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Settings, DollarSign, Images, Star, MessageSquare, LogOut, Menu, X, ChevronDown } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const navItems = [
  { to: '/admin', icon: LayoutDashboard, label: 'Genel Bakış', end: true },
  { to: '/admin/ayarlar', icon: Settings, label: 'Site Ayarları' },
  { to: '/admin/fiyatlar', icon: DollarSign, label: 'Fiyatlar' },
  { to: '/admin/galeri', icon: Images, label: 'Galeri' },
  { to: '/admin/yorumlar', icon: Star, label: 'Yorumlar' },
  { to: '/admin/mesajlar', icon: MessageSquare, label: 'Mesajlar' },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar overlay (mobile) */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/30 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 lg:transform-none ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="h-16 flex items-center gap-2 px-5 border-b border-gray-100">
            <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <line x1="3" y1="8" x2="21" y2="8" />
                <line x1="3" y1="13" x2="21" y2="13" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </div>
            <div>
              <span className="text-base font-bold text-gray-900">Admin Panel</span>
              <p className="text-xs text-gray-400">PanjurMax</p>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden ml-auto p-1">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav */}
          <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-brand-50 text-brand-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`
                }
              >
                <item.icon className="w-5 h-5 shrink-0" />
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* User info */}
          <div className="border-t border-gray-100 p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold text-gray-600">
                {user?.email?.[0].toUpperCase() || 'A'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{user?.email}</p>
              </div>
              <button onClick={handleLogout} className="p-1.5 text-gray-400 hover:text-red-500 transition-colors" title="Çıkış">
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar (mobile) */}
        <header className="lg:hidden h-14 bg-white border-b border-gray-200 flex items-center px-4 gap-3">
          <button onClick={() => setSidebarOpen(true)} className="p-1">
            <Menu className="w-6 h-6 text-gray-600" />
          </button>
          <span className="font-semibold text-sm text-gray-900">Admin Panel</span>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
