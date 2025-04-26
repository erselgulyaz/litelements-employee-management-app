# Employee Management Application

A single-page web application built with **LitElement (JavaScript version)** to assist HR teams in managing employee information effectively.

---

## ✨ Features

- View all employee records (table or card layout)
- Add new employee
- Edit existing employee
- Delete employee with confirmation
- Pagination and search functionality
- Responsive layout (no external CSS frameworks)
- Language support (Turkish 🇹🇷 and English 🇬🇧)
- Global state management
- Data persistence with localStorage
- Code coverage control

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/erselgulyaz/litelements-employee-management-app.git
cd employee-management-app
```


### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```
Open your browser and visit http://localhost:8000


## 🌍 Language Support
The application supports both Turkish and English.
Language is automatically selected based on the <html lang="..."> attribute in index.html.

You can manually switch languages using the 🇹🇷 / 🇬🇧 flag buttons in the top navigation bar.

## 🧪 Running Tests
### Run all tests:
```bash
npm run test
```
This runs both development (test:dev) and production (test:prod) tests.

## 🧩 Required: Install Browsers for Playwright
To run the tests successfully, install the Playwright browsers:
```bash
npx playwright install
```
This will download Chromium, Firefox, and WebKit browsers needed by the test runner.


## 📈 Code Coverage
To enable code coverage:

### Run tests for coverage:
```bash
npm run test:coverage
```
You will see coverage report in the terminal and "coverage" folder.

## 🧱 Tech Stack
- [LitElement](https://lit.dev/)
- [Vaadin Router](https://github.com/vaadin/router)
- [Vite](https://vite.dev/)
- [@open-wc/testing](https://open-wc.org/docs/testing/)
- [vitest](https://vitest.dev/)

## 📁 Project Structure
```bash
src/
  components/         → Reusable web components (UI)
  pages/              → Route-based page components
  state/              → Global store and logic
  i18n/               → Language files
  router/           → Route configuration
  index.html          → Root HTML
  main.js             → App initialization

```