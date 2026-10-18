export interface DefaultResponse {
  status_code: string;
  status_message: string;
}

export interface DataResponse<T> extends DefaultResponse {
  content: T;
}

export interface JwtResponse {
  token: string;
}

export interface JwtDecoded {
  sub: string;
  email: string;
  role: string;
}
