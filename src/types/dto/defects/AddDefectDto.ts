import Consumable from "@/types/busnes/Consumable";
import User from "@/types/busnes/User";

export default interface AddDefectDto {
  name?: string;

  description?: string;

  machineId?: string;

  consumables?: string[] | Consumable[];

  responsible?: string[] | User[];

  decisionDate?: Date;
  type?: string;
}
