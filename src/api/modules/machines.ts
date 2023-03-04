import Api from "@/api/api";
import BaseApiModule from "@/types/BaseApiModule";
import AddMachineDto from "@/types/dto/machines/AddMachineDto";
import Machine from "@/types/Machine";
import UpdateMachineDto from "@/types/dto/machines/UpdateMachineDto";

export default class MachinesModule extends BaseApiModule {
  constructor(api: Api) {
    super(api, "machines/");
  }

  list() {
    return this.get();
  }

  getById(id: string) {
    return this.get(id);
  }
  add(addMachineDto: AddMachineDto) {
    return this.post<AddMachineDto, Machine>("", addMachineDto);
  }

  update(updateMachineDto: UpdateMachineDto) {
    return this.put("", updateMachineDto);
  }

  drop(id: string) {
    return this.delete(id);
  }
}
