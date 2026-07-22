import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

jest.mock('react-router', () => ({
  BrowserRouter: ({ children }: { children: React.ReactNode }) => <div data-testid="browser-router">{children}</div>,
}));

jest.mock('../context/DiceContextProvider', () => {
  return function MockDiceContextProvider({ children }: { children: React.ReactNode }) {
    return <div data-testid="dice-context"><>{children}</></div>;
  };
});

jest.mock('./SettingsForm', () => {
  return function MockSettingsForm() {
    return <div data-testid="settings-form">Settings Form</div>;
  };
});

jest.mock('./BabylonCanvas', () => {
  return function MockBabylonCanvas() {
    return <div data-testid="babylon-canvas">Babylon Canvas</div>;
  };
});

describe('App Component Unit Test', () => {
  it('should render and include all child components', () => {
    render(<App />);

    expect(document.querySelector('[data-testid="browser-router"]')).not.toBeNull();
    expect(document.querySelector('[data-testid="dice-context"]')).not.toBeNull();
    expect(document.querySelector('[data-testid="settings-form"]')).not.toBeNull();
    expect(document.querySelector('[data-testid="babylon-canvas"]')).not.toBeNull();
  });

  it('renders the root structure', () => {
    const { container } = render(<App />);
    expect(container).toBeTruthy();
  });
});