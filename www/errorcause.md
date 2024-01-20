## HTTP Status Codes

Red item is causing/seeing the error. Orange item is reporting the error.

### 400 Bad Request

![401 Unauthorized](https://www.Gilgamech.com/images/services/error400cause.png)

A malformed request or query string was sent by the client.

### 401 Unauthorized

![401 Unauthorized](https://www.Gilgamech.com/images/services/error401cause.png)

No authentication provided. The response must include a WWW-Authenticate header field containing a challenge applicable to the requested resource.

### 403 Forbidden

![403 Forbidden](https://www.Gilgamech.com/images/services/error403cause.png)

Authentication provided but rejected. You're not allowed to access this file.

### 404 Not Found

![404 Not Found](https://www.Gilgamech.com/images/services/error404cause.png)

File is missing.

Also used to mask 401/403 errors, for security reasons - otherwise, a site can be probed by requesting items, and watching the server return a 401/403 when the item exists, and 404 when it does not.

### 407 Proxy Authentication Required

![407 Proxy Authentication Required](https://www.Gilgamech.com/images/services/error407cause.png)

No authentication provided to proxy.

### 418 I'm a teapot

![418 I'm a teapot](https://www.Gilgamech.com/images/services/error418cause.png)

Device is teapot (1998 April Fool's joke)

### 429 Too Many Requests 

![429 Too Many Requests](https://www.Gilgamech.com/images/services/error429cause.png)

The user has sent too many requests in a given amount of time. Intended for use with rate-limiting schemes.

### 431 Request Header Fields Too Large 

![431 Request Header Fields Too Large](https://www.Gilgamech.com/images/services/error431cause.png)

The server is unwilling to process the request because either an individual header field, or all the header fields collectively, are too large.

### 500 Internal Server Error

![500 Internal Server Error](https://www.Gilgamech.com/images/services/error500cause.png)

A generic error message, given when an unexpected condition was encountered and no more specific message is suitable.

### 502 Bad Gateway

![502 Bad Gateway](https://www.Gilgamech.com/images/services/error502Acause.png)

![502 Bad Gateway](https://www.Gilgamech.com/images/services/error502Bcause.png)

![502 Bad Gateway](https://www.Gilgamech.com/images/services/error502Ccause.png)

The server was acting as a gateway or proxy and received an invalid response from the upstream server.

### 503 Service Unavailable

![503 Service Unavailable](https://www.Gilgamech.com/images/services/error503cause.png)

The server cannot handle the request (because it is overloaded or down for maintenance).

### 504 Gateway Timeout

![504 Gateway Timeout](https://www.Gilgamech.com/images/services/error504Acause.png)

![504 Gateway Timeout](https://www.Gilgamech.com/images/services/error504Bcause.png)

![504 Gateway Timeout](https://www.Gilgamech.com/images/services/error504Ccause.png)

The server was acting as a gateway or proxy and did not receive a timely response from the upstream server.

### 505 HTTP Version Not Supported

![505 HTTP Version Not Supported](https://www.Gilgamech.com/images/services/error505cause.png)

The server does not support the HTTP protocol version used in the request.

### 511 Network Authentication Required 

![511 Network Authentication Required](https://www.Gilgamech.com/images/services/error511cause.png)

The client needs to authenticate to gain network access. Usually used with captive portals.

### 520 (Cloudflare) Web Server Returned an Unknown Error

![520 (Cloudflare) Web Server Returned an Unknown Error](https://www.Gilgamech.com/images/services/error520cause.png)

The origin server returned an empty, unknown, or unexplained response to Cloudflare.

### 521 (Cloudflare) Web Server Is Down

![521 (Cloudflare) Web Server Is Down](https://www.Gilgamech.com/images/services/error521cause.png)

The origin server has refused the connection from Cloudflare.

### 522 (Cloudflare) Connection Timed Out

![522 (Cloudflare) Connection Timed Out](https://www.Gilgamech.com/images/services/error522cause.png)

Cloudflare could not negotiate a TCP handshake with the origin server.

### 523 (Cloudflare) Origin Is Unreachable

![523 (Cloudflare) Origin Is Unreachable](https://www.Gilgamech.com/images/services/error523cause.png)

Cloudflare could not reach the origin server; for example, if the DNS records for the origin server are incorrect.

### 524 (Cloudflare) A Timeout Occurred

![524 (Cloudflare) A Timeout Occurred](https://www.Gilgamech.com/images/services/error524cause.png)

Cloudflare was able to complete a TCP connection to the origin server, but did not receive a timely HTTP response.

### 525 (Cloudflare) SSL Handshake Failed

![525 (Cloudflare) SSL Handshake Failed](https://www.Gilgamech.com/images/services/error525cause.png)

Cloudflare could not negotiate a SSL/TLS handshake with the origin server.
### 526 (Cloudflare) Invalid SSL Certificate

![526 (Cloudflare) Invalid SSL Certificate](https://www.Gilgamech.com/images/services/error526cause.png)

Cloudflare could not validate the SSL certificate on the origin web server.
