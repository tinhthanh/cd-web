
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse, HttpEventType } from '@angular/common/http';
import { UploadFileService } from 'app/admin/_services/upload/UploadFileService';
import { Output , Input , EventEmitter } from '@angular/core';



@Component({
  selector: 'app-form-upload',
  templateUrl: './form-upload.component.html',
  styleUrls: ['form-upload.component.css']
})

export class FormUploadComponent implements OnInit {
  public selectedFiles: FileList ;
  currentFileUpload: File;
  public progress: { percentage: number } = { percentage: 0 };
  @Output() eventUp: EventEmitter<any>  = new EventEmitter();
  thongbao: string;
  constructor(private uploadService: UploadFileService) { }
  ngOnInit() {
    this.thongbao = ' Đang đồng bộ lên GoogleDriver...';
  }
 public  selectFile(event) {
   this.thongbao = ' Đang đồng bộ lên GoogleDriver...';
    this.selectedFiles = event.target.files;
    this.upload();
  }
  public upload() {
    this.eventUp.emit({submitted: {value: false}});
    this.progress.percentage = 0;
    this.currentFileUpload = this.selectedFiles.item(0) ;
    this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(event => {
      console.log(event);
      if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        console.log('File is completely uploaded!');
         this.thongbao = '';
        this.eventUp.emit({res : event});
        this.eventUp.emit({submitted: {value: true}});
      }
    }) ;
    this.selectedFiles = undefined ;
  }
}
