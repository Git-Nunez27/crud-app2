# CRUD Full-Stack Application

Complete Full-Stack CRUD application with Express.js backend and MongoDB database.

## Project Structure

```
/
├── src/
│   ├── models/
│   │   └── item.model.js         # MongoDB Mongoose schema
│   ├── controllers/
│   │   └── item.controller.js    # Request handlers
│   ├── routes/
│   │   └── item.route.js         # API routes
│   ├── middlewares/
│   │   └── error.handler.js      # Error handling middleware
│   └── server.js                 # Express server setup
├── public/
│   ├── index.html                # Frontend UI
│   └── app.js                    # Frontend JavaScript
├── package.json                  # Dependencies & scripts
└── .env.example                  # Environment variables template
```

## Features

- ✅ **Create**: Add new items with title and details
- ✅ **Read**: Display all items in real-time
- ✅ **Update**: Edit item titles via modal
- ✅ **Delete**: Remove items with confirmation
- ✅ **Error Handling**: Comprehensive frontend/backend error management
- ✅ **Security**: XSS protection, input validation, sanitization
- ✅ **Responsive**: Works on desktop and mobile devices
- ✅ **MongoDB Integration**: Cloud-based data persistence

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/items` | Get all items (sorted by creation date) |
| POST | `/api/items` | Create new item |
| PUT | `/api/items/:id` | Update item by ID |
| DELETE | `/api/items/:id` | Delete item by ID |
| GET | `/health` | Health check endpoint |

## Setup Instructions

### 1. MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster (M0)
3. Create a database user with username and password
4. Add IP address `0.0.0.0/0` to Network Access (for testing; restrict in production)
5. Get connection string and save it

### 2. Local Setup

```bash
# Install dependencies
npm install

# Create .env file from template
cp .env.example .env

# Edit .env and add your MongoDB connection string
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/crud_app?retryWrites=true&w=majority

# Start server
npm start
```

Server will run on `http://localhost:3000`

### 3. CodeSandbox Setup (Alternative)

1. Create new Node.js sandbox on [CodeSandbox](https://codesandbox.io)
2. Copy all files to sandbox
3. Set `MONGO_URI` in Environment Variables panel
4. Run the server

## Request Examples

### GET All Items
```bash
curl http://localhost:3000/api/items
```

### POST New Item
```bash
curl -X POST http://localhost:3000/api/items \
  -H "Content-Type: application/json" \
  -d '{"title":"My Item","detail":"Item details"}'
```

### PUT Update Item
```bash
curl -X PUT http://localhost:3000/api/items/<id> \
  -H "Content-Type: application/json" \
  -d '{"title":"Updated Title"}'
```

### DELETE Item
```bash
curl -X DELETE http://localhost:3000/api/items/<id>
```

## Testing with Hoppscotch/Postman

1. Open [Hoppscotch](https://hoppscotch.io) or Postman
2. Base URL: `http://localhost:3000`
3. Use endpoints above to test all CRUD operations

## Security Features

- ✅ HTML/XSS escaping in frontend
- ✅ Input validation on both frontend and backend
- ✅ Input trimming and sanitization
- ✅ Proper HTTP status codes
- ✅ Error messages without exposing internals
- ✅ CORS enabled for cross-origin requests

## Environment Variables

Create a `.env` file (use `.env.example` as template):

```env
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/dbname
PORT=3000
```

## Dependencies

- **express**: Web framework
- **mongoose**: MongoDB ODM
- **cors**: Cross-Origin Resource Sharing
- **dotenv**: Environment variables

## Troubleshooting

### MongoDB Connection Failed
- Check credentials in `MONGO_URI`
- Verify IP whitelist in MongoDB Atlas (add `0.0.0.0/0` for testing)
- Check database name is correct

### CORS Errors
- Already enabled by `cors` middleware
- If frontend on different origin, CORS is handled automatically

### Port Already in Use
- Change `PORT` in `.env`
- Or kill process: `lsof -ti:3000 | xargs kill -9`

### Items Not Displaying
- Check browser console for errors
- Verify MongoDB connection in server logs
- Ensure API endpoint is accessible

## Production Recommendations

- ❌ Don't use `0.0.0.0/0` in Network Access — restrict to specific IPs
- ❌ Don't commit `.env` with real credentials
- ✅ Use environment variables or secrets manager
- ✅ Add JWT authentication for protected routes
- ✅ Implement rate limiting
- ✅ Use HTTPS in production
- ✅ Add comprehensive logging (winston, pino)
- ✅ Add input validation libraries (joi, zod)
- ✅ Add unit and integration tests

## Next Steps / Enhancements

1. Add user authentication (JWT, bcrypt)
2. Add role-based access control
3. Add search/filter functionality
4. Add pagination
5. Add file upload support
6. Add real-time updates with WebSocket
7. Add unit and integration tests
8. Add Docker containerization
9. Deploy to Heroku, Railway, or Vercel
10. Add admin dashboard

## License

MIT
