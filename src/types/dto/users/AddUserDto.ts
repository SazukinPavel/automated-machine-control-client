import Role from "@/types/utils/Role";

export default interface AddUserDto {
  role: Role;
  password?: string;
  login: string;
  departamentId?: string;
  specializationId?: string;
}
