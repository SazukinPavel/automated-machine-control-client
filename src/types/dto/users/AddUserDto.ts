import Role from "@/types/Role";

export default interface AddUserDto {
  role: Role;
  password: string;
  login: string;
  departamentId?: string;
}
