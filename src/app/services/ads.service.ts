import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import { IJobAd } from '../models';

@Injectable({
    providedIn: 'root'
})
export class AdsService {

    #url = "http://localhost:3000";
    #ads = "/ads";

    constructor(private http: HttpClient) { }

    getAllAds(): Observable<Array<IJobAd>> {
        return this.http.get<IJobAd[]>(this.#url + this.#ads);
    }

    // just as example, it can be promise instead of observable
    getFilteredAds(page: string, status?: string, title?: string): Promise<HttpResponse<IJobAd[]>> {
        let url = this.#url + this.#ads + '?_page=' + page;
        if (status) {
            url += '&status=' + status;
        }
        if (title) {
            url += '&title=' + title;
        }
        return firstValueFrom(this.http.get<IJobAd[]>(url, { observe: 'response' }));
    }

    getAd(id: string): Observable<IJobAd> {
        const url = this.#url + this.#ads + "/" + id;
        return this.http.get<IJobAd>(url);
    }

    updateAd(ad: IJobAd): Observable<IJobAd> {
        const url = this.#url + this.#ads + "/" + ad.id;
        return this.http.put<IJobAd>(url, ad);
    }

    insertAd(ad: IJobAd): Observable<IJobAd> {
        return this.http.post<IJobAd>(this.#url + this.#ads, ad);
    }

    changeAdStatus(id: string, status: string) {
        const url = this.#url + this.#ads + "/" + id;
        return this.http.patch<IJobAd>(url, { status: status });
    }
}
