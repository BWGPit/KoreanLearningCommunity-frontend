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
        let tb: FCBox = {
            srcLanguage: "kr",
            destLanguage: "it",
            name: "Direzioni",
            mapping: [["북", "남", "동", "서"], ["Nord", "Sud", "Est", "Ovest"]]
        }
        return tb
    }
}
