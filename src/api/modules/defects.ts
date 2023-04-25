import Api from "@/api/api";
import BaseApiModule from "@/types/utils/BaseApiModule";
import AddDefectDto from "@/types/dto/defects/AddDefectDto";
import UpdateDefectDto from "@/types/dto/defects/UpdateDefectDto";
import Defect from "@/types/busnes/Defect";

export default class DefectsModule extends BaseApiModule {
  constructor(api: Api) {
    super(api, "defects");
  }

  list(params: any) {
    return this.get("", null, { params });
  }

  getById(id: string) {
    return this.get(id);
  }
  add(addDefectDto: AddDefectDto) {
    return this.post<AddDefectDto, Defect>("", addDefectDto);
  }

  update(updateDefectDto: UpdateDefectDto) {
    return this.put("", updateDefectDto);
  }

  drop(id: string) {
    return this.delete(id);
  }
}
