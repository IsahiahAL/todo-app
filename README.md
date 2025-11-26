# Vanilla JS To-Do App with Persistence

## Overview
A fully functional CRUD (Create, Read, Update, Delete) application built with Vanilla JavaScript. This project demonstrates DOM manipulation, Event Delegation, and State Management without external libraries.

## Key Features
*   **State Persistence:** Uses `localStorage` to save data between page refreshes.
*   **CRUD Operations:** Users can add, edit, save, and delete tasks.
*   **Architecture:** utilizes a centralized State Array as the "Single Source of Truth," rendering the UI based on data changes rather than direct DOM manipulation.
*   **Event Delegation:** Attaches a single event listener to the parent container to manage dynamic elements efficiently.

## Tech Stack
*   HTML5
*   CSS3
*   JavaScript (ES6+)

## How to Run
1.  Clone the repository.
2.  Open `index.html` in your browser.