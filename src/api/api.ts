import axios, { AxiosInstance } from "axios";
import AuthModule from "./modules/auth";
import DefectsModule from "@/api/modules/defects";
import MachinesModule from "@/api/modules/machines";
import UsersModule from "@/api/modules/users";
import DepartamentModule from "@/api/modules/departaments";

export default class Api {
  public axios: AxiosInstance;
  public auth: AuthModule;
  public defects: DefectsModule;
  public machines: MachinesModule;
  public users: UsersModule;
  public departament: DepartamentModule;
  constructor(baseURL: string) {
    this.axios = axios.create({ baseURL });
    this.auth = new AuthModule(this);
    this.users = new UsersModule(this);
    this.machines = new MachinesModule(this);
    this.defects = new DefectsModule(this);
    this.departament = new DepartamentModule(this);
  }

  applyToken(token: string) {
    this.axios = axios.create({
      headers: { Authorization: "Bearer " + token },
      baseURL: this.axios.defaults.baseURL,
    });
  }
}
