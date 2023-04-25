import Api from "@/api/api";
import BaseApiModule from "@/types/utils/BaseApiModule";
import ConsumableType from "@/types/busnes/ConsumableType";
import AddConsumableTypeDto from "@/types/dto/consumable-types/AddConsumableTypeDto";
import UpdateConsumableTypeDto from "@/types/dto/consumable-types/UpdateConsumableTypeDto";

export default class ConsumableTypesModule extends BaseApiModule {
  constructor(api: Api) {
    super(api, "consumable-types/");
  }

  list(params: any) {
    return this.get("", null, { params });
  }

  getById(id: string) {
    return this.get<ConsumableType>(id);
  }
  add(dto: AddConsumableTypeDto) {
    return this.post<AddConsumableTypeDto, ConsumableType>("", dto);
  }

  update(dto: UpdateConsumableTypeDto) {
    return this.put("", dto);
  }

  drop(id: string) {
    return this.delete(id);
  }
}
