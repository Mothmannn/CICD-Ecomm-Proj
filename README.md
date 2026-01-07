🛒 E‑Commerce Application with CI/CD, TDD, and Vercel Deployment
A fully featured React + TypeScript e‑commerce application built with modern tooling, complete with automated testing, continuous integration, and continuous deployment. This project demonstrates professional‑grade development practices including Test‑Driven Development (TDD), GitHub Actions CI/CD, Redux state management, Firebase authentication, and Vercel hosting.

🚀 Live Application
👉 https://cicd-ecomm-proj.vercel.app/product-editor

📦 Features
Frontend
React + TypeScript

React Router for client‑side routing

Redux Toolkit for global state management

Firebase Authentication

Fully responsive UI

Product management (CRUD)

Shopping cart with persistent state

Order history and order details pages

Testing
Jest + React Testing Library

Unit tests for key components

Integration test for cart state updates

Mocked Firebase and session storage for deterministic tests

CI/CD Pipeline
GitHub Actions workflow triggered on every push to main

Automated:

Install

Build

Run Jest test suite

Deploy to Vercel (only if tests pass)

Ensures no faulty code reaches production

🧪 Test‑Driven Development (TDD)
This project includes both unit tests and integration tests to validate component behavior and application logic.

✔ Unit Tests
Login component

NavBar component

Tests cover:

Rendering

User interaction

Component state behavior

✔ Integration Test
Cart integration test ensures:

Adding a product updates Redux state

Quantity increments correctly

State remains deterministic and isolated

⚙️ CI/CD Pipeline (GitHub Actions → Vercel)
Continuous Integration
Runs on every push to main

Executes:

npm install

npm run build

npm test

Workflow fails immediately if any test fails

Continuous Deployment
Deployment job runs only if CI succeeds

Uses Vercel CLI + project token

Automatically deploys the latest passing build to production

🗂️ Project Structure
Code
src/
  components/
  redux/
  auth/
  __tests__/
  testUtils.tsx
.github/
  workflows/
    main.yml
public/
README.md
🛠️ Technologies Used
Category	Tools
Frontend	React, TypeScript, React Router
State Management	Redux Toolkit
Backend Services	Firebase Auth, Firestore
Testing	Jest, React Testing Library
CI/CD	GitHub Actions
Deployment	Vercel
Build Tools	Vite
▶️ Running the Project Locally
bash
npm install
npm run dev
▶️ Running Tests
bash
npm test
🌐 Deployment
This project is deployed on Vercel using an automated GitHub Actions workflow.
Every push to main triggers:

Install dependencies

Build the project

Run Jest tests

Deploy to Vercel (only if all tests pass)

🎓 Summary
This project demonstrates:

Professional CI/CD workflow

Real TDD practices

Clean, maintainable React + TypeScript architecture

Automated deployment to Vercel

Reliable test coverage for critical features