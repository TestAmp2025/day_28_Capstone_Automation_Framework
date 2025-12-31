import { expect } from '@playwright/test';

/**
 * StudentPage.js
 * Page Object Model for the Student Management page
 * Handles all interactions related to viewing, adding, and verifying students
 */

class StudentPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    
    // Locators
    this.pageTitle = page.locator('h1', { hasText: 'Student Management' });
    this.pageSubtitle = page.locator('text=Manage your students and their information');
    this.addStudentButton = page.locator('button', { hasText: 'Add Student' });
    this.searchInput = page.locator('input[placeholder="Search students..."]');
    this.studentCountBadge = page.locator('text=/\\d+ Students/');
    
    // Modal locators
    this.modal = page.locator('div[role="dialog"]');
    this.modalTitle = this.modal.locator('h2', { hasText: 'Add New Student' });
    this.inputStudentName = this.modal.locator('input[placeholder*="Enter full name"]');
    this.inputStudentEmail = this.modal.locator('input[placeholder*="student@email.com"]');
    this.inputPhone = this.modal.locator('input[placeholder*="(555) 123-4567"]');
    this.inputAddress = this.modal.locator('input[placeholder*="Full address"]');
    this.selectGrade = this.modal.locator('button:has-text("Select grade")');
    this.inputParentName = this.modal.locator('input[placeholder*="Parent/Guardian name"]');
    this.inputParentEmail = this.modal.locator('input[placeholder*="parent@email.com"]');
    this.submitButton = this.modal.locator('button', { hasText: 'Add Student' });
    this.cancelButton = this.modal.locator('button', { hasText: 'Cancel' });
    
    // Student card locators
    this.studentCards = page.locator('div:has(button:has-text("Edit"))').filter({ has: page.locator('text=/Grade \\d+/') });
  }

  /**
   * Navigate to the Student Management page
   */
  async navigate() {
    await this.page.goto('https://k12-harmony-hub.lovable.app/students');
    await this.pageTitle.waitFor({ state: 'visible' });
  }

  /**
   * Get the page title text
   * @returns {Promise<string>}
   */
  async getPageTitle() {
    return await this.pageTitle.textContent();
  }

  /**
   * Verify the page title is correct
   */
  async verifyPageTitle() {
    await expect(this.pageTitle).toHaveText('Student Management');
  }

  /**
   * Get a student card by name
   * @param {string} studentName - The name of the student
   * @returns {import('@playwright/test').Locator}
   */
  getStudentCardByName(studentName) {
    return this.page.locator(`div:has-text("${studentName}")`).filter({ has: this.page.locator('text=/Grade \\d+/') }).first();
  }

  /**
   * Verify a student is present on the page
   * @param {string} studentName - The name of the student to verify
   */
  async verifyStudentPresent(studentName) {
    const studentCard = this.getStudentCardByName(studentName);
    await expect(studentCard).toBeVisible();
  }

  /**
   * Get the total number of students displayed
   * @returns {Promise<number>}
   */
  async getStudentCount() {
    const badgeText = await this.studentCountBadge.textContent();
    const match = badgeText.match(/(\d+)/);
    return match ? parseInt(match[1]) : 0;
  }

  /**
   * Click the Add Student button to open the modal
   */
  async clickAddStudent() {
    await this.addStudentButton.click();
    await this.modal.waitFor({ state: 'visible' });
  }

  /**
   * Select a grade from the dropdown
   * @param {string} grade - Grade to select (e.g., "Grade 10")
   */
  async selectGradeOption(grade) {
    await this.selectGrade.click();
    await this.page.locator(`div[role="option"]:has-text("${grade}")`).click();
  }

  /**
   * Add a new student with complete details
   * @param {Object} studentData - Student information
   * @param {string} studentData.name - Full name
   * @param {string} studentData.email - Student email
   * @param {string} studentData.grade - Grade level (e.g., "Grade 10")
   * @param {string} [studentData.phone] - Phone number (optional)
   * @param {string} [studentData.address] - Address (optional)
   * @param {string} [studentData.parentName] - Parent/Guardian name (optional)
   * @param {string} [studentData.parentEmail] - Parent email (optional)
   */
  async addStudent(studentData) {
    // Open modal
    await this.clickAddStudent();
    
    // Fill required fields
    await this.inputStudentName.fill(studentData.name);
    await this.inputStudentEmail.fill(studentData.email);
    await this.selectGradeOption(studentData.grade);
    
    // Fill optional fields if provided
    if (studentData.phone) {
      await this.inputPhone.fill(studentData.phone);
    }
    
    if (studentData.address) {
      await this.inputAddress.fill(studentData.address);
    }
    
    if (studentData.parentName) {
      await this.inputParentName.fill(studentData.parentName);
    }
    
    if (studentData.parentEmail) {
      await this.inputParentEmail.fill(studentData.parentEmail);
    }
    
    // Submit
    await this.submitButton.click();
    
    // Wait for modal to close
    await this.modal.waitFor({ state: 'hidden' });
  }

  /**
   * Search for a student by name
   * @param {string} searchTerm - Search term
   */
  async searchStudent(searchTerm) {
    await this.searchInput.fill(searchTerm);
    await this.page.waitForTimeout(500); // Wait for search to filter
  }

  /**
   * Get all visible student names
   * @returns {Promise<string[]>}
   */
  async getAllStudentNames() {
    const cards = await this.studentCards.all();
    const names = [];
    
    for (const card of cards) {
      const nameElement = card.locator('text=/^[A-Z][a-z]+ [A-Z][a-z]+$/').first();
      const name = await nameElement.textContent();
      names.push(name.trim());
    }
    
    return names;
  }
}

export { StudentPage };