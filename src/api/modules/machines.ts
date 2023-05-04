import Api from "@/api/api";
import BaseApiModule from "@/types/utils/BaseApiModule";
import AddMachineDto from "@/types/dto/machines/AddMachineDto";
import Machine from "@/types/busnes/Machine";
import UpdateMachineDto from "@/types/dto/machines/UpdateMachineDto";

export default class MachinesModule extends BaseApiModule {
  constructor(api: Api) {
    super(api, "machines/");
  }

  list(params: any) {
    return this.get<Machine[]>("", { params });
  }

  getById(id: string) {
    return this.get<Machine>(id);
  }
  add(addMachineDto: AddMachineDto) {
    return this.post<AddMachineDto, Machine>("", addMachineDto);
  }

  update(updateMachineDto: UpdateMachineDto) {
    return this.put<UpdateMachineDto, Machine>("", updateMachineDto);
  }

  drop(id: string) {
    return this.delete(id);
  }
}
