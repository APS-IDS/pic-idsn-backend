export const tableName = "api::custom-role.custom-role";

export enum CustomRoles {
  OPERADOR = "operador",
  REFERENTE_INSTITUTO = "referente_instituto",
}

export const data = [{ name: CustomRoles.OPERADOR }, { name: CustomRoles.REFERENTE_INSTITUTO }];