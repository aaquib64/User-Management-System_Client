


import { useEffect, useState } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import './MyProfile.css';

const MyProfile = () => {
  const { user: currentUser, login } = useAuth();
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({ name:'', password:'' });
  const [msg, setMsg] = useState('');

  useEffect(() => {
    api.get('/users/me').then(({ data }) => {
      setProfile(data);
      setForm({ name: data.name, password: '' });
    });
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const payload = { name: form.name };
      if (form.password) payload.password = form.password;
      const { data } = await api.put('/users/me', payload);
      login({ ...currentUser, name: data.name });
      setMsg('Profile updated successfully!');
      setTimeout(() => setMsg(''), 3000);
    } catch (err) {
      setMsg(err.response?.data?.message || 'Error updating profile');
    }
  };

  if (!profile) return <p className="profile-loading">Loading...</p>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-avatar">
          {profile.name?.[0]?.toUpperCase()}
        </div>

        <h2 className="profile-name">{profile.name}</h2>
        <p className="profile-email">{profile.email}</p>

        <span
          className={`profile-badge ${
            profile.role === 'admin'
              ? 'admin'
              : profile.role === 'manager'
              ? 'manager'
              : 'user'
          }`}
        >
          {profile.role}
        </span>

        <hr className="profile-divider" />

        <div className="profile-audit-box">
          <p className="profile-audit">
            Created: {new Date(profile.createdAt).toLocaleDateString()}
          </p>
          <p className="profile-audit">
            Last updated: {new Date(profile.updatedAt).toLocaleDateString()}
          </p>
          {profile.updatedBy && (
            <p className="profile-audit">
              Updated by: {profile.updatedBy.name}
            </p>
          )}
        </div>

        <hr className="profile-divider" />

        <h3 className="profile-edit-title">Edit Profile</h3>

        {msg && <p className="profile-msg">{msg}</p>}

        <form onSubmit={handleSave}>
          <input
            className="profile-input"
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
          />

          <input
            className="profile-input"
            type="password"
            placeholder="New password (leave blank to keep)"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
          />

          <button className="profile-btn" type="submit">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default MyProfile;