import { expect } from '@playwright/test';
import { DateUtils } from '../utils/DateUtils.js';

/**
 * SchedulePage.js
 * Page Object Model for the Class Schedule page
 * Handles calendar interactions, event creation, and dynamic date handling
 */

class SchedulePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    
    // Page locators
    this.pageTitle = page.locator('h1', { hasText: 'Class Schedule' });
    this.pageSubtitle = page.locator('text=Manage your daily schedule and events');
    this.addEventButton = page.locator('button', { hasText: 'Add Event' });
    
    // Calendar locators
    this.calendarSection = page.locator('text=Calendar').locator('..');
    this.monthYearDisplay = page.locator('text=/^[A-Z][a-z]+ \\d{4}$/');
    this.prevMonthButton = page.locator('button[hint="Go to previous month"]');
    this.nextMonthButton = page.locator('button[hint="Go to next month"]');
    this.calendarGrid = page.locator('button[role="gridcell"]');
    
    // Schedule display locators
    this.scheduleHeader = page.locator('text=/^Schedule for/');
    this.emptyStateMessage = page.locator('text=No events scheduled');
    this.emptyStateSubtext = page.locator('text=Add an event to get started.');
    
    // Modal locators
    this.modal = page.locator('div[role="dialog"]');
    this.modalTitle = this.modal.locator('h2', { hasText: 'Schedule New Event' });
    this.inputEventTitle = this.modal.locator('input[placeholder*="event title"]');
    this.selectType = this.modal.locator('button[role="combobox"]').first();
    this.selectSubject = this.modal.locator('button:has-text("Select subject")');
    this.selectStartTime = this.modal.locator('button:has-text("Select start time")');
    this.selectEndTime = this.modal.locator('button:has-text("Select end time")');
    this.inputLocation = this.modal.locator('input[placeholder*="Room number"]');
    this.inputAttendees = this.modal.locator('input[type="number"]');
    this.textareaDescription = this.modal.locator('textarea[placeholder*="Additional details"]');
    this.scheduleEventButton = this.modal.locator('button', { hasText: 'Schedule Event' });
    this.cancelButton = this.modal.locator('button', { hasText: 'Cancel' });
    this.closeButton = this.modal.locator('button', { hasText: 'Close' });
  }

  /**
   * Navigate to the Schedule page
   */
  async navigate() {
    await this.page.goto('https://k12-harmony-hub.lovable.app/schedule');
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
    await expect(this.pageTitle).toHaveText('Class Schedule');
  }

  /**
   * Get the schedule header text (e.g., "Schedule for Tuesday, December 30, 2025")
   * @returns {Promise<string>}
   */
  async getScheduleHeaderText() {
    return await this.scheduleHeader.textContent();
  }

  /**
   * Verify today's date is displayed correctly in the schedule header
   */
  async verifyTodaysDate() {
    const expectedDate = DateUtils.getFormattedDate();
    const headerText = await this.getScheduleHeaderText();
    
    // Header format: "Schedule for Tuesday, December 30, 2025"
    // Expected format from DateUtils: "Tuesday, December 30, 2025"
    // The header includes "Schedule for " prefix, so we check if it contains the date
    expect(headerText).toContain(expectedDate);
  }

  /**
   * Get a calendar day button by day number
   * @param {number} dayNumber - Day of the month (1-31)
   * @returns {import('@playwright/test').Locator}
   */
  getDayButton(dayNumber) {
    // Use CSS :not() selector to exclude days from other months (day-outside class)
    // This is more reliable than Playwright's filter API
    return this.page.locator(`button[role="gridcell"]:not(.day-outside)`).filter({ hasText: new RegExp(`^${dayNumber}$`) });
  }

  /**
   * Get today's calendar day button dynamically
   * @returns {import('@playwright/test').Locator}
   */
  getTodayButton() {
    const today = DateUtils.getCurrentDay();
    return this.getDayButton(today);
  }

  /**
   * Click on a specific day in the calendar
   * @param {number} dayNumber - Day of the month
   */
  async clickDay(dayNumber) {
    await this.getDayButton(dayNumber).click();
    // Wait for the schedule to update
    await this.page.waitForTimeout(500);
  }

  /**
   * Click on today's date in the calendar
   */
  async clickToday() {
    const today = DateUtils.getCurrentDay();
    await this.clickDay(today);
  }

  /**
   * Click the Add Event button to open the modal
   */
  async clickAddEvent() {
    await this.addEventButton.click();
    await this.modal.waitFor({ state: 'visible' });
  }

  /**
   * Select an option from a dropdown
   * @param {import('@playwright/test').Locator} dropdownLocator - The dropdown button
   * @param {string} optionText - The option to select
   */
  async selectDropdownOption(dropdownLocator, optionText) {
    await dropdownLocator.click();
    await this.page.waitForTimeout(300);
    await this.page.locator(`div[role="option"]:has-text("${optionText}")`).click();
  }

  /**
   * Add a new event with complete details
   * @param {Object} eventData - Event information
   * @param {string} eventData.title - Event title
   * @param {string} [eventData.type] - Event type (e.g., "Class", "Meeting")
   * @param {string} [eventData.subject] - Subject (e.g., "Mathematics")
   * @param {string} [eventData.startTime] - Start time (e.g., "09:00")
   * @param {string} [eventData.endTime] - End time (e.g., "10:00")
   * @param {string} [eventData.location] - Location/room
   * @param {number} [eventData.attendees] - Expected number of attendees
   * @param {string} [eventData.description] - Event description
   */
  async addEvent(eventData) {
    // Open modal
    await this.clickAddEvent();
    
    // Fill required field
    await this.inputEventTitle.fill(eventData.title);
    
    // Fill optional fields if provided
    if (eventData.type) {
      await this.selectDropdownOption(this.selectType, eventData.type);
    }
    
    if (eventData.subject) {
      await this.selectDropdownOption(this.selectSubject, eventData.subject);
    }
    
    if (eventData.startTime) {
      await this.selectDropdownOption(this.selectStartTime, eventData.startTime);
    }
    
    if (eventData.endTime) {
      await this.selectDropdownOption(this.selectEndTime, eventData.endTime);
    }
    
    if (eventData.location) {
      await this.inputLocation.fill(eventData.location);
    }
    
    if (eventData.attendees !== undefined) {
      await this.inputAttendees.fill(eventData.attendees.toString());
    }
    
    if (eventData.description) {
      await this.textareaDescription.fill(eventData.description);
    }
    
    // Submit
    await this.scheduleEventButton.click();
    
    // Wait for modal to close
    await this.modal.waitFor({ state: 'hidden' });
  }

  /**
   * Get an event card by title
   * @param {string} eventTitle - The title of the event
   * @returns {import('@playwright/test').Locator}
   */
  getEventCardByTitle(eventTitle) {
    return this.page
    .locator('div', {
      has: this.page.locator(`h4:text-is("${eventTitle}")`)
    })
    .first();  
  }

  /**
   * Verify an event is present in the schedule
   * @param {string} eventTitle - The title of the event to verify
   */
  async verifyEventPresent(eventTitle) {
    const eventCard = this.getEventCardByTitle(eventTitle);
    await expect(eventCard).toBeVisible();
  }

  /**
   * Click the Edit button for a specific event
   * @param {string} eventTitle - The title of the event to edit
   */
  async clickEditEvent(eventTitle) {
    const eventCard = this.getEventCardByTitle(eventTitle);
    await eventCard.locator('button').nth(0).click();
    await this.modal.waitFor({ state: 'visible' });
  }

  /**
   * Edit an existing event
   * @param {string} eventTitle - The title of the event to edit
   * @param {Object} newData - New event data (same structure as addEvent)
   */
  async editEvent(eventTitle, newData) {
    // Open edit modal
    await this.clickEditEvent(eventTitle);
    
    // Update fields if provided
    if (newData.title) {
      await this.inputEventTitle.clear();
      await this.inputEventTitle.fill(newData.title);
    }
    
    if (newData.type) {
      await this.selectDropdownOption(this.selectType, newData.type);
    }
    
    if (newData.subject) {
      await this.selectDropdownOption(this.selectSubject, newData.subject);
    }
    
    if (newData.startTime) {
      await this.selectDropdownOption(this.selectStartTime, newData.startTime);
    }
    
    if (newData.endTime) {
      await this.selectDropdownOption(this.selectEndTime, newData.endTime);
    }
    
    if (newData.location) {
      await this.inputLocation.clear();
      await this.inputLocation.fill(newData.location);
    }
    
    if (newData.attendees !== undefined) {
      await this.inputAttendees.clear();
      await this.inputAttendees.fill(newData.attendees.toString());
    }
    
    if (newData.description) {
      await this.textareaDescription.clear();
      await this.textareaDescription.fill(newData.description);
    }
    
    // Save changes (button text might be "Save" or "Update Event")
    await this.page.locator('button:has-text("Save"), button:has-text("Update")').click();
    
    // Wait for modal to close
    await this.modal.waitFor({ state: 'hidden' });
  }

  /**
   * Verify the empty state is displayed
   */
  async verifyEmptyState() {
    await expect(this.emptyStateMessage).toBeVisible();
    await expect(this.emptyStateSubtext).toBeVisible();
  }

  /**
   * Get the current month and year from the calendar
   * @returns {Promise<string>}
   */
  async getMonthYear() {
    return await this.monthYearDisplay.textContent();
  }
}

export { SchedulePage };