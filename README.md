
# **Day 28 — Capstone Planning Guide**

## *From Empty Framework to Planned Automation*

---

## 1. Purpose of Day 28

Day 28 focuses on **planning before implementation**.

Instead of extending the Mini-Bank or Mini-Shop, we start with:

* an **empty automation framework**
* a **new application**
* a **clear planning process**

The goal is to teach how to:

* analyze a new product
* identify testable behaviors
* map those behaviors to framework files
* prepare for CI and reporting **before writing tests**

This is the same approach students should use for their own capstone projects.

---

## 2. Starting Point: Empty Student Framework

The provided framework already contains structure, but **no content yet**.

### Folder Structure

```
STUDENT-FRAMEWORK
├── pages
├── tests
├── test-data
├── utils
├── playwright-report
├── node_modules
├── .gitignore
├── package.json
├── package-lock.json
├── playwright.config.js
└── README.md
```

At this stage:

* No Page Objects exist
* No test specs exist
* No test data exists

This is intentional.

---

## 3. Rule #1 — Plan Before Coding

Before writing any automation code:

1. Understand the application
2. Identify user-visible behaviors
3. Write test cases
4. Map test cases to:

   * Page Objects
   * Test data
   * Test specs
5. Only then begin implementation

This prevents:

* flaky tests
* poor structure
* duplicated logic

---

## 4. Application Under Test

**Application URL:**
[https://k12-harmony-hub.lovable.app/](https://k12-harmony-hub.lovable.app/)

This application contains:

* Student Management
* Class Scheduling

The goal is **not** to learn the app in depth, but to practice:

* test planning
* framework mapping
* automation thinking

---

## 5. Student Management Page

### Observed Features

* Page title: *Student Management*
* Student cards with:

  * name
  * grade
  * contact information
* Add Student button
* Add Student modal form

---

## 6. Student Page — Test Cases

### Planned Test Cases

1. Verify page title is displayed
2. Verify student name is present
3. Add a new student
4. Verify the new student is added

These test cases validate:

* visibility
* user interaction
* data persistence
* UI updates

---

## 7. Mapping Student Page to Framework

Based on the test cases, the following files are required:

### Pages

```
pages/StudentPage.js
```

### Test Data

```
test-data/student.data.js
```

### Test Spec

```
tests/student.spec.js
```

Each file has a single responsibility:

* Page → actions and locators
* Test data → reusable inputs
* Spec → test flow and assertions

---

## 8. Class Schedule Page

### Observed Features

* Page title: *Class Schedule*
* Calendar view
* Selected date (dynamic)
* Add Event button
* Add Event modal form

This page introduces **dynamic data** (dates and times).

---

## 9. Schedule Page — Test Cases

### Planned Test Cases

1. Verify page title is displayed
2. Verify today’s date is shown
   *(must be dynamic, not hard-coded)*
3. Create an event for today
4. Verify the new event is added
5. Edit the event
6. Verify the event is edited

These test cases validate:

* dynamic date handling
* form interaction
* create and update flows

---

## 10. Mapping Schedule Page to Framework

Based on the test cases, the following files are required:

### Pages

```
pages/SchedulePage.js
```

### Test Data

```
test-data/schedule.data.js
```

### Test Spec

```
tests/schedule.spec.js
```

Dynamic values (dates, times) must be handled programmatically.

---

## 11. Why Tests Are Not Written Yet

At this stage:

* No tests are written
* No locators are selected
* No assertions are implemented

This is intentional.

Before writing tests, the following must still be reviewed:

* accessibility roles
* dynamic elements
* reusable selectors
* reporting strategy

Skipping planning leads to unstable automation.

---

## 12. Reporting — Allure (Introduction)

Allure will be added as a reporting layer on top of Playwright.

Purpose:

* cleaner reports
* historical test trends
* improved visibility in CI

Only integration is planned here.
Detailed usage comes later.

---

## 13. CI/CD — GitHub Actions

A GitHub Actions workflow will be added to:

* install dependencies
* run Playwright tests
* generate reports
* upload artifacts

This ensures:

* tests run automatically
* consistent results
* team visibility

---

## 14. Day 28 Planning Summary

By the end of Day 28 planning, we have:

* Identified two application pages
* Written clear test cases
* Mapped test cases to framework files
* Planned for CI execution
* Planned for Allure reporting

All **before** writing test code.

---

## 15. Key Takeaway

Professional automation is not about writing tests quickly.

It is about:

* clarity
* structure
* intentional design

Planning first makes implementation:

* faster
* cleaner
* more stable

This process can be reused for **any project**.

---

## 16. Next Step

With planning complete, the next phase is **implementation**:

* create Page Objects
* add test data
* write test specs
* wire CI and reports

The foundation is now solid.