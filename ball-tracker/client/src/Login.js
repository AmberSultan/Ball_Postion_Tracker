import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ setToken }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/login', { username, password });
            setToken(response.data.token);
            setError('');
        } catch (err) {
            setError('Invalid credentials');
        }
        setIsLoading(false);
    };

    return (
        <div style={{ marginTop: '20px' }}> 
        <form onSubmit={handleSubmit} style={{ maxWidth: '300px', margin: 'auto' }}>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required
                style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
            />
            <input type="password"value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
            />
            <button type="submit" disabled={isLoading} style={{ width: '107%', padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                {isLoading ? 'Logging in...' : 'Login'}
            </button>
            {error && <p style={{ color: 'red', fontWeight: '100', marginTop: '10px' }}>{error}</p>}
        </form>
        </div>
    );
};

export default Login;
