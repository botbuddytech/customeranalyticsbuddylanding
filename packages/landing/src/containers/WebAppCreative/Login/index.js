import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/react';
import Container from 'common/components/UI/Container';
import Heading from 'common/components/Heading';
import Text from 'common/components/Text';
import Button from 'common/components/Button';
import Input from 'common/components/Input';
import { LoginWrapper, LoginForm } from './login.style';

const Login = () => {
  const router = useRouter();
  const { status } = useSession();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === 'authenticated') {
      router.replace('/admin');
    }
  }, [status, router]);

  if (status === 'authenticated') {
    return null;
  }

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (result?.error) {
        // Map internal error codes/messages to user-friendly text.
        const rawError = result.error;

        if (rawError === 'MISSING_CREDENTIALS') {
          setError('Please enter both your email and password.');
        } else if (rawError === 'INVALID_CREDENTIALS') {
          setError('Incorrect email or password. Please try again.');
        } else if (rawError === 'SERVER_CONFIG_ERROR') {
          setError('We are experiencing a configuration issue. Please try again later or contact support.');
        } else if (rawError === 'LOGIN_FAILED') {
          setError('Login failed. Please check your details and try again.');
        } else {
          // Fallback for any unexpected next-auth error message.
          setError('Unable to log you in right now. Please try again in a moment.');
        }
      } else {
        router.push('/admin');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginWrapper id="login_section">
      <Container>
        <LoginForm onSubmit={handleSubmit}>
          <div className="form-header">
            <Heading content="Welcome Back" />
            <Text content="Login to your BotBuddy Analytics account to continue" />
          </div>

          {error && (
            <div style={{ color: 'red', marginBottom: '20px', textAlign: 'center', fontSize: '14px', fontWeight: '500' }}>
              {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <Input
              inputType="email"
              placeholder="Enter your email"
              iconPosition="left"
              value={formData.email}
              onChange={(value) => handleInputChange('email', value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <Input
              inputType="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(value) => handleInputChange('password', value)}
              required
            />
          </div>

          <Button
            type="submit"
            title={loading ? "Logging in..." : "Login Now"}
            disabled={loading}
            variant="extendedFab"
            colors="primaryWithBg"
          />
        </LoginForm>
      </Container>
    </LoginWrapper>
  );
};

export default Login;
