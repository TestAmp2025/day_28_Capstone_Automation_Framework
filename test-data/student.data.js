/**
 * student.data.js
 * Test data for Student Management tests
 * Contains sample student records for data-driven testing
 */

const studentData = {
    // Existing students (already in the system)
    existingStudents: [
      {
        name: 'Emma Johnson',
        grade: 'Grade 10',
        email: 'emma.j@email.com',
        phone: '(555) 123-4567',
        address: '123 Oak Street, Springfield',
        parentName: 'Sarah Johnson',
        enrolledDate: '8/15/2024'
      },
      {
        name: 'Michael Chen',
        grade: 'Grade 11',
        email: 'michael.c@email.com',
        phone: '(555) 234-5678',
        address: '456 Maple Ave, Springfield',
        parentName: 'Lisa Chen',
        enrolledDate: '8/14/2024'
      },
      {
        name: 'Sofia Rodriguez',
        grade: 'Grade 12',
        email: 'sofia.r@email.com',
        phone: '(555) 345-6789',
        address: '789 Pine Road, Springfield',
        parentName: 'Carlos Rodriguez',
        enrolledDate: '8/14/2024'
      }
    ],
  
    // New students to be added during tests
    newStudents: [
      {
        name: 'Alex Thompson',
        grade: 'Grade 9',
        email: 'alex.thompson@email.com',
        phone: '(555) 111-2222',
        address: '100 Elm Street, Springfield',
        parentName: 'Jennifer Thompson',
        parentEmail: 'jennifer.t@email.com'
      },
      {
        name: 'Maya Patel',
        grade: 'Grade 10',
        email: 'maya.patel@email.com',
        phone: '(555) 222-3333',
        address: '200 Cedar Lane, Springfield',
        parentName: 'Raj Patel',
        parentEmail: 'raj.p@email.com'
      },
      {
        name: 'Jordan Williams',
        grade: 'Grade 11',
        email: 'jordan.w@email.com',
        phone: '(555) 333-4444',
        address: '300 Birch Avenue, Springfield',
        parentName: 'Michelle Williams',
        parentEmail: 'michelle.w@email.com'
      },
      {
        name: 'Zara Ahmed',
        grade: 'Grade 12',
        email: 'zara.ahmed@email.com',
        phone: '(555) 444-5555',
        address: '400 Spruce Drive, Springfield',
        parentName: 'Hassan Ahmed',
        parentEmail: 'hassan.a@email.com'
      }
    ],
  
    // Invalid data for negative testing (optional)
    invalidData: [
      {
        name: '',
        grade: 'Grade 10',
        email: 'invalid@email.com',
        expectedError: 'Name is required'
      },
      {
        name: 'Test Student',
        grade: 'Grade 10',
        email: 'not-an-email',
        expectedError: 'Invalid email format'
      }
    ]
  };
  
  export { studentData };