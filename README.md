# Quick Lookup Application

## Overview
The **Quick Lookup Application** is a React-based tool designed to help users analyze and summarize participant scores across various competencies. It provides an intuitive interface for selecting participants, competencies, and summary types, and displays the results in a clear and concise format.

## Features
- **Participant Score Lookup**: View the score or level of a specific participant for a selected competency.
- **Summary Calculations**: Calculate and display summary statistics (e.g., Lowest, Highest, Average) for a selected competency.
- **Dynamic Data Handling**: Fetches and processes data from a JSON file, ensuring flexibility and scalability.
- **Responsive Design**: The application is styled to look neat and centered, with a clean and user-friendly layout.

## Technologies Used
- **React**: For building the user interface.
- **TypeScript**: For type safety and better code maintainability.
- **Playwright**: For automated end-to-end testing.
- **CSS**: For styling the application, including the use of the color `#7bbcd9` for a consistent theme.

## How to Use
1. **Select a Competency**: Choose a competency from the dropdown menu.
2. **Choose an Option**:
   - **Participant**: Select a participant to view their score or level for the chosen competency.
   - **Summary**: Select a summary type (e.g., Lowest, Highest, Average, Type) to calculate and display results for the chosen competency.
3. **Submit**: Click the "Show score" button to view the results.
4. **Output**: The results will be displayed below the form.

## Testing
The application includes automated tests using Playwright to ensure functionality and reliability. Tests cover:
- Participant score lookup.
- Summary calculation.

## Future Testing improvements
- Edge cases (e.g., missing inputs, invalid data).
- Accessibility and layout.

## Future Improvements
- Add support for exporting results to a file (e.g., CSV or PDF).
- Enhance the UI with additional animations or transitions.
- Add more advanced filtering and sorting options for competencies and participants.

## Setup and Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>

   cd quick-lookup
   npm install
   npm run dev
   npx playwright test