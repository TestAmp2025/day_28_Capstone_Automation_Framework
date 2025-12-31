/**
 * DateUtils.js
 * Utility functions for handling dynamic date generation and formatting
 * Critical for tests that rely on current date/time (e.g., scheduling features)
 */

class DateUtils {
    /**
     * Get the current date formatted as "DayOfWeek, Month Day, Year"
     * Example: "Tuesday, December 30, 2025"
     * This matches the format used by the K12 Harmony Hub application
     * @returns {string} Formatted date string
     */
    static getFormattedDate() {
      const today = new Date();
      
      const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      };
      
      return today.toLocaleDateString('en-US', options);
    }
  
    /**
     * Get the current day number (1-31)
     * Useful for selecting a specific day in a calendar grid
     * @returns {number} Day of the month
     */
    static getCurrentDay() {
      return new Date().getDate();
    }
  
    /**
     * Get the current month name (e.g., "December")
     * @returns {string} Full month name
     */
    static getCurrentMonth() {
      const options = { month: 'long' };
      return new Date().toLocaleDateString('en-US', options);
    }
  
    /**
     * Get the current year (e.g., 2025)
     * @returns {number} Current year
     */
    static getCurrentYear() {
      return new Date().getFullYear();
    }
  
    /**
     * Get a time string in HH:MM format
     * @param {number} hours - Hour (0-23)
     * @param {number} minutes - Minutes (0-59)
     * @returns {string} Time in HH:MM format
     */
    static formatTime(hours, minutes) {
      const h = hours.toString().padStart(2, '0');
      const m = minutes.toString().padStart(2, '0');
      return `${h}:${m}`;
    }
  
    /**
     * Get current time in HH:MM format
     * @returns {string} Current time
     */
    static getCurrentTime() {
      const now = new Date();
      return this.formatTime(now.getHours(), now.getMinutes());
    }
  }
  
  export { DateUtils };