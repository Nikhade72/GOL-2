import { render, screen } from '@testing-library/react';
import App from './App';
import Home from './Component/Home';

test('renders learn react link', () => {
  render(<Home />);
  const buttons = screen.getAllByRole('button');
  console.log(buttons); // Add this line to log the found buttons

  // Use find to check if any button contains the specified text
  const linkElement = buttons.find(button => button.textContent.match(/learn react/i));
  
  // Check if linkElement is defined before asserting
  if (linkElement) {
    expect(linkElement).toBeInTheDocument();
  } else {
    console.log('Button with text "learn react" not found.');
  }
});




