import Role from "@/types/utils/Role";

export default interface UpdateUserDto {
  id: string;
  role: Role;
  login: string;
  specializationId?: string;
}
