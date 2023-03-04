import Api from "@/api/api";
import BaseApiModule from "@/types/BaseApiModule";
import AddDepartamentDto from "@/types/dto/departaments/AddDepartamentDto";
import UpdateDepartamentDto from "@/types/dto/departaments/UpdateDepartamentDto";
import Departament from "@/types/Departament";

export default class DepartamentModule extends BaseApiModule {
  constructor(api: Api) {
    super(api, "departaments/");
  }

  list() {
    return this.get();
  }

  getById(id: string) {
    return this.get(id);
  }
  add(addDepartamnetDto: AddDepartamentDto) {
    return this.post<AddDepartamentDto, Departament>("", addDepartamnetDto);
  }

  update(updateDepartamentDto: UpdateDepartamentDto) {
    return this.put("", updateDepartamentDto);
  }

  drop(id: string) {
    return this.delete(id);
  }
}
