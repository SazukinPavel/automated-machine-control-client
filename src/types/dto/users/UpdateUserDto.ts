import Role from "@/types/Role";

export default interface UpdateUserDto {
  id: string;
  role: Role;
  password: string;
  login: string;
}
