import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './CTFHeader.css';

const DiscordIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 245 240" focusable="false">
    <path
      d="M104.4 104.5c-5.7 0-10.2 4.9-10.2 11s4.6 11 10.2 11c5.7 0 10.2-4.9 10.2-11-.1-6.1-4.6-11-10.2-11zm36.2 0c-5.7 0-10.2 4.9-10.2 11s4.6 11 10.2 11c5.7 0 10.2-4.9 10.2-11s-4.5-11-10.2-11z"
      fill="currentColor"
    />
    <path
      d="M189.5 20h-134C44.2 20 35 29.2 35 40.5v134c0 11.3 9.2 20.5 20.5 20.5h114.1l-5.3-18.5 12.7 11.8 12 11.1 21.3 19V40.5C210 29.2 200.8 20 189.5 20zm-38.6 126.6s-3.6-4.3-6.6-8.1c13.1-3.7 18-11.8 18-11.8-4.1 2.7-8 4.6-11.5 5.9-5 2.1-9.8 3.4-14.5 4.2-9.6 1.8-18.4 1.3-25.9-.1-5.7-1.1-10.6-2.6-14.6-4.2-2.3-.9-4.8-2-7.3-3.3-.3-.2-.6-.3-.9-.5-.2-.1-.3-.2-.4-.2-.2-.1-.3-.2-.4-.3-1.8-1-2.8-1.7-2.8-1.7s4.8 8 17.5 11.7c-3 3.8-6.7 8.2-6.7 8.2-22.1-.7-30.5-15.1-30.5-15.1 0-31.9 14.3-57.9 14.3-57.9 14.3-10.7 27.9-10.4 27.9-10.4l1 1.2c-18 5.2-26.3 13.1-26.3 13.1s2.2-1.2 5.9-2.9c10.7-4.7 19.2-6 22.7-6.3.6-.1 1.1-.2 1.7-.2 6.1-.8 13-1 20.2-.2 9.5 1.1 19.7 3.9 30.1 9.6 0 0-7.9-7.5-24.9-12.7l1.4-1.6s13.6-.3 27.9 10.4c0 0 14.3 26 14.3 57.9 0-.1-8.4 14.3-30.5 15z"
      fill="currentColor"
    />
  </svg>
);

const TwitterIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false">
    <path
      d="M21.5 6.1c-.7.3-1.4.5-2.2.6.8-.5 1.4-1.2 1.7-2-.8.5-1.6.8-2.5 1-1.6-1.6-4.3-1.5-5.8.2-1.1 1.2-1.4 2.9-.8 4.3-3.3-.2-6.3-1.8-8.4-4.4-1.1 1.9-.6 4.4 1.3 5.7-.6 0-1.2-.2-1.7-.5 0 2.1 1.5 4 3.6 4.4-.4.1-.8.2-1.2.2-.3 0-.6 0-.9-.1.6 1.8 2.3 3.1 4.3 3.1-1.6 1.3-3.6 2-5.6 2h-.9c2.1 1.3 4.5 2 7 2 8.4 0 13-7.1 13-13.3v-.6c.9-.7 1.6-1.4 2.2-2.3z"
      fill="currentColor"
    />
  </svg>
);

const BellIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false">
    <path
      d="M12 22a2 2 0 0 0 2-2h-4a2 2 0 0 0 2 2zm6-6V11a6 6 0 0 0-5-5.9V4a1 1 0 1 0-2 0v1.1A6 6 0 0 0 6 11v5l-2 2v1h16v-1l-2-2z"
      fill="currentColor"
    />
  </svg>
);

const ChevronDownIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false">
    <path d="M7 10l5 5 5-5H7z" fill="currentColor" />
  </svg>
);

export default function CTFHeader() {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const userInitials = useMemo(() => {
    if (!user?.team_name) return 'CT';
    return user.team_name
      .split(' ')
      .map(part => part.charAt(0).toUpperCase())
      .slice(0, 2)
      .join('');
  }, [user]);

  return (
    <header className={`ctf-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="ctf-header-inner">
        <div className="ctf-left">
          <Link to="/" className="brand-link" aria-label="Go to homepage">
            <span className="brand-text">Cyberctf</span>
          </Link>
          <div className="ctf-social">
          </div>
        </div>

        <nav className="ctf-nav" aria-label="Primary">
          <Link to="/challenge" className="nav-link has-chevron">
            <span>Challenges</span>
            <ChevronDownIcon />
          </Link>
          <Link to="/leaderboard" className="nav-link">
            Scoreboard
          </Link>
        </nav>

        <div className="ctf-actions">
          <button 
            className="notification-btn" 
            aria-label="Notifications"
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit' }}
          >
            <BellIcon />
          </button>
          <div className="user-menu" style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={handleLogout}
              className="logout-btn"
              style={{
                padding: '8px 16px',
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid #ef4444',
                borderRadius: '8px',
                color: '#ef4444',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#ef4444';
                e.target.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(239, 68, 68, 0.1)';
                e.target.style.color = '#ef4444';
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}