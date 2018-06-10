import { Injectable } from '@angular/core';

@Injectable()
export class GhimVideo {
    cource_id: string ;
    cource_name: string;
    chapter_id: string ;
    chapter_name: string ;
    lesson_id: string ;
    lesson_name: string;
    link_video: string ;
    constructor() {
    }
    public getListGhim(): GhimVideo[] {
        const result: GhimVideo[] = [];
        if (localStorage.getItem('ghim_video')) {
        const data = JSON.parse(localStorage.getItem('ghim_video'));
        return data;
        } else {
           localStorage.setItem('ghim_video', JSON.stringify(result));
        }
        return result;
    }
    public add( ghim:  GhimVideo ): void {
        const listGhim = this.getListGhim();
        for (  let i = 0 ; i < listGhim.length ; i++ ) {
            if ( listGhim[i].lesson_id === ghim.lesson_id ) {
                return ;
            }
        }
        listGhim.push(ghim);
        localStorage.setItem('ghim_video', JSON.stringify(listGhim));
    }
    public deleteGhim(id: string ): void {
        const listghim = this.getListGhim() ;
         for ( let i = 0 ; i < listghim.length  ;  i++ ) {
             if ( listghim[i].lesson_id === id ){
                 listghim.splice(i, 1);
             }
         }
         localStorage.setItem('ghim_video', JSON.stringify(listghim));
    }
}
