import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MauDemoTopicComponent } from 'app/admin/components/mau-demo/mau-demo-topic/mau-demo-topic.component';

const routes: Routes = [
  { path: 'mau-demo-topic', component: MauDemoTopicComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MauDemoRoutingModule { }
