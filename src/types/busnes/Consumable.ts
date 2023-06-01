import ConsumableType from "@/types/busnes/ConsumableType";
import Defect from "@/types/busnes/Defect";

export default interface Consumable {
  id?: string;

  name?: string;

  number?: string;

  defects: Defect[];

  type: ConsumableType;

  createdAt: Date;

  isAvailable: boolean;
}
