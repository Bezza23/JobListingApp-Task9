# Job Listing and Bookmarking Application (Next.js, Redux, NextAuth & Tailwind CSS)

This project is the final, fully-featured evolution of a job listing application, built with a modern, professional-grade tech stack. It demonstrates a complete user-centric workflow, including **user authentication**, the ability to **bookmark favorite jobs**, and a **comprehensive testing suite** covering unit, component, and end-to-end scenarios.

The application now seamlessly integrates a live backend API, robust state management with Redux Toolkit, a secure authentication system via NextAuth.js, and a fully tested, responsive UI crafted with Tailwind CSS.

## ✨ Features

-   **Live API Integration:** Fetches and displays job opportunities from a live backend API.
-   **Full User Authentication:** Secure sign-up and login functionality using **NextAuth.js** with a credentials-based provider.
-   **Bookmark Functionality:** Authenticated users can bookmark and un-bookmark jobs. A dedicated page displays all saved jobs, creating a personalized experience.
-   **Efficient State Management:** Utilizes **Redux Toolkit and RTK Query** to handle all API interactions, providing robust caching, automatic re-fetching, and seamless management of loading and error states.
-   **Protected Routes:** Bookmark functionality and user-specific data are restricted to authenticated users.
-   **Comprehensive Testing Suite:**
    -   **Unit & Component Testing (Jest & React Testing Library):** Verifies individual components (`JobCard`, `Home Page`) and logic for rendering, state changes, and asynchronous operations.
    -   **End-to-End (E2E) Testing (Cypress):** Simulates a full user journey, including logging in, bookmarking a job, verifying it on the bookmarks page, un-bookmarking it, and confirming its removal.
-   **Dynamic Routing:** Employs the Next.js App Router for unique, shareable URLs for each job detail page.
-   **Responsive Design:** Fully responsive layout built with Tailwind CSS for a perfect experience on all devices.
-   **TypeScript-Powered:** Written entirely in **TypeScript** for enhanced code quality, maintainability, and developer experience.

## 💻 Tech Stack

-   **Framework:** Next.js 14 (App Router)
-   **Language:** TypeScript
-   **State Management:** Redux Toolkit & RTK Query
-   **Authentication:** NextAuth.js
-   **Styling:** Tailwind CSS
-   **Unit Testing:** Jest & React Testing Library
-   **E2E Testing:** Cypress
-   **Linting/Formatting:** ESLint & Prettier

## 📸 Page Previews

Here is a preview of the application's key pages and user flows.

### 1. Authentication (Login & Register Pages)

Secure pages for users to sign in or create a new account.

<img width="689" height="415" alt="image" src="https://github.com/user-attachments/assets/7e9551de-fca2-458a-a3eb-1be31c82bdb2" />


### 2. Job Listing Dashboard

The main page, showcasing a list of available job opportunities. The bookmark icon is interactive for logged-in users.

<img width="954" height="402" alt="image" src="https://github.com/user-attachments/assets/e7ea8fa7-a05e-4a6b-be01-bd656c54c95d" />


### 3. Bookmarks Page

<img width="959" height="394" alt="image" src="https://github.com/user-attachments/assets/e1171e48-4825-402f-bc25-03c7bf0380e2" />


### 4. Job Detail Page

<img width="772" height="434" alt="image" src="https://github.com/user-attachments/assets/2042abd2-c9c6-49e7-97c4-ee0722383879" />


### 5. Testing Previews

The application includes a full suite of tests to ensure functionality and stability.

<img width="698" height="244" alt="image" src="https://github.com/user-attachments/assets/6da31f77-cb98-4fc3-89d1-615ced6bed41" />



## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18.x or later)
-   npm (comes with Node.js)

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd YOUR_REPOSITORY_NAME
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    ```
4.  **Create an environment file:**
    Create a `.env.local` file in the root of the project and add the necessary environment variables:
    ```env
    GOOGLE_CLIENT_ID=
    GOOGLE_CLIENT_SECRET=
    NEXTAUTH_SECRET= # Generate a secret with: openssl rand -base64 32
    NEXTAUTH_URL=http://localhost:3000
    ```

## ⚙️ Running the Application

1.  **Start the development server:**
    ```bash
    npm run dev
    ```

2.  **Open in your browser:**
    Navigate to `http://localhost:3000`.

## Project Structure

The project follows a modern Next.js App Router structure, with a clear separation of concerns.

```plaintext

/
├── __tests__/                # Jest unit and component tests
├── app/                      # Main application folder
│   ├── api/auth/[...nextauth]/ # NextAuth.js API route handler
│   ├── auth/                 # Login and Register pages
│   ├── bookmarks/            # Page for displaying bookmarked jobs
│   ├── components/           # Reusable React components
│   ├── jobs/[id]/            # Dynamic route for job details
│   ├── services/             # RTK Query API slice definition
│   ├── store/                # Redux store configuration
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Home page (Job Listing Dashboard)
├── cypress/                  # Cypress E2E tests
│   ├── e2e/                  # E2E spec files
│   └── support/              # Custom commands and configurations
├── public/                   # Static assets
├── types/                    # Custom TypeScript declarations (e.g., next-auth.d.ts)
└── README.md                 # Project README file
