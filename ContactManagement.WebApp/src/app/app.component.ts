import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { NotificationService } from './_services/notification.service';
import { LoaderService } from './_services/loader.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'app';
    loader = 0;

    subActiveRoute = this.activatedRoute.data.subscribe((data: { title: string }) => {
        this.titleService.setTitle(data.title);
    });

    subLoader = this.loaderService.loadingFlagUpdated.subscribe((d) => {
        this.loader = d;
    });

    constructor(
        private activatedRoute: ActivatedRoute,
        private titleService: Title,
        private notificationService: NotificationService,
        private loaderService: LoaderService
    ) { }

    public ngOnInit() {
        this.loader = 0;
    }

    ngOnDestroy(): void {
        this.subActiveRoute.unsubscribe();
        this.subLoader.unsubscribe();
    }
}
