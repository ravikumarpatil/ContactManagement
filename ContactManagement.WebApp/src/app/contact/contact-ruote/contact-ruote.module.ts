import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactIndexComponent } from '../contact-index/contact-index.component';
import { ContactAddComponent } from '../contact-add/contact-add.component';
import { ContactEditComponent } from '../contact-edit/contact-edit.component';

const routes: Routes = [
    { path: '', component: ContactIndexComponent, data: { title: 'Contact Management - Contact Index' } },
    { path: 'index', component: ContactIndexComponent, data: { title: 'Contact Management - Contact Index' } },
    { path: 'add', component: ContactAddComponent, data: { title: 'Contact Management - Contact Add' } },
    { path: 'edit', component: ContactEditComponent, data: { title: 'Contact Management - Contact Edit' } }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    declarations: []
})
export class ContactRuoteModule { }

export const routedComponents = [ContactIndexComponent, ContactAddComponent, ContactEditComponent];
