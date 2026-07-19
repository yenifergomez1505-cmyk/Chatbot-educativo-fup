export type RolRegistro = "estudiante" | "docente";

export type LoginStatus =
  | "idle"
  | "in_progress"
  | "success"
  | "failed"
  | "invalid_data";

export type RegisterStatus =
  | "idle"
  | "in_progress"
  | "success"
  | "failed"
  | "user_exists"
  | "invalid_data"
  | "invalid_email";

export interface LoginActionState {
  status: LoginStatus;
}

export interface RegisterActionState {
  status: RegisterStatus;
}
