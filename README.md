# Ball Tracking Application
This project is a simple web application for tracking the position of a ball in 3D space. It consists of a backend server using Node.js and Express, which stores ball positions in a MySQL database and provides real-time updates via WebSocket. The frontend visualizes the ball's position using Three.js.

## Features
- API endpoint to accept and store the current position of the ball in 3D space.
- Real-time dashboard using Three.js to visualize the ball's position.
- WebSocket integration for real-time updates of the ball's position.

## Technologies Used
### Backend:

- Node.js
- Express.js
- Sequelize (ORM for MySQL)
  
### Frontend:

- React Js
- Three.js (for 3D visualization)
  
### Database:

- MySQL
  
### Prerequisites
Before you begin, ensure you have the following installed:

- Node.js
- MySQL
- Visual Studio Code
  
## Getting Started
Installation
Clone the repository:
```
git clone https://github.com/your-username/ball-tracker.git
```
Navigate to the project directory:

```
cd ball-tracker
```

### Install dependencies for backend:
```
npm install
```
### Install Three.js for frontend:
```
npm install three
```
### Database Setup
### Update server.js

### Start the backend server:
```
node server.js
```

### Interact with the application:

- The 3D visualization will display a sphere representing the ball's position in real-time.
- Updates are received via WebSocket from the backend server.
  
### License
This project is licensed under the MIT License - see the LICENSE file for details.
