import { describe, it, expect} from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HomePage from '../pages/home-page.jsx';

describe('HomePage Component', () => {
  it('renders HomePage component', () => {
    const { container } = render(<HomePage />);
    expect(container).toBeInTheDocument();
  });
});

describe('Banner Image', () => {
  it('renders banner image with correct alt text', () => {
    render(<HomePage />);
    const bannerImage = screen.getByAltText('banner image');
    expect(bannerImage).toBeInTheDocument();
  });
});

describe('The Wash Zone Title', () => {
  it('renders the title: "The Wash Zone"', () => {
    render(<HomePage />);
    const titleElement = screen.getByText('The Wash Zone').closest('.title');
    expect(titleElement).toBeInTheDocument();
  });
});

describe('The Wash Zone Subtitle', () => {
  it('renders the subtitle', () => {
    render(<HomePage />);
    const subtitleElement = screen.getByText('1907 E Isaacs Ave, Walla Walla, WA 99362').closest('.subtitle');
    expect(subtitleElement).toBeInTheDocument();
  });
});

describe('Building Image', () => {
  it('renders building image with correct alt text', () => {
    render(<HomePage />);
    const buildingImage = screen.getByAltText('The Wash Zone Image');
    expect(buildingImage).toBeInTheDocument();
  });
});

describe ('Memberships Section', () => {
  it('renders Memberships section title', () => {
    render(<HomePage />);
    const membershipsTitle = screen.getByText('Memberships').closest('.membership-section-title');
    expect(membershipsTitle).toBeInTheDocument();
  });

  // Make sure all 5 boxes are rendered
  it('renders the first box', () => {
    render(<HomePage />);
    const box1 = screen.getByTestId("box1");
    expect(box1).toBeInTheDocument();
  })

  it('renders the second box', () => {
    render(<HomePage />);
    const box2 = screen.getByTestId("box2");
    expect(box2).toBeInTheDocument();
  })

  it('renders the third box', () => {
    render(<HomePage />);
    const box3 = screen.getByTestId("box3");
    expect(box3).toBeInTheDocument();
  })

  it('renders the fourth box', () => {
    render(<HomePage />);
    const box4 = screen.getByTestId("box4");
    expect(box4).toBeInTheDocument();
  })

  it('renders the fifth box', () => {
    render(<HomePage />);
    const box5 = screen.getByTestId("box5");
    expect(box5).toBeInTheDocument();
  })

  // Make sure all 5 box titles are rendered
  it('renders the first title', () => {
    render(<HomePage />);
    const title1 = screen.getByText("Ultimate - $16.50");
    expect(title1).toBeInTheDocument();
  })

  it('renders the second title', () => {
    render(<HomePage />);
    const title2 = screen.getByText("Deluxe - $13.50");
    expect(title2).toBeInTheDocument();
  })

  it('renders the third title', () => {
    render(<HomePage />);
    const title3 = screen.getByText("Basic - $10.00");
    expect(title3).toBeInTheDocument();
  })

  it('renders the fourth title', () => {
    render(<HomePage />);
    const title4 = screen.getByText("Add Ons");
    expect(title4).toBeInTheDocument();
  })

  it('renders the fifth title', () => {
    render(<HomePage />);
    const title5 = screen.getByText("Single Wash");
    expect(title5).toBeInTheDocument();
  })
});