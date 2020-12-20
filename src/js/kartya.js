export default class Kartya {

    constructor() {
        this.lapok = []; // a (majdan bekevert) lapokat tartalmazó tömb
        this.pakli = this.kartyacsomag();
    }

    /*******************************************************************
        Az eredeti kártyapakliból véletlenszerű pakli-sorrendet előállító függvény
    *******************************************************************/
    keveres = async() => {
        let lapok = [...this.pakli];
        this.lapok = [];
        for (let n = 0; n < this.pakli.length; n++) {
            let lapIndex = Math.floor(Math.random() * lapok.length); // a pakliban sorban lévő lapokból kiválasztunk egyet véletlenszerűen
            this.lapok.push(lapok[lapIndex]); // hozzáadjuk a "megkevert" lapokhoz
            lapok.splice(lapIndex, 1); // kivesszük a lapot a tömbből, hogy csak egyszer legyen áttéve
        }
        this.keveresIndex = 0;
    };


    kartyacsomag = () => {
        return [
            { "tipus": 6, "cimke": "Ködlámpa" },
            { "tipus": 7, "cimke": "Faág" },
            { "tipus": 7, "cimke": "Éjjeliszekrény" },
            { "tipus": 4, "cimke": "Gondolatolvasás" },
            { "tipus": 7, "cimke": "Esőkabát" },
            { "tipus": 6, "cimke": "Túristajelzés" },
            { "tipus": 7, "cimke": "Madártoll" },
            { "tipus": 7, "cimke": "Téliálom" },
            { "tipus": 4, "cimke": "Fenyőillat" },
            { "tipus": 7, "cimke": "Kenyérpirító" },
            { "tipus": 6, "cimke": "Családfa" },
            { "tipus": 4, "cimke": "Rakott krumpli" },
            { "tipus": 6, "cimke": "Befőttesüveg" },
            { "tipus": 6, "cimke": "Villámcsapás" },
            { "tipus": 4, "cimke": "Elnökválasztás" },
            { "tipus": 7, "cimke": "Vízipóló" },
            { "tipus": 7, "cimke": "Gumilabda" },
            { "tipus": 4, "cimke": "Madártej" },
            { "tipus": 7, "cimke": "Dobverő" },
            { "tipus": 7, "cimke": "Fűszál" },
            { "tipus": 7, "cimke": "Tejszínhab" },
            { "tipus": 7, "cimke": "Csavarhúzó" },
            { "tipus": 6, "cimke": "Egyirányú utca" },
            { "tipus": 6, "cimke": "Lakat" },
            { "tipus": 4, "cimke": "gondolatolvasó" },
            { "tipus": 4, "cimke": "Bundás kenyér" },
            { "tipus": 7, "cimke": "szőnyeg" },
            { "tipus": 7, "cimke": "Babaágy" },
            { "tipus": 7, "cimke": "Almafa" },
            { "tipus": 7, "cimke": "Tükörtojás" },
            { "tipus": 6, "cimke": "Elemlámpa" },
            { "tipus": 7, "cimke": "kutya" },
            { "tipus": 7, "cimke": "ágy" },
            { "tipus": 7, "cimke": "pizsama" },
            { "tipus": 7, "cimke": "fürdés" },
            { "tipus": 6, "cimke": "Kilométeróra" },
            { "tipus": 7, "cimke": "Kulcstartó" },
            { "tipus": 7, "cimke": "Repülőtér" },
            { "tipus": 6, "cimke": "Gyerekjáték" },
            { "tipus": 4, "cimke": "Borospince" },
            { "tipus": 6, "cimke": "Tűznyelő" },
            { "tipus": 7, "cimke": "Télapó" },
            { "tipus": 6, "cimke": "Tojástartó" },
            { "tipus": 7, "cimke": "Távcső" },
            { "tipus": 4, "cimke": "Családtag" },
            { "tipus": 7, "cimke": "Alagút" },
            { "tipus": 4, "cimke": "Jelszó" },
            { "tipus": 4, "cimke": "Varródoboz" },
            { "tipus": 6, "cimke": "Boroshordó" },
            { "tipus": 7, "cimke": "Micimackó" },
            { "tipus": 6, "cimke": "Körív" },
            { "tipus": 7, "cimke": "Fapapucs" },
            { "tipus": 7, "cimke": "Világítótorony" },
            { "tipus": 6, "cimke": "Izzó" },
            { "tipus": 4, "cimke": "nagyothalló készülék" },
            { "tipus": 7, "cimke": "holdraszállás" },
            { "tipus": 7, "cimke": "űrhajó" },
            { "tipus": 6, "cimke": "Hold" },
            { "tipus": 4, "cimke": "Bolygó" },
            { "tipus": 6, "cimke": "Kerticsap" },
            { "tipus": 7, "cimke": "Fakanál" },
            { "tipus": 7, "cimke": "Palacsintasütő" },
            { "tipus": 7, "cimke": "Főzés" },
            { "tipus": 6, "cimke": "Napsütés" },
            { "tipus": 7, "cimke": "Kertitörpe" },
            { "tipus": 7, "cimke": "Nyúl ketrec" },
            { "tipus": 6, "cimke": "Torta" },
            { "tipus": 6, "cimke": "Kalács" },
            { "tipus": 7, "cimke": "Fürdőszoba" },
            { "tipus": 7, "cimke": "Számítógép" },
            { "tipus": 5, "cimke": "Gyúrma" },
            { "tipus": 6, "cimke": "Lego kocka" },
            { "tipus": 7, "cimke": "Hátizsák" },
            { "tipus": 6, "cimke": "Házi feladat" },
            { "tipus": 4, "cimke": "Szünidő" },
            { "tipus": 6, "cimke": "Mosogatógép" },
            { "tipus": 7, "cimke": "Takarítás" },
            { "tipus": 7, "cimke": "Porszívő" },
            { "tipus": 7, "cimke": "Teniszlabda" },
            { "tipus": 7, "cimke": "Pókember" },
            { "tipus": 7, "cimke": "Társasjáték" },
            { "tipus": 7, "cimke": "Étkező asztal" },
            { "tipus": 6, "cimke": "Földgömb" },
            { "tipus": 7, "cimke": "Ajtó" },
            { "tipus": 6, "cimke": "Kerti tó" },
            { "tipus": 6, "cimke": "Lakatlan sziget" },
            { "tipus": 6, "cimke": "Híd" },
            { "tipus": 7, "cimke": "Olimpia" },
            { "tipus": 6, "cimke": "Autógumi" },
            { "tipus": 1, "cimke": "Ablaktörlő" },
            { "tipus": 6, "cimke": "Parkolóhely" },
            { "tipus": 7, "cimke": "Kikötő" },
            { "tipus": 6, "cimke": "Matróz" },
            { "tipus": 6, "cimke": "Hajóskapitány" },
            { "tipus": 7, "cimke": "Hajótörött" },
            { "tipus": 7, "cimke": "Zászló" },
            { "tipus": 7, "cimke": "Cápafog" },
        ];
    }
}