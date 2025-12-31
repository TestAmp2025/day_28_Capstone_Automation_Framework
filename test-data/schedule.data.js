/**
 * schedule.data.js
 * Test data for Schedule Management tests
 * Contains sample event records for data-driven testing
 */

const scheduleData = {
    // Events to be created during tests
    newEvents: [
      {
        title: 'Advanced Mathematics',
        type: 'Class',
        subject: 'Mathematics',
        startTime: '09:00',
        endTime: '10:00',
        location: 'Room B-204',
        attendees: 32,
        description: 'Grade 11 & 12 Advanced Mathematics lecture covering calculus fundamentals.'
      },
      {
        title: 'Chemistry Lab Session',
        type: 'Event',
        subject: 'General',
        startTime: '10:00',
        endTime: '12:00',
        location: 'Science Lab 1',
        attendees: 24,
        description: 'Hands-on chemistry experiments for Grade 10 students.'
      },
      {
        title: 'Parent-Teacher Conference',
        type: 'Meeting',
        subject: 'General',
        startTime: '14:00',
        endTime: '15:00',
        location: 'Conference Room A',
        attendees: 15,
        description: 'Quarterly parent-teacher meetings to discuss student progress.'
      },
      {
        title: 'Faculty Meeting',
        type: 'Meeting',
        subject: 'Administrative',
        startTime: '15:00',
        endTime: '16:00',
        location: 'Main Conference Room',
        attendees: 25,
        description: 'Monthly faculty meeting to discuss curriculum updates and policies.'
      }
    ],
  
    // Event updates for edit tests
    eventUpdates: [
      {
        originalTitle: 'Advanced Mathematics',
        newData: {
          title: 'Advanced Mathematics - Review Session',
          location: 'Room B-205',
          attendees: 35,
          description: 'Extended review session covering all topics from this semester.'
        }
      },
      {
        originalTitle: 'Chemistry Lab Session',
        newData: {
          startTime: '11:00',
          endTime: '12:00',
          location: 'Science Lab 2',
          description: 'Rescheduled chemistry lab with updated experiments.'
        }
      }
    ],
  
    // Event types available in the system
    eventTypes: [
      'Class',
      'Lab',
      'Meeting',
      'Event',
      'Exam',
      'Activity'
    ],
  
    // Subjects available in the system
    subjects: [
      'Mathematics',
      'Science',
      'English',
      'History',
      'Physical Education',
      'Art',
      'Music',
      'General',
      'Administrative'
    ],
  
    // Time slots (in 30-minute intervals)
    timeSlots: [
      '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
      '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
      '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
      '17:00'
    ]
  };
  
  export { scheduleData };