// Mock employee data - simulates Freemarker data injection
const mockEmployees = [
    { id: 1, firstName: 'Alice', lastName: 'Smith', email: 'alice@example.com', department: 'HR', role: 'Manager' },
    { id: 2, firstName: 'Bob', lastName: 'Johnson', email: 'bob@example.com', department: 'IT', role: 'Developer' },
    { id: 3, firstName: 'Charlie', lastName: 'Lee', email: 'charlie@example.com', department: 'Finance', role: 'Analyst' },
    { id: 4, firstName: 'Diana', lastName: 'Wilson', email: 'diana@example.com', department: 'Marketing', role: 'Coordinator' },
    { id: 5, firstName: 'Edward', lastName: 'Brown', email: 'edward@example.com', department: 'IT', role: 'Senior Developer' },
    { id: 6, firstName: 'Fiona', lastName: 'Davis', email: 'fiona@example.com', department: 'HR', role: 'Recruiter' },
    { id: 7, firstName: 'George', lastName: 'Miller', email: 'george@example.com', department: 'Finance', role: 'Manager' },
    { id: 8, firstName: 'Helen', lastName: 'Garcia', email: 'helen@example.com', department: 'Marketing', role: 'Specialist' },
    { id: 9, firstName: 'Ian', lastName: 'Martinez', email: 'ian@example.com', department: 'IT', role: 'Developer' },
    { id: 10, firstName: 'Julia', lastName: 'Anderson', email: 'julia@example.com', department: 'HR', role: 'Assistant' },
    { id: 11, firstName: 'Kevin', lastName: 'Taylor', email: 'kevin@example.com', department: 'Finance', role: 'Analyst' },
    { id: 12, firstName: 'Laura', lastName: 'Thomas', email: 'laura@example.com', department: 'Marketing', role: 'Manager' },
    { id: 13, firstName: 'Michael', lastName: 'Jackson', email: 'michael@example.com', department: 'IT', role: 'Support' },
    { id: 14, firstName: 'Nancy', lastName: 'White', email: 'nancy@example.com', department: 'HR', role: 'Coordinator' },
    { id: 15, firstName: 'Oliver', lastName: 'Harris', email: 'oliver@example.com', department: 'Finance', role: 'Senior Analyst' }
];

// Available departments and roles for dropdowns
const departments = ['HR', 'IT', 'Finance', 'Marketing'];
const roles = ['Manager', 'Developer', 'Analyst', 'Coordinator', 'Senior Developer', 'Recruiter', 'Specialist', 'Assistant', 'Support', 'Senior Analyst'];

// Simulate Freemarker data assignment
window.mockEmployeeList = mockEmployees;
window.departments = departments;
window.roles = roles;