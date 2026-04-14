## Setup Instructions
1. Clone this repository to my local machine.
2. Open the terminal in the project folder and run:
   npm install
3. Install the required browsers by running:
   npx playwright install chromium
4. To run the tests, use the command:
   npx playwright test

## Notes
- **Credentials:** For the purpose of this practical test and to ensure a smooth evaluation, the credentials are hardcoded in the test suite. In a production environment, I would use environment variables (.env) to keep them secure.
- **Framework:** I chose Playwright and easy use.
- **Scenarios:** I implemented 3 scenarios (Happy Path, Validation Error, and Logout)