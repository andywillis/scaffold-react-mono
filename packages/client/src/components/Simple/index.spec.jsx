import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import Simple from './index.jsx';

describe('Simple component', () => {

  test('renders component', () => {

    render(<Simple />);

    screen.debug();

  });

  test('heading has correct text', async () => {

    render(<Simple />);

    await screen.findByRole('heading');

    expect(screen.getByRole('heading')).toHaveTextContent('Simple');

  });

});
