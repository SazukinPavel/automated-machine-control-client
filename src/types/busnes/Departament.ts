import User from "@/types/busnes/User";
import Machine from "@/types/busnes/Machine";

interface Departament {
  id: string;
  name: string;
  workers: User[];
  machines: Machine[];
}

export default Departament;
