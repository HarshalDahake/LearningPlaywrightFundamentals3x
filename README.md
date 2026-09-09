# Learning Playwright Fundamentals with TypeScript

A learning playground for [Playwright](https://playwright.dev/) test automation using TypeScript. This repository walks through the basics of setting up Playwright, generating tests with Codegen, and running them.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Setup](#setup)
- [Browser Installation](#browser-installation)
- [Codegen](#codegen)
- [Writing Your First Test](#writing-your-first-test)
- [Running Tests](#running-tests)
- [Project Structure](#project-structure)
- [Reporters](#reporters)

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later is recommended)
- npm (bundled with Node.js)
- A code editor like [VS Code](https://code.visualstudio.com/)

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/HarshalDahake/LearningPlaywrightFundamentals3x.git
   cd LearningPlaywrightFundamentals3x
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

   This installs `@playwright/test` and `@types/node` from `package.json`.

3. **Verify the install**

   ```bash
   npx playwright --version
   ```

## Setup

If you are starting a new project from scratch instead of cloning, run the setup command which scaffolds `playwright.config.ts`, a sample test, and the correct folder structure:

```bash
npm init playwright@latest
```

Answer the prompts to select TypeScript as the language, choose your test directory, and decide whether to add a GitHub Actions workflow.

## Browser Installation

Playwright needs browser binaries to run tests. Install the Chromium, Firefox, and WebKit browsers:

```bash
npx playwright install
```

To install only a specific browser, for example Chromium:

```bash
npx playwright install chromium
```

> **Note:** On Linux you may also need system dependencies:
> ```bash
> npx playwright install --with-deps
> ```

## Codegen

Codegen records your actions in the browser and generates test code automatically. This is the fastest way to start writing tests — you click and Playwright writes the assertions.

**Start Codegen on any URL:**

```bash
npx playwright codegen https://example.com
```

**Codegen options:**

| Command | Description |
| --- | --- |
| `npx playwright codegen <url>` | Record actions on the given URL |
| `npx playwright codegen --browser=firefox <url>` | Record using Firefox |
| `npx playwright codegen --browser=webkit <url>` | Record using WebKit |
| `npx playwright codegen --channel=msedge <url>` | Record using Microsoft Edge |
| `npx playwright codegen --save-storage=auth.json <url>` | Persist login state (cookies) |
| `npx playwright codegen --load-storage=auth.json <url>` | Reuse previously saved login state |
| `npx playwright codegen --viewport-size=800,600 <url>` | Set a custom viewport size |
| `npx playwright codegen --target=python <url>` | Generate Python (default is JS or TS) |

When you finish recording, copy the generated code into a test file under the `tests/` directory.

## Writing Your First Test

Create a file `tests/example.spec.ts`:

```ts
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the "Get started" link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects the URL to contain "intro".
  await expect(page).toHaveURL(/.*intro/);
});
```

## Running Tests

Run all tests in headless mode:

```bash
npx playwright test
```

Run a single test file:

```bash
npx playwright test tests/example.spec.ts
```

Run with a specific browser project:

```bash
npx playwright test --project=chromium
```

Run in headed (visible) mode:

```bash
npx playwright test --headed
```

Debug a test with the Playwright debugger and inspector:

```bash
npx playwright test --debug
```

## Project Structure

```
LearningPlaywrightFundamentals3x/
├── node_modules/            # Installed dependencies
├── playwright-report/       # HTML test report output
├── test-results/            # Test artifacts (traces, screenshots)
├── tests/                   # Your test files (*.spec.ts)
├── .gitignore
├── package.json
├── package-lock.json
└── playwright.config.ts     # Test configuration
```

## Reporters

By default, tests produce an HTML report. After a test run, view it locally with:

```bash
npx playwright show-report
```

Other useful reporter options in `playwright.config.ts`:

```ts
reporter: [
  ['html'],              // HTML report
  ['line'],              // One line per test in the terminal
  ['list'],              // Step-by-step output in the terminal
  ['json', { outputFile: 'results.json' }],
]
```

## Configuration Highlights

The `playwright.config.ts` in this project is configured to:

- Look for tests in the `./tests` directory
- Run test files fully in parallel
- Retry failed tests twice on CI (`retries: 2`)
- Run tests headed by default (`headless: false`)
- Collect traces on first retry to help debug failures

---

**Author:** Harshal Dahake
**License:** MIT