// Employee Directory Application - Vanilla JavaScript
class EmployeeDirectory {
    constructor() {
        // Initialize data from mock (simulates Freemarker data)
        this.employees = [...window.mockEmployeeList];
        this.filteredEmployees = [...this.employees];
        this.currentPage = 1;
        this.itemsPerPage = 10;
        this.sortField = '';
        this.sortDirection = 'asc';
        this.editingEmployeeId = null;
        this.filterSidebarOpen = false;
        
        // Initialize the application
        this.init();
    }

    init() {
        this.bindEvents();
        this.renderEmployees();
    }

    bindEvents() {
        // Search functionality
        document.getElementById('search-input').addEventListener('input', (e) => {
            this.handleSearch(e.target.value);
        });

        // Filter toggle
        document.getElementById('filter-btn').addEventListener('click', () => {
            this.toggleFilterSidebar();
        });

        // Filter controls
        document.getElementById('apply-btn').addEventListener('click', () => {
            this.applyFilters();
        });

        document.getElementById('reset-btn').addEventListener('click', () => {
            this.resetFilters();
        });

        // Sort and show controls
        document.getElementById('sort-select').addEventListener('change', (e) => {
            this.handleSort(e.target.value);
        });

        document.getElementById('show-select').addEventListener('change', (e) => {
            this.itemsPerPage = parseInt(e.target.value);
            this.currentPage = 1;
            this.renderEmployees();
        });

        // Add employee
        document.getElementById('add-employee-btn').addEventListener('click', () => {
            this.showAddForm();
        });

        // Form handling
        document.getElementById('employee-form').addEventListener('submit', (e) => {
            this.handleFormSubmit(e);
        });

        document.getElementById('cancel-btn').addEventListener('click', () => {
            this.hideForm();
        });

        // Modal close on background click
        document.getElementById('employee-modal').addEventListener('click', (e) => {
            if (e.target.id === 'employee-modal') {
                this.hideForm();
            }
        });

        // Close filter sidebar when clicking outside
        document.addEventListener('click', (e) => {
            const sidebar = document.getElementById('filter-sidebar');
            const filterBtn = document.getElementById('filter-btn');
            
            if (this.filterSidebarOpen && 
                !sidebar.contains(e.target) && 
                !filterBtn.contains(e.target)) {
                this.closeFilterSidebar();
            }
        });
    }

    handleSearch(searchTerm) {
        this.filteredEmployees = this.employees.filter(emp => {
            const fullName = `${emp.firstName} ${emp.lastName}`.toLowerCase();
            const email = emp.email.toLowerCase();
            const term = searchTerm.toLowerCase();
            
            return fullName.includes(term) || email.includes(term);
        });
        
        this.currentPage = 1;
        this.applySorting();
        this.renderEmployees();
    }

    toggleFilterSidebar() {
        if (this.filterSidebarOpen) {
            this.closeFilterSidebar();
        } else {
            this.openFilterSidebar();
        }
    }

    openFilterSidebar() {
        const sidebar = document.getElementById('filter-sidebar');
        sidebar.classList.add('active');
        this.filterSidebarOpen = true;
        
        // Add overlay
        const overlay = document.createElement('div');
        overlay.className = 'overlay';
        overlay.id = 'filter-overlay';
        document.body.appendChild(overlay);
        document.body.classList.add('no-scroll');
    }

    closeFilterSidebar() {
        const sidebar = document.getElementById('filter-sidebar');
        sidebar.classList.remove('active');
        this.filterSidebarOpen = false;
        
        // Remove overlay
        const overlay = document.getElementById('filter-overlay');
        if (overlay) {
            overlay.remove();
        }
        document.body.classList.remove('no-scroll');
    }

    applyFilters() {
        const firstName = document.getElementById('filter-firstname').value.toLowerCase();
        const department = document.getElementById('filter-department').value.toLowerCase();
        const role = document.getElementById('filter-role').value.toLowerCase();

        this.filteredEmployees = this.employees.filter(emp => {
            const matchesFirstName = !firstName || emp.firstName.toLowerCase().includes(firstName);
            const matchesDepartment = !department || emp.department.toLowerCase().includes(department);
            const matchesRole = !role || emp.role.toLowerCase().includes(role);
            
            return matchesFirstName && matchesDepartment && matchesRole;
        });

        this.currentPage = 1;
        this.applySorting();
        this.renderEmployees();
        this.closeFilterSidebar();
    }

    resetFilters() {
        document.getElementById('filter-firstname').value = '';
        document.getElementById('filter-department').value = '';
        document.getElementById('filter-role').value = '';
        document.getElementById('search-input').value = '';
        
        this.filteredEmployees = [...this.employees];
        this.currentPage = 1;
        this.applySorting();
        this.renderEmployees();
        this.closeFilterSidebar();
    }

    handleSort(field) {
        if (!field) {
            this.sortField = '';
            this.filteredEmployees = [...this.employees];
            this.renderEmployees();
            return;
        }

        if (this.sortField === field) {
            this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
            this.sortField = field;
            this.sortDirection = 'asc';
        }
        
        this.applySorting();
        this.renderEmployees();
    }

    applySorting() {
        if (!this.sortField) return;

        this.filteredEmployees.sort((a, b) => {
            const aValue = a[this.sortField].toLowerCase();
            const bValue = b[this.sortField].toLowerCase();
            
            if (this.sortDirection === 'asc') {
                return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
            } else {
                return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
            }
        });
    }

    renderEmployees() {
        const container = document.getElementById('employee-grid');
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        const currentEmployees = this.filteredEmployees.slice(startIndex, endIndex);

        if (currentEmployees.length === 0) {
            container.innerHTML = '<div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #666;"><h3>No employees found</h3><p>Try adjusting your search or filters</p></div>';
            return;
        }

        container.innerHTML = currentEmployees.map(emp => `
            <div class="employee-card" data-employee-id="${emp.id}">
                <div class="employee-name">${emp.firstName} ${emp.lastName}</div>
                <div class="employee-detail"><strong>Email:</strong> ${emp.email}</div>
                <div class="employee-detail"><strong>Department:</strong> ${emp.department}</div>
                <div class="employee-detail"><strong>Role:</strong> ${emp.role}</div>
                <div class="employee-actions">
                    <button class="edit-btn" onclick="app.editEmployee(${emp.id})">Edit</button>
                    <button class="delete-btn" onclick="app.deleteEmployee(${emp.id})">Delete</button>
                </div>
            </div>
        `).join('');
    }

    showAddForm() {
        this.editingEmployeeId = null;
        document.getElementById('modal-title').textContent = 'Add Employee';
        document.getElementById('save-btn').textContent = 'Add';
        document.getElementById('employee-form').reset();
        this.clearFormErrors();
        document.getElementById('employee-modal').classList.remove('hidden');
        document.body.classList.add('no-scroll');
    }

    editEmployee(id) {
        const employee = this.employees.find(emp => emp.id === id);
        if (!employee) {
            alert('Employee not found');
            return;
        }

        this.editingEmployeeId = id;
        document.getElementById('modal-title').textContent = 'Edit Employee';
        document.getElementById('save-btn').textContent = 'Save';
        
        // Populate form fields
        document.getElementById('firstName').value = employee.firstName;
        document.getElementById('lastName').value = employee.lastName;
        document.getElementById('email').value = employee.email;
        document.getElementById('department').value = employee.department;
        document.getElementById('role').value = employee.role;
        
        this.clearFormErrors();
        document.getElementById('employee-modal').classList.remove('hidden');
        document.body.classList.add('no-scroll');
    }

    deleteEmployee(id) {
        const employee = this.employees.find(emp => emp.id === id);
        if (!employee) {
            alert('Employee not found');
            return;
        }

        if (confirm(`Are you sure you want to delete ${employee.firstName} ${employee.lastName}?`)) {
            this.employees = this.employees.filter(emp => emp.id !== id);
            this.filteredEmployees = this.filteredEmployees.filter(emp => emp.id !== id);
            this.renderEmployees();
        }
    }

    handleFormSubmit(e) {
        e.preventDefault();
        
        const formData = {
            firstName: document.getElementById('firstName').value.trim(),
            lastName: document.getElementById('lastName').value.trim(),
            email: document.getElementById('email').value.trim(),
            department: document.getElementById('department').value,
            role: document.getElementById('role').value
        };

        // Validate form
        if (!this.validateForm(formData)) {
            return;
        }

        if (this.editingEmployeeId) {
            // Update existing employee
            const index = this.employees.findIndex(emp => emp.id === this.editingEmployeeId);
            if (index !== -1) {
                this.employees[index] = { ...this.employees[index], ...formData };
            }
        } else {
            // Add new employee
            const newEmployee = {
                id: Math.max(...this.employees.map(emp => emp.id)) + 1,
                ...formData
            };
            this.employees.push(newEmployee);
        }

        // Refresh the display
        this.applyCurrentFilters();
        this.hideForm();
    }

    validateForm(data) {
        let isValid = true;
        this.clearFormErrors();

        // Required field validation
        if (!data.firstName) {
            this.showFieldError('firstName', 'First name is required');
            isValid = false;
        }

        if (!data.lastName) {
            this.showFieldError('lastName', 'Last name is required');
            isValid = false;
        }

        if (!data.email) {
            this.showFieldError('email', 'Email is required');
            isValid = false;
        } else if (!this.isValidEmail(data.email)) {
            this.showFieldError('email', 'Please enter a valid email address');
            isValid = false;
        }

        if (!data.department) {
            this.showFieldError('department', 'Department is required');
            isValid = false;
        }

        if (!data.role) {
            this.showFieldError('role', 'Role is required');
            isValid = false;
        }

        return isValid;
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    showFieldError(fieldName, message) {
        const field = document.getElementById(fieldName);
        const errorElement = document.getElementById(`${fieldName}-error`);
        
        field.classList.add('error');
        errorElement.textContent = message;
    }

    clearFormErrors() {
        const errorElements = document.querySelectorAll('.error-message');
        const fieldElements = document.querySelectorAll('.form-group input, .form-group select');
        
        errorElements.forEach(el => el.textContent = '');
        fieldElements.forEach(el => el.classList.remove('error'));
    }

    hideForm() {
        document.getElementById('employee-modal').classList.add('hidden');
        document.body.classList.remove('no-scroll');
        this.editingEmployeeId = null;
    }

    applyCurrentFilters() {
        // Reapply current search and filters
        const searchTerm = document.getElementById('search-input').value;
        if (searchTerm) {
            this.handleSearch(searchTerm);
        } else {
            this.applyFilters();
        }
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new EmployeeDirectory();
});