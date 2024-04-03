import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if email and password are provided
        if (!email || !password) {
            setErrorMessage('Please enter both email and password.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/login', { email, password });

            if (response.status === 200) {
                navigate('/allBooks');
            } else {
                console.log('Login failed:', response.data.message);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }

        console.log('email:', email);
        console.log('Password:', password);
    };

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <div className="login-form p-4 border rounded">
                <h3 className="text-center">Login</h3>
                <Form onSubmit={handleSubmit} className="mt-3">
                    {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                    <Form.Group controlId="formUsername">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="w-100 mt-3">
                        Login
                    </Button>
                </Form>
            </div>
        </Container>
    );
};

export default Login;
