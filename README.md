🛒 E‑Commerce Application with CI/CD, TDD, and Vercel Deployment
A fully featured React + TypeScript e‑commerce application built with modern tooling, complete with automated testing, continuous integration, and continuous deployment. This project demonstrates professional‑grade development practices including Test‑Driven Development (TDD), GitHub Actions CI/CD, Redux state management, Firebase authentication, and Vercel hosting.

🚀 Live Application
👉 https://cicd-ecomm-proj.vercel.app/product-editor

# CI/CD E-Commerce App

A full-stack style e-commerce application built with React, TypeScript, and Redux that demonstrates automated CI/CD workflows using GitHub Actions.

## Features

- Dynamic product management using FakeStore API
- Client-side routing with React Router
- Centralized state management using Redux
- Automated CI pipeline with GitHub Actions
- Modular component architecture

## Tech Stack

Frontend
- React
- TypeScript
- Redux
- Bootstrap

DevOps
- GitHub Actions
- Git
- CI/CD workflow automation

## CI/CD Pipeline

The GitHub Actions workflow automatically:

1. Installs dependencies
2. Builds the application
3. Runs linting checks
4. Verifies successful build before merge

This ensures code quality and prevents broken code from entering the main branch.

## Installation

Clone the repository:

git clone https://github.com/Mothmannn/CICD-Ecomm-Proj

Install dependencies:

npm install

Start development server:

npm run dev

**Testing**
Jest + React Testing Library

Unit tests for key components

Integration test for cart state updates

Mocked Firebase and session storage for deterministic tests

## GitHub Actions Workflow

The project uses GitHub Actions to automate the CI pipeline.

Workflow triggers:
- push to main branch
- pull requests

Pipeline steps:
1. Checkout repository
2. Install dependencies
3. Build application
4. Run validation checks

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
Frontend - React, TypeScript, React Router
State Management -	Redux Toolkit
Backend Services -	Firebase Auth, Firestore
Testing	- Jest, React Testing Library
CI/CD -	GitHub Actions
Deployment - Vercel
Build - Tools	Vite

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
