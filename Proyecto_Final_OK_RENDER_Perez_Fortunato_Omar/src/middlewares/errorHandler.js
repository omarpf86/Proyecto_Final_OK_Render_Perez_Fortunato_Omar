import { HttpResponse } from "../utils/http.response.js";
const httpResponse = new HttpResponse()
import { logger } from '../utils/logger.js'

export const errorHandler = (error, req, res, next) => {
  const status = error.status || 500;
  if (status == 500) {
    logger.error(`Error occurred: ${error.message}`)
    return httpResponse.ServerError(res, error.message)
  }
  else if (status == 401) {
    logger.warn(`Unauthorized access attempt: ${error.message}`)
    return httpResponse.Unauthorized(res, error.message)
  }
  else if (status == 403) {
    logger.warn(`Forbidden access attempt: ${error.message}`)
    return httpResponse.Forbidden(res, error.message)
  } 
  else {
    logger.warn(`Resource not found: ${error.message}`)
    return httpResponse.NotFound(res, error.message)
  } 
};
