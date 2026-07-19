export type Perfil = {
  name: string;
  email: string;
  image: string;
  role: string;
};

export type FormPerfil = {
  name: string;
  currentPassword: string;
  password: string;
  confirmPassword: string;
};

export const FORM_PERFIL_VACIO: FormPerfil = {
  name: "",
  currentPassword: "",
  password: "",
  confirmPassword: "",
};
