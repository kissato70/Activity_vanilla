import Kartya from './kartya.js';

export default class Activity extends Kartya {
    constructor() {
        super();
        this.kartyaElol = 1; // kiindulási állapot, az első lap indexe
        this.keveresSzam = 4; // hányszor legyen a pakli megkeverve
        this.keveresIndex = 0; // hanyadik keverésnél járunk
        this.keveresTimer; // a keverés időzítő változója
        this.huzasTipus = 7;
        /* az alapbeállítás a húzás típusához
                0 = mindig más fajta (ciklikusan ismételve),
                { bináris kártyaTipusok },
                7 = vegyesen adja a lapokat, véletlenszerűen
        */
        this.huzasTipusok = [0, 1, 2, 4, 7]; // A húzás típusokhoz tartozó kártya típusok kódja
        this.kartyaTipusok = [1, 2, 4];
        /* Kártya típusok:
                1 = mutogatás,
                2 = rajzolás,
                4 = mesélés
        */
        this.utolsoKartyaTipusa = this.kartyaTipusok[this.kartyaTipusok.length - 1]; // Az utoljára húzott lap típusa. Ha körbe-körbe húzunk, innen lép tovább (azaz az 1-es típus jön majd)
        this.elrejtve = false;
    }

    /*******************************************************************
        Inicializálás: események hozzárendelése, első keverés indítása
    *******************************************************************/
    init() {
        const tipusgombok = document.querySelectorAll("div.gomb.tipus");
        tipusgombok.forEach((item) => { // A típus kiválasztó gombokhoz eseményvezérlőt rendelünk
            item.addEventListener('mouseup', (event) => { // ahol egérkattintás esetén
                const tGombok = document.querySelectorAll("div.gomb.tipus"); // újra végigmegyünk a gombokon,
                tGombok.forEach((item) => {
                    item.classList.toggle("kivalasztva", (event.target === item || event.target.parentNode === item)); // ahol a kiválasztott gomb megkapja a stílusosztályt,
                    item.style.zIndex = 0; // és mindegyiket hátrasoroljuk (lásd: mobil megjelenítés).
                });
                this.huzasTipusHandler(event.target.getAttribute("tipus") || event.target.parentNode.getAttribute("tipus")); // A típus attribútum szerint előresoroljuk mobilon.
            }, false)
        });
        document.querySelector("div.gomb.huzas").addEventListener('mouseup', this.ujLap, false); // Hozzárendeljük az "új kártya" eseményvezérlőjét
        document.querySelector("div.gomb.keveres").addEventListener('mouseup', this.ujrakeveres, false); // Hozzárendeljük az "Újrakeverés" eseményvezérlőjét
        document.querySelector("div.lapok").addEventListener('mouseup', this.elrejtes, false); // Hozzárendeljük a kártya elrejtése funkció eseményvezérlőjét
        this.ujrakeveres();
    }

    /*******************************************************************
        Mobil alkalmazásnál a típus-címkék egymás előtt/mögött vannak, a kiválasztottat lépteti és előrehozza a függvény
    *******************************************************************/
    huzasTipusHandler = (ujTipus) => {
        if (ujTipus == this.huzasTipus) { // ha a mobil app-ban azonos gomb megérintve -> léptetés
            const kovetkezoIndex = this.huzasTipusok.indexOf(this.huzasTipus) + 1; // a kártya típusok közül a következőre lépünk
            if (kovetkezoIndex == this.huzasTipusok.length) { kovetkezoIndex = 0; } // ha a végére értünk, kezdjük elölről
            ujTipus = this.huzasTipusok[kovetkezoIndex];
            document.getElementById("T" + ujTipus).style.zIndex = 1; // mobil megjelenítésnél előrehozzuk a kiválasztott típus címkéjét
        }
        this.huzasTipus = ujTipus;
    }


    /*******************************************************************
        A keverés és a hozzá tartozó animáció
    *******************************************************************/
    ujrakeveres = () => {
        document.getElementById("keveres").style.display = "block";
        document.querySelector("#K0 p").style.display = "none";
        document.querySelector("#K1 p").style.display = "none";
        let self = this;
        this.keveres().then(
            this.keveresTimer = setInterval(function() {
                self.kever();
            }, 500)
        );
    }

    /*******************************************************************
        A keverés animációját vezérlő időzített szubrutin
    *******************************************************************/
    kever = () => {
        let kartyaHatul = (this.kartyaElol == 0) ? 1 : 0; // Az elöl és a hátul lévő kártyákat kiválasztjuk
        const hatul = document.getElementById("K" + kartyaHatul);
        const elol = document.getElementById("K" + this.kartyaElol);
        elol.classList.remove("nyuszi", "mutogat", "rajzol", "elmond"); // tötöljük valamennyi szóbajöhető stílusosztály beállítást
        elol.classList.add('magictime', 'spaceOutLeft');
        this.kartyaElol = this.kartyaElol == 0 ? 1 : 0;
        setTimeout(() => { // az animáció végén lévő időzített művelet
            elol.classList.remove("magictime"); // kivesszük az animációs beállítást
            let kartyaHatul = this.kartyaElol == 0 ? 1 : 0; // attól függően, hogy melyik lap van elöl, beállítjuk a zIndex-et
            document.getElementById("K" + kartyaHatul).style.zIndex = 0;
            document.getElementById("K" + this.kartyaElol).style.zIndex = 1;
            elol.classList.remove("spaceOutLeft"); // az animáció típusát is kivesszük
        }, 500);
        document.getElementById("progress").style.width = (100 * this.keveresIndex / this.keveresSzam) + "%"; // a csík méretét állítjuk be a keverésszám függvényében
        this.keveresIndex++;
        if (this.keveresIndex > this.keveresSzam) { // ha elértük a megfelelő keverések számát
            clearTimeout(this.keveresTimer); // leállítjuk az időzítést (az animációt)
            this.keveresTimer = null;
            setTimeout(() => { // jöhet egy időzítés, ami majd megjeleníti a nyitó-kártyát
                document.getElementById("keveres").style.display = "none";
                hatul.classList.add("nyuszi");
                document.querySelector("#K0 p").style.display = "block";
                document.querySelector("#K1 p").style.display = "block";
            }, 500);
        }
    };

    /*******************************************************************
        Új lapot húzunk, a beállított kártya-típusnak megfelelően
        RETURN = -1  :  ha újra kellett keverni a paklit, mert elfogytak a lapok
    *******************************************************************/
    ujLap = () => {
        const kartya = document.getElementById("K" + this.kartyaElol);
        const kartyaHatul = (this.kartyaElol == 0) ? 1 : 0;
        kartya.classList.add('magictime', 'bombLeftOut', 'repul');
        let lap = -1;
        let n = this.lapok.length - 1;
        let eztHuzd;
        if (this.huzasTipus == 0) { // ha körbe-körbe járunk a típusokban
            let huzasTipusIndex = this.kartyaTipusok.indexOf(this.utolsoKartyaTipusa) + 1;
            if (huzasTipusIndex == this.kartyaTipusok.length) { huzasTipusIndex = 0; } // körbe-körbe
            eztHuzd = this.kartyaTipusok[huzasTipusIndex];
        } else {
            eztHuzd = this.huzasTipus;
        }
        this.utolsoKartyaTipusa = eztHuzd;
        while (lap == -1 && n > -1) {
            if ((eztHuzd & this.lapok[n].tipus) > 0) { // ha megfelelő a legfelső kártyalap típusa (bitwise AND)
                lap = this.lapok[n]; // kiválasztjuk megjelenítésre
                this.lapok.splice(n, 1); // kivesszük a this.pakliból
            }
            n--;
        }
        if (lap == -1) { // ha elfogytak a kártyák a pakliból
            this.ujrakeveres();
            return (-1);
        }
        let lapTipusa = lap.tipus & eztHuzd; // ha csak egyféle típus kell, akkor szűkítsük le (bináris ÉS)
        let lapTipusHuzhato = []; // Ebbe a tömbbe kerülnek a kihúzható típusok címkéi, a leválogatáshoz
        let lapTipusHuzhatoIndex; // Ide majd a véletlenszerűen kiválasztott kategóriacímke index kerül
        if ((lapTipusa & 1) > 0) { lapTipusHuzhato.push("mutogat"); }; // Az egyes kategóriacímkék betöltése a tömbbe
        if ((lapTipusa & 2) > 0) { lapTipusHuzhato.push("rajzol"); };
        if ((lapTipusa & 4) > 0) { lapTipusHuzhato.push("elmond"); };
        lapTipusHuzhatoIndex = Math.floor(Math.random() * lapTipusHuzhato.length); // A kihúzható kategóriák közül egy kiválasztása véletlenszerűen
        document.getElementById("K" + kartyaHatul).className = "kartya " + lapTipusHuzhato[lapTipusHuzhatoIndex]; // A hátsó kártya beállítása a kiválasztott típushoz
        document.querySelector("#K" + kartyaHatul + " p").innerHTML = this.capitalizeFirstLetter(lap.cimke); // A címke beállítása
        this.kartyaElol = this.kartyaElol == 0 ? 1 : 0; // A kártyák megcserélése
        setTimeout(() => {
            kartya.classList.remove("magictime"); // Az animáció kikapcsolása
            const kartyaHatul = (this.kartyaElol == 0) ? 1 : 0; // A hátsó kártya indexének beállítása
            document.getElementById("K" + kartyaHatul).style.zIndex = 0; // Az új hátsó kártya megy hátra,
            document.getElementById("K" + this.kartyaElol).style.zIndex = 1; // a másik előre.
            kartya.classList.remove("bombLeftOut"); // animációs stílusosztályok eltávolítása
            kartya.classList.remove("repul");
        }, 500);
        this.elrejtes(null); // Ha el volt rejtve, akkor ezt kikapcsoljuk.
    };

    /*******************************************************************
        A bemeneti string első karakterét nagybetűssé alakítja
    *******************************************************************/
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    /*******************************************************************
        A kártyára kattintáskor annak elrejtését illetve ismételt felfedését végző függvény
        null  : elrejtés kikapcsolása
        true  : kártya elrejtése (lefedése)
        false : kártya felfedése
    *******************************************************************/
    elrejtes = (rejtve) => {
        const takaro = document.querySelector("div.kartya.titkos"); // a lefedést végző lap kijelölése
        if (rejtve != null) {
            this.elrejtve = !this.elrejtve;
        } else { // ha null értékkel hívjuk meg a függvényt, akkor eltüntetjük az elrejtő kártyát
            takaro.style.display = "none";
            takaro.classList.remove('magictime', 'slideUp', 'slideUpReturn');
            this.elrejtve = false;
            return;
        }
        if (this.elrejtve) { // ha fel volt fedve, lecsúszik és elrejti a kártyát
            takaro.style.display = "block";
            takaro.classList.add('magictime', 'slideUpRetourn');
        } else { // ha el volt rejtve, felcsúszik és megmutatja a kártyát
            takaro.classList.remove('magictime', 'slideUpRetourn');
            takaro.classList.add('magictime', 'slideUp');
        }
    };
}