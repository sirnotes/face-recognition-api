# Face Recognition API

The Node.js server component for the Face Recognition App.

To run:
1. Clone the repo
2. run `npm install`
3. run `npm start`

Use the (Face Recognition app)[https://github.com/kennithnichol/face-recognition] to interact with the API, or build your own app.

## Endpoints
GET /
  List users
POST /signin < (email, password)
  Validate a user
POST /register < (email, name, password)
  register a new user
GET /profile/:id < ( user.id)
  Get the profile of a specified user
PUT /image < (user.id)
  Increment the `user.entries` value for the indicated user.

**By default, the server listens on port 3000**
