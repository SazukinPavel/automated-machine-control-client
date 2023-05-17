interface Log {
  id: number;

  level: string;

  user: string;

  status: string;

  action: string;

  body: string;

  creationDate: Date;
}

export default Log;
