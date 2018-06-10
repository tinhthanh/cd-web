import { CourseType } from "./CourseType";
import { Topic } from "./Topic";
import { UserCustom } from "./UserCustom";

export class Course {
  public courseID: string;
  public courseTitle: string;
  public courseDescription: string;
  public author: string;
  public createDate: any;
  public price: number;
  public courseType: CourseType[];
  public topic: Topic[];
  public confirmedBy: UserCustom[];
  public status: number;
  public confirmedDate: any;
  public views: number;
  public courseAvatar: string;
  public courseDetail: string;
}
