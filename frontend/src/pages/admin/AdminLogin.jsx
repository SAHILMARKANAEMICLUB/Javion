import React, { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { adminLogin, adminMe } from '../../api/productsApi';
import Seo from '../../components/Seo';
import { PAGE_SEO } from '../../seo/site';
import '../Admin.css';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [alreadyIn, setAlreadyIn] = useState(false);

  useEffect(() => {
    let cancelled = false;
    adminMe()
      .then(() => {
        if (!cancelled) {
          setAlreadyIn(true);
          navigate('/admin', { replace: true });
        }
      })
      .catch(() => {
        if (!cancelled) setAlreadyIn(false);
      })
      .finally(() => {
        if (!cancelled) setChecking(false);
      });
    return () => {
      cancelled = true;
    };
  }, [navigate]);

  if (checking) {
    return (
      <div className="admin-shell admin-shell--center">
        <p className="admin-muted">Checking session…</p>
      </div>
    );
  }

  if (alreadyIn) {
    return <Navigate to="/admin" replace />;
  }

  const validate = () => {
    const errors = {};
    if (!email.trim()) errors.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errors.email = 'Enter a valid email address.';
    }
    if (!password) errors.password = 'Password is required.';
    return errors;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    setFieldErrors(errors);
    setTouched({ email: true, password: true });
    if (Object.keys(errors).length) {
      setError('');
      return;
    }

    setError('');
    setLoading(true);
    try {
      await adminLogin(email.trim(), password);
      navigate('/admin', { replace: true });
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-shell admin-shell--center">
      <Seo {...PAGE_SEO.admin} title="Admin Login" />
      <form className="admin-card" onSubmit={onSubmit} noValidate>
        <div className="admin-eyebrow">Admin</div>
        <h1 className="admin-title">Sign in</h1>
        <p className="admin-muted">Use your Supabase admin email and password.</p>

        <label className="admin-label">
          Email
          <input
            className={`admin-input ${touched.email && fieldErrors.email ? 'is-invalid' : ''}`}
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setFieldErrors((prev) => ({ ...prev, email: undefined }));
            }}
            onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
            autoComplete="username"
          />
          {touched.email && fieldErrors.email ? (
            <span className="admin-field-error">{fieldErrors.email}</span>
          ) : null}
        </label>

        <label className="admin-label">
          Password
          <input
            className={`admin-input ${touched.password && fieldErrors.password ? 'is-invalid' : ''}`}
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setFieldErrors((prev) => ({ ...prev, password: undefined }));
            }}
            onBlur={() => setTouched((prev) => ({ ...prev, password: true }))}
            autoComplete="current-password"
          />
          {touched.password && fieldErrors.password ? (
            <span className="admin-field-error">{fieldErrors.password}</span>
          ) : null}
        </label>

        {error && <p className="admin-error">{error}</p>}

        <button type="submit" className="admin-btn" disabled={loading}>
          {loading ? 'Signing in…' : 'Sign in'}
        </button>

        <Link to="/home" className="admin-link admin-back">
          ← Back to site
        </Link>
      </form>
    </div>
  );
}
