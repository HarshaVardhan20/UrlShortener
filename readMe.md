
# URL Shortener Backend

A simple and efficient URL shortener built using **Node.js**, **Express**, and **MongoDB**.


## Tech Stack

- Node.js
- Express.js
- MongoDB (with Mongoose)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/HarshaVardhan20/UrlShortener.git
   cd UrlShortener
2. Navigate to the backend folder and install dependencies:
   ```bash
   cd backend
   npm install
3. Create a `.env` file inside the `backend/` folder with the following content:

   ```env
   MONGO_URI=your_mongodb_connection_string
   PORT=3000

4. Start the backend server:

   ```bash
   npm start




### POST /shorturls

**Description:** Create a new short URL.

**Request Body:**
```json
{
  "url": "https://example.com",
  "shortcode": "smallurl",
  "validity": 60
}

**Response:**
```json
{
  "message": "Short URL created successfully",
  "shortUrl": "http://localhost:3000/custom123"
}

```
### GET /shorturls

**Behavior:**
- Looks up the shortcode in the database.
- If found and not expired:
  - Redirects to the original URL.
  - Logs the current timestamp in the `clicks` array.
- If expired, responds with:
  ```json
  {
    "error": "Short URL has expired."
  }

### GET /shortcode
**Response:**
```json
{
  "originalUrl": "https://example.com",
  "shortcode": "custom123",
  "createdAt": "2025-07-14T06:30:00.000Z",
  "expiresAt": "2025-07-14T07:30:00.000Z",
  "clickCount": 5,
  "clickTimestamps": [
    "2025-07-14T06:45:12.000Z",
    "2025-07-14T06:55:42.000Z"
  ]
}
```
