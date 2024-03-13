import { Category } from "./category.model";
import { Kind } from "./kind.model";
import { Priority } from "./priority.model";
import { Project } from "./project.model";
import { Status } from "./status.model";
import { User } from "./user.model";

export class Ticket{
  id?: number;
  title?: string;
  description?:string;
  updatedAt?:Date;
  createdAt?:Date;
  kind?: Kind;
  user?: User;
  project?:Project;
  category?:Category;
  priority?: Priority;
  status?: Status;

}
