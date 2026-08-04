import React, { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { adminChangePassword } from '../../api/productsApi';

const MIN_LEN = 10;

function passwordStrengthError(password) {
  if (!password) return 'New password is required.';
  if (password.length < MIN_LEN) return `Password must be at least ${MIN_LEN} characters.`;
  if (!/[A-Z]/.test(password)) return 'Include at least one uppercase letter.';
  if (!/[a-z]/.test(password)) return 'Include at least one lowercase letter.';
  if (!/[0-9]/.test(password)) return 'Include at least one number.';
  if (!/[^A-Za-z0-9]/.test(password)) return 'Include at least one symbol (e.g. !@#$).';
  return '';
}

function mapApiErrorToFields(message) {
  const msg = String(message || '');
  const lower = msg.toLowerCase();
  if (lower.includes('current password')) {
    return { currentPassword: msg, form: '' };
  }
  if (
    lower.includes('uppercase') ||
    lower.includes('lowercase') ||
    lower.includes('number') ||
    lower.includes('symbol') ||
    lower.includes('at least') ||
    lower.includes('different from')
  ) {
    return { newPassword: msg, form: '' };
  }
  if (lower.includes('confirm') || lower.includes('match')) {
    return { confirmPassword: msg, form: '' };
  }
  return { form: msg || 'Could not update password.' };
}

export default function AdminSecurity() {
  const navigate = useNavigate();
  const { user, setUser } = useOutletContext() || {};
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [formError, setFormError] = useState('');
  const [success, setSuccess] = useState('');
  const [saving, setSaving] = useState(false);

  const clearField = (name) => {
    setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    setFormError('');
  };

  const fieldErrorFor = (name) => {
    if (name === 'currentPassword') {
      return currentPassword ? '' : 'Current password is required.';
    }
    if (name === 'newPassword') {
      const strength = passwordStrengthError(newPassword);
      if (strength) return strength;
      if (currentPassword && newPassword === currentPassword) {
        return 'New password must be different from the current password.';
      }
      return '';
    }
    if (name === 'confirmPassword') {
      if (!confirmPassword) return 'Please confirm your new password.';
      if (newPassword && confirmPassword !== newPassword) return 'Passwords do not match.';
      return '';
    }
    return '';
  };

  const markTouched = (name) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    const message = fieldErrorFor(name);
    setFieldErrors((prev) => ({ ...prev, [name]: message || undefined }));
  };

  const validate = () => {
    const errors = {};
    const currentErr = fieldErrorFor('currentPassword');
    const newErr = fieldErrorFor('newPassword');
    const confirmErr = fieldErrorFor('confirmPassword');
    if (currentErr) errors.currentPassword = currentErr;
    if (newErr) errors.newPassword = newErr;
    if (confirmErr) errors.confirmPassword = confirmErr;
    return errors;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    setFormError('');
    const errors = validate();
    setFieldErrors(errors);
    setTouched({ currentPassword: true, newPassword: true, confirmPassword: true });
    if (Object.keys(errors).length) return;

    setSaving(true);
    try {
      await adminChangePassword(currentPassword, newPassword);
      setSuccess('Password updated. Redirecting…');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setFieldErrors({});
      setTouched({});
      if (setUser && user) {
        setUser({ ...user, must_change_password: false });
      }
      setTimeout(() => navigate('/admin', { replace: true }), 700);
    } catch (err) {
      const mapped = mapApiErrorToFields(err.message);
      setFieldErrors((prev) => ({
        ...prev,
        currentPassword: mapped.currentPassword,
        newPassword: mapped.newPassword,
        confirmPassword: mapped.confirmPassword,
      }));
      setFormError(mapped.form || '');
    } finally {
      setSaving(false);
    }
  };

  const show = (name) => Boolean(touched[name] && fieldErrors[name]);

  return (
    <form className="admin-card admin-security-card" onSubmit={onSubmit} noValidate>
      <div className="admin-eyebrow">Account</div>
      <h1 className="admin-title">Change password</h1>
      <p className="admin-muted">
        Use 10+ characters with upper, lower, number, and a symbol.
      </p>

      <label className="admin-label">
        Current password
        <input
          className={`admin-input ${show('currentPassword') ? 'is-invalid' : ''}`}
          type="password"
          value={currentPassword}
          onChange={(e) => {
            setCurrentPassword(e.target.value);
            clearField('currentPassword');
          }}
          onBlur={() => markTouched('currentPassword')}
          autoComplete="current-password"
        />
        {show('currentPassword') ? (
          <span className="admin-field-error">{fieldErrors.currentPassword}</span>
        ) : null}
      </label>

      <label className="admin-label">
        New password
        <input
          className={`admin-input ${show('newPassword') ? 'is-invalid' : ''}`}
          type="password"
          value={newPassword}
          onChange={(e) => {
            setNewPassword(e.target.value);
            clearField('newPassword');
            if (touched.confirmPassword && confirmPassword && e.target.value !== confirmPassword) {
              setFieldErrors((prev) => ({ ...prev, confirmPassword: 'Passwords do not match.' }));
            } else if (touched.confirmPassword) {
              setFieldErrors((prev) => ({ ...prev, confirmPassword: undefined }));
            }
          }}
          onBlur={() => markTouched('newPassword')}
          autoComplete="new-password"
        />
        {show('newPassword') ? (
          <span className="admin-field-error">{fieldErrors.newPassword}</span>
        ) : null}
      </label>

      <label className="admin-label">
        Confirm new password
        <input
          className={`admin-input ${show('confirmPassword') ? 'is-invalid' : ''}`}
          type="password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            clearField('confirmPassword');
          }}
          onBlur={() => markTouched('confirmPassword')}
          autoComplete="new-password"
        />
        {show('confirmPassword') ? (
          <span className="admin-field-error">{fieldErrors.confirmPassword}</span>
        ) : null}
      </label>

      {formError ? <p className="admin-error">{formError}</p> : null}
      {success ? <p className="admin-success">{success}</p> : null}

      <button type="submit" className="admin-btn" disabled={saving}>
        {saving ? 'Updating…' : 'Update password'}
      </button>
    </form>
  );
}
