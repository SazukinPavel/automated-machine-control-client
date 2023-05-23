import Consumable from "@/types/busnes/Consumable";
import User from "@/types/busnes/User";
import Machine from "@/types/busnes/Machine";
import DefectType from "@/types/busnes/DefectType";
import DefectName from "@/types/busnes/DefectName";

interface Defect {
  id?: string;

  name?: DefectName;

  description?: string;

  isResolved?: boolean;

  type?: DefectType;

  decisionDate?: Date;

  createdAt?: Date;

  updateAt?: Date;

  consumables?: Consumable[];

  responsible?: User[];

  machine?: Machine;
}

export default Defect;
