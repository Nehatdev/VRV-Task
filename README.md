# User Management Table

This is a React-based application for managing user data. It provides functionalities to view, add, edit, delete, search, and sort users with a user-friendly interface.

---

## Features

1. **Display User List**
   - Users are displayed in a table format with fields:
     - ID
     - Name
     - Email
     - Status
     - Role

2. **Search**
   - Real-time search by name or email using an input field.

3. **Pagination**
   - Displays users in pages with controls to navigate between pages.

4. **Sorting**
   - Clickable table headers sort users by the respective field (ID, name, email, etc.).

5. **Add User**
   - Opens a modal to add a new user.
   - Newly added users are POSTed to the server and added to the UI.

6. **Edit User**
   - Opens a modal pre-filled with user data for editing.
   - Updates are saved using the PUT request.

7. **Delete User**
   - Deletes a user via DELETE request and removes them from the UI.

8. **Toast Notifications**
   - Displays success or error messages for add, edit, delete, and fetch operations.

---

## Project Structure

### Main Files

1. **`UserTable.jsx`**
   - Handles user data fetching, displaying the user table, and managing interactions (add, edit, delete, search, and sort).
2. **`UserModal.jsx`**
   - A modal component used for adding or editing user information.
3. **Other Dependencies**
   - `react-toastify`: Displays toast notifications for user interactions.
   - Fetch API: Handles data fetching from a mock server (`http://localhost:3000/users`).

---

## How It Works

### State Management
- **Users:** Stores the list of user objects.
- **Current Page:** Tracks the active page in pagination.
- **Search Term:** Filters the displayed users based on input.
- **Sort Configuration:** Keeps track of the field and order (ascending/descending) for sorting.
- **Modal States:**
  - `showModal`: Boolean to toggle the modal's visibility.
  - `currentUser`: Stores data for the user being edited.

### API Operations
- **GET Users:** Fetches the initial list of users from the API.
- **POST User:** Adds a new user to the API.
- **PUT User:** Updates an existing user's data in the API.
- **DELETE User:** Removes a user from the API.



