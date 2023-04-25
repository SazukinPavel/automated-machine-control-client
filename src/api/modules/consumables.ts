import Api from "@/api/api";
import BaseApiModule from "@/types/utils/BaseApiModule";

export default class ConsumablesModule extends BaseApiModule {
  constructor(api: Api) {
    super(api, "consumables");
  }

  list() {
    return this.get("");
  }
}
