import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import LocationComponent from '../src/components/LocationComponent';
import { AuthContext } from '../src/context/AuthContext';

const authContextValue = {
    isLoading: false,
    userInfo: { userId: 1 },
    logout: jest.fn(),
};
const mockLocation = {
  locationName: 'Test Location',
};
const mockNavigation = {
  navigate: jest.fn(),
};

describe('LocationComponent', () => {
  it('renders correctly with the provided location', () => {
    const { getByText, getByTestId } = render(
      <AuthContext.Provider value={authContextValue}>
        <LocationComponent location={mockLocation} navigation={mockNavigation} />
      </AuthContext.Provider>
    );
    expect(getByText(mockLocation.locationName)).toBeTruthy();
    expect(getByTestId('locationImage')).toBeTruthy();
  });

  it('navigates to EditLocation screen on press', () => {
    const { getByTestId } = render(
      <AuthContext.Provider value={authContextValue}>
        <LocationComponent location={mockLocation} navigation={mockNavigation} />
      </AuthContext.Provider>
    );
    fireEvent.press(getByTestId('editButton'));
    expect(mockNavigation.navigate).toHaveBeenCalledWith('EditLocation', { location: mockLocation });
  });
});
