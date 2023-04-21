import Consumable from "@/types/Consumable";
import User from "@/types/User";
import Machine from "@/types/Machine";

interface Defect {
  id?: string;

  name?: string;

  description?: string;

  isResolved?: boolean;

  type?: string;

  decisionDate?: Date;

  createdAt?: Date;

  updateAt?: Date;

  consumable?: Consumable;

  responsible?: User;

  machine?: Machine;
}

export default Defect;
