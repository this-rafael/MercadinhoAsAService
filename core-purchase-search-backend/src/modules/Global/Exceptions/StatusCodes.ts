export class StatusCodes {
  constructor(
    public readonly statusCode: number,
    public readonly name: string,
    public readonly description: string,
  ) {}

  /**
   * 400 Bad Request: The client's request is malformed or contains errors.
   * 401 Unauthorized: The client must provide valid authentication credentials.
   * 403 Forbidden: Access to the requested resource is forbidden, even with authentication.
   * 404 Not Found: The server couldn't find the requested resource at the provided URL.
   * 405 Method Not Allowed: The HTTP method used is not allowed for this resource.
   * 500 Internal Server Error: An unexpected server error occurred while processing the request.
   * 502 Bad Gateway: The server acting as a gateway received an invalid response from an upstream server.
   * 503 Service Unavailable: The server is temporarily unable to handle the request due to maintenance or overload.
   * 504 Gateway Timeout: The server acting as a gateway did not receive a timely response from an upstream server.
   */
  static readonly BAD_REQUEST = new StatusCodes(
    400,
    'Bad Request',
    "The client's request is malformed or contains errors.",
  );
  static readonly UNAUTHORIZED = new StatusCodes(
    401,
    'Unauthorized',
    'The client must provide valid authentication credentials.',
  );
  static readonly FORBIDDEN = new StatusCodes(
    403,
    'Forbidden',
    'Access to the requested resource is forbidden, even with authentication.',
  );
  static readonly NOT_FOUND = new StatusCodes(
    404,
    'Not Found',
    "The server couldn't find the requested resource at the provided URL.",
  );
  static readonly METHOD_NOT_ALLOWED = new StatusCodes(
    405,
    'Method Not Allowed',
    'The HTTP method used is not allowed for this resource.',
  );

  static readonly INTERNAL_SERVER_ERROR = new StatusCodes(
    500,
    'Internal Server Error',
    'An unexpected server error occurred while processing the request.',
  );

  static readonly BAD_GATEWAY = new StatusCodes(
    502,
    'Bad Gateway',
    'The server acting as a gateway received an invalid response from an upstream server.',
  );

  static readonly SERVICE_UNAVAILABLE = new StatusCodes(
    503,
    'Service Unavailable',
    'The server is temporarily unable to handle the request due to maintenance or overload.',
  );

  static readonly GATEWAY_TIMEOUT = new StatusCodes(
    504,
    'Gateway Timeout',
    'The server acting as a gateway did not receive a timely response from an upstream server.',
  );

  public get baseMessage(): string {
    return `The server responded with ${this.name} (${this.statusCode}): ${this.description} caused by: \n`;
  }
}
