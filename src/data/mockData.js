export const trainer = {
  id: 'TR-1024',
  name: 'Dr. Ahmed Khan',
  role: 'Teacher',
  email: 'ahmed.khan@avenqori.com',
  phone: '+92 300 1234567',
  location: 'Karachi, Pakistan',
  joined: 'Nov 15, 2025',
  avatar: 'https://i.pravatar.cc/160?img=12',
  bio: 'Experienced Python Developer and Programming Instructor. Passionate about teaching and helping students grow.',
  expertise: ['Python', 'Data Science', 'Web Development', 'AI & Machine Learning'],
  experience: '5+ Years',
  education: 'MS in Computer Science',
  languages: ['English', 'Urdu'],
  teachingStyle: 'Interactive & Practical Learning',
  hourlyFee: 2500,
  rating: 4.8,
  totalClasses: 12,
  totalStudents: 892
};

export const dashboardData = {
  welcome: { students: 500, rating: 4.9, totalEarnings: 3250 },
  overview: { upcomingClasses: 12, students: 245, monthlyEarnings: 1280, rating: 4.9 },
  earnings: [
    { day: 'Nov 1', amount: 180 }, { day: 'Nov 4', amount: 220 },
    { day: 'Nov 7', amount: 320 }, { day: 'Nov 9', amount: 310 },
    { day: 'Nov 12', amount: 470 }, { day: 'Nov 14', amount: 410 },
    { day: 'Nov 17', amount: 520 }, { day: 'Nov 19', amount: 440 },
    { day: 'Nov 22', amount: 530 }, { day: 'Nov 25', amount: 510 },
    { day: 'Nov 27', amount: 720 }, { day: 'Nov 30', amount: 620 }
  ],
  classes: [
    { id: 'CL-101', month: 'Nov', date: '16', day: 'Sun', title: 'Mathematics Fundamentals', subject: 'Mathematics', student: 'Ayesha Malik', time: '10:00 AM – 11:00 AM', status: 'Upcoming', mode: 'One-to-one' },
    { id: 'CL-102', month: 'Nov', date: '17', day: 'Mon', title: 'Python Programming', subject: 'Python', student: 'Usman Ahmed', time: '08:00 PM – 09:00 PM', status: 'Upcoming', mode: 'One-to-one' },
    { id: 'CL-103', month: 'Nov', date: '19', day: 'Wed', title: 'Web Development Basics', subject: 'Web Development', student: 'Fatima Noor', time: '07:00 PM – 08:00 PM', status: 'Upcoming', mode: 'Group' },
    { id: 'CL-104', month: 'Nov', date: '21', day: 'Fri', title: 'Data Science Introduction', subject: 'Data Science', student: 'Ali Raza', time: '05:00 PM – 06:00 PM', status: 'Completed', mode: 'One-to-one' },
    { id: 'CL-105', month: 'Nov', date: '23', day: 'Sun', title: 'Python Programming', subject: 'Python', student: 'Sana Khan', time: '11:00 AM – 12:00 PM', status: 'Pending', mode: 'One-to-one' }
  ],
  students: [
    { id: 'ST-01', name: 'Ayesha Malik', subject: 'Mathematics', email: 'ayesha@example.com', avatar: 'https://i.pravatar.cc/100?img=47', status: 'Active', classes: 18, progress: 82 },
    { id: 'ST-02', name: 'Usman Ahmed', subject: 'Python', email: 'usman@example.com', avatar: 'https://i.pravatar.cc/100?img=12', status: 'Active', classes: 24, progress: 91 },
    { id: 'ST-03', name: 'Fatima Noor', subject: 'Web Development', email: 'fatima@example.com', avatar: 'https://i.pravatar.cc/100?img=44', status: 'Active', classes: 12, progress: 74 },
    { id: 'ST-04', name: 'Ali Raza', subject: 'Data Science', email: 'ali@example.com', avatar: 'https://i.pravatar.cc/100?img=13', status: 'Active', classes: 9, progress: 68 },
    { id: 'ST-05', name: 'Sana Khan', subject: 'English', email: 'sana@example.com', avatar: 'https://i.pravatar.cc/100?img=49', status: 'Inactive', classes: 15, progress: 88 }
  ],
  courses: [
    { id: 'CO-01', title: 'Python Programming', students: 450, progress: 95, icon: '⌘', category: 'Programming', status: 'Published' },
    { id: 'CO-02', title: 'Web Development', students: 380, progress: 88, icon: '⌘', category: 'Development', status: 'Published' },
    { id: 'CO-03', title: 'Mathematics Basics', students: 320, progress: 76, icon: '∑', category: 'Mathematics', status: 'Published' }
  ],
  transactions: [
    { id: 'TX-001', type: 'Course Earnings', description: 'Web Development Course', amount: 420, date: 'Nov 16, 2025', status: 'Completed' },
    { id: 'TX-002', type: 'Course Earnings', description: 'Python Programming Course', amount: 380.5, date: 'Nov 14, 2025', status: 'Completed' },
    { id: 'TX-003', type: 'Withdrawal', description: 'Bank Transfer (JazzCash)', amount: -1000, date: 'Nov 10, 2025', status: 'Processed' },
    { id: 'TX-004', type: 'Course Earnings', description: 'Data Science Course', amount: 510.75, date: 'Nov 08, 2025', status: 'Completed' }
  ],
  notifications: [
    { id: 1, title: 'New class booking request', detail: 'Ayesha Malik requested a Mathematics class.', time: '10 minutes ago', unread: true },
    { id: 2, title: 'Payment received', detail: 'You received $85.00 for Python Programming.', time: '2 hours ago', unread: true },
    { id: 3, title: 'Profile verification update', detail: 'Your teaching certificate has been verified.', time: 'Yesterday', unread: false }
  ]
};
