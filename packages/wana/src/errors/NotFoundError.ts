import { FastifyError } from "fastify";

export class NotFoundError extends Error implements FastifyError {
  public code: string = "404";
  public statusCode: number = 404;
  constructor() {
    super("Not Found");
  }
}
