import React, { useState } from 'react';
import { FaWindowClose } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './AddModal.css';

interface AccountModalProps {
  isOpen: boolean;
  closeModal: () => void;
  accountProps: (account: { username: string; password: string; email: string }) => void; // För uppdatering av konto
}

export default function AccountModal({ isOpen, closeModal, accountProps }: AccountModalProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [buttonShake, setButtonShake] = useState(false);
  const [formError, setFormError] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false); // Lägger till laddningsindikator
  const navigate = useNavigate();

  if (!isOpen) return null;

  async function handleUpdateAccount(e: React.FormEvent) {
    e.preventDefault();

    // Kontrollera att minst ett fält är ifyllt
    if (!username && !password && !email) {
      setFormError('Please enter something to update');
      setButtonShake(true);
      setTimeout(() => setButtonShake(false), 500); // Ta bort skakning efter 500ms
      return;
    }

    // Kontrollera att lösenorden matchar
    if (password !== confirmPassword) {
      setFormError('Passwords do not match');
      setButtonShake(true);
      setTimeout(() => setButtonShake(false), 500);
      return;
    }

    // Rensa tidigare felmeddelanden och sätt laddningsstatus
    setFormError('');
    setLoading(true);

    // Hämta userId från localStorage
    const authorId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    if (!authorId) {
      setFormError('No user ID found, please log in again');
      setLoading(false);
      return;
    }

    const updatedAccount = {
      username,
      password,
      email,
    };

    // Skicka uppdaterad information till backend
    try {
      const response = await fetch(`http://localhost:3000/dnd_todo/users/${authorId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updatedAccount),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Update successful', data);
        alert("Account updated successfully");
      } else {
        throw new Error('Something went wrong with the update ¯\\_(ツ)_/¯');
      }
    } catch (error) {
      console.log('Error', error);
      setFormError('Failed to update account');
    } finally {
      setLoading(false); // Sätt laddningsstatus till false
    }

    // Reset form och stäng modal
    setUsername('');
    setPassword('');
    setEmail('');
    closeModal();
  }

  function handleLogout(e: React.FormEvent) {
    e.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/login');
  }

  return (
    <>
      <div className="modal-overlay">
        <div className="modal-content">
          <div className="modal-header">
            <h2>Account</h2>
            <button onClick={closeModal} className="close-modal-btn">
              <FaWindowClose />
            </button>
          </div>
          <form className="add-form" onSubmit={handleUpdateAccount}>
            <div className="input-container">
              <label htmlFor="username">Change username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)} // Uppdaterar användarnamnet
              />
            </div>
            <div className="input-container">
              <label htmlFor="password">Change password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Uppdaterar lösenordet
              />
            </div>
            <div className="input-container">
              <label htmlFor="confirmPasswordInput">Confirm password</label>
              <input
                type="password"
                id="confirmPasswordInput"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)} // Bekräftar lösenord
              />
            </div>
            <div className="input-container">
              <label htmlFor="email">Change email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Uppdaterar e-posten
              />
            </div>

            <div className="todo-submit-btn-container">
              <button
                type="submit"
                className={`submit-btn ${buttonShake ? 'shake-horizontal' : ''}`} // Lägger till skakningsklass om fel
                disabled={loading} // Inaktiverar knappen vid laddning
              >
                {loading ? 'Updating...' : 'Update account'}
              </button>
              <button type="button" id="logout-btn" onClick={handleLogout}>
                Log out
              </button>
            </div>
            {/* Visa formfel */}
            {formError && <p className="error-message">{formError}</p>}
          </form>
        </div>
      </div>
    </>
  );
}
