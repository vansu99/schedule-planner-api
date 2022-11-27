interface QueryParams {
  limit: number;
  page: number;
  search: string;
  orderBy: string;
  ascending: 'ascending' | 'descending';
}

interface Task {
  _id: string;
  name: string;
  content: string;
}

interface User {
  name: string;
  address: string;
  avatar: string;
  phone_number: number;
  company_name: string;
}

export { QueryParams, Task, User };
