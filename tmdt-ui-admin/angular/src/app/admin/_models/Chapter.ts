import { Lesson } from './Lesson';
export class Chapter {
    chapterID: string;
    courseID: string;
    chapterTitle: string;
    chapterContent: string;
    chapterSummary: string;
    listOfLesson: Lesson[];

}
