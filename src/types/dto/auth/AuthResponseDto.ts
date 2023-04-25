import User from "@/types/busnes/User";

export default interface AuthResponseDto {
  accessToken: string;
  user: User;
}
