# 📋 Algonive Task Manager


A modern, feature-rich task management web application that evolved from a simple personal to-do list into a collaborative team task manager. Built as a phased learning project to demonstrate progressive feature development and real-world software evolution.

# 🎯 Project Overview

Algonive Task Manager is a frontend-focused task management application that enables teams to create, assign, and track tasks through a clean and intuitive interface. The project showcases the evolution of a simple CRUD application into a multi-user collaborative platform.
Key Highlights

🔐 Mock Authentication System - Complete signup/login/logout flow
👥 Multi-User Support - Team-based task assignment and management
📊 Smart Task Tracking - Status workflows, due date detection, and reminders
💾 Persistent Storage - LocalStorage implementation for data persistence
🎨 Modern UI/UX - Responsive design with glassmorphism effects
⚡ Zero Backend - Pure frontend architecture demonstrating complete client-side logic


# ✨ Features
# 🔐 Authentication

User registration with name, email, and password
Secure login/logout functionality
Session persistence across page refreshes
Mock authentication using LocalStorage

# 📝 Task Management

Create Tasks with title, description, and due date
Assign Tasks to team members
Edit & Delete tasks with full CRUD operations
Status Workflow: PENDING → IN_PROGRESS → COMPLETED
Smart Notifications: Due-soon and overdue detection
Task Filtering: View tasks relevant to the current user

# 🎨 User Interface

Glassmorphism Login Page with modern gradient design
Responsive Layout optimized for desktop and mobile
Status Badges for quick task state identification
Clean Card Design for organized task display
Intuitive Navigation with contextual actions


# 🛠️ Tech Stack
TechnologyPurposeReactUI component libraryViteBuild tool and dev serverJavaScript (ES6+)Core programming languageLocalStorage APIClient-side data persistenceCSS3Styling and animationsHTML5Semantic markup
Why This Stack?

⚡ Fast Development - Vite's hot module replacement speeds up iteration
🎯 Focus on Logic - No backend complexity, pure frontend learning
💪 Real-World Patterns - Demonstrates state management and data modeling
🚀 Easy Deployment - Static site, deployable anywhere


# 📦 Installation & Setup
Prerequisites

Node.js (v14 or higher)
npm or yarn package manager

Steps

Clone the repository

bash   git clone <repository-url>
   cd algonive-task-manager

Install dependencies

bash   npm install

Run the development server

bash   npm run dev

Open in browser

   Navigate to http://localhost:5173
Build for Production
bashnpm run build
The production-ready files will be in the dist folder.

# 🚀 Usage Guide
Getting Started

Sign Up

Navigate to the signup page
Create an account with your name, email, and password
You'll be automatically logged in


Create Your First Task

Click "Add Task" or "Create New Task"
Fill in the task details (title, description, due date)
Assign it to yourself or a team member
Set the initial status


Manage Tasks

Mark In Progress: Move tasks from PENDING to IN_PROGRESS
Complete Tasks: Mark finished tasks as COMPLETED
Edit Tasks: Update any task details as needed
Delete Tasks: Remove tasks that are no longer needed


Team Collaboration

Create multiple user accounts (signup as different users)
Assign tasks to different team members
Each user sees tasks assigned to them or created by them


# 🔄 Project Evolution
This project was built in phases to demonstrate incremental feature development:
# Phase 1: Task-1 (Single User) ✅
Goal: Build a functional personal task manager
Features Implemented:

Basic CRUD operations
Task status (PENDING/COMPLETED)
Due date tracking
Overdue and due-soon detection
LocalStorage persistence
Responsive card-based UI

Branch: main

# Phase 2: Task-2 (Multi-User) ✅
Goal: Transform into a collaborative team tool
Major Upgrades:

Mock authentication system
Multi-user data model
Task assignment functionality
Enhanced status workflow (PENDING/IN_PROGRESS/COMPLETED)
User-specific task views
Glassmorphism login page
Team-aware task management

Branch: task-2
Key Learnings: Data modeling for multi-tenancy, state management across users, authentication flows

🎓 What I Learned
Technical Skills

State Management: Managing complex application state without external libraries
Data Modeling: Designing a multi-user data structure in LocalStorage
Authentication Flow: Implementing mock auth with session management
Component Architecture: Building reusable, maintainable React components
Responsive Design: Creating layouts that work across devices

Soft Skills

Incremental Development: Building features in logical phases
Git Workflow: Using branches for feature development
Project Planning: Breaking down large features into manageable tasks
UX Thinking: Designing intuitive user interfaces

Challenges Overcome

LocalStorage Limitations: Structuring data efficiently without a real database
Multi-User Logic: Ensuring tasks are properly filtered per user
State Persistence: Maintaining user sessions across refreshes
Responsive Design: Creating a login page that works on all screen sizes


🔮 Future Enhancements
If I were to continue building this project, here are the features I'd add:

 Real Backend Integration (Node.js + MongoDB/PostgreSQL)
 Task Categories/Projects for better organization
 Real-time Collaboration using WebSockets
 Task Comments and discussion threads
 File Attachments for tasks
 Email Notifications for task assignments and deadlines
 Analytics Dashboard with task completion metrics
 Dark Mode toggle
 Drag-and-Drop task reordering
 Search & Advanced Filters (by status, assignee, date range)
 Mobile App (React Native)


# 🤝 Contributing
This is a learning project, but suggestions and feedback are welcome!

Fork the repository
Create your feature branch (git checkout -b feature/AmazingFeature)
Commit your changes (git commit -m 'Add some AmazingFeature')
Push to the branch (git push origin feature/AmazingFeature)
Open a Pull Request


# 📝 License
This project is open source and available under the MIT License.

# 👨‍💻 Author

Name : Pranav sai kasinadhuni

LinkedIn: [https://www.linkedin.com/in/pranav-sai-kasinadhuni/]

Email: pranavsaikasinadhuni2@gmail.com


# 🙏 Acknowledgments

Built as part of an internship assignment
Special thanks to mentors and reviewers who provided feedback
Inspired by modern task management tools like Trello, Asana, and Jira


# 📸 Screenshots
Login Page
Modern glassmorphism design with gradient background
Task Dashboard
Clean card-based interface showing assigned tasks
Task Creation
Intuitive form for creating and assigning tasks

⭐ If you found this project helpful, please consider giving it a star!
