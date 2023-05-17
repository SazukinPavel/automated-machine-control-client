import axios, { AxiosInstance } from "axios";
import AuthModule from "./modules/auth";
import DefectsModule from "@/api/modules/defects";
import MachinesModule from "@/api/modules/machines";
import UsersModule from "@/api/modules/users";
import DepartamentModule from "@/api/modules/departaments";
import ConsumablesModule from "@/api/modules/consumables";
import ConsumableTypesModule from "@/api/modules/consumableTypes";
import DefectTypesModule from "@/api/modules/defectTypes";
import LogsModule from "@/api/modules/logs";

export default class Api {
  public axios: AxiosInstance;
  public auth: AuthModule;
  public defects: DefectsModule;
  public machines: MachinesModule;
  public users: UsersModule;
  public departaments: DepartamentModule;
  public consumables: ConsumablesModule;
  public consumableTypes: ConsumableTypesModule;
  public defectTypes: DefectTypesModule;
  public logs: LogsModule;

  constructor(baseURL: string) {
    this.axios = axios.create({ baseURL, withCredentials: true });
    this.auth = new AuthModule(this);
    this.users = new UsersModule(this);
    this.machines = new MachinesModule(this);
    this.defects = new DefectsModule(this);
    this.departaments = new DepartamentModule(this);
    this.consumables = new ConsumablesModule(this);
    this.consumableTypes = new ConsumableTypesModule(this);
    this.defectTypes = new DefectTypesModule(this);
    this.logs = new LogsModule(this);
  }

  applyToken(token: string) {
    this.axios = axios.create({
      headers: { Authorization: "Bearer " + token },
      withCredentials: true,
      baseURL: this.axios.defaults.baseURL,
    });
  }
}
