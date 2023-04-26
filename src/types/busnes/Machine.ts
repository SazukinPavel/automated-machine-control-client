import Defect from "@/types/busnes/Defect";
import Departament from "@/types/busnes/Departament";

interface Machine {
  id: string;

  name: string;

  description: string;

  isActive: boolean;

  createdAt: Date | string;

  updateAt: Date | string;

  defects: Defect[];
  departament?: Departament;

  model: string;

  number: string;

  startYear: string;
}

export default Machine;
