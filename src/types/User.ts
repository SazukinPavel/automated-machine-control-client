import Role from "../types/Role";
import Departament from "@/types/Departament";

interface User {
  id: string;

  login: string;

  password: string;

  role: Role;

  createdDate: Date;

  departament: Departament;
}

export default User;
