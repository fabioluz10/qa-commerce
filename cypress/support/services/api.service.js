class ApiService {
  // Guarda a resposta da última requisição para ser usada pelos steps seguintes.
  static setResponse(response) {
    globalThis.__apiResponse = response;
  }

  // Recupera a resposta da última requisição armazenada.
  static getResponse() {
    return globalThis.__apiResponse;
  }
}

export default ApiService;