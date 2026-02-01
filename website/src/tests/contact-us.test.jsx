import { describe, it, expect} from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ContactPage from '../pages/contact-us.jsx';

describe('Contact Us Page Component', () => {
    it('renders the ContactUs component', () => {
        const { container } = render(<ContactPage />)
        expect(container.firstChild).toBeInTheDocument();
    });
});

describe('Banner Image', () => {
  it('renders banner image with correct alt text', () => {
    render(<ContactPage />);
    const bannerImage = screen.getByAltText('banner image');
    expect(bannerImage).toBeInTheDocument();
  });
});

describe('Contact Us Title', () => {
    it('renders the title: Contact Us', () => {
        render(<ContactPage />)
        const title = screen.getByText('Contact Us').closest('.contact-us-title')
        expect(title).toBeInTheDocument();
    });
});

describe('Contact Us Contact Information', () => {
    it('renders the call us section', () => {
        render(<ContactPage />)
        const callUs = screen.getByText('Call us at: 509 876-2455').closest('.contact-us-item')
        expect(callUs).toBeInTheDocument();
    });

    it('renders the Facebook section', () => {
        render(<ContactPage />)
        const callUs = screen.getByText('Check us out on Facebook at:').closest('.contact-us-item')
        expect(callUs).toBeInTheDocument();
    });

    it('ensures the Facebook link is there', () => {
        render(<ContactPage />)
        const facebookLink = screen.getByText('The Wash Zone')
        expect(facebookLink.closest('a')).toHaveAttribute('href', 'https://www.facebook.com/profile.php?id=100054247250715');
    });

    it('renders the address section', () => {
        render(<ContactPage />)
        const findUs = screen.getByText('Come visit us at: 1907 E Isaacs Ave, Walla Walla, WA, United States').closest('.contact-us-item')
        expect(findUs).toBeInTheDocument();
    });
});

describe('Map', () => {
    it('renders the map iframe', () => {
        render(<ContactPage />)
        const map = screen.getByTitle('Maps iframe')
        expect(map).toBeInTheDocument();
    })
})