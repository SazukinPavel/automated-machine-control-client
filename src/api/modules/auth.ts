import Api from "@/api/api";
import BaseApiModule from "@/types/BaseApiModule";
import LoginDto from "@/types/dto/auth/LoginDto";
import AuthResponseDto from "@/types/dto/auth/AuthResponseDto";

export default class AuthModule extends BaseApiModule {
  constructor(api: Api) {
    super(api, "auth/");
  }

  login(loginDto: LoginDto) {
    this.post<LoginDto, AuthResponseDto>("login", loginDto);
  }

  me() {
    return this.post<null, AuthResponseDto>("me");
  }
}
