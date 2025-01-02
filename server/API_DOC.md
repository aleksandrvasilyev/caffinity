# API Documentation

## GET /api/cafes

**Description**: Retrieve a list of cafes.

### Query Parameters

| Parameter | Type    | Required | Default | Description                           |
| --------- | ------- | -------- | ------- | ------------------------------------- |
| `limit`   | integer | No       | 10      | The number of cafes to show per page. |
| `page`    | integer | No       | 1       | The page number to return.            |

### Example Request

```http
GET /api/cafes?limit=10&page=1
```

**Response**:

```json
{
  "success": true,
  "result": {
    "limit": 10,
    "currentPage": 1,
    "totalPages": 5,
    "items": 10,
    "totalItems": 50,
    "hasNextPage": true,
    "hasPrevPage": false,
    "data": [
      {
        "_id": "64b8f5d2dc1b8a1234567802",
        "title": "Café Het Paleis",
        "description": "Cozy café near the Royal Palace serving pastries and coffee.",
        "address": "Nieuwezijds Voorburgwal 196, 1012 SJ Amsterdam",
        "location": {
          "latitude": 52.373173,
          "longitude": 4.892608
        },
        "rating": 4,
        "photos": [
          "het-paleis-1.jpeg",
          "hetpaleis.jpg",
          "het-cafe-restaurant-nostalgisc.jpg",
          "hetpaleis-01.jpg"
        ],
        "createdAt": "2024-12-18T18:33:22.928Z",
        "updatedAt": "2024-12-18T18:33:23.045Z",
        "reviews": [
          {
            "_id": "6761e0b294a9afdb262f170e",
            "text": "Beautifully designed cafe that feels like a home away from home.",
            "cafeId": "64b8f5d2dc1b8a1234567802",
            "userId": "64b8f600dc1b8a1234567901",
            "rating": 4,
            "createdAt": "2023-06-22T19:03:43.640Z",
            "updatedAt": "2023-06-22T19:03:43.640Z",
            "__v": 0
          },
          {
            "_id": "6761e0b294a9afdb262f170f",
            "text": "Incredible atmosphere that makes you want to stay for hours.",
            "cafeId": "64b8f5d2dc1b8a1234567802",
            "userId": "64b8f600dc1b8a1234567901",
            "rating": 4,
            "createdAt": "2024-09-23T02:15:03.328Z",
            "updatedAt": "2024-09-23T02:15:03.328Z",
            "__v": 0
          },
          {
            "_id": "6761e0b294a9afdb262f1710",
            "text": "Phenomenal espresso that rivals the best coffee shops in town.",
            "cafeId": "64b8f5d2dc1b8a1234567802",
            "userId": "64b8f600dc1b8a1234567901",
            "rating": 4,
            "createdAt": "2024-11-09T04:24:46.593Z",
            "updatedAt": "2024-11-09T04:24:46.593Z",
            "__v": 0
          }
        ],
        "reviewUsers": [
          {
            "_id": "64b8f600dc1b8a1234567901",
            "email": "alice@example.com",
            "password": "$2b$10$QfLmTP3hX1FfCjoL9OR8JO3Zl0SbHL5NG.C7zLpjSlK7OCl1M1N4C",
            "name": "Alice Johnson",
            "avatar": "https://example.com/avatars/alice.jpg",
            "phoneNumber": "+31611111111",
            "favourites": [],
            "__v": 0,
            "createdAt": "2024-12-18T18:33:22.865Z",
            "updatedAt": "2024-12-18T18:33:22.865Z"
          }
        ],
        "utilitiesDetails": [
          {
            "_id": "6763157277d8609958f7aeb7",
            "index": 2,
            "value": "wifi",
            "__v": 0
          },
          {
            "_id": "6763157277d8609958f7aeb6",
            "index": 1,
            "value": "outdoor-seating",
            "__v": 0
          },
          {
            "_id": "6763157277d8609958f7aebd",
            "index": 8,
            "value": "non-smoking-area",
            "__v": 0
          },
          {
            "_id": "6763157277d8609958f7aebc",
            "index": 7,
            "value": "cozy-atmosphere",
            "__v": 0
          }
        ],
        "foodoptions": [
          {
            "_id": "6763157277d8609958f7aeca",
            "index": 1,
            "value": "vegan",
            "__v": 0
          },
          {
            "_id": "6763157277d8609958f7aecb",
            "index": 2,
            "value": "gluten-free",
            "__v": 0
          },
          {
            "_id": "6763157277d8609958f7aec9",
            "index": 0,
            "value": "vegetarian",
            "__v": 0
          }
        ]
      }
      // 9 more cafes...
    ]
  }
}
```

## GET /api/cafes/{id}

**Description**: Retrieve detailed information about a specific cafe by its ID.

### Query Parameters

| Parameter | Type   | Required | Default | Description         |
| --------- | ------ | -------- | ------- | ------------------- |
| `id`      | string | No       | None    | The ID of the cafe. |

### Example Request

```http
GET /api/cafes/64b8f5d2dc1b8a1234567802
```

**Response**:

```json
{
  "success": true,
  "result": [
    {
      "_id": "64b8f5d2dc1b8a1234567802",
      "title": "Café Het Paleis",
      "description": "Cozy café near the Royal Palace serving pastries and coffee.",
      "address": "Nieuwezijds Voorburgwal 196, 1012 SJ Amsterdam",
      "location": {
        "latitude": 52.373173,
        "longitude": 4.892608
      },
      "rating": 4,
      "photos": [
        "het-paleis-1.jpeg",
        "hetpaleis.jpg",
        "het-cafe-restaurant-nostalgisc.jpg",
        "hetpaleis-01.jpg"
      ],
      "createdAt": "2024-12-18T18:33:22.928Z",
      "updatedAt": "2024-12-18T18:33:23.045Z",
      "reviews": [
        {
          "_id": "6761e0b294a9afdb262f170e",
          "text": "Beautifully designed cafe that feels like a home away from home.",
          "cafeId": "64b8f5d2dc1b8a1234567802",
          "userId": "64b8f600dc1b8a1234567901",
          "rating": 4,
          "createdAt": "2023-06-22T19:03:43.640Z",
          "updatedAt": "2023-06-22T19:03:43.640Z",
          "__v": 0
        },
        {
          "_id": "6761e0b294a9afdb262f170f",
          "text": "Incredible atmosphere that makes you want to stay for hours.",
          "cafeId": "64b8f5d2dc1b8a1234567802",
          "userId": "64b8f600dc1b8a1234567901",
          "rating": 4,
          "createdAt": "2024-09-23T02:15:03.328Z",
          "updatedAt": "2024-09-23T02:15:03.328Z",
          "__v": 0
        },
        {
          "_id": "6761e0b294a9afdb262f1710",
          "text": "Phenomenal espresso that rivals the best coffee shops in town.",
          "cafeId": "64b8f5d2dc1b8a1234567802",
          "userId": "64b8f600dc1b8a1234567901",
          "rating": 4,
          "createdAt": "2024-11-09T04:24:46.593Z",
          "updatedAt": "2024-11-09T04:24:46.593Z",
          "__v": 0
        }
      ],
      "reviewUsers": [
        {
          "_id": "64b8f600dc1b8a1234567901",
          "email": "alice@example.com",
          "password": "$2b$10$QfLmTP3hX1FfCjoL9OR8JO3Zl0SbHL5NG.C7zLpjSlK7OCl1M1N4C",
          "name": "Alice Johnson",
          "avatar": "https://example.com/avatars/alice.jpg",
          "phoneNumber": "+31611111111",
          "favourites": [],
          "__v": 0,
          "createdAt": "2024-12-18T18:33:22.865Z",
          "updatedAt": "2024-12-18T18:33:22.865Z"
        }
      ],
      "utilitiesDetails": [
        {
          "_id": "6763157277d8609958f7aeb7",
          "index": 2,
          "value": "wifi",
          "__v": 0
        },
        {
          "_id": "6763157277d8609958f7aeb6",
          "index": 1,
          "value": "outdoor-seating",
          "__v": 0
        },
        {
          "_id": "6763157277d8609958f7aebd",
          "index": 8,
          "value": "non-smoking-area",
          "__v": 0
        },
        {
          "_id": "6763157277d8609958f7aebc",
          "index": 7,
          "value": "cozy-atmosphere",
          "__v": 0
        }
      ],
      "foodoptions": [
        {
          "_id": "6763157277d8609958f7aeca",
          "index": 1,
          "value": "vegan",
          "__v": 0
        },
        {
          "_id": "6763157277d8609958f7aecb",
          "index": 2,
          "value": "gluten-free",
          "__v": 0
        },
        {
          "_id": "6763157277d8609958f7aec9",
          "index": 0,
          "value": "vegetarian",
          "__v": 0
        }
      ]
    }
  ]
}
```

### Base URL for Images

To show images, use this base URL and add the image file name from the API response:

**Base URL:** `https://hyf-cohort-49-group-c.s3.eu-north-1.amazonaws.com/cafes/cafes/`

Example:

**Image file name:** `foodhallen-amsterdam.jpg`

**Complete URL:** `https://hyf-cohort-49-group-c.s3.eu-north-1.amazonaws.com/cafes/cafes/foodhallen-amsterdam.jpg`
