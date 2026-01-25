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

  // Check that Ultimate features are there
  it('finds the first ultimate item', () => {
    render(<HomePage />);
    const ultimate1 = screen.getByTestId("ultimate1");
    expect(ultimate1).toBeInTheDocument();
  })

  it('finds the second ultimate item', () => {
    render(<HomePage />);
    const ultimate2 = screen.getByTestId("ultimate2");
    expect(ultimate2).toBeInTheDocument();
  })

  it('finds the third ultimate item', () => {
    render(<HomePage />);
    const ultimate3 = screen.getByTestId("ultimate3");
    expect(ultimate3).toBeInTheDocument();
  })

  it('finds the fourth ultimate item', () => {
    render(<HomePage />);
    const ultimate4 = screen.getByTestId("ultimate4");
    expect(ultimate4).toBeInTheDocument();
  })

  it('finds the fifth ultimate item', () => {
    render(<HomePage />);
    const ultimate5 = screen.getByTestId("ultimate5");
    expect(ultimate5).toBeInTheDocument();
  })

  // Check that Deluxe features are there
  it('finds the first deluxe item', () => {
    render(<HomePage />);
    const deluxe1 = screen.getByTestId("ultimate1");
    expect(deluxe1).toBeInTheDocument();
  })

  it('finds the second deluxe item', () => {
    render(<HomePage />);
    const deluxe2 = screen.getByTestId("ultimate2");
    expect(deluxe2).toBeInTheDocument();
  })

  it('finds the third deulxe item', () => {
    render(<HomePage />);
    const deluxe3 = screen.getByTestId("ultimate3");
    expect(deluxe3).toBeInTheDocument();
  })

  it('finds the fourth deluxe item', () => {
    render(<HomePage />);
    const deluxe4 = screen.getByTestId("ultimate4");
    expect(deluxe4).toBeInTheDocument();
  })

  // Check that Basic features are there
  it('finds the first basic item', () => {
    render(<HomePage />);
    const basic1 = screen.getByTestId("basic1");
    expect(basic1).toBeInTheDocument();
  })

  it('finds the second basic item', () => {
    render(<HomePage />);
    const basic2 = screen.getByTestId("basic2");
    expect(basic2).toBeInTheDocument();
  })

  // Check that Add On features are there
  it('finds the first add on item', () => {
    render(<HomePage />);
    const addOn1 = screen.getByTestId("addOn1");
    expect(addOn1).toBeInTheDocument();
  })

  it('finds the second add on item', () => {
    render(<HomePage />);
    const addOn2 = screen.getByTestId("addOn2");
    expect(addOn2).toBeInTheDocument();
  })

  it('finds the third add on item', () => {
    render(<HomePage />);
    const addOn3 = screen.getByTestId("addOn3");
    expect(addOn3).toBeInTheDocument();
  })

  it('finds the fourth add on item', () => {
    render(<HomePage />);
    const addOn4 = screen.getByTestId("addOn4");
    expect(addOn4).toBeInTheDocument();
  })

  // Check that Single Wash features are there
  it('finds the first single wash item', () => {
    render(<HomePage />);
    const singleWash1 = screen.getByTestId("singleWash1");
    expect(singleWash1).toBeInTheDocument();
  })

  it('finds the second single wash item', () => {
    render(<HomePage />);
    const singleWash2 = screen.getByTestId("singleWash2");
    expect(singleWash2).toBeInTheDocument();
  })

  it('finds the third single wash item', () => {
    render(<HomePage />);
    const singleWash3 = screen.getByTestId("singleWash3");
    expect(singleWash3).toBeInTheDocument();
  })

  it('finds the fourth single wash item', () => {
    render(<HomePage />);
    const singleWash4 = screen.getByTestId("singleWash4");
    expect(singleWash4).toBeInTheDocument();
  })
});