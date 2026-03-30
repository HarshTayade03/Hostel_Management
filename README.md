# Hostel Management System

## Project Overview

This project is a comprehensive Hostel Management System built with Python and MySQL. It provides a robust solution for managing hostel operations, including student records, room allocations, fee management, and administrative tasks.

## Features

- **Student Management**: Add, update, and delete student records.
- **Room Management**: Manage room availability and assignments.
- **Fee Management**: Track student fees and payments.
- **User Authentication**: Secure login for different user roles.
- **Reporting**: Generate various reports on hostel operations.

## Tech Stack

- **Language**: Python 3.x
- **Database**: MySQL
- **UI Framework**: Tkinter (Standard Python GUI library)

## Prerequisites

Before you begin, ensure you have the following installed:

- **Python**: [Download Python](https://www.python.org/downloads/)
- **MySQL Server**: [Download MySQL](https://dev.mysql.com/downloads/)
- **MySQL Connector/Python**: Install using pip:
  ```bash
  pip install mysql-connector-python
  ```

## Installation

1. **Clone the repository** (if applicable):
   ```bash
   git clone <repository-url>
   cd Hostel_Management
   ```

2. **Set up the database**:
   - Create a MySQL database named `hostel_db`:
     ```sql
     CREATE DATABASE hostel_db;
     ```
   - Import the database schema from the provided SQL file (if available) or create tables manually.

## Usage

1. **Run the application**:
   ```bash
   python main.py
   ```

2. **Login**:
   - Use the following credentials to test:
     - **Username**: `admin`
     - **Password**: `admin`

## Database Schema

The database consists of the following main tables:

- `students`: Stores student information (name, contact, address, etc.)
- `rooms`: Stores room details and availability
- `fees`: Tracks fee payments and balances
- `users`: Manages user accounts and permissions

## Project Structure

```
Hostel_Management/
├── main.py              # Main application entry point
├── database.py          # Database connection and utility functions
├── student_module.py    # Student management module
├── room_module.py       # Room management module
├── fee_module.py        # Fee management module
├── user_module.py       # User management module
├── reports.py           # Report generation
├── config.py            # Configuration settings
└── README.md            # Project documentation
```

## Configuration

Edit the `config.py` file to update database connection settings if needed:

```python
DB_CONFIG = {
    'host': 'localhost',
    'user': 'root',
    'password': 'your_password',
    'database': 'hostel_db'
}
```

## Development

### Adding New Features

1. Create a new module in the `modules/` directory
2. Add corresponding UI forms in the `forms/` directory
3. Update `main.py` to include the new module in the navigation
4. Add appropriate database queries in `database.py`

### Database Migrations

If you need to update the database schema:

1. Modify the SQL queries in `database.py`
2. Create a migration script in the `migrations/` directory
3. Run the migration script to update the database

## Troubleshooting

### Application Won't Start

- Ensure Python is installed and added to PATH
- Verify all required libraries are installed (`pip install -r requirements.txt`)
- Check database connection settings in `config.py`

### Database Connection Errors

- Make sure MySQL server is running
- Verify database name and credentials
- Check if the database exists and has the correct tables

### UI Issues

- Ensure Tkinter is properly installed
- Check for any Python syntax errors in the UI modules

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Contact

For questions or support, please open an issue or contact the development team.

---

**Built with ❤️ for Hostel Management**
