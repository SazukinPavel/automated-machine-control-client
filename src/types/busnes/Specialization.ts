import DefectType from "@/types/busnes/DefectType";

export default interface Specialization {
  name: string;
  types: DefectType[];
  id: string;
  isHide: boolean;
}
