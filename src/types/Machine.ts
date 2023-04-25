import Defect from "@/types/Defect";
import Departament from "@/types/Departament";

interface Machine {
  id: string;

  name: string;

  description: string;

  isActive: boolean;

  createdAt: Date;

  updateAt: Date;

  defects: Defect[];
  departament?: Departament;

  model: string;

  number: string;

  startYear: string;
}

export default Machine;
