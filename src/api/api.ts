import axios, { AxiosInstance } from "axios";
import AuthModule from "./modules/auth";
import DietsModule from "./modules/diets";
import ManagersModule from "./modules/managers";
import ExercisesModule from "./modules/exercises";
import ExerciseInfoModule from "./modules/exerciseInfo";
import ClientsModule from "./modules/clients";

export default class Api {
  public axios: AxiosInstance;
  public exercisesInfo: ExerciseInfoModule;
  public auth: AuthModule;
  public diets: DietsModule;
  public exercises: ExercisesModule;
  public managers: ManagersModule;
  public clients: ClientsModule;

  constructor(baseURL: string) {
    this.axios = axios.create({ baseURL });
    this.auth = new AuthModule(this);
    this.clients = new ClientsModule(this);
    this.managers = new ManagersModule(this);
    this.exercises = new ExercisesModule(this);
    this.diets = new DietsModule(this);
    this.exercisesInfo = new ExerciseInfoModule(this);
  }

  applyToken(token: string) {
    this.axios = axios.create({
      headers: { Authorization: "Bearer " + token },
      baseURL: this.axios.defaults.baseURL,
    });
  }
}
