import React from 'react'
import { render, fireEvent, waitFor, screen, act, getAllByTestId } from '@testing-library/react';
import Home from './Home';

test('renders start button', () => {
  const { getByText } = render(<Home />);
  const startButton = getByText(/start/i);
  expect(startButton).toBeInTheDocument();
});

test('starts and stops simulation when button is clicked', () => {
  const { getByText } = render(<Home />);

  const startButton = getByText(/start/i);
  fireEvent.click(startButton);

  const stopButton = getByText(/stop/i);
  expect(stopButton).toBeInTheDocument();

  fireEvent.click(stopButton);

  const startButtonAgain = getByText(/start/i);
  expect(startButtonAgain).toBeInTheDocument();
});


test('clears grid when clear button is clicked', () => {
  const { getByText, queryAllByTestId } = render(<Home />);

  // Click the "clear" button
  const clearButton = getByText(/clear/i);
  fireEvent.click(clearButton);

  // Check if all grid cells are cleared
  const gridCells = queryAllByTestId((id) => id.startsWith('grid-cell-'));
  const isGridCleared = gridCells.every((cell) => cell.style.backgroundColor !== 'gray');

  // Assert that all grid cells are cleared
  expect(isGridCleared).toBe(true);
});


it("generates a random pattern when 'Random' button is clicked", async () => {
  // Render the component
  render(<Home />);

  // Wait for the button to be present in the DOM
  await waitFor(() => {
    expect(screen.getByText(/Random/i)).toBeInTheDocument();
  });

  // Find and click the 'Random' button
  const randomButton = screen.getByText(/Random/i);
  fireEvent.click(randomButton);

  // Add your assertions or additional test logic here
});


it("toggles cell state when a cell is clicked", async () => {
  render(<Home />);

  // Get a cell element (adjust indices based on your grid structure)
  const cellRowIndex = 0;
  const cellColIndex = 0;

  await act(async () => {
    // Check for the element in a loop until it appears
    let cell = null;
    await waitFor(() => {
      cell = screen.queryByTestId(`cell-${cellRowIndex}-${cellColIndex}`);
      return cell;
    });

    // Make sure the cell is defined before trying to click it
    if (cell) {
      fireEvent.click(cell);

      // Wait for the grid to be updated
      await waitFor(() => {
        // Assertions based on your expected grid state after cell click
        const updatedCell = screen.getByTestId(`cell-${cellRowIndex}-${cellColIndex}`);

        // Example assertion: Check if the cell's background color changes to 'gray' after click
        expect(updatedCell.style.backgroundColor).toBe('gray');

        // Add more assertions based on your specific expected behavior
      });
    }
  });
});

it("toggles cell state when multiple cells are clicked", async () => {
  render(<Home />);

  // Define the cell indices you want to click
  const cellIndices = [
    { rowIndex: 0, colIndex: 0 },
    { rowIndex: 1, colIndex: 1 },
    // Add more cell indices as needed
  ];

  await act(async () => {
    for (const { rowIndex, colIndex } of cellIndices) {
      // Check for the element in a loop until it appears
      let cell = null;
      await waitFor(() => {
        cell = screen.queryByTestId(`cell-${rowIndex}-${colIndex}`);
        return cell;
      });

      // Make sure the cell is defined before trying to click it
      if (cell) {
        fireEvent.click(cell);

        // Wait for the grid to be updated
        await waitFor(() => {
          // Assertions based on your expected grid state after cell click
          const updatedCell = screen.getByTestId(`cell-${rowIndex}-${colIndex}`);

          // Example assertion: Check if the cell's background color changes to 'gray' after click
          expect(updatedCell.style.backgroundColor).toBe('gray');

          // Add more assertions based on your specific expected behavior
        });
      }
    }
  });
});


test('renders Game of Life heading', () => {
  render(<Home />);
  const headingElement = screen.getByText(/Game of Life/i);
  expect(headingElement).toBeInTheDocument();
});

test('renders Start button', () => {
  render(<Home />);
  const startButton = screen.getByText(/Start/i);
  expect(startButton).toBeInTheDocument();
});

test('renders Randomize button', () => {
  render(<Home />);
  const randomizeButton = screen.getByText(/Randomize/i);
  expect(randomizeButton).toBeInTheDocument();
});

test('renders Clear button', () => {
  render(<Home />);
  const clearButton = screen.getByText(/Clear/i);
  expect(clearButton).toBeInTheDocument();
});

test('matches snapshot', () => {
  const { asFragment } = render(<Home />);
  expect(asFragment()).toMatchSnapshot();
});




export default Home.test