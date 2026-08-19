class ApiService {
  static setResponse(response) {
    globalThis.__apiResponse = response;
  }

  static getResponse() {
    return globalThis.__apiResponse;
  }
}

export default ApiService;