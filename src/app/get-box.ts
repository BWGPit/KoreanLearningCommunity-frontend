import { inject, Service } from '@angular/core';
import { Language, Mapping } from './flash-card-box/flash-card-box';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

const APIURL = "https://koreanlearningcommunity.fastapicloud.dev/"

export interface FCBox {
    srcLanguage: Language
    destLanguage: Language
    name: string
    mapping: Mapping
}

@Service()
export class GetBox {
    private http = inject(HttpClient)
    async getbox(box_id: string): Promise<FCBox> {        
        let endpoint = "getbox"
        return lastValueFrom(this.http.get<FCBox>(APIURL + endpoint))
    }
}
