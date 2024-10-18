import React, { useState, useEffect } from 'react';
import styles from './login-page.module.css';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isValidLogin, setIsValidLogin] = useState(false);
    const [loading, setLoading] = useState(false);
    const [animateExpand, setAnimateExpand] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', { email, password });

        if (email === 'user@example.com' && password === 'password') {
            setLoading(true);
            console.log('Valid credentials, loading...');
            setTimeout(() => {
                setAnimateExpand(true); 
                console.log('Animation should start now');
                setTimeout(() => {
                    console.log('Animation finished, setting isValidLogin to true');
                    setIsValidLogin(true);
                    setLoading(false);
                }, 1500); 
            }, 1000); 
        } else {
            console.log('Invalid credentials');
            alert('Invalid login credentials');
        }
    };

    useEffect(() => {
        console.log('Rendering, isValidLogin:', isValidLogin, 'loading:', loading, 'animateExpand:', animateExpand);
    }, [isValidLogin, loading, animateExpand]);

    return (
        <div className={styles.pageContainer}>
            <div className={`${styles.loginContainer} ${animateExpand ? styles.expandLeft : ''}`}>
                <div className={styles.leftSide}>
                    {!isValidLogin && (
                        <>
                            <h1 className={styles.welcomeText}>Welcome Back to Dream Team!</h1>
                            <p className={styles.welcomeSubText}>We kept your stuff safe while you were gone.</p>
                        </>
                    )}
                    {isValidLogin && (
                        <div className={styles.loadingContainer}>
                            <h1 className={styles.welcomeText}>Welcome Back!</h1>
                            <p className={styles.welcomeSubText}>Logging you in now...</p>
                            <div className={styles.loader}></div>
                        </div>
                    )}
                </div>

                {!isValidLogin && (
                    <div className={styles.rightSide}>
                        <form className={styles.loginForm} onSubmit={handleSubmit}>
                            <h2 className={styles.title}>Sign In</h2>
                            <div className={styles.inputGroup}>
                                <label htmlFor="email" className={styles.label}>Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    className={styles.input}
                                    value={email}
                                    onChange={(e) => {
                                        console.log('Email input changed:', e.target.value);
                                        setEmail(e.target.value);
                                    }}
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label htmlFor="password" className={styles.label}>Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    className={styles.input}
                                    value={password}
                                    onChange={(e) => {
                                        console.log('Password input changed:', e.target.value);
                                        setPassword(e.target.value);
                                    }}
                                    placeholder="Enter your password"
                                    required
                                />
                            </div>
                            <button type="submit" className={styles.button} disabled={loading}>
                                {loading ? 'Logging in...' : 'Log In'}
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Login;
