import { Service } from '@angular/core';
import { Language, Mapping } from './flash-card-box/flash-card-box';

export interface FCBox {
    srcLanguage: Language
    destLanguage: Language
    name: string
    mapping: Mapping
}

@Service()
export class GetBox {
    getbox(box_id: string): FCBox {
        // TODO: farlo funzionare con un database
        // let tb: FCBox = {
        //     srcLanguage: "kr",
        //     destLanguage: "it",
        //     name: "Direzioni",
        //     mapping: [["북", "남", "동", "서"], ["Nord", "Sud", "Est", "Ovest"]]
        // }
        let tb: FCBox = {
            srcLanguage: "kr",
            destLanguage: "it",
            name: "Lezione 1 (prima parte)",
            mapping: [
                ["전신", "놀라다", "속상하다", "힘들다", "농구", "배구", "지구", "맑다", "흐리다", "비가 오다", "눈이 오다", "시원하다"],
                ["tutto", "rimanere sorpreso", "essere turbato", "faticoso", "basket", "pallavolo", "Terra", "sereno", "nuvoloso", "piovere", "nevicare", "rinfrescante"]
            ]
        }
        return tb
    }
}
