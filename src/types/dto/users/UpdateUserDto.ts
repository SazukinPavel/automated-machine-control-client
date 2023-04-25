import Role from "@/types/utils/Role";

export default interface UpdateUserDto {
  id: string;
  role: Role;
  password: string;
  login: string;
}
