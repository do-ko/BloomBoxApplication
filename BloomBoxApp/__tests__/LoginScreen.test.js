import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import LoginScreen from '../src/screens/LoginScreen'; 
import { AuthContext } from '../src/context/AuthContext'; 

// Mock AuthContext
const mockLogin = jest.fn();
const authContextValue = {
  isLoading: false,
  login: mockLogin,
};

// Mock navigation
const mockNavigation = {
  navigate: jest.fn(),
};

describe('LoginScreen', () => {
  it('calls login function with correct credentials', async () => {
    const { getByPlaceholderText, getByText } = render(
      <AuthContext.Provider value={authContextValue}>
        <LoginScreen navigation={mockNavigation} />
      </AuthContext.Provider>
    );

    const loginInput = getByPlaceholderText('login');
    const passwordInput = getByPlaceholderText('password');
    const signInButton = getByText('sign in');

    fireEvent.changeText(loginInput, 'testuser');
    fireEvent.changeText(passwordInput, 'password');

    await act(async () => {
      fireEvent.press(signInButton);
    });

    expect(mockLogin).toHaveBeenCalledWith('testuser', 'password');
  });
});
