import Api from "@/api/api";
import BaseApiModule from "@/types/utils/BaseApiModule";
import AddDepartamentDto from "@/types/dto/departaments/AddDepartamentDto";
import UpdateDepartamentDto from "@/types/dto/departaments/UpdateDepartamentDto";
import Departament from "@/types/busnes/Departament";

export default class DepartamentModule extends BaseApiModule {
  constructor(api: Api) {
    super(api, "departaments/");
  }

  list() {
    return this.get<Departament[]>();
  }

  getById(id: string) {
    return this.get<Departament>(id);
  }
  add(addDepartamnetDto: AddDepartamentDto) {
    return this.post<AddDepartamentDto, Departament>("", addDepartamnetDto);
  }

  update(updateDepartamentDto: UpdateDepartamentDto) {
    return this.put<UpdateDepartamentDto, Departament>(
      "",
      updateDepartamentDto
    );
  }

  drop(id: string) {
    return this.delete(id);
  }
}
