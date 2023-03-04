import User from "@/types/User";
import Machine from "@/types/Machine";

interface Departament {
  id: string;
  name: string;
  workers: User[];
  machines: Machine[];
}

export default Departament;
