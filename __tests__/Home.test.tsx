// __tests__/Home.test.tsx

import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '@/store';
import Home from '@/page';
import { useGetOpportunitiesQuery } from '@/services/opportunitiesApi';

jest.mock('@/services/opportunitiesApi', () => ({
  ...jest.requireActual('@/services/opportunitiesApi'),
  useGetOpportunitiesQuery: jest.fn(),
}));

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(() => ({ data: null })),
}));

const renderHome = () => {
  render(
    <Provider store={store}>
      <Home />
    </Provider>
  );
};

describe('Home Component (Job Listing Page)', () => {
  beforeEach(() => {
    (useGetOpportunitiesQuery as jest.Mock).mockClear();
  });

  test('renders the loading state correctly', () => {
    (useGetOpportunitiesQuery as jest.Mock).mockReturnValue({
      isLoading: true,
      error: null,
      data: undefined,
    });
    renderHome();
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  test('renders the error state correctly', () => {
    (useGetOpportunitiesQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      error: { status: 'FETCH_ERROR', error: 'Failed to fetch' },
      data: undefined,
    });
    renderHome();
    expect(screen.getByText(/Failed to load opportunities/i)).toBeInTheDocument();
  });

  test('renders the "not found" state when there are no jobs', () => {
    (useGetOpportunitiesQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      error: null,
      data: [],
    });
    renderHome();

    // --- THIS IS THE FIX ---
    const resultsElement = screen.getByTestId('results-count');
    expect(resultsElement).toHaveTextContent(/Showing 0 results/i);

    expect(screen.queryByTestId(/job-card-/)).not.toBeInTheDocument();
  });
});