# Team Task Hub – Testing assignment (skilaverkefni-2)

## Overview

In **skilaverkefni-2** the goal is to **test** the app from **skilaverkefni-1** (Team Task Hub). You build on the solution from skilaverkefni-1: the same codebase, behaviour, and requirements, but you add useful testing tooling.

---

## Requirements (testing)

Build on the code from skilaverkefni-1 and add the following.

### 1. Vitest (unit / component tests)

- Set up **Vitest**.
- Write tests that cover key behaviour (e.g. hooks, presentational components, calculations, helpers).
- Tests must run via npm.

### 2. Storybook

- Set up **Storybook** for the project.
- Create stories for component units (e.g. task/project UI, empty states, side-by-side variants) so components can be inspected in isolation.

### 3. Cypress (E2E)

- Set up **Cypress** with E2E tests.
- Tests must cover **at least one realistic user flow** (e.g. create a project, add a task, mark complete—depending on what the app supports) in a **real browser**.

### 4. CI pipeline (tests run automatically)

- Set up a **CI pipeline** that runs **tests** as far as possible, usually on `push` and/or `pull request` to main.
- **Vitest** runs in the pipeline.
- **Cypress (E2E)** runs in the pipeline.

## 5. There are two bugs in the code that you must find and fix. Use testing to figure out what they are!

---

## Tech stack and submission

- As in skilaverkefni-1: **TypeScript** and clear structure.
- Define in `package.json` (or equivalent) how to run Vitest, Storybook, and Cypress so the instructor can follow the description.
- Add **CI** to the repo (e.g. `.github/workflows/...` on GitHub or equivalent on another platform) so test results are visible in the overview.

### Rules and hand-in (skilaverkefni-2)

- At least **5 Git commits** specifically related to testing (setup + tests)—or a similarly clear incremental commit history.
- Link to the **repo** and (if applicable) a short description of how tests and **CI** are run.

---

# Assessment (100 points) – percentage breakdown

## 1. Vitest – 32 points

- Setup is in place and tests run: **8**
- Valid tests for logic / units: **15**
- Readable test code and sensible use of libraries (Testing Library, etc.): **9**

## 2. Storybook – 28 points

- Storybook starts and stories are visible: **10**
- Varied stories (states, props, edge cases): **13**
- Professional story layout and consistency with the app: **5**

## 3. Cypress E2E – 20 points

- E2E runs reliably: **6**
- At least one meaningful E2E path showing real behaviour: **10**
- Stable tests, clear selectors, not overly brittle: **4**

## 4. Description, docs, and link to skilaverkefni-1 – 10 points

- Good organisation of tests in the project: **4**
- README or docs describing testing: **3**
- Accessible npm scripts: **3**

## 5. CI pipeline – 10 points

- CI file exists and runs are visible: **3**
- **Vitest** runs automatically: **4**
- **Cypress** runs automatically: **3**

---
