import { describe, it, expect} from 'vitest';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import HomePage from '../pages/home-page.jsx';

describe('HomePage Component', () => {
  it('renders HomePage component', () => {
    const { container } = render(<HomePage />);
    expect(container).toBeInTheDocument();
  });
})