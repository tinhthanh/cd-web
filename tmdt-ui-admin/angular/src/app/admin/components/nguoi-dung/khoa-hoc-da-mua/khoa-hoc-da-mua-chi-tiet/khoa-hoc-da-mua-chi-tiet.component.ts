import { GhimVideo } from './../../../../_models/GhimVideo';
import { TreeDragDropService } from './../../../../../components/common/treedragdropservice';
import { Tree } from './../../../../../components/tree/tree';
import { TreeNode } from './../../../../../components/common/treenode';
import { MenuItem } from './../../../../../components/common/menuitem';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { Chapter } from '../../../../_models/Chapter';
import { ConfigValue } from '../../../../_helpers/config-value';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NodeService } from '../../../../../showcase/service/nodeservice';
import { Message, SelectItem } from 'app/components/common/api';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Course, Lesson, FileOfLesson } from 'app/admin/_models';
import { APP_BASE_HREF } from '@angular/common';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
    templateUrl: 'khoa-hoc-da-mua-chi-tiet.component.html',
    styles: [`
    h4 {
        text-align: center;
        margin: 0 0 8px 0;
    }
`],
    styleUrls: ['khoa-hoc-da-mua-chi-tiet.component.css'],
    providers: [TreeDragDropService ,
    GhimVideo]
})
export class KhoaHocDaMuaChiTietComponent implements OnInit {
    url_upload: string;
    // khoa hoc
    thanh: SafeResourceUrl ;
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

    isZoomVideo = false;
    listghim: GhimVideo[] = [];
    constructor(private nodeService: NodeService
        , private http: HttpClient,
        private config: ConfigValue,
        private router: Router,
        private fb: FormBuilder,
        private sanitizer: DomSanitizer,
        private route: ActivatedRoute,
        private ghim: GhimVideo
    ) {
    }
    // '1ZlThHQI5HND7l96FsF7T6dl1HV7MAJvk'
    public updateVideoView(id: string): void {
         const temp  = `https://drive.google.com/file/d/${id}/preview`;
        this.thanh = this.sanitizer.bypassSecurityTrustResourceUrl(temp);
    }
    public updateLink(id: string) {
        console.log(id);
        this.url_video = `https://drive.google.com/file/d/${id}/preview`;
        this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.url_video);
        this.isXemVideo = true;
    }
    ngOnInit() {
        this.updateVideoView('1ZlThHQI5HND7l96FsF7T6dl1HV7MAJvk');
        this.url_upload = this.config.url_port;
        // this.loading = true;
        console.log(this.router);
        if ( this.route.snapshot.queryParams['id']) {
            this.loadingCource(this.route.snapshot.queryParams['id'] );
        } else {
            this.router.navigate(['/admin/khoa-hoc/quan-ly-khoa-hoc']);
        }
         this.listghim =  this.ghim.getListGhim();
    }
    toBack() {
        this.router.navigate(['/admin/nguoi-dung/khoa-hoc-da-mua']);
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
            this.visibleEditChater = true;
            this.selectLesson = event.node.data;
        }
        if (event.node.data.chapterID && event.node.data.lessonID) {
            this.selectLessonFile = event.node.data;
            this.isZoomVideo = true;
            this.updateVideoView(this.selectLessonFile.lessonContent);
        }
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'Node Selected', detail: event.node.label });
    }
    // xoa bai hoc
    // het xoa bai hoc
    // click chinh sửa bài học
    public clickChinhSuaBaiHoc($event) {
        const videoghim = new GhimVideo();
        videoghim.cource_id = this.khoahoc.courseID ;
        videoghim.cource_name = this.khoahoc.courseTitle ;
        videoghim.chapter_id = this.selectLesson.chapterID ;
        videoghim.chapter_name = this.selectLesson.chapterTitle ;
        videoghim.lesson_id = $event.lessonID ;
        videoghim.lesson_name = $event.lessonTitle ;
        videoghim.link_video = $event.lessonContent ;
        this.ghim.add(videoghim);
        this.listghim  = this.ghim.getListGhim();
        this.isThemBaiHoc = true;
        this.visibleLesson = true;
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'Thành công ', detail: 'Bạn đã ghim video ' + videoghim.lesson_name  });
    }
    // hết clcik chỉnh sửa bài học
    // chinh sua bai hoc
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
        } else {

            this.submitted = true;
            console.log(this.lessonForm.value);
            this.lessonForm.value.chapterID = this.selectLesson.chapterID;
            this.lessonForm.value.listOfLessonAttach = [];
            this.http.post(`${this.config.url_port}/admin/lesson`, this.lessonForm.value).subscribe(
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
    xemDanhSachKhoaHoc($event) {
        if ($event.collapsed) {
            console.log('1');
            this.isXemDanhSachChuong = true;
        } else {
            console.log('2');
            this.isXemDanhSachChuong = false;
        }
    }
    public clickTaiXuong(): void {
        this.visibleEditFile = false;
       alert('chưa gắn link tải xuống');
    }
    public xoaFile(): void {
        this.submitted = true;
        this.http.delete(this.config.url_port + '/admin/file-of-lesson/' + this.selectFile.lessonAttachID).subscribe(
            (data: FileOfLesson) => {
                console.log(data);
                const filesTree11 = [...this.filesTree11];
                // deo biet tai sao khong builing
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

    public xoaGhim( $event ) {
        this.ghim.deleteGhim($event.lesson_id);
        this.listghim = this.ghim.getListGhim();
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'Thành công ', detail: 'Bạn đã xóa ghim video ' + $event.lesson_name });
  
    }
    public playGhim($event) {
        // alert('play ghim');
        console.log($event);
        this.updateVideoView($event.link_video);
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
            if ( this.isSelectLessonFile ) {
                fileOfLesson.lessonID = this.selectLessonFile.lessonID ;
            }else {
             fileOfLesson.lessonID = this.selectFile.lessonID ;
            }
             fileOfLesson.lesonAttachContent =  `https://drive.google.com/uc?id=${driver.id}`;
            this.http.post(this.config.url_port + '/admin/file-of-lesson', fileOfLesson ).subscribe( (res: any ) => {
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
