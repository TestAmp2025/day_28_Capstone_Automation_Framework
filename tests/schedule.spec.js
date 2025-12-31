import { test, expect } from '@playwright/test';
import { SchedulePage } from '../pages/SchedulePage.js';
import { scheduleData } from '../test-data/schedule.data.js';
import { DateUtils } from '../utils/DateUtils.js';

/**
 * Schedule Management Test Suite
 * Tests for verifying schedule and event management functionality
 * Includes dynamic date handling for real-time testing
 */

test.describe('Schedule Management', () => {
  let schedulePage;

  test.beforeEach(async ({ page }) => {
    schedulePage = new SchedulePage(page);
    await schedulePage.navigate();
  });

  /**
   * TC-SCHED-01: Verify Title on the Page
   * Validates that the Class Schedule page displays the correct title
   */
  test('TC-SCHED-01: Verify page title is displayed correctly', async () => {
    // Verify the page title
    await schedulePage.verifyPageTitle();
    
    // Additional assertion for subtitle
    await expect(schedulePage.pageSubtitle).toBeVisible();
  });

  /**
   * TC-SCHED-02: Verify Today's Date (Dynamic)
   * Validates that the schedule header displays the correct current date
   * This test uses dynamic date generation to ensure it works regardless of when it runs
   */
  test('TC-SCHED-02: Verify today\'s date is displayed correctly', async () => {
    // Click on today's date in the calendar
    await schedulePage.clickToday();
    
    // Verify the schedule header shows today's date
    await schedulePage.verifyTodaysDate();
    
    // Additional verification: Check the format
    const headerText = await schedulePage.getScheduleHeaderText();
    const expectedDate = DateUtils.getFormattedDate();
    
    console.log(`Expected date: ${expectedDate}`);
    console.log(`Actual header: ${headerText}`);
    
    expect(headerText).toContain(expectedDate);
  });

  /**
   * TC-SCHED-03: Create an Event for Today (Dynamic)
   * Tests the ability to create an event for the current date
   * Uses dynamic date logic to ensure the test always runs successfully
   */
  test('TC-SCHED-03: Create an event for today', async () => {
    // Get event data
    const eventData = scheduleData.newEvents[0];
    
    // Click on today's date
    await schedulePage.clickToday();
    
    // Add the event
    await schedulePage.addEvent(eventData);
    
    // Wait for the UI to update
    await schedulePage.page.waitForTimeout(1000);
    
    // Verify the event was created
    await schedulePage.verifyEventPresent(eventData.title);
  });

  /**
   * TC-SCHED-04: Verify New Event is Added
   * Validates that a newly created event appears in the schedule
   */
  test('TC-SCHED-04: Verify newly added event is visible', async () => {
    // Get event data
    const eventData = scheduleData.newEvents[1];
    
    // Click on today's date
    await schedulePage.clickToday();
    
    // Add the event
    await schedulePage.addEvent(eventData);
    
    // Wait for the UI to update
    await schedulePage.page.waitForTimeout(1000);
    
    // Verify the event is visible
    await schedulePage.verifyEventPresent(eventData.title);
    
    // Verify the event card contains key information
    const eventCard = schedulePage.getEventCardByTitle(eventData.title);
    await expect(eventCard).toContainText(eventData.location);
  });

  /**
   * TC-SCHED-05: Edit Event
   * Tests the ability to edit an existing event
   */
  test('TC-SCHED-05: Edit an existing event', async () => {
    // First, create an event
    const originalEvent = scheduleData.newEvents[2];
    await schedulePage.clickToday();
    await schedulePage.addEvent(originalEvent);
    await schedulePage.page.waitForTimeout(1000);
    
    // Get the update data
    const updateData = scheduleData.eventUpdates[0];
    
    // Edit the event
    await schedulePage.editEvent(originalEvent.title, updateData.newData);
    
    // Wait for the UI to update
    await schedulePage.page.waitForTimeout(1000);
    
    // Verify the updated event is visible
    await schedulePage.verifyEventPresent(updateData.newData.title);
  });

  /**
   * TC-SCHED-06: Verify Event is Edited
   * Validates that the edited event displays the updated information
   */
  test('TC-SCHED-06: Verify edited event shows updated information', async () => {
    // Create an event
    const originalEvent = scheduleData.newEvents[3];
    await schedulePage.clickToday();
    await schedulePage.addEvent(originalEvent);
    await schedulePage.page.waitForTimeout(1000);
    
    // Get the update data
    const updateData = scheduleData.eventUpdates[1];
    
    // Edit the event
    await schedulePage.editEvent(originalEvent.title, updateData.newData);
    await schedulePage.page.waitForTimeout(1000);
    
    // Verify the updated location is displayed
    const eventCard = schedulePage.getEventCardByTitle(originalEvent.title);
    await expect(eventCard).toContainText(updateData.newData.location);
  });

});