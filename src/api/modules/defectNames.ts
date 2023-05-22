import Api from "@/api/api";
import BaseApiModule from "@/types/utils/BaseApiModule";
import DefectName from "@/types/busnes/DefectName";

export default class DefectNamesModule extends BaseApiModule {
  constructor(api: Api) {
    super(api, "defect-names");
  }

  list({ name, ...params }: { name: string }) {
    return this.get<DefectName[]>("", { params: { name, ...params } });
  }
}
