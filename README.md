**Node Rest API Side Project**
----
### API Resources

#### Users
  - [POST /user/signup](#post-user-signup)

### POST /user/signup

Example: `http://localhost:3000/v1/user/signup`

Payload: Object that includes `email` and `password`.

Success Response:

    {
	    "status": "ok",
	    "code": 201,
	    "message": "User created"
	}

Error Response (User already exists)

    {
        "status": "conflict",
        "code": 409,
        "message": "User already exists"
    }

Error Response (Incomplete Data)

    {
        "status": "bad",
        "code": 500,
        "error": {}
    }
