import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Scenario from './scenario';
import type { ScenarioProps } from './scenario.types';

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

    test('calls onClock action when clicking outside of the modal', async () => {
      const { user } = renderWithUser(
        <Scenario data-testid="mockId" onClose={mockClose} />
      );
      const scrimElement = screen.getByTestId('mockId');
      await user.click(scrimElement);
      expect(mockClose).toHaveBeenCalledTimes(1);
    });
  });
});
