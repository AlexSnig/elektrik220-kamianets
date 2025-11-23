import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CostCalculator from './CostCalculator';

describe('CostCalculator', () => {
  it('should recalculate the total cost automatically when an input value changes', () => {
    render(<CostCalculator />);

    const outletsInput = screen.getByLabelText(/Кількість розеток/i);
    fireEvent.change(outletsInput, { target: { value: '5' } });

    // The initial total is 300, and adding 5 outlets at 250 each should be 1250 + 300 = 1550
    const totalCost = screen.getByText(/1550 грн/i);
    expect(totalCost).toBeInTheDocument();
  });
});
