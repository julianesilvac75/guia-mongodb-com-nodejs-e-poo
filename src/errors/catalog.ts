enum ErrorTypes {
  EntityNotFound = 'EntityNotFound',
  InvalidMongoId = 'InvalidMongoId',
}

// esse é o tipo do objeto vai ser usado construir a resposta da API
type ErrorResponseObject = {
  message: string;
  httpStatus: number;
};

// aqui o tipo do catálogo

type ErrorCatalog = {
  [key in ErrorTypes]: ErrorResponseObject
};

const errorCatalog: ErrorCatalog = {
  EntityNotFound: {
    message: 'Entity not found',
    httpStatus: 404,
  },
  InvalidMongoId: {
    message: 'Id must be a 24 characters hexadecimal',
    httpStatus: 400,
  },
};

export { ErrorTypes, ErrorResponseObject, ErrorCatalog, errorCatalog };
