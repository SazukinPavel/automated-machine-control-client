import Api from "@/api/api";
import BaseApiModule from "@/types/utils/BaseApiModule";
import Log from "@/types/busnes/Log";

export default class LogsModule extends BaseApiModule {
  constructor(api: Api) {
    super(api, "logs/");
  }
  list({ page = 1, limit = 10 }) {
    return this.get<Log[]>("", { params: { page, limit } });
  }

  count() {
    return this.get<number>("", { params: { count: true } });
  }
}
