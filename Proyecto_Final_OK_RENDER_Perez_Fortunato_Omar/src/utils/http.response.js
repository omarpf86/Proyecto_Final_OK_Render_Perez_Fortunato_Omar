const HttpStatus = {
    OK: 200,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    INTERNAL_SERVER_ERROR: 500,
};

const errorsDictionary = {
    NOT_FOUND: "One or more objects were not found for the operation you want to perform.",
    OK: "Operation carried out succesfully",
    BAD_REQUEST: "Bad Request.",
    INTERNAL_SERVER_ERROR: "There was an error on the server while processing the request.",
    UNAUTHORIZED: "The request requires user authentication.",
    FORBIDDEN: "The server understands the request, but refuses to authorize it."
}

export class HttpResponse {
    Ok(res, data) {
        return res.status(HttpStatus.OK).json({
            status: HttpStatus.OK,
            message: errorsDictionary.OK,
            data,
        });
    }

    BadRequest(res, data) {
        return res.status(HttpStatus.BAD_REQUEST).json({
            status: HttpStatus.BAD_REQUEST,
            message: errorsDictionary.BAD_REQUEST,
            data,
        });
    }


    NotFound(res, data) {
        return res.status(HttpStatus.NOT_FOUND).json({
            status: HttpStatus.NOT_FOUND,
            message: errorsDictionary.NOT_FOUND,
            data,
        });
    }

    Unauthorized(res, data) {
        return res.status(HttpStatus.UNAUTHORIZED).json({
            status: HttpStatus.UNAUTHORIZED,
            message: errorsDictionary.UNAUTHORIZED,
            error: data,
        });
    }

    Forbidden(res, data) {
        return res.status(HttpStatus.FORBIDDEN).json({
            status: HttpStatus.FORBIDDEN,
            message: errorsDictionary.FORBIDDEN,
            error: data,
        });
    }

    ServerError(res, data) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            message: errorsDictionary.INTERNAL_SERVER_ERROR,
            error: data,
        });
    }
}