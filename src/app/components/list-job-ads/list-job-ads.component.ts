import { HttpResponse } from '@angular/common/http';
import { Component, ElementRef, HostListener, OnInit, ViewChild, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IJobAd, JobAdStatus, PaginationLinks } from 'src/app/models';
import { AdsService } from 'src/app/services/ads.service';

@Component({
    selector: 'app-list-job-ads',
    templateUrl: './list-job-ads.component.html',
    styleUrls: ['./list-job-ads.component.scss']
})
export class ListJobAdsComponent implements OnInit {

    @ViewChild('filters') filters: ElementRef;

    @HostListener('window:resize', ['$event'])
    onWindowResize() {
        this.screenWidth = window.innerWidth;
        if (this.screenWidth >= 820) {
            this.setFiltersFlexDirection(false);
        }
        if (this.screenWidth < 550) {
            this.setFiltersVisible(false);
            this.showFilters = false;
        } else {
            this.setFiltersVisible(true);
        }
    }

    #service = inject(AdsService);
    #router = inject(Router);
    #route = inject(ActivatedRoute);
    adsList: Array<IJobAd>;
    paginationLinks: PaginationLinks;
    currentPage: string;
    title: string;
    status: JobAdStatus;
    showFilters: boolean;
    screenWidth: any;

    ngOnInit(): void {
        this.resetPaginationLinks();

        this.#route.queryParams.subscribe((params) => {
            if (!params['_page']) {
                this.initStartQueryParams();
            } else {
                this.#service.getFilteredAds(params['_page'], params['status'], params['title']).then((response: HttpResponse<IJobAd[]>) => {
                    if (response.body) {
                        this.adsList = response.body;
                    }
                    this.currentPage = params['_page'];
                    this.status = params['status'];
                    this.title = params['title'];
                    const link = response.headers.get('link');
                    if (link) {
                        this.mapLinkProperty(link);
                    } else {
                        this.resetPaginationLinks();
                    }
                });
            }
        });
    }

    initStartQueryParams() {
        this.navigatePages('1');
    }

    navigatePages(pageNum: string, status?: string, title?: string) {
        let params: any = { _page: pageNum };
        if (status) params.status = status;
        if (title) params.title = title;
        this.#router.navigate([], {
            relativeTo: this.#route,
            queryParams: params
        });
    }

    mapLinkProperty(link: string) {
        const arr = link.split(',');
        arr.forEach(item => {
            const itemArr = item.split('; ');
            const params = itemArr[0].split('?')[1].split('&');
            const pageNumber = params.length > 1 ? params[0].slice(-1) : params[0].slice(-2, -1);
            if (itemArr[1].slice(4) === '"first"') {
                this.paginationLinks.first = pageNumber;
            } else if (itemArr[1].slice(4) === '"last"') {
                this.paginationLinks.last = pageNumber;
            } else if (itemArr[1].slice(4) === '"next"') {
                this.paginationLinks.next = pageNumber;
            } else if (itemArr[1].slice(4) === '"prev"') {
                this.paginationLinks.prev = pageNumber;
            }
        });
        if (this.currentPage === this.paginationLinks.last) this.paginationLinks.next = '';
        if (this.currentPage === this.paginationLinks.first) this.paginationLinks.prev = '';
    }

    changePage(page: string) {
        let selectedPage = '';
        switch (page) {
            case 'first':
                selectedPage = this.paginationLinks.first;
                break;
            case 'prev':
                selectedPage = (Number(this.currentPage) - 1).toString();
                break;
            case 'next':
                selectedPage = this.paginationLinks.next;
                break;
            case 'last':
                selectedPage = this.paginationLinks.last;
                break;
        }
        this.navigatePages(selectedPage, this.status, this.title);
    }

    filterResult(e: Event) {
        this.navigatePages("1", this.status, this.title);
    }

    filterResultByStatus() {
        this.navigatePages("1", this.status, this.title);
    }

    resetPaginationLinks() {
        this.paginationLinks = {
            first: this.currentPage,
            last: this.currentPage,
            next: this.currentPage,
            prev: this.currentPage
        };
    }

    onFilterButtonClick() {
        this.showFilters = !this.showFilters;
        this.setFiltersVisible(this.showFilters);
        this.setFiltersFlexDirection(this.showFilters);
    }

    setFiltersVisible(visible: boolean) {
        this.filters.nativeElement.style.display = visible ? 'flex' : 'none';
    }

    setFiltersFlexDirection(column: boolean) {
        this.filters.nativeElement.style.flexDirection = column ? 'column' : 'row';
    }

}
