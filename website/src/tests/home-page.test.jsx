import { describe, it, expect} from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HomePage from '../pages/home-page.jsx';

describe('HomePage Component', () => {
  it('renders HomePage component', () => {
    const { container } = render(<HomePage />);
    expect(container.firstChild).toBeInTheDocument();
  });
});

describe('The Wash Zone Title', () => {
  it('renders the title: "The Wash Zone"', () => {
    render(<HomePage />);
    const titleElement = screen.getByText('The Wash Zone').closest('.top-left-title');
    expect(titleElement).toBeInTheDocument();
  });
});

describe('The Wash Zone Subtitle', () => {
  it('renders the subtitle', () => {
    render(<HomePage />);
    const subtitleElement = screen.getByText('Walla Walla Washington').closest('.top-left-address');
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

describe ('Single Wash Section', () => {
  it('renders the section title', () => {
    render(<HomePage />);
    const buildingImage = screen.getByText('SINGLE WASHES');
    expect(buildingImage).toBeInTheDocument();
  })

  it('renders the first box title', () => {
    render(<HomePage />);
    const buildingImage = screen.getByText('Ultimate - $16.50');
    expect(buildingImage).toBeInTheDocument();
  })

  it('renders the second box title', () => {
    render(<HomePage />);
    const buildingImage = screen.getByText('Deluxe - $13.50');
    expect(buildingImage).toBeInTheDocument();
  })

  it('renders the third box title', () => {
    render(<HomePage />);
    const buildingImage = screen.getByText('Add Ons');
    expect(buildingImage).toBeInTheDocument();
  })
});


// describe('Hours section', () => {
//   it('finds the hours section title', () => {
//     render(<HomePage />);
//     const hoursTitle = screen.getByText('Hours of Operation');
//     expect(hoursTitle).toBeInTheDocument();
//   })

//   // Make sure the box renders
//   it('renders the first box', () => {
//     render(<HomePage />);
//     const hoursBox = screen.getByTestId("hours-box");
//     expect(hoursBox).toBeInTheDocument();
//   })

//   it('renders sunday hours', () => {
//     render(<HomePage />);
//     const sundayHours = screen.getByText('Sunday: 9:00 AM - 5:00 PM');
//     expect(sundayHours).toBeInTheDocument();
//   })

//   it('renders monday hours', () => {
//     render(<HomePage />);
//     const mondayHours = screen.getByText('Monday: 7:30 AM - 7:00 PM');
//     expect(mondayHours).toBeInTheDocument();
//   })

//   it('renders tuesday hours', () => {
//     render(<HomePage />);
//     const tuesdayHours = screen.getByText('Tuesday: 7:30 AM - 7:00 PM');
//     expect(tuesdayHours).toBeInTheDocument();
//   })

//   it('renders wednesday hours', () => {
//     render(<HomePage />);
//     const wednesdayHours = screen.getByText('Wednesday: 7:30 AM - 7:00 PM');
//     expect(wednesdayHours).toBeInTheDocument();
//   })

//   it('renders thursday hours', () => {
//     render(<HomePage />);
//     const thursdayHours = screen.getByText('Thursday: 7:30 AM - 7:00 PM');
//     expect(thursdayHours).toBeInTheDocument();
//   })

//   it('renders friday hours', () => {
//     render(<HomePage />);
//     const fridayHours = screen.getByText('Friday: 7:30 AM - 7:00 PM');
//     expect(fridayHours).toBeInTheDocument();
//   })

//   it('renders saturday hours', () => {
//     render(<HomePage />);
//     const saturdayHours = screen.getByText('Saturday: 8:00 AM - 7:00 PM');
//     expect(saturdayHours).toBeInTheDocument();
//   })
// });