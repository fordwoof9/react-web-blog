import React from 'react';
import { render } from '@testing-library/react';
import Navbar from './Navbar';

test('renders a Navbar with the correct text', () => {
  const NavbarText = 'NavBar Test!';
  const { getByText } = render(<Navbar text={NavbarText} />);
  // eslint-disable-next-line testing-library/prefer-screen-queries
  const NavbarElement = getByText(NavbarText);
  expect(NavbarElement).toBeInTheDocument();
});
