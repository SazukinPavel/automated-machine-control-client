import Api from "@/api/api";
import BaseApiModule from "@/types/BaseApiModule";
import AddDefectDto from "@/types/dto/defects/AddDefectDto";
import UpdateDefectDto from "@/types/dto/defects/UpdateDefectDto";
import Defect from "@/types/Defect";

export default class DefectsModule extends BaseApiModule {
  constructor(api: Api) {
    super(api, "defects/");
  }

  list() {
    return this.get();
  }

  getById(id: string) {
    return this.get(id);
  }
  add(addDefectDto: AddDefectDto) {
    this.post<AddDefectDto, Defect>("", addDefectDto);
  }

  update(updateDefectDto: UpdateDefectDto) {
    return this.put("", updateDefectDto);
  }

  drop(id: string) {
    return this.delete(id);
  }
}
