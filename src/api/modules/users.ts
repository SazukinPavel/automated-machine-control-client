import Api from "@/api/api";
import BaseApiModule from "@/types/utils/BaseApiModule";
import AddUserDto from "@/types/dto/users/AddUserDto";
import UpdateUserDto from "@/types/dto/users/UpdateUserDto";
import User from "@/types/busnes/User";
import RegeneratePassDto from "@/types/dto/users/RegeneratePassDto";
import RegeneratePassResponseDto from "@/types/dto/users/RegeneratePassResponseDto";

export default class UsersModule extends BaseApiModule {
  constructor(api: Api) {
    super(api, "users");
  }
  list() {
    return this.get<User[]>();
  }
  getById(id: string) {
    return this.get<User>(`/${id}`);
  }
  add(addUserDto: AddUserDto) {
    return this.post<AddUserDto, User>("", addUserDto);
  }
  update(updateUserDto: UpdateUserDto) {
    return this.put<UpdateUserDto, User>("", updateUserDto);
  }
  drop(id: string) {
    return this.delete(`/${id}`);
  }

  regeneratePass(dto: RegeneratePassDto) {
    return this.patch<RegeneratePassDto, RegeneratePassResponseDto>(
      "/regenerate-pass",
      dto
    );
  }
}
