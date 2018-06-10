import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { Chapter } from './../../../_models/Chapter';
import { ConfigValue } from './../../../_helpers/config-value';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NodeService } from './../../../../showcase/service/nodeservice';
import { MenuItem } from './../../../../components/common/menuitem';
import { TreeNode } from './../../../../components/common/treenode';
import { Tree } from './../../../../components/tree/tree';
import { Message, SelectItem } from 'app/components/common/api';
import { TreeDragDropService } from './../../../../components/common/treedragdropservice';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MAX_LENGTH_VALIDATOR } from '@angular/forms/src/directives/validators';
import { Course, Lesson, FileOfLesson } from 'app/admin/_models';
import { APP_BASE_HREF } from '@angular/common';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';


@Component({
    templateUrl: 'author-course.component.html',
    styles: [`
    h4 {
        text-align: center;
        margin: 0 0 8px 0;
    }
`],
    styleUrls: ['author-course.component.css'],
    providers: [TreeDragDropService]
})

export class AuthorCourseComponent implements OnInit {
    url_upload: string;
    // khoa hoc
    selectFile: FileOfLesson;
    khoahoc: Course;
    selectLesson: Chapter;
    selectLessonFile: Lesson ;
   public  isSelectLessonFile = false;
    msgs: Message[];
    @ViewChild('expandingTree')
    expandingTree: Tree;
    filesTree11: TreeNode[];
    selectedFile3: TreeNode;
    items: MenuItem[];

    visibleEditFile;
    visibleCource;
    visibleChater;
    visibleEditChater;
    visibleLesson;
    isXemVideo = false;
    isThemBaiHoc = false;
    uploadedFiles: any[] = [];

    // tao khoa học
    userform: FormGroup;
    // tao chương mục
    chapterForm: FormGroup;
    // tao bài hoc ,
    lessonForm: FormGroup;

    courseTypeID: SelectItem[];
    submitted: boolean;
    topicID: SelectItem[];
    description: string;
    sourceDetail = '';
    courseAvatar_temp: string; // hinh anh khoa hoc
    uploadImgProress = false; // hiển thị đang upload
    listCharter: any = [];
    isXemDanhSachChuong = false;
    url_video = '1ZlThHQI5HND7l96FsF7T6dl1HV7MAJvk';
    id_video = '1ZlThHQI5HND7l96FsF7T6dl1HV7MAJvk';
    videoUrl: SafeResourceUrl;
    url_back: string;
    constructor(private nodeService: NodeService
        , private http: HttpClient,
        private config: ConfigValue,
        private router: Router,
        private fb: FormBuilder,
        private sanitizer: DomSanitizer,
        private route: ActivatedRoute
    ) {
    }
    public updateLink(id: string) {
        console.log(id);
        this.url_video = `https://drive.google.com/file/d/${id}/preview`;
        this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.url_video);
        this.isXemVideo = true;
    }
    ngOnInit() {
        this.url_upload = this.config.url_port;
        // this.loading = true;
        console.log(this.router);
        if ( this.route.snapshot.queryParams['id']) {
            this.loadingCource(this.route.snapshot.queryParams['id'] );
        } else {
            this.router.navigate(['/admin/khoa-hoc/quan-ly-khoa-hoc']);
        }
              this.url_back  = this.route.snapshot.queryParams['url'] || '/';
    }
    toBack() {
        this.router.navigate([this.url_back]);
    }
    onSubmit(value: string) {
        this.submitted = true;
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'Success', detail: 'Form Submitted' });
        // data
        const dataSend: any = {};
        dataSend.courseAvatar = this.courseAvatar_temp;
        dataSend.courseDescription = this.userform.value.courseDescription;
        dataSend.courseDetail = this.userform.value.courseDetail;
        dataSend.courseID = this.khoahoc.courseID;
        dataSend.courseTitle = this.userform.value.courseTitle;
        dataSend.courseTypeID = this.userform.value.courseTypeID;
        dataSend.price = (this.userform.value.courseTypeID === 'CO') ? this.userform.value.price : 0;
        dataSend.status = this.userform.value.status;
        dataSend.topicID = this.userform.value.topicID;
        this.http.patch(`${this.config.url_port}/user/course`, dataSend).subscribe(
            (data: any) => {
                this.khoahoc = data;
                const  filesTree11 = [...this.filesTree11];
                filesTree11[0].label = this.khoahoc.courseTitle;
                filesTree11[0].data = this.khoahoc ;
                this.filesTree11 = filesTree11 ;
                this.visibleCource = false;
                this.submitted = false;
            }, (err: HttpErrorResponse) => {
                if (err.status === 401) {
                    alert('token hết hạng ');
                }
                if (err.status === 405) {
                    alert(' sai logic ');
                }
                console.log('erro');
            }
        );
    }
    public initFormChapter(chapter?: null) {
        const data: any = chapter;
        if (chapter) {
            // {
            //     "chapterContent": "",
            //     "chapterID": "",
            //     "chapterSummary": "",
            //     "chapterTitle": ""
            //   }
            // console.log('1');
            const chapterForm = new FormGroup({
                chapterID: new FormControl(data.chapterID),
                chapterTitle: new FormControl(data.chapterTitle, Validators.required),
                chapterContent: new FormControl(data.chapterContent, Validators.required),
                chapterSummary: new FormControl(data.chapterSummary, Validators.required)
            });
            this.chapterForm = chapterForm;
        } else {
             // {
        //     "chapterContent": "",
        //     "chapterSummary": "",
        //     "chapterTitle": "",
        //     "courseID": ""
        //   }
            // console.log('2');
            const chapterForm = new FormGroup({
                courseID: new FormControl(this.khoahoc.courseID),
                chapterTitle: new FormControl('', Validators.required),
                chapterContent: new FormControl('', Validators.required),
                chapterSummary: new FormControl('', Validators.required)
            });
            this.chapterForm = chapterForm;
        }
    }
    public initFormLesson(data?: null) {
        const lesson: any = data;
        if (lesson) {
            const lessonForm = new FormGroup({
                lessonID: new FormControl(lesson.lessonID),
                lessonTitle: new FormControl(lesson.lessonTitle, Validators.required),
                lessonContent: new FormControl(lesson.lessonContent),
                chapterID: new FormControl(lesson.chapterID)
            });
            this.lessonForm = lessonForm;
        } else {
            // {
            //     "chapterID": "",
            //     "lessonContent": "",
            //     "lessonTitle": ""
            //   }
            const lessonForm = new FormGroup({
                lessonTitle: new FormControl('', Validators.required),
                lessonContent: new FormControl(''),
                chapterID: new FormControl('')
            });
            this.lessonForm = lessonForm;
        }
    }
    public initForm() {
        // tslint:disable-next-line:max-line-length
        this.khoahoc.courseAvatar = this.khoahoc.courseAvatar ? this.khoahoc.courseAvatar : 'https://www.caperlan.co.uk/sites/caperlan/files/styles/460x460/public/default_images/no-picture.png';
        this.courseAvatar_temp = this.khoahoc.courseAvatar;
        this.userform = this.fb.group({
            courseTitle: new FormControl(this.khoahoc.courseTitle, Validators.required),
            courseDescription: new FormControl(this.khoahoc.courseDescription, Validators.required),
            price: new FormControl(this.khoahoc.price, [Validators.required, Validators.maxLength(7)]),
            courseTypeID: new FormControl(this.khoahoc.courseType.courseTypeID),
            topicID: new FormControl(this.khoahoc.topic.topicID, Validators.required),
            courseAvatar: new FormControl(this.khoahoc.courseAvatar),
            courseDetail: new FormControl(this.khoahoc.courseDetail),
            status: new FormControl(this.khoahoc.status)
        });
        this.courseTypeID = [];
        this.courseTypeID.push({ label: 'Chọn loại khóa học', value: '' });
        this.courseTypeID.push({ label: 'Miễn phí', value: 'NCO' });
        this.courseTypeID.push({ label: 'Có phí', value: 'CO' });
        // loading lên nha nha thắng
        this.topicID = [];
        this.topicID.push({ label: this.khoahoc.topic.topicName, value: this.khoahoc.topic.topicID });
        this.http.get(`${this.config.url_port}/users/topic?page=1&size=99999`).subscribe(
            (data: any) => {
                // console.log(data);
                const dsChuDe = data.listOfResult;
                for (const temp of dsChuDe) {
                    this.topicID.push({ label: temp.topicName, value: temp.topicID });
                }
            }, (err: HttpErrorResponse) => {
                alert('erro Không load được danh sách chủ đề');
            }
        );
    }
    nodeSelect(event) {
        console.log(event);
        // thêm file vào bài học
        if (event.node.data.lessonID &&  event.node.data.lesonAttachContent) {
            this.selectFile = event.node.data;
            this.isSelectLessonFile = false;
            this.visibleEditFile = true;
        }
        // xem chi tiết khóa học
        if (event.node.data.courseID && event.node.data.courseTitle) {
            const filesTree11 = [...this.filesTree11];
            this.visibleCource = true;
            // this.userform.
            //  filesTree11[0].label =  'HUYNH TINH THANH';

            this.filesTree11 = filesTree11;
        }
        if (event.node.data.courseID && event.node.data.chapterID) {
            this.initFormChapter(event.node.data);
            this.visibleEditChater = true;
            this.selectLesson = event.node.data;
        }
        if (event.node.data.chapterID && event.node.data.lessonID) {
            console.log('lessonID');
            this.selectLessonFile = event.node.data;
            this.isSelectLessonFile = true;
            this.visibleEditFile = true;
        }
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'Node Selected', detail: event.node.label });
    }
    // xoa bai hoc
    xoaBaiHoc($event) {
        this.submitted = true;
        console.log('xoa ' + $event);
        this.http.delete(`${this.config.url_port}/lesson/${$event.lessonID}`).subscribe(
            (data: any) => {
                console.log(data);
                const filesTree11 = [...this.filesTree11];
                // deo biet tai sao khong builing
                for (let i = 0; i < filesTree11[0].children.length; i++) {
                    for (let j = 0; j < filesTree11[0].children[i].children.length; j++) {
                        if ($event.lessonID === filesTree11[0].children[i].children[j].data.lessonID) {
                            filesTree11[0].children[i].children.splice(j, 1);
                            this.selectLesson.listOfLesson.splice(j, 1);
                        }
                    }
                }
                this.filesTree11 = filesTree11;
                this.submitted = false;
            }, (err: HttpErrorResponse) => {
                alert('Xóa không thành ');
                this.submitted = false;
            }
        );
    }
    // het xoa bai hoc
    // click chinh sửa bài học
    public clickChinhSuaBaiHoc($event) {
        console.log('chinh sửa bài hoc');
        console.log($event);
        this.initFormLesson($event);
        this.isThemBaiHoc = true;
        this.visibleLesson = true;
    }
    // hết clcik chỉnh sửa bài học
    // chinh sua bai hoc
    chinhSuaBaiHoc() {
        this.submitted = true;
        console.log(this.lessonForm.value);
        this.http.patch(this.config.url_port + '/lesson', this.lessonForm.value).subscribe((data: any) => {
            console.log(data);
            const filesTree11 = [...this.filesTree11];
            data.lessonContent2 = data.lessonContent;
            data.lessonContent = 'NA';
            // deo biet tai sao khong builing
            for (let i = 0; i < filesTree11[0].children.length; i++) {
                for (let j = 0; j < filesTree11[0].children[i].children.length; j++) {
                    if (this.lessonForm.value.lessonID === filesTree11[0].children[i].children[j].data.lessonID) {
                        filesTree11[0].children[i].children[j].label = this.lessonForm.value.lessonTitle;
                        filesTree11[0].children[i].children[j].data.lessonTitle = this.lessonForm.value.lessonTitle;
                        filesTree11[0].children[i].children[j].data.lessonContent = data.lessonContent;
                        filesTree11[0].children[i].children[j].data.lessonContent2 = data.lessonContent2;
                        this.selectLesson.listOfLesson[j].lessonTitle = this.lessonForm.value.lessonTitle;
                        this.selectLesson.listOfLesson[j].lessonContent = this.lessonForm.value.lessonContent;
                    }
                }
            }
            this.filesTree11 = filesTree11;
            this.submitted = false;
            this.visibleLesson = false;
        }, (err: HttpErrorResponse) => {
            console.log(err.error);
            this.submitted = false;
        });
    }
    // het chinh sửa bài hoc
    // them khoa hoc
    themBaiHoc() {
        // tslint:disable-next-line:max-line-length
        // this.http.get('https://drive.google.com/thumbnail?authuser=0&amp;sz=w320&amp;id=1JBMEDmssiywmJfjJjdR-Ef1Mq9VJPdAE').subscribe(data => {
        //     console.log('link ok');
        // } , (err: HttpErrorResponse ) => {
        //     console.log('link 404');
        // });
        if (this.lessonForm.value.lessonID) {
            this.chinhSuaBaiHoc();
        } else {

            this.submitted = true;
            console.log(this.lessonForm.value);
            this.lessonForm.value.chapterID = this.selectLesson.chapterID;
            this.lessonForm.value.listOfLessonAttach = [];
            this.http.post(`${this.config.url_port}/lesson`, this.lessonForm.value).subscribe(
                (data: any) => {
                    console.log(data);
                    data.lessonContent2 = data.lessonContent;
                    data.lessonContent = 'NA';
                    const filesTree11 = [...this.filesTree11];
                    for (let i = 0; i < filesTree11[0].children.length; i++) {
                        if (filesTree11[0].children[i].data.chapterID === this.selectLesson.chapterID) {
                            console.log('ngon');
                            const node: TreeNode = {};
                            node.label = this.lessonForm.value.lessonTitle;
                            node.data = data;
                            node.expandedIcon = 'fa fa-file-text';
                            node.collapsedIcon = 'fa fa-file-text-o';
                            const listNodeFile: TreeNode[] = [];
                            node.children = listNodeFile;
                            filesTree11[0].children[i].children.push(node);
                            const selectLesson = this.selectLesson;
                            selectLesson.listOfLesson.push(data);
                            this.selectLesson = selectLesson;
                        }
                    }
                    this.filesTree11 = filesTree11;
                    this.submitted = false;
                    this.visibleLesson = false;
                    this.isThemBaiHoc = false;
                }, (err: HttpErrorResponse) => {
                    alert('erro');
                    this.submitted = false;
                    this.visibleLesson = false;
                }
            );
        }
    }
    clickThemBaiHoc() {
        this.initFormLesson();
        this.visibleLesson = true;
        console.log(this.lessonForm);
    }
    xemDanhSachKhoaHoc($event) {
        if ($event.collapsed) {
            console.log('1');
            this.isXemDanhSachChuong = true;
        } else {
            console.log('2');
            this.isXemDanhSachChuong = false;
        }
    }
    public chinhSuaChuongMuc() {
     //   delete this.chapterForm.value.courseID ;
     console.log(this.chapterForm.value);
        this.submitted = true;
        this.http.patch(`${this.config.url_port}/course/chapter`, this.chapterForm.value).subscribe((res: any) => {
            console.log(res);
            const filesTree11 = [...this.filesTree11];
            for (let i = 0; i < filesTree11[0].children.length; i++) {
                if (filesTree11[0].children[i].data.chapterID === res.chapterID) {
                    filesTree11[0].children[i].data.chapterTitle = res.chapterTitle;
                    filesTree11[0].children[i].data.chapterContent = res.chapterContent;
                    filesTree11[0].children[i].data.chapterSummary = res.chapterSummary;
                    filesTree11[0].children[i].label = res.chapterTitle;
                }
            }
            this.filesTree11 = filesTree11;
            this.submitted = false;
            this.visibleEditChater = false;
        });
    }
    public clickThemChuongMuc() {
        this.initFormChapter();
        console.log(this.chapterForm.value);
        this.visibleCource = false;
        this.visibleChater = true;
        // console.log('them chuong muc');
    }
    public themChuongMuc() {
        this.submitted = true;
        this.http.post(`${this.config.url_port}/course/chapter`, this.chapterForm.value).subscribe(
            (data: any) => {
                data.listOfLesson = [];
                const listCharter = this.listCharter;
                listCharter.push(data);
                const filesTree11 = [...this.filesTree11];
                // deo biet tai sao khong builing
                const node: TreeNode = {};
                node.label = data.chapterTitle;
                node.data = data;
                node.expandedIcon = 'fa fa-file-text';
                node.collapsedIcon = 'fa fa-file-text-o';
                const children: TreeNode[] = [];
                node.children = children;
                filesTree11[0].children.push(node);
                this.filesTree11 = filesTree11;
                this.listCharter = listCharter;
                console.log(data);
                this.submitted = false;
                // this.visibleChater = false;
                this.initFormChapter();
            }
        );
        console.log(this.chapterForm.value);
    }
    public clickXoaChuong($event): void {
        this.submitted = true;
        this.http.delete(this.config.url_port + '/course/chapter/' + $event.chapterID).subscribe((data: any) => {
               console.log(data);
            const listCharter = [...this.listCharter];
            for (let i = 0; i < listCharter.length; i++) {
                if (listCharter[i].chapterID === $event.chapterID) {
                    listCharter.splice(i, 1);
                }
            }
            this.listCharter = listCharter;
            const filesTree11 = [...this.filesTree11];
            for (let i = 0; i < filesTree11[0].children.length; i++) {
                if (filesTree11[0].children[i].data.chapterID === $event.chapterID) {
                    filesTree11[0].children.splice(i, 1);
                }
            }
            this.filesTree11 = filesTree11;
            this.submitted = false;
        }, (err: HttpErrorResponse) => (data: any) => {
            alert('delete erro');
            this.submitted = false;
        });
    }
    public clickXoaFile(): void {
        this.visibleEditFile = false;
        this.xoaFile();
    }
    public xoaFile(): void {
        this.submitted = true;
        this.http.delete(`${this.config.url_port}/lesson/lesson_attach/${this.selectFile.lessonAttachID}`).subscribe(
            (data: any) => {
                console.log(data);
                const filesTree11 = [...this.filesTree11];
                for (let i = 0; i < filesTree11[0].children.length; i++) {
                    for (let j = 0; j < filesTree11[0].children[i].children.length; j++) {
                        for (let k = 0; k < filesTree11[0].children[i].children[j].children.length; k++) {
                            if (this.selectFile.lessonAttachID === filesTree11[0].children[i].children[j].children[k].data.lessonAttachID) {
                                console.log(filesTree11[0].children[i].children[j].children[k]);
                                filesTree11[0].children[i].children[j].children.splice(k, 1);
                            }
                        }
                    }
                }
                this.filesTree11 = filesTree11;
                this.submitted = false ;
            }, (err: HttpErrorResponse) => {
                alert('Không thể xóa ');
                this.submitted = false;
            } );
    }
    expandAll() {
        this.filesTree11.forEach(node => {
            this.expandRecursive(node, true);
        });
    }

    collapseAll() {
        this.filesTree11.forEach(node => {
            this.expandRecursive(node, false);
        });
    }
    private expandRecursive(node: TreeNode, isExpand: boolean) {
        node.expanded = isExpand;
        if (node.children) {
            node.children.forEach(childNode => {
                this.expandRecursive(childNode, isExpand);
            });
        }
    }
    // upload video
    onUploadVideo($event) {
        if ($event.res) {
            console.log($event);
            const lessonForm = this.lessonForm;
            const response = $event.res.body;
            const data = JSON.parse(response);
            const auth = JSON.parse(data[0].fileProperties);
            console.log(auth.id);
            lessonForm.value.lessonContent = auth.id;
            this.lessonForm = lessonForm;
            console.log(this.lessonForm);
            this.isThemBaiHoc = true;
        }
        if ($event.submitted) {
            this.isThemBaiHoc = $event.submitted.value;
            console.log($event);
        }
    }
    // upload hinh anh khoa hoc
    onBasicUploadAuto($event) {
        const response = JSON.parse($event.xhr.response);
        const obj = response;
        const auth = JSON.parse(obj[0].fileProperties);
        const url = `https://drive.google.com/uc?id=${auth.id}`;
        this.courseAvatar_temp = url;
        const userform = this.userform;
        userform.value.courseAvatar = url;
        this.userform = userform;
        const khoahoc = this.khoahoc;
        khoahoc.courseAvatar = url;
        this.khoahoc = khoahoc;
        this.uploadImgProress = false;
    }
    onUpload(event) {
        this.uploadImgProress = false;
       console.log(this.selectFile);
         const data =  JSON.parse(event.xhr.response);
         console.log(data);
        for ( let i = 0 ; i < data.length ; i ++) {
        const driver = JSON.parse(data[i].fileProperties);
            const fileOfLesson: any = {};
            // {
            //     "lesonAttachContent": "",
            //     "lessonID": ""
            //   }
            if ( this.isSelectLessonFile ) {
                fileOfLesson.lessonID = this.selectLessonFile.lessonID ;
            }else {
             fileOfLesson.lessonID = this.selectFile.lessonID ;
            }
             fileOfLesson.lesonAttachContent =  `https://drive.google.com/uc?id=${driver.id}`;
            this.http.post(this.config.url_port + '/lesson/lesson_attach', fileOfLesson ).subscribe( (res: any ) => {
            console.log(res);
            const filesTree11 = [...this.filesTree11];
            // deo biet tai sao khong builing
            for (let n = 0; n < filesTree11[0].children.length; n++) {
                for (let j = 0; j < filesTree11[0].children[n].children.length; j++) {
                    console.log(res.lessonID  + ' ' + filesTree11[0].children[n].children[j].data.lessonID);
                    if (res.lessonID === filesTree11[0].children[n].children[j].data.lessonID) {
                        console.log(filesTree11[0].children[n].children[j]);
                        const file1: TreeNode = {};
                        file1.label = res.lesonAttachContent;
                        file1.data = res;
                        file1.icon = 'fa-file-word-o';
                       filesTree11[0].children[n].children[j].children.push(file1) ;
                       this.visibleEditFile = false;
                    }
                }
            }
            this.filesTree11 = filesTree11;
            });
        }
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'File Uploaded', detail: '' });
    }
    progressUp($event) {
        this.uploadImgProress = true;
        console.log($event);
    }
    erroUpload($event) {
        alert('thử lại');
        if ($event.xhr.status === 401) {
            console.log(' token hết hạng ');
        }
    }
    public loadingCource(code: string): void {
        this.submitted = true;
        const listNode: TreeNode[] = [];
        this.http.get(this.config.url_port + `/users/course/${code}`).subscribe((data: Course) => {
            this.khoahoc = data;
            this.initForm();
            // lấy danh sách chapter
            this.http.get(this.config.url_port + `/users/course/${this.khoahoc.courseID}/chapter`).subscribe(
                (chapter: any[]) => {
                    this.listCharter = chapter;
                    for (let i = 0; i < chapter.length; i++) {
                        const node: TreeNode = {};
                        node.label = chapter[i].chapterTitle;
                        node.data = chapter[i];
                        node.expandedIcon = 'fa-folder-open';
                        node.collapsedIcon = 'fa-folder-open-o';
                        const danhSachBaiHoc: Lesson[] = chapter[i].listOfLesson;
                        const nodeBaiHoc: TreeNode[] = [];
                        for (let j = 0; j < danhSachBaiHoc.length; j++) {
                            const baihoc: TreeNode = {};
                            baihoc.label = danhSachBaiHoc[j].lessonTitle;
                            baihoc.data = danhSachBaiHoc[j];
                            baihoc.expandedIcon = 'fa-file-video-o';
                            baihoc.collapsedIcon = 'fa-video-camera';
                           this.http.get(`${this.config.url_port}/lesson/${
                                danhSachBaiHoc[j].lessonID
                            }/lesson_attach`).subscribe(
                                (attach: FileOfLesson[] ) => {
                                    const listFileOfLesson = attach ;
                                    const listNodeFile: TreeNode[] = [];
                                    for (let k = 0; k < listFileOfLesson.length; k++) {
                                        const file: TreeNode = {};
                                        file.label = 'Tập tin đính kèm ' + ( k + 1 )  ;
                                        file.data = listFileOfLesson[k];
                                        file.icon = 'fa-file-word-o';
                                        listNodeFile.push(file);
                                    }
                                    baihoc.children = listNodeFile;
                                    nodeBaiHoc.push(baihoc);
                                }
                            );
                        }
                        node.children = nodeBaiHoc;
                        listNode.push(node);
                    }
                    this.filesTree11 = [{
                        label: this.khoahoc.courseTitle,
                        data: this.khoahoc,
                        children: listNode
                    }];
                    this.submitted = false;
                }
            );
        });
    }
}
