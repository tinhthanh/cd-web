import { CourseType } from './CourseType';
import { Topic } from './Topic';
import { UserCustom } from './UserCustom';

export class Course {
    courseID: string;
    courseTitle: string;
    courseDescription: string;
    author: string;
    createDate: any;
    price: number;
    courseType: CourseType;
    topic: Topic;
    confirmedBy: UserCustom[] ;
    status: number;
    confirmedDate: any;
    views: number;
    courseAvatar: string;
    courseDetail: string;
}
