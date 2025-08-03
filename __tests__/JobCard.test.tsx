// __tests__/JobCard.test.tsx

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import JobCard from '@/components/JobCard'; // Adjust path if needed
import { SessionProvider } from 'next-auth/react';
import { Provider } from 'react-redux';
import { store } from '@/store'; // Adjust path if needed
import { Job, JobCardProps } from '@/types'; // Adjust path if needed
import toast from 'react-hot-toast';
import {
  useGetBookmarksQuery,
  useCreateBookmarkMutation,
  useUnbookmarkMutation,
} from '@/services/opportunitiesApi'; // Adjust path if needed

// Mock the API hooks from RTK Query
jest.mock('@/services/opportunitiesApi', () => ({
  ...jest.requireActual('@/services/opportunitiesApi'),
  useGetBookmarksQuery: jest.fn(),
  useCreateBookmarkMutation: jest.fn(),
  useUnbookmarkMutation: jest.fn(),
}));

// Mock the toast library
jest.mock('react-hot-toast');

// --- THE FINAL FIX: Correctly mock the RTK Query mutation trigger ---

// 1. Define the mock trigger functions. We will configure them in beforeEach.
const mockCreateBookmark = jest.fn();
const mockUnbookmark = jest.fn();

const mockUseQueryDefaultResult = {
  data: [],
  isSuccess: true,
  isLoading: false,
  isError: false,
  isFetching: false,
  refetch: jest.fn(),
};

beforeEach(() => {
  // Clear all mocks before each test
  jest.clearAllMocks();

  // 2. Create a mock 'unwrap' function that resolves, simulating a successful API call.
  const mockUnwrap = jest.fn().mockResolvedValue({ success: true });

  // 3. This is the key: create an object that looks like the promise returned by an RTK Query trigger.
  // It's an object that has an `unwrap` method.
  const mockMutationResultPromise = {
    unwrap: mockUnwrap,
  };

  // 4. Configure our mock triggers to return this special promise-like object.
  mockCreateBookmark.mockReturnValue(mockMutationResultPromise);
  mockUnbookmark.mockReturnValue(mockMutationResultPromise);

  // 5. Finally, set up the hooks to return our mock triggers.
  (useGetBookmarksQuery as jest.Mock).mockReturnValue(mockUseQueryDefaultResult);
  (useCreateBookmarkMutation as jest.Mock).mockReturnValue([mockCreateBookmark, { isLoading: false }]);
  (useUnbookmarkMutation as jest.Mock).mockReturnValue([mockUnbookmark, { isLoading: false }]);
});


const mockJob: Job = {
  id: '1',
  title: 'Software Engineer',
  description: 'A great job. You will do great things.',
  responsibilities: 'Write excellent, maintainable code.',
  requirements: '3+ years of experience with React.',
  idealCandidate: 'A proactive and collaborative team player.',
  categories: ['Engineering', 'React'],
  opType: 'Full-time',
  startDate: '2024-09-01T00:00:00.000Z',
  endDate: '2025-09-01T00:00:00.000Z',
  deadline: '2024-08-15T00:00:00.000Z',
  location: ['Remote'],
  requiredSkills: ['TypeScript', 'Next.js'],
  whenAndWhere: 'Online, flexible hours',
  datePosted: '2024-01-01T00:00:00.000Z',
  orgName: 'Tech Corp',
  logoUrl: '/logos/logo.svg',
};

const mockSession = {
  user: {
    name: 'Test User',
    email: 'test@example.com',
    accessToken: '123',
    role: 'user',
  },
  expires: '1',
};

const renderComponent = (props: JobCardProps) => {
  render(
    <SessionProvider session={mockSession}>
      <Provider store={store}>
        <JobCard {...props} />
      </Provider>
    </SessionProvider>
  );
};

describe('JobCard Component', () => {
  test('renders job information correctly', () => {
    renderComponent({ job: mockJob });
    expect(screen.getByText('Software Engineer')).toBeInTheDocument();
    expect(screen.getByText(/Tech Corp\.\s*Remote/)).toBeInTheDocument();
  });

  test('calls createBookmark when unbookmarked card is clicked', async () => {
    renderComponent({ job: mockJob });

    const bookmarkButton = screen.getByTestId('bookmark-btn-1');
    fireEvent.click(bookmarkButton);
    
    await waitFor(() => {
      expect(mockCreateBookmark).toHaveBeenCalledWith('1');
      // This should now pass because the mocked .unwrap() resolves, allowing the code to proceed.
      expect(toast.success).toHaveBeenCalledWith('Job bookmarked!');
    });
  });

  test('calls unbookmark when bookmarked card is clicked', async () => {
    (useGetBookmarksQuery as jest.Mock).mockReturnValue({
      ...mockUseQueryDefaultResult,
      data: [{ id: 'b1', userId: 'u1', opportunityId: '1' }],
    });

    renderComponent({ job: mockJob });

    const bookmarkButton = screen.getByTestId('bookmark-btn-1');
    fireEvent.click(bookmarkButton);

    await waitFor(() => {
      expect(mockUnbookmark).toHaveBeenCalledWith('1');
      // This should also pass now.
      expect(toast.success).toHaveBeenCalledWith('Bookmark removed!');
    });
  });
});