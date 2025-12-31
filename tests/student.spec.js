import { test, expect } from '@playwright/test';
import { StudentPage } from '../pages/StudentPage.js';
import { studentData } from '../test-data/student.data.js';

/**
 * Student Management Test Suite
 * Tests for verifying student management functionality
 */

test.describe('Student Management', () => {
  let studentPage;

  test.beforeEach(async ({ page }) => {
    studentPage = new StudentPage(page);
    await studentPage.navigate();
  });

  /**
   * TC-01: Verify Title on the Page
   * Validates that the Student Management page displays the correct title
   */
  test('TC-01: Verify page title is displayed correctly', async () => {
    // Verify the page title
    await studentPage.verifyPageTitle();
    
    // Additional assertion for subtitle
    await expect(studentPage.pageSubtitle).toBeVisible();
  });

  /**
   * TC-02: Verify Student Name is Present
   * Validates that existing students are visible on the page
   */
  test('TC-02: Verify existing student is present', async () => {
    // Get the first existing student from test data
    const existingStudent = studentData.existingStudents[0];
    
    // Verify the student is present on the page
    await studentPage.verifyStudentPresent(existingStudent.name);
  });

  /**
   * TC-03: Add New Student
   * Tests the ability to add a new student with complete information
   */
  test('TC-03: Add a new student successfully', async () => {
    // Get the first new student from test data
    const newStudent = studentData.newStudents[0];
    
    // Get initial student count
    const initialCount = await studentPage.getStudentCount();
    
    // Add the new student
    await studentPage.addStudent(newStudent);
    
    // Wait for the page to update
    await studentPage.page.waitForTimeout(1000);
    
    // Verify student count increased
    const newCount = await studentPage.getStudentCount();
    expect(newCount).toBe(initialCount + 1);
  });

  /**
   * TC-04: Verify New Student is Added
   * Validates that the newly added student appears in the student list
   */
  test('TC-04: Verify newly added student is visible', async () => {
    // Get a new student from test data
    const newStudent = studentData.newStudents[1]; // Using index 1 for variety
    
    // Add the student
    await studentPage.addStudent(newStudent);
    
    // Wait for the UI to update
    await studentPage.page.waitForTimeout(1000);
    
    // Verify the student is now present
    await studentPage.verifyStudentPresent(newStudent.name);
  });

});