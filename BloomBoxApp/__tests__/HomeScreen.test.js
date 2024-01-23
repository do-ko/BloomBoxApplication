import React from 'react';
import { render } from '@testing-library/react-native';
import HomeScreen from '../src/screens/HomeScreen'; 
import { AuthContext } from '../src/context/AuthContext'; 
import { RemainderContext } from '../src/context/RemainderContext';
import { PlantContext } from '../src/context/PlantContext'; 

// Create mock values for the contexts
const authContextValue = {
  isLoading: false,
  userInfo: { userId: 1 },
  logout: jest.fn(),
};
const remainderContextValue = {
  remainders: [],
  getRemaindersByUserId: jest.fn(),
  wasEdited: false,
};
const plantContextValue = {
  plants: [],
  getAllPlants: jest.fn(),
};

// Mock Navigation
const mockNavigation = {
  navigate: jest.fn(),
  openDrawer: jest.fn(),
};

describe('HomeScreen', () => {
  it('renders correctly', () => {
    const screen = render(
      <AuthContext.Provider value={authContextValue}>
        <RemainderContext.Provider value={remainderContextValue}>
          <PlantContext.Provider value={plantContextValue}>
            <HomeScreen navigation={mockNavigation} />
          </PlantContext.Provider>
        </RemainderContext.Provider>
      </AuthContext.Provider>
    );
    // Check this text is rendered
    expect(screen.getByText('There are no reminders yet.')).toBeTruthy();
  });

});
