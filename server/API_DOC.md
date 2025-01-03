# API Documentation

## Table of contents

- [GET /api/cafes](#get-apicafes)
- [GET /api/cafes/{id}](#get-apicafesid)
- [POST /api/reviews](#post-apireviews)

## GET /api/cafes

**Description**: Retrieve a list of cafes.

### Query Parameters

| Parameter | Type    | Required | Default | Description                           |
| --------- | ------- | -------- | ------- | ------------------------------------- |
| `limit`   | integer | No       | 10      | The number of cafes to show per page. |
| `page`    | integer | No       | 1       | The page number to return.            |
| `search`  | string  | No       | null    | Search query (cafe name).             |

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
        "_id": "64b8f5d2dc1b8a1234567801",
        "title": "Café De Balie",
        "description": "A cultural café near Leidseplein offering coffee, lunch, and events.",
        "address": "Kleine-Gartmanplantsoen 10, 1017 RR Amsterdam, Netherlands",
        "location": {
          "latitude": 52.364812,
          "longitude": 4.881876
        },
        "rating": 4.333333333333333,
        "photos": [
          "Café-vanaf-buiten-scaled.webp",
          "bdiukylpviLcZig5NHdEiUlWFrh0m2-metaU09QSDA5NDYuanBn.webp",
          "Balie_Warmer-51-scaled.webp",
          "afbeelding-de-balie.webp"
        ],
        "createdAt": "2025-01-02T18:25:54.607Z",
        "updatedAt": "2025-01-02T18:25:54.797Z",
        "reviews": [
          {
            "_id": "6761e0b294a9afdb262f170b",
            "text": "Cozy cafe with excellent coffee and warm lighting.",
            "cafeId": "64b8f5d2dc1b8a1234567801",
            "userId": "64b8f600dc1b8a1234567901",
            "rating": 4,
            "createdAt": "2024-03-19T00:05:55.322Z",
            "updatedAt": "2024-03-19T00:05:55.322Z",
            "__v": 0,
            "user": {
              "_id": "64b8f600dc1b8a1234567901",
              "email": "alice@example.com",
              "name": "Alice Johnson",
              "avatar": "https://example.com/avatars/alice.jpg",
              "phoneNumber": "+31611111111",
              "favourites": [],
              "createdAt": "2025-01-02T18:25:54.468Z",
              "updatedAt": "2025-01-02T18:25:54.468Z"
            }
          },
          {
            "_id": "6761e0b294a9afdb262f170c",
            "text": "Charming space with a perfect blend of comfort and style.",
            "cafeId": "64b8f5d2dc1b8a1234567801",
            "userId": "64b8f600dc1b8a1234567902",
            "rating": 5,
            "createdAt": "2023-02-08T12:13:39.818Z",
            "updatedAt": "2023-02-08T12:13:39.818Z",
            "__v": 0,
            "user": {
              "_id": "64b8f600dc1b8a1234567902",
              "email": "bob@example.com",
              "name": "Bob Anderson",
              "avatar": "https://example.com/avatars/bob.jpg",
              "phoneNumber": "+31611111112",
              "favourites": [],
              "createdAt": "2025-01-02T18:25:54.469Z",
              "updatedAt": "2025-01-02T18:25:54.469Z"
            }
          },
          {
            "_id": "6761e0b294a9afdb262f170d",
            "text": "Absolutely adorable interior with a welcoming vibe.",
            "cafeId": "64b8f5d2dc1b8a1234567801",
            "userId": "64b8f600dc1b8a1234567903",
            "rating": 4,
            "createdAt": "2024-01-27T17:12:11.961Z",
            "updatedAt": "2024-01-27T17:12:11.961Z",
            "__v": 0,
            "user": {
              "_id": "64b8f600dc1b8a1234567903",
              "email": "carol@example.com",
              "name": "Carol Smith",
              "avatar": "https://example.com/avatars/carol.jpg",
              "phoneNumber": "+31611111113",
              "favourites": [],
              "createdAt": "2025-01-02T18:25:54.469Z",
              "updatedAt": "2025-01-02T18:25:54.469Z"
            }
          }
        ],
        "utilitiesDetails": [
          {
            "_id": "6776da325b27a1809f3b81bc",
            "index": 0,
            "value": "indoor-seating",
            "__v": 0
          },
          {
            "_id": "6776da325b27a1809f3b81be",
            "index": 2,
            "value": "wifi",
            "__v": 0
          },
          {
            "_id": "6776da325b27a1809f3b81c3",
            "index": 7,
            "value": "cozy-atmosphere",
            "__v": 0
          },
          {
            "_id": "6776da325b27a1809f3b81cb",
            "index": 15,
            "value": "live-music",
            "__v": 0
          }
        ],
        "foodoptions": [
          {
            "_id": "6776da325b27a1809f3b81cf",
            "index": 0,
            "value": "vegetarian",
            "__v": 0
          },
          {
            "_id": "6776da325b27a1809f3b81d1",
            "index": 2,
            "value": "gluten-free",
            "__v": 0
          },
          {
            "_id": "6776da325b27a1809f3b81d2",
            "index": 3,
            "value": "lactose-free",
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

### Path Parameters

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
      "createdAt": "2025-01-02T18:25:54.608Z",
      "updatedAt": "2025-01-02T18:25:54.815Z",
      "reviews": [
        {
          "_id": "6761e0b294a9afdb262f170e",
          "text": "Beautifully designed cafe that feels like a home away from home.",
          "cafeId": "64b8f5d2dc1b8a1234567802",
          "userId": "64b8f600dc1b8a1234567901",
          "rating": 4,
          "createdAt": "2023-06-22T19:03:43.640Z",
          "updatedAt": "2023-06-22T19:03:43.640Z",
          "__v": 0,
          "user": {
            "_id": "64b8f600dc1b8a1234567901",
            "email": "alice@example.com",
            "name": "Alice Johnson",
            "avatar": "https://example.com/avatars/alice.jpg",
            "phoneNumber": "+31611111111",
            "favourites": [],
            "createdAt": "2025-01-02T18:25:54.468Z",
            "updatedAt": "2025-01-02T18:25:54.468Z"
          }
        },
        {
          "_id": "6761e0b294a9afdb262f170f",
          "text": "Incredible atmosphere that makes you want to stay for hours.",
          "cafeId": "64b8f5d2dc1b8a1234567802",
          "userId": "64b8f600dc1b8a1234567902",
          "rating": 4,
          "createdAt": "2024-09-23T02:15:03.328Z",
          "updatedAt": "2024-09-23T02:15:03.328Z",
          "__v": 0,
          "user": {
            "_id": "64b8f600dc1b8a1234567902",
            "email": "bob@example.com",
            "name": "Bob Anderson",
            "avatar": "https://example.com/avatars/bob.jpg",
            "phoneNumber": "+31611111112",
            "favourites": [],
            "createdAt": "2025-01-02T18:25:54.469Z",
            "updatedAt": "2025-01-02T18:25:54.469Z"
          }
        },
        {
          "_id": "6761e0b294a9afdb262f1710",
          "text": "Phenomenal espresso that rivals the best coffee shops in town.",
          "cafeId": "64b8f5d2dc1b8a1234567802",
          "userId": "64b8f600dc1b8a1234567903",
          "rating": 4,
          "createdAt": "2024-11-09T04:24:46.593Z",
          "updatedAt": "2024-11-09T04:24:46.593Z",
          "__v": 0,
          "user": {
            "_id": "64b8f600dc1b8a1234567903",
            "email": "carol@example.com",
            "name": "Carol Smith",
            "avatar": "https://example.com/avatars/carol.jpg",
            "phoneNumber": "+31611111113",
            "favourites": [],
            "createdAt": "2025-01-02T18:25:54.469Z",
            "updatedAt": "2025-01-02T18:25:54.469Z"
          }
        }
      ],
      "utilitiesDetails": [
        {
          "_id": "6776da325b27a1809f3b81bd",
          "index": 1,
          "value": "outdoor-seating",
          "__v": 0
        },
        {
          "_id": "6776da325b27a1809f3b81be",
          "index": 2,
          "value": "wifi",
          "__v": 0
        },
        {
          "_id": "6776da325b27a1809f3b81c3",
          "index": 7,
          "value": "cozy-atmosphere",
          "__v": 0
        },
        {
          "_id": "6776da325b27a1809f3b81c4",
          "index": 8,
          "value": "non-smoking-area",
          "__v": 0
        }
      ],
      "foodoptions": [
        {
          "_id": "6776da325b27a1809f3b81cf",
          "index": 0,
          "value": "vegetarian",
          "__v": 0
        },
        {
          "_id": "6776da325b27a1809f3b81d0",
          "index": 1,
          "value": "vegan",
          "__v": 0
        },
        {
          "_id": "6776da325b27a1809f3b81d1",
          "index": 2,
          "value": "gluten-free",
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

## POST /api/reviews

**Description**: Creating a new cafe review.

### Request Body

| Parameter | Type   | Required | Description                     |
| --------- | ------ | -------- | ------------------------------- |
| `cafeId`  | string | Yes      | The id of the cafe.             |
| `review`  | string | Yes      | The text/content of the review. |
| `rating`  | number | Yes      | Number from 1 to 5.             |

### Example Request

```http
POST /api/reviews
Content-Type: application/json

{
  "cafeId": "64b8f5d2dc1b8a1234567808",
  "review": "test review",
  "rating": 4
}
```

**Response**:

```json
{
  "success": true,
  "result": {
    "updatedCafe": {
      "location": {
        "latitude": 52.3679,
        "longitude": 4.9135
      },
      "_id": "64b8f5d2dc1b8a1234567808",
      "title": "Café De Plantage",
      "description": "Stylish café near the zoo with botanical surroundings.",
      "address": "Plantage Middenlaan 2, 1018 DD Amsterdam",
      "rating": 3.75,
      "photos": ["plantage-1.png", "plantage-2.jpg", "plantage-3.jpg"],
      "utilities": [0, 7, 8, 9, 10],
      "foodOptions": [1, 2, 8, 10],
      "__v": 0,
      "createdAt": "2025-01-02T18:25:54.608Z",
      "updatedAt": "2025-01-02T19:37:20.162Z"
    },
    "addedReview": [
      {
        "text": "test review test review",
        "cafeId": "64b8f5d2dc1b8a1234567808",
        "userId": "6776852f29c6508b1898f99e",
        "rating": 1,
        "_id": "6776eaf0d0fad822cf254803",
        "createdAt": "2025-01-02T19:37:20.098Z",
        "updatedAt": "2025-01-02T19:37:20.098Z",
        "__v": 0
      }
    ]
  }
}
```
