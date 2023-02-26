import User from "@/types/User";

export default interface AuthResponseDto {
  accessToken: string;
  user: User;
}
