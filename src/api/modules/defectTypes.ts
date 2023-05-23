import Api from "@/api/api";
import BaseApiModule from "@/types/utils/BaseApiModule";
import DefectType from "@/types/busnes/DefectType";
import AddDefectTypeDto from "@/types/dto/defectTypes/AddDefectTypeDto";
import UpdateDefectTypeDto from "@/types/dto/defectTypes/UpdateDefectTypeDto";

export default class DefectTypesModule extends BaseApiModule {
  constructor(api: Api) {
    super(api, "defect-types");
  }

  list(params: any) {
    return this.get<DefectType[]>("", { params });
  }

  getById(id: string) {
    return this.get<DefectType>("/" + id);
  }
  add(dto: AddDefectTypeDto) {
    return this.post<AddDefectTypeDto, DefectType>("", dto);
  }

  update(dto: UpdateDefectTypeDto) {
    return this.put<UpdateDefectTypeDto, DefectType>("", dto);
  }

  drop(id: string) {
    return this.delete("/" + id);
  }
}
