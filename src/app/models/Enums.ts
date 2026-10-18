export enum RoleEnum {
    NormalUser = "NORMAL_USER",
    Admin = "ADMIN"
}

export enum StorageKey {
    Token = "token",
    User = "user"
}

export enum StatusCode {
    Success = "SUCCESS",
    Error = "ERROR",
    ErrorUnauthenticated = "ERR_UNAUTHENTICATED",
    ErrorDuplicatedEmail = "ERR_DUPLICATE_EMAIL",
    ErrorInvalidCredential = "ERR_INVALID_CREDENTIAL",
    ErrorUserNotFound = "ERR_USER_NOT_FOUND",
}