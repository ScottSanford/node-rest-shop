**Node Rest API Side Project**
----
## API Resources

### POST /user/signup

Description: Adds a user to the database.

Example: `http://localhost:3000/v1/user/signup`

Payload: Object that includes `email` and `password`.

    {
		"email": "test@test.com",
		"password": "password"
	}

Success Response:

    {
	    "status": "ok",
	    "code": 201,
	    "message": "User created"
	}

Error Response (User already exists):

    {
        "status": "conflict",
        "code": 409,
        "message": "User already exists"
    }

Error Response (Incomplete Data):

    {
        "status": "bad",
        "code": 500,
        "error": {}
    }

### POST /user/login

Description: Logins a user and returns a JSON Web Token for authentication. 

Example: `http://localhost:3000/v1/user/login`

Payload: Object that includes `email` and `password`.

    {
		"email": "test@test.com",
		"password": "password"
	}

Success Response:

    {
	    "status": "ok",
	    "code": 200,
	    "message": "Auth successful",
	    "token": "eyJhbGciOiJIUzVCJ9.eyJlbWFpbCI6IIiwidXNlcklkIjoiNWJlMTA0MjMzZjFlYzczZTRiMDI4YmYyIiwiaWF0IjoxNDM1OTZ9.thbYbaJ8qSeUyLhEJ8QOVKjDkzLo"
	}

Error Response: 

    {
        "status": "bad",
        "code": 404,
        "message": "Auth failed"
    }

### DELETE /user/{userId}

Description: Deletes a user from the database.

Example: `http://localhost:3000/v1/user/5be20d15ac76bc2b3abb9109`

Headers: `Authorization: Bearer <jsonWebToken>`

Success Response: 

    {
	    "status": "ok",
	    "code": 200,
	    "message": "User deleted",
	    "request": {
	        "type": "POST",
	        "url": "http://localhost:3000/user/signup",
	        "body": {
	            "email": "Required String",
	            "password": "Required String"
	        },
	        "description": "Add a user"
	    }
	}

Error Response (not authorized, check 'Bearer token'): 

    {
		status: 'bad',
		code: 401,
		message: 'Auth failed'
	}

### GET /products

Description: Gets a list of all the products in the database.

Example: `http://localhost:3000/v1/products`

Success Response: 

    {
	    "status": "ok",
	    "code": 200,
	    "totalCount": 3,
	    "products": [
	        {
	            "name": "Mugsy Jeans - Fultons",
	            "price": 98,
	            "_id": "5ba942eb51783f137f643f9b",
	            "request": {
	                "type": "GET",
	                "url": "http://localhost:3000/products/5ba942eb51783f137f643f9b",
	                "description": "Get product details."
	            }
	        },
	        {
	            "name": "Mugsy Jeans - Lake Shores",
	            "price": 98,
	            "_id": "5ba944bd76747c14808538cc",
	            "request": {
	                "type": "GET",
	                "url": "http://localhost:3000/products/5ba944bd76747c14808538cc",
	                "description": "Get product details."
	            }
	        },
	        {
	            "name": "Mugsy Jeans - Lake Shores",
	            "price": 98,
	            "_id": "5ba945fe512f1f1500d673ad",
	            "request": {
	                "type": "GET",
	                "url": "http://localhost:3000/products/5ba945fe512f1f1500d673ad",
	                "description": "Get product details."
	            }
	        }
        ]
	}

### GET /products/{productId}

Description: Gets details on one product.

Example: `http://localhost:3000/v1/products/5be2422bad257543b0b85b3c`

Success Response:

    {
	    "status": "ok",
	    "code": 200,
	    "product": {
	        "_id": "5ba9a00a9b8c00269d8c0958",
	        "name": "Fantasy Football",
	        "price": 29,
	        "productImage": "uploads/2018-09-25T02:40:10.831Zfultons-front_large.jpg"
	    },
	    "request": {
	        "type": "GET",
	        "url": "http://localhost:3000/products",
	        "description": "Get list of all products."
	    }
	}

### POST /products

Description: Adds a product to the database

Example: `http://localhost:3000/v1/products`

Headers: `Authorization: Bearer <jsonWebToken>`

Payload: Include product `name`, `price`, and `productImage` with file upload.

    {
		"name": "Product Name", 
		"price": "98.00",
		"productImage": "Uploaded File"
	}

Success Response: 

    {
	    "status": "ok",
	    "code": 201,
	    "message": "Created product successfully",
	    "createdProduct": {
	        "name": "C Table",
	        "price": 24.99,
	        "_id": "5be2422bad257543b0b85b3c",
	        "request": {
	            "type": "GET",
	            "url": "http://localhost:3000/products/5be2422bad257543b0b85b3c",
	            "description": "Get product details."
	        }
	    }
	}

### PATCH /products/{productId}

Description: Update a product's information.

Example: `http://localhost:3000/v1/products/5be2422bad257543b0b85b3c`

Headers: `Authorization: Bearer <jsonWebToken>`

Payload: Object that includes key/values of metadata to be updated. 

Success Response: 

    {
	    "status": "ok",
	    "code": 200,
	    "message": "Product updated",
	    "request": {
	        "type": "GET",
	        "url": "http://localhost:3000/products/5be2422bad257543b0b85b3c",
	        "description": "See updated product changes."
	    }
	}

### DELETE /products/{productId}

Description: Deletes the specified product from the database.

Example: `http://localhost:3000/v1/products/5be2422bad257543b0b85b3c`

Success Response: 

    {
	    "status": "ok",
	    "code": 200,
	    "message": "Product deleted",
	    "request": {
	        "type": "POST",
	        "url": "http://localhost:3000/products",
	        "body": {
	            "name": "Required String",
	            "price": "Required Number"
	        },
	        "description": "Add a product to the database."
	    }
	}

### GET /orders

Description: Get list of all orders.

Example: `http://localhost:3000/v1/orders`

Headers: `Authorization: Bearer <jsonWebToken>`

Success Response: 

    {
	    "status": "ok",
	    "code": 200,
	    "totalCount": 2,
	    "orders": [
	        {
	            "_id": "5ba92f89ac99190c6074244b",
	            "product": {
	                "_id": "5ba86819a627c6f1703f2518",
	                "name": "Mugsy - Fultons"
	            },
	            "quantity": 1,
	            "request": {
	                "type": "GET",
	                "url": "http://localhost:3000/orders/5ba92f89ac99190c6074244b",
	                "description": "Return information on the specific order."
	            }
	        },
	        {
	            "_id": "5ba932bfdf64c70db86854b1",
	            "product": {
	                "_id": "5ba86819a627c6f1703f2518",
	                "name": "Mugsy - Fultons"
	            },
	            "quantity": 3,
	            "request": {
	                "type": "GET",
	                "url": "http://localhost:3000/orders/5ba932bfdf64c70db86854b1",
	                "description": "Return information on the specific order."
	            }
	        }
	    ]
	}

### GET /orders/{orderId}

Description: Gets specific order details.

Example: `http://localhost:3000/v1/orders/5ba86819a627c6f1703f2518`

Headers: `Authorization: Bearer <jsonWebToken>`

Success Response: 

    {
	    "status": "ok",
	    "code": 200,
	    "order": {
	        "quantity": 1,
	        "_id": "5ba92f89ac99190c6074244b",
	        "product": {
	            "_id": "5ba86819a627c6f1703f2518",
	            "name": "Mugsy - Fultons",
	            "price": 98
	        }
	    },
	    "request": {
	        "type": "GET",
	        "url": "http://localhost:3000/orders",
	        "description": "Get list of all orders."
	    }
	}

Error Response (Can't find order):

    {
	    "status": 404,
	    "message": "Order not found"
	}

### POST /orders

Description: Add an order to the list

Example: `http://localhost:3000/v1/orders`

Headers: `Authorization: Bearer <jsonWebToken>`

Payload: Object that includes `productId` and `quantity`

    {
		"productId": "5ba86819a627c6f1703f2518",
		"quantity: "3"
	}

Success Response: 

    {
	    "status": "ok",
	    "code": 201,
	    "message": "Order stored",
	    "createdOrder": {
	        "_id": "5be24cdcad257543b0b85b40",
	        "product": "5ba86819a627c6f1703f2518",
	        "quantity": 3
	    },
	    "request": {
	        "type": "GET",
	        "url": "http://localhost:3000/orders5be24cdcad257543b0b85b40",
	        "description": "Return information on specific order"
	    }
	}

### DELETE /orders/{orderId}

Description: Delete an order from the database.

Example: `http://localhost:3000/v1/order/5ba86819a627c6f1703f2518`

Headers: `Authorization: Bearer <jsonWebToken>`

Success Response: 

    {
	    "status": "ok",
	    "code": 200,
	    "message": "Order deleted",
	    "request": {
	        "type": "POST",
	        "url": "http://localhost:3000/orders",
	        "body": {
	            "quantity": "Number",
	            "product": "Required String"
	        },
	        "description": "Add an order to the database."
	    }
	}
