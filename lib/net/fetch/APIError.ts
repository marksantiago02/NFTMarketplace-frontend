export class APIError extends Error {
    response: Response;
    data: unknown;
  
    constructor(response: Response, data?: unknown) {
      super();
  
      this.response = response;
      this.data = data;
      this.message = this.toString();
      this.name = "APIError";
    }
  
    toString(): string {
      return typeof this.data === "string"
        ? this.data
        : JSON.stringify(this.data);
    }
  }
  