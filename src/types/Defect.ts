interface Defect {
  id: string;

  name: string;

  description: string;

  type: string;

  isResolved: boolean;

  createdAt: Date;

  updateAt: Date;
}

export default Defect;
