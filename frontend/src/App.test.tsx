import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App Component', () => {
    it('renders the navbar', () => {
        render(<App />);
        const navbarLogo = screen.getByText(/SDE/i);
        expect(navbarLogo).toBeInTheDocument();
    });

    it('renders the hero section', () => {
        render(<App />);
        // "Open to Work" is a distinct text in the new Hero
        const heroText = screen.getByText(/Open to Work/i);
        expect(heroText).toBeInTheDocument();
    });
});
