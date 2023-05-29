import Api from "@/api/api";
import BaseApiModule from "@/types/utils/BaseApiModule";
import Specialization from "@/types/busnes/Specialization";
import AddSpecializationDto from "@/types/dto/specializations/AddSpecializationDto";
import UpdateSpecializationDto from "@/types/dto/specializations/UpdateSpecializationDto";

export default class SpecializationsModule extends BaseApiModule {
  constructor(api: Api) {
    super(api, "specializations");
  }

  list() {
    return this.get<Specialization[]>();
  }

  getById(id: string) {
    return this.get<Specialization>(`/${id}`);
  }
  add(dto: AddSpecializationDto) {
    return this.post<AddSpecializationDto, Specialization>("", dto);
  }

  update(dto: UpdateSpecializationDto) {
    return this.put<UpdateSpecializationDto, Specialization>("", dto);
  }

  drop(id: string) {
    return this.delete(`/${id}`);
  }
}
