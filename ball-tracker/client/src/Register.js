import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/register', { username, password });
            alert('Registration successful');
        } catch (err) {
            console.error('Registration error');
        }
    };

    return (
        <div style={{ marginTop: '20px' }}> 
        <form onSubmit={handleSubmit} style={{ maxWidth: '300px', margin: 'auto' }}>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" 
                style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
            />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"
            style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
            <button type="submit">Register</button>
        </form>
        </div>
    );
};

export default Register;
