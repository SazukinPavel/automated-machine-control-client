import Api from "@/api/api";
import BaseApiModule from "@/types/utils/BaseApiModule";
import Log from "@/types/busnes/Log";
import GetLogsDto from "@/types/dto/logs/GetLogsDto";

export default class LogsModule extends BaseApiModule {
  constructor(api: Api) {
    super(api, "logs");
  }
  list(params: GetLogsDto) {
    return this.get<Log[]>("", { params });
  }

  count(params: GetLogsDto) {
    return this.get<number>("", { params: { count: true, ...params } });
  }
}
