import React, { useEffect, useState } from 'react';
import { Link, Navigate, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ExternalLink, LogOut, Menu, Package, Shield, X } from 'lucide-react';
import { adminLogout, adminMe } from '../../api/productsApi';
import { JAVION_LOGO } from '../../mock';
import '../Admin.css';

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  useEffect(() => {
    let cancelled = false;
    setReady(false);
    setError('');

    adminMe()
      .then((me) => {
        if (!cancelled) setUser(me);
      })
      .catch(() => {
        if (!cancelled) {
          setUser(null);
          setError('Session expired. Please sign in again.');
        }
      })
      .finally(() => {
        if (!cancelled) setReady(true);
      });

    return () => {
      cancelled = true;
    };
  }, [location.key]);

  const logout = async () => {
    await adminLogout();
    setUser(null);
    navigate('/admin/login');
  };

  const displayName = (() => {
    const raw = String(user?.username || '').split('@')[0].trim();
    if (!raw) return 'Admin';
    return raw.charAt(0).toUpperCase() + raw.slice(1);
  })();

  if (!ready) {
    return (
      <div className="admin-shell">
        <p className="admin-muted">Loading admin…</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  }

  const onSecurityPage = location.pathname === '/admin/security';
  if (user.must_change_password && !onSecurityPage) {
    return <Navigate to="/admin/security" replace />;
  }

  return (
    <div className="admin-shell">
      <header className="admin-top">
        <div className="admin-top-left">
          <Link to="/admin" className="admin-brand" aria-label="Javion Admin home">
            <img
              src={JAVION_LOGO}
              alt="Javion Fasteners"
              className="admin-brand-logo"
              draggable={false}
            />
          </Link>

          <nav className="admin-nav-links" aria-label="Admin">
            <NavLink
              to="/admin"
              end
              className={({ isActive }) => `admin-nav-link${isActive ? ' is-active' : ''}`}
            >
              <Package size={14} strokeWidth={2} aria-hidden />
              Products
            </NavLink>
            <NavLink
              to="/admin/security"
              className={({ isActive }) => `admin-nav-link${isActive ? ' is-active' : ''}`}
            >
              <Shield size={14} strokeWidth={2} aria-hidden />
              Security
            </NavLink>
            <Link
              to="/products"
              className="admin-nav-link"
              target="_blank"
              rel="noreferrer"
            >
              <ExternalLink size={14} strokeWidth={2} aria-hidden />
              View site
            </Link>
          </nav>
        </div>

        <div className="admin-top-actions">
          {error ? <p className="admin-error admin-top-alert">{error}</p> : null}
          {user.must_change_password ? (
            <p className="admin-error admin-top-alert">Change your password to continue.</p>
          ) : null}
          <span className="admin-muted admin-user-chip" title={user.username}>
            {displayName}
          </span>
          <button type="button" className="admin-btn admin-btn--ghost admin-btn--compact" onClick={logout}>
            <LogOut size={14} strokeWidth={2} aria-hidden />
            Log out
          </button>
          <button
            type="button"
            className="admin-nav-burger"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X size={18} strokeWidth={2} /> : <Menu size={18} strokeWidth={2} />}
          </button>
        </div>
      </header>

      {menuOpen ? (
        <div className="admin-nav-drawer">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) => `admin-nav-drawer-link${isActive ? ' is-active' : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            <Package size={15} strokeWidth={2} aria-hidden />
            Products
          </NavLink>
          <NavLink
            to="/admin/security"
            className={({ isActive }) => `admin-nav-drawer-link${isActive ? ' is-active' : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            <Shield size={15} strokeWidth={2} aria-hidden />
            Security
          </NavLink>
          <Link
            to="/products"
            className="admin-nav-drawer-link"
            target="_blank"
            rel="noreferrer"
            onClick={() => setMenuOpen(false)}
          >
            <ExternalLink size={15} strokeWidth={2} aria-hidden />
            View site
          </Link>
          <button type="button" className="admin-nav-drawer-link admin-nav-drawer-link--btn" onClick={logout}>
            <LogOut size={15} strokeWidth={2} aria-hidden />
            Log out
          </button>
        </div>
      ) : null}

      <main className={`admin-main${onSecurityPage ? ' admin-main--center' : ''}`}>
        <Outlet context={{ user, setUser }} />
      </main>
    </div>
  );
}
