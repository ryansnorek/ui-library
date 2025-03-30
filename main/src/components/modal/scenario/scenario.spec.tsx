import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Scenario from './scenario';
import type { ScenarioProps } from './scenario.types';


/* 
 Notes: 

 Not sure why the renderWithUser has a type error. Might be a configuration issue. 
 
 Unfortunately, I didn't get a chance to run the file before running out of time. 
 Some things I would consider adding in a real project is mock services and test utils.
*/

const initialProps: ScenarioProps = {
  onClose: jest.fn(),
};

const renderWithUser = (props?: ScenarioProps) => {
  return {
    user: userEvent.setup(),
    ...render(<Scenario {...initialProps} {...props} />),
  };
};

describe('Modal', () => {
  const mockClose = jest.fn();

  beforeAll(() => {
    mockClose.mockReset();
  });

  test('renders modal with expected controls', () => {
    render(<Scenario />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('heading')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
  });

  describe('when passed onClose handler', () => {
    test('calls onClose action when pressing the ESC key', () => {
      render(<Scenario onClose={mockClose} />);
      fireEvent.keyDown(screen.getByRole('dialog'), {
        key: 'Escape',
        code: 'Escape',
      });
      expect(mockClose).toHaveBeenCalledTimes(1);
    });

    test('renders dismissible button that calls onClose action when clicked', async () => {
      const { user } = renderWithUser(<Scenario onClose={mockClose} />);
      const closeButton = screen.getByRole('button', { name: /close/i });
      await user.click(closeButton);
      expect(mockClose).toHaveBeenCalledTimes(1);
    });

    test('calls onClick action when clicking outside of the modal', async () => {
      const { user } = renderWithUser(
        <Scenario data-testid="mockId" onClose={mockClose} />
      );
      const scrimElement = screen.getByTestId('mockId');
      await user.click(scrimElement);
      expect(mockClose).toHaveBeenCalledTimes(1);
    });
  });
});
