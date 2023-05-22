import Api from "@/api/api";
import BaseApiModule from "@/types/utils/BaseApiModule";
import AddConsumableDto from "@/types/dto/consumables/AddConsumableDto";
import Consumable from "@/types/busnes/Consumable";

export default class ConsumablesModule extends BaseApiModule {
  constructor(api: Api) {
    super(api, "consumables");
  }

  list(params: any) {
    return this.get<Consumable[]>("", { params });
  }

  add(dto: AddConsumableDto) {
    return this.post<AddConsumableDto, Consumable>("", dto);
  }

  drop(id: string) {
    return this.delete(`/${id}`);
  }
}
