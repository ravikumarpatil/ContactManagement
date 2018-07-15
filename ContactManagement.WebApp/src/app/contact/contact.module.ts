import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactRuoteModule, routedComponents } from './contact-ruote/contact-ruote.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [
        CommonModule,
        ContactRuoteModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule.forRoot()
    ],
    declarations: [routedComponents]
})
export class ContactModule { }
