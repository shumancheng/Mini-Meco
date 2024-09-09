import { render, screen, waitFor } from '@testing-library/react';
import Settings from '../components/Configuration/Settings'; // Adjust the import path
import '@testing-library/jest-dom'; // For matchers like 'toBeInTheDocument'
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter
import '@testing-library/jest-dom'; // For matchers like 'toBeInTheDocument'

describe('Settings Component', () => {
  test('renders and logs the Testing Playground URL', async () => {
    // Render the Settings component wrapped in MemoryRouter
    render(
      <MemoryRouter>
        <Settings />
      </MemoryRouter>
    );
    
    // Log the URL to the testing playground for debugging
    screen.logTestingPlaygroundURL();

    // Check for any text or element you expect to be in the document
    const heading = await waitFor(() => screen.getByText(/Settings/i));
    expect(heading).toBeInTheDocument();
    
    // You can also test for other elements based on your component
    const emailLabel = await waitFor(() => screen.getByText(/Email/i));
    expect(emailLabel).toBeInTheDocument();
  });
});
