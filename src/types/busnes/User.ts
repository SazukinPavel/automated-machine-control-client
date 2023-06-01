import Role from "../utils/Role";
import Departament from "@/types/busnes/Departament";
import Specialization from "@/types/busnes/Specialization";

interface User {
  id: string;

  login: string;

  password: string;

  role: Role;

  createdDate: Date;

  departament: Departament;

  specialization: Specialization;
}

export default User;
