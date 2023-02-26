import BaseApiModule from "@/types/BaseApiModule";
import LoginDto from "@/types/dto/auth/LoginDto";
import AuthResponseDto from "@/types/dto/auth/AuthResponseDto";
import Api from "@/api/api";

export default class AuthModule extends BaseApiModule {
  constructor(api: Api) {
    super(api, "auth/");
  }

  login(loginDto: LoginDto) {
    return this.post<LoginDto, AuthResponseDto>("login", loginDto);
  }

  me() {
    return this.post<null, AuthResponseDto>("me");
  }
}
