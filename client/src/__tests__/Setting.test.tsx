import { render, screen, waitFor } from '@testing-library/react';
import Settings from '../components/Configuration/Settings'; 
import { MemoryRouter } from 'react-router-dom'; 
import '@testing-library/jest-dom'; 

describe('Settings Component', () => {
  test('renders and logs the Testing Playground URL', async () => {

    render(
      <MemoryRouter>
        <Settings />
      </MemoryRouter>
    );
    

    screen.logTestingPlaygroundURL();


    const heading = await waitFor(() => screen.getByText(/Settings/i));
    expect(heading).toBeInTheDocument();
    
   
    const emailLabel = await waitFor(() => screen.getByText(/Email/i));
    expect(emailLabel).toBeInTheDocument();
  });
});

