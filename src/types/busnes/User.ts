import Role from "../utils/Role";
import Departament from "@/types/busnes/Departament";

interface User {
  id: string;

  login: string;

  password: string;

  role: Role;

  createdDate: Date;

  departament: Departament;
}

export default User;
