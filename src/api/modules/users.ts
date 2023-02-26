import Api from "@/api/api";
import BaseApiModule from "@/types/BaseApiModule";
import AddUserDto from "@/types/dto/users/AddUserDto";
import UpdateUserDto from "@/types/dto/users/UpdateUserDto";
import User from "@/types/User";

export default class UsersModule extends BaseApiModule {
  constructor(api: Api) {
    super(api, "users/");
  }
  list() {
    return this.get();
  }
  getById(id: string) {
    return this.get(id);
  }
  add(addUserDto: AddUserDto) {
    this.post<AddUserDto, User>("", addUserDto);
  }
  update(updateUserDto: UpdateUserDto) {
    return this.put("", updateUserDto);
  }
  drop(id: string) {
    return this.delete(id);
  }
}
