import Defect from "@/types/Defect";

interface Machine {
  id: string;

  name: string;

  description: string;

  isActive: boolean;

  createdAt: Date;

  updateAt: Date;

  defects: Defect[];
}

export default Machine;
