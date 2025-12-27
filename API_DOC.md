# Monke Finance API Documentation

## Base URL
```
http://localhost:3000
```

## Authentication

Most endpoints require authentication using JWT tokens. Include the token in the `Authorization` header:

```
Authorization: Bearer <your_jwt_token>
```

The token is obtained from the login endpoint and is valid for 7 days by default.

---

## Response Format

All API responses follow this structure:

### Success Response
```json
{
  "success": true,
  "message": "Success message",
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message"
}
```

### Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request (Validation Error)
- `401` - Unauthorized
- `404` - Not Found
- `409` - Conflict (e.g., duplicate email/username)
- `500` - Internal Server Error

---

## Endpoints

### Health Check

#### GET `/health`
Check if the API is running.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2025-12-27T19:00:00.000Z"
}
```

---

## Authentication Endpoints

### Register User

#### POST `/api/auth/register`
Create a new user account.

**Request Body:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": 1,
      "username": "johndoe",
      "email": "john@example.com",
      "createdAt": "2025-12-27T19:00:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Validation:**
- `username`: Required, unique
- `email`: Required, valid email format, unique
- `password`: Required, minimum length

---

### Login User

#### POST `/api/auth/login`
Authenticate and get JWT token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

OR

```json
{
  "username": "johndoe",
  "password": "securepassword123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": 1,
      "username": "johndoe",
      "email": "john@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

### Get Current User

#### GET `/api/auth/me`
Get the authenticated user's information.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Success",
  "data": {
    "id": 1,
    "username": "johndoe",
    "email": "john@example.com"
  }
}
```

---

## Portfolio Endpoints

All portfolio endpoints require authentication.

### Get Portfolio

#### GET `/api/portfolio`
Get the user's portfolio with current values and returns.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Success",
  "data": {
    "portfolioId": 1,
    "totalAmount": 95000,
    "initialAmount": 100000,
    "userId": 1,
    "createdAt": "2025-12-27T19:00:00.000Z",
    "updatedAt": "2025-12-27T19:00:00.000Z",
    "symbolsOwned": [
      {
        "id": 1,
        "symbolName": "BTCUSDT",
        "quantity": 0.1,
        "averagePrice": 87557.25,
        "portfolioId": 1,
        "createdAt": "2025-12-27T19:00:00.000Z",
        "updatedAt": "2025-12-27T19:00:00.000Z"
      }
    ],
    "currentValue": 105000,
    "totalReturn": 5000,
    "totalReturnPercent": 5.0,
    "breakdown": {
      "cash": 95000,
      "holdings": [
        {
          "symbolName": "BTCUSDT",
          "quantity": 0.1,
          "averagePrice": 87557.25,
          "currentPrice": 90000,
          "currentValue": 9000,
          "unrealizedPnL": 244.275,
          "unrealizedPnLPercent": 2.79
        }
      ],
      "totalHoldingsValue": 9000
    }
  }
}
```

**Notes:**
- `currentValue`: Total portfolio value (cash + holdings at current market prices)
- `totalReturn`: Absolute return (currentValue - initialAmount)
- `totalReturnPercent`: Percentage return
- `breakdown.holdings`: Array of owned symbols with current market prices and P&L
- `unrealizedPnL`: Unrealized profit/loss for each holding

---

### Buy Symbol

#### POST `/api/portfolio/buy`
Buy a cryptocurrency symbol. Price is automatically fetched from Binance.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body (Buy by Quantity):**
```json
{
  "symbolName": "BTCUSDT",
  "quantity": 0.1
}
```

**Request Body (Buy by Value):**
```json
{
  "symbolName": "BTCUSDT",
  "value": 5000
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Success",
  "data": {
    "message": "Symbol purchased successfully",
    "symbolName": "BTCUSDT",
    "quantity": 0.1,
    "price": 87557.25,
    "totalCost": 8755.725
  }
}
```

**Validation:**
- `symbolName`: Required, valid cryptocurrency symbol (e.g., "BTCUSDT", "ETHUSDT")
- Either `quantity` OR `value` must be provided (not both)
- `quantity`: Must be > 0 (supports decimals for fractional amounts)
- `value`: Must be > 0 (dollar amount to invest)

**Notes:**
- Price is fetched automatically from Binance API
- If buying by value, the system calculates the quantity based on current market price
- Quantity supports up to 8 decimal places (standard for crypto)

---

### Sell Symbol

#### POST `/api/portfolio/sell`
Sell a cryptocurrency symbol. Price is automatically fetched from Binance.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "symbolName": "BTCUSDT",
  "quantity": 0.1
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Success",
  "data": {
    "message": "Symbol sold successfully",
    "symbolName": "BTCUSDT",
    "quantity": 0.1,
    "price": 90000,
    "totalRevenue": 9000
  }
}
```

**Validation:**
- `symbolName`: Required
- `quantity`: Required, must be > 0, must not exceed owned quantity
- Price is fetched automatically - no need to provide it

**Notes:**
- You can only sell what you own
- Quantity supports fractional amounts (decimals)
- Price is fetched automatically from Binance API

---

### Get Transactions

#### GET `/api/portfolio/transactions`
Get transaction history for the current portfolio.

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `limit` (optional): Number of transactions to return (default: 50)
- `includeArchived` (optional): Include archived transactions from previous portfolio resets (default: false)

**Example:**
```
GET /api/portfolio/transactions?limit=100&includeArchived=false
```

**Response (200):**
```json
{
  "success": true,
  "message": "Success",
  "data": [
    {
      "id": 1,
      "userId": 1,
      "symbolName": "BTCUSDT",
      "type": "BUY",
      "quantity": 0.1,
      "price": 87557.25,
      "totalAmount": 8755.725,
      "createdAt": "2025-12-27T19:00:00.000Z",
      "isArchived": false,
      "archivedAt": null
    },
    {
      "id": 2,
      "userId": 1,
      "symbolName": "BTCUSDT",
      "type": "SELL",
      "quantity": 0.05,
      "price": 90000,
      "totalAmount": 4500,
      "createdAt": "2025-12-27T19:30:00.000Z",
      "isArchived": false,
      "archivedAt": null
    }
  ]
}
```

---

### Get Archived Transactions

#### GET `/api/portfolio/transactions/archived`
Get archived transactions from previous portfolio resets.

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `limit` (optional): Number of transactions to return (default: 50)

**Response (200):**
```json
{
  "success": true,
  "message": "Success",
  "data": [
    {
      "id": 10,
      "userId": 1,
      "symbolName": "ETHUSDT",
      "type": "BUY",
      "quantity": 2.5,
      "price": 2500,
      "totalAmount": 6250,
      "createdAt": "2025-12-20T10:00:00.000Z",
      "isArchived": true,
      "archivedAt": "2025-12-27T19:00:00.000Z"
    }
  ]
}
```

---

### Get Portfolio Analytics

#### GET `/api/portfolio/analytics`
Get detailed portfolio analytics including win/loss statistics.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Success",
  "data": {
    "totalReturn": 5000,
    "totalReturnPercent": 5.0,
    "totalTrades": 10,
    "winningTrades": 6,
    "losingTrades": 3,
    "breakEvenTrades": 1,
    "winRate": 60.0,
    "averageWin": 1500,
    "averageLoss": -800,
    "largestWin": 3000,
    "largestLoss": -1500,
    "unrealizedPnL": 244.275,
    "unrealizedPnLPercent": 2.79
  }
}
```

---

### Reset Portfolio

#### POST `/api/portfolio/reset`
Reset the portfolio to initial state. Clears all holdings and resets cash to initial amount. Previous transactions are archived.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:** (empty)

**Response (200):**
```json
{
  "success": true,
  "message": "Portfolio reset successfully",
  "data": {
    "message": "Portfolio reset successfully",
    "portfolioId": 1,
    "totalAmount": 100000,
    "initialAmount": 100000,
    "symbolsOwned": [],
    "archivedTransactionsAt": "2025-12-27T19:00:00.000Z"
  }
}
```

**Notes:**
- All current holdings are deleted
- Cash is reset to `initialAmount`
- All previous transactions are marked as `isArchived: true`
- Archived transactions can be viewed via `/api/portfolio/transactions/archived`

---

## Market Data Endpoints

These endpoints fetch real-time data from Binance API. No authentication required.

### Get Ticker Price

#### GET `/api/market/ticker/:symbol`
Get the current price for a symbol.

**Example:**
```
GET /api/market/ticker/BTCUSDT
```

**Response (200):**
```json
{
  "success": true,
  "message": "Success",
  "data": {
    "symbol": "BTCUSDT",
    "price": 87557.25
  }
}
```

---

### Get 24h Ticker Data

#### GET `/api/market/ticker/:symbol/24h`
Get 24-hour ticker statistics for a symbol.

**Example:**
```
GET /api/market/ticker/BTCUSDT/24h
```

**Response (200):**
```json
{
  "success": true,
  "message": "Success",
  "data": {
    "symbol": "BTCUSDT",
    "price": 87557.25,
    "change24h": 1500,
    "changePercent24h": 1.74,
    "volume24h": 25000000000,
    "high24h": 89000,
    "low24h": 86000,
    "lastUpdate": "2025-12-27T19:00:00.000Z"
  }
}
```

---

### Get Multiple Tickers

#### GET `/api/market/tickers`
Get prices for multiple symbols.

**Query Parameters:**
- `symbols`: Comma-separated list of symbols

**Example:**
```
GET /api/market/tickers?symbols=BTCUSDT,ETHUSDT,BNBUSDT
```

**Response (200):**
```json
{
  "success": true,
  "message": "Success",
  "data": [
    {
      "symbol": "BTCUSDT",
      "price": 87557.25
    },
    {
      "symbol": "ETHUSDT",
      "price": 2500.50
    },
    {
      "symbol": "BNBUSDT",
      "price": 350.75
    }
  ]
}
```

---

### Get All Tickers

#### GET `/api/market/tickers/all`
Get all available ticker prices from Binance.

**Response (200):**
```json
{
  "success": true,
  "message": "Success",
  "data": [
    {
      "symbol": "BTCUSDT",
      "price": 87557.25
    },
    {
      "symbol": "ETHUSDT",
      "price": 2500.50
    }
    // ... many more symbols
  ]
}
```

**Note:** This endpoint returns all USDT trading pairs from Binance. Response may be large.

---

### Search Symbols

#### GET `/api/market/search`
Search for symbols by name.

**Query Parameters:**
- `q`: Search query (required)

**Example:**
```
GET /api/market/search?q=BTC
```

**Response (200):**
```json
{
  "success": true,
  "message": "Success",
  "data": [
    {
      "symbol": "BTCUSDT",
      "price": 87557.25
    },
    {
      "symbol": "BTCBUSD",
      "price": 87550.00
    }
  ]
}
```

---

## Lessons Endpoints

### Get All Lessons

#### GET `/api/lessons`
Get all published lessons. No authentication required.

**Query Parameters:**
- `category` (optional): Filter by category (e.g., "BASICS", "TECHNICAL_ANALYSIS")
- `difficulty` (optional): Filter by difficulty ("BEGINNER", "INTERMEDIATE", "ADVANCED")

**Example:**
```
GET /api/lessons?category=BASICS&difficulty=BEGINNER
```

**Response (200):**
```json
{
  "success": true,
  "message": "Success",
  "data": [
    {
      "id": 1,
      "title": "Introduction to Cryptocurrency",
      "description": "Learn the basics of cryptocurrency trading",
      "content": "# Introduction\n\n...",
      "category": "BASICS",
      "difficulty": "BEGINNER",
      "order": 1,
      "estimatedTime": 15,
      "isPublished": true,
      "createdAt": "2025-12-27T19:00:00.000Z",
      "updatedAt": "2025-12-27T19:00:00.000Z"
    }
  ]
}
```

---

### Get Lesson by ID

#### GET `/api/lessons/:id`
Get a specific lesson by ID. No authentication required.

**Response (200):**
```json
{
  "success": true,
  "message": "Success",
  "data": {
    "id": 1,
    "title": "Introduction to Cryptocurrency",
    "description": "Learn the basics of cryptocurrency trading",
    "content": "# Introduction\n\n...",
    "category": "BASICS",
    "difficulty": "BEGINNER",
    "order": 1,
    "estimatedTime": 15,
    "isPublished": true,
    "createdAt": "2025-12-27T19:00:00.000Z",
    "updatedAt": "2025-12-27T19:00:00.000Z"
  }
}
```

---

### Get User Progress

#### GET `/api/lessons/user/progress`
Get the authenticated user's progress across all lessons.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Success",
  "data": {
    "totalLessons": 20,
    "completedLessons": 5,
    "inProgressLessons": 3,
    "notStartedLessons": 12,
    "completionRate": 25.0,
    "lessons": [
      {
        "lessonId": 1,
        "title": "Introduction to Cryptocurrency",
        "progress": 100,
        "isCompleted": true,
        "completedAt": "2025-12-27T19:00:00.000Z",
        "startedAt": "2025-12-27T18:00:00.000Z"
      }
    ]
  }
}
```

---

### Get User Lessons

#### GET `/api/lessons/user/lessons`
Get all lessons with the user's progress.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Success",
  "data": [
    {
      "lesson": {
        "id": 1,
        "title": "Introduction to Cryptocurrency",
        "description": "Learn the basics",
        "category": "BASICS",
        "difficulty": "BEGINNER",
        "estimatedTime": 15
      },
      "userLesson": {
        "progress": 100,
        "isCompleted": true,
        "completedAt": "2025-12-27T19:00:00.000Z",
        "startedAt": "2025-12-27T18:00:00.000Z"
      }
    }
  ]
}
```

---

### Start Lesson

#### POST `/api/lessons/:id/start`
Start a lesson (creates a user lesson record).

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Success",
  "data": {
    "userId": 1,
    "lessonId": 1,
    "progress": 0,
    "isCompleted": false,
    "startedAt": "2025-12-27T19:00:00.000Z"
  }
}
```

---

### Update Lesson Progress

#### PATCH `/api/lessons/:id/progress`
Update progress for a lesson.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "progress": 75,
  "isCompleted": false
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Success",
  "data": {
    "userId": 1,
    "lessonId": 1,
    "progress": 75,
    "isCompleted": false,
    "updatedAt": "2025-12-27T19:00:00.000Z"
  }
}
```

**Validation:**
- `progress`: Required, number between 0-100
- `isCompleted`: Optional boolean (automatically set to true if progress is 100)

---

## Watchlist Endpoints

All watchlist endpoints require authentication.

### Get Watchlist

#### GET `/api/watchlist`
Get the user's watchlist.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Success",
  "data": [
    {
      "id": 1,
      "userId": 1,
      "symbolName": "BTCUSDT",
      "createdAt": "2025-12-27T19:00:00.000Z"
    },
    {
      "id": 2,
      "userId": 1,
      "symbolName": "ETHUSDT",
      "createdAt": "2025-12-27T19:00:00.000Z"
    }
  ]
}
```

---

### Add to Watchlist

#### POST `/api/watchlist`
Add a symbol to the watchlist.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "symbolName": "BTCUSDT"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Success",
  "data": {
    "id": 1,
    "userId": 1,
    "symbolName": "BTCUSDT",
    "createdAt": "2025-12-27T19:00:00.000Z"
  }
}
```

**Validation:**
- `symbolName`: Required, valid cryptocurrency symbol

---

### Remove from Watchlist

#### DELETE `/api/watchlist`
Remove a symbol from the watchlist.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "symbolName": "BTCUSDT"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Symbol removed from watchlist"
}
```

---

### Check Watchlist

#### GET `/api/watchlist/:symbol`
Check if a symbol is in the user's watchlist.

**Headers:**
```
Authorization: Bearer <token>
```

**Example:**
```
GET /api/watchlist/BTCUSDT
```

**Response (200):**
```json
{
  "success": true,
  "message": "Success",
  "data": {
    "isInWatchlist": true,
    "watchlistItem": {
      "id": 1,
      "symbolName": "BTCUSDT",
      "createdAt": "2025-12-27T19:00:00.000Z"
    }
  }
}
```

---

## Error Handling

All errors follow a consistent format:

```json
{
  "success": false,
  "message": "Error message describing what went wrong"
}
```

### Common Error Messages

- **400 Bad Request**: Validation errors, invalid input
  - `"Quantity must be a positive number"`
  - `"Either quantity or value must be provided"`
  - `"Invalid symbol: BTCUSDT"`

- **401 Unauthorized**: Authentication errors
  - `"No token provided"`
  - `"Invalid token"`
  - `"Token expired"`
  - `"User not found"`

- **404 Not Found**: Resource not found
  - `"Portfolio not found"`
  - `"Lesson not found"`
  - `"Symbol not found"`

- **409 Conflict**: Duplicate resources
  - `"Email already exists"`
  - `"Username already exists"`
  - `"Symbol already in watchlist"`

- **500 Internal Server Error**: Server errors
  - `"Failed to fetch market data from Binance"`
  - `"Database error occurred"`

---

## Data Types

### Symbol Names
Cryptocurrency symbols follow Binance format:
- `BTCUSDT` - Bitcoin
- `ETHUSDT` - Ethereum
- `BNBUSDT` - Binance Coin
- Format: `{BASE}{QUOTE}` where QUOTE is usually USDT

### Quantities
- Supports fractional amounts (decimals)
- Precision: Up to 8 decimal places
- Example: `0.1`, `0.00000001`, `1.5`

### Prices
- Always in USDT (USD Tether)
- Fetched automatically from Binance API
- Updated in real-time

### Dates
- All dates are in ISO 8601 format
- Example: `"2025-12-27T19:00:00.000Z"`

---

## Rate Limiting

Currently, there are no rate limits implemented. However, please use the API responsibly.

**Note:** Market data endpoints fetch data from Binance API, which has its own rate limits. Excessive requests may result in temporary rate limiting.

---

## Example Usage

### Complete Flow: Register → Login → Buy → Check Portfolio

```javascript
// 1. Register
const registerResponse = await fetch('http://localhost:3000/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    username: 'johndoe',
    email: 'john@example.com',
    password: 'securepassword123'
  })
});
const { data: { token } } = await registerResponse.json();

// 2. Get Portfolio
const portfolioResponse = await fetch('http://localhost:3000/api/portfolio', {
  headers: { 'Authorization': `Bearer ${token}` }
});
const portfolio = await portfolioResponse.json();

// 3. Buy Bitcoin
const buyResponse = await fetch('http://localhost:3000/api/portfolio/buy', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    symbolName: 'BTCUSDT',
    value: 5000  // Buy $5000 worth
  })
});
const buyResult = await buyResponse.json();

// 4. Check Updated Portfolio
const updatedPortfolio = await fetch('http://localhost:3000/api/portfolio', {
  headers: { 'Authorization': `Bearer ${token}` }
});
```

---

## Support

For issues or questions, please refer to the project repository or contact the development team.

---

**Last Updated:** December 27, 2025
**API Version:** 2.0.0

