class Aturan {
    //Private Variable
    #sp = 0 //Score Player
    #sc = 0 //Score Computer

    constructor(elementHasil) {
        if(this.constructor === Aturan) {
            throw new Error('Tidak Bisa Mengakses Abstract Class')
        }

        let { vs, hasilPermainan, textHasilPermainan1, textHasilPermainan2, cekOpacity, scorePlayer, scoreCom } = elementHasil

        this.vs = vs
        this.hasilPermainan = hasilPermainan
        this.textHasilPermainan1 = textHasilPermainan1
        this.textHasilPermainan2 = textHasilPermainan2
        this.cekOpacity = cekOpacity
        this.scorePlayer = scorePlayer
        this.scoreCom = scoreCom
    }

    //Private Method
    #pilihanPlayer(pp) {
        //Mencari Pilihan Player
        return pp.getAttribute('id')
    }

    //Private Method
    #pilihanComputer(hasilPC) {
        //Mencari Pilihan Computer
        switch(hasilPC){
            case 1:
                return 'batu'
            case 2:
                return 'kertas'
            case 3:
                return 'gunting'
            default:
                throw new Error('Pilihan Computer Tidak Valid')
        }
    }

    //Private Method
    //Mencari Pemenang
    #methodHasilPermainan(hasilPP, hasilPC) {
        if(hasilPP == hasilPC) {
            this.textHasilPermainan1.style.display = 'none'
            this.textHasilPermainan2.innerHTML = 'Draw'
            this.hasilPermainan.classList.remove('bg-opacity-50')
        } else if(hasilPP == 'batu') {
            if (hasilPC == 'gunting') {
                this.textHasilPermainan1.style.display = 'block'
                this.textHasilPermainan1.innerHTML = 'PLAYER 1' 
                this.textHasilPermainan2.innerHTML = 'Win'

                if (!this.cekOpacity) this.hasilPermainan.classList.add('bg-opacity-50')
                this.scorePlayer.innerHTML = this.#sp += 1
            } else {
                this.textHasilPermainan1.style.display = 'block'
                this.textHasilPermainan1.innerHTML = 'COM'
                this.textHasilPermainan2.innerHTML = 'Win'

                if (!this.cekOpacity) this.hasilPermainan.classList.add('bg-opacity-50')
                this.scoreCom.innerHTML = this.#sc += 1
            }
        } else if(hasilPP == 'gunting') {
            if (hasilPC == 'batu') {
                this.textHasilPermainan1.style.display = 'block'
                this.textHasilPermainan1.innerHTML = 'COM'
                this.textHasilPermainan2.innerHTML = 'Win'

                if (!this.cekOpacity) this.hasilPermainan.classList.add('bg-opacity-50')
                this.scoreCom.innerHTML = this.#sc += 1
            } else {
                this.textHasilPermainan1.style.display = 'block'
                this.textHasilPermainan1.innerHTML = 'PLAYER 1'
                this.textHasilPermainan2.innerHTML = 'Win'
                
                if (!this.cekOpacity) this.hasilPermainan.classList.add('bg-opacity-50')
                this.scorePlayer.innerHTML = this.#sp += 1
            }
        } else if(hasilPP == 'kertas') {
            if (hasilPC == 'batu') {
                this.textHasilPermainan1.style.display = 'block'
                this.textHasilPermainan1.innerHTML = 'PLAYER 1'
                this.textHasilPermainan2.innerHTML = 'Win'

                if (!this.cekOpacity) this.hasilPermainan.classList.add('bg-opacity-50')
                this.scorePlayer.innerHTML = this.#sp += 1
            } else {
                this.textHasilPermainan1.style.display = 'block'
                this.textHasilPermainan1.innerHTML = 'COM'
                this.textHasilPermainan2.innerHTML = 'Win'

                if (!this.cekOpacity) this.hasilPermainan.classList.add('bg-opacity-50')
                this.scoreCom.innerHTML = this.#sc += 1
            }
        } else {
            throw new Error('Hasil Pertandingan Tidak Valid')
        }
    }

    //Encapculation (Private Method)
    finalPilihanPlayer(pp) {
        return this.#pilihanPlayer(pp)
    }

    //Encapculation (Private Method)
    finalPilihanComputer(hasilPC) {
        return this.#pilihanComputer(hasilPC)
    }

    //Encapculation (Private Method)
    finalPermainan(hasilPP, hasilPC) {
        return this.#methodHasilPermainan(hasilPP, hasilPC)
    }
}

//Inheritance
class MulaiPermainan extends Aturan {
    //Private Variable
    #stylePilihan = 'pilihan'
    #styleHasil = 'hasil'
    #waktuAnimasiMulai = 100
    #waktuAnimasiSelesai = 1300

    constructor(elementHasil, pilihan, ulang) {
        super(elementHasil)
        
        let {pilihanPlayer, pilihanComputer} = pilihan

        this.pilihanPlayer = pilihanPlayer
        this.pilihanComputer = pilihanComputer
        this.ulang = ulang
    }

    //Animasi Acak Pilihan Computer
    #animasiPilihanComputer() {
        let waktu = this.#waktuAnimasiMulai
        for(let i = 0; i < this.pilihanComputer.length; i++) {
            setTimeout(() => {
                this.pilihanComputer[i].classList.add(this.#stylePilihan)
            }, waktu)

            for(let i = 0; i < this.pilihanComputer.length; i++) {
                waktu += 100
                setTimeout(() => {
                    this.pilihanComputer[i].classList.remove(this.#stylePilihan)
                }, waktu)
            }
        }
    }

    //Kondisi Awal Permainan
    #kondisiAwal() {
        this.pilihanPlayer.forEach((pp) => {
            pp.classList.remove(this.#stylePilihan)
        });
    
        this.pilihanComputer.forEach((pc) => {
            pc.classList.remove(this.#stylePilihan)
        });
    
        this.vs.style.display = 'block'
        this.hasilPermainan.style.display = 'none'
        this.hasilPermainan.classList.remove(this.#styleHasil)
    }

    //Override
    finalPilihanPlayer(pp) {
        return super.finalPilihanPlayer(pp)
    }

    //Override
    finalPilihanComputer(hasilPC) {
        return super.finalPilihanComputer(hasilPC)
    }

    //Override
    finalPermainan(hasilPilihanPlayer, hasilPilihanComputer) {
        return super.finalPermainan(hasilPilihanPlayer, hasilPilihanComputer)
    }

    //Proses Mencari Pemenang
    methodBermain() {
        this.pilihanPlayer.forEach((pp) => {
            pp.addEventListener('click', () => {
                //Mengembalikan Kondisi Awal Permainan
                this.#kondisiAwal()
                //Memberi Style Pilihan Player 1
                pp.classList.add(this.#stylePilihan)

                //Memberi Animasi Acak Pada Pilihan Computer
                this.#animasiPilihanComputer()

                //Memberi Animasi Hasil Permainan
                setTimeout(() => {
                    //Ambil Pilihan Player dan Computer
                    const hasilPilihanPlayer = this.finalPilihanPlayer(pp)
                    //Mengambil Angka Acak 1-3
                    const hasilPC = Math.floor( Math.random() * pilihanComputer.length + 1 )
                    this.pilihanComputer[hasilPC - 1].classList.add(this.#stylePilihan)
                    
                    //Mencari Pemenang
                    const hasilPilihanComputer = this.finalPilihanComputer(hasilPC)
                    this.finalPermainan(hasilPilihanPlayer, hasilPilihanComputer)

                    this.vs.style.display = 'none'
                    this.hasilPermainan.style.display = 'block'
                    this.hasilPermainan.classList.add(this.#styleHasil)

                },this.#waktuAnimasiSelesai)
            })
        })
    }

    //Mengulang Permainan
    methodUlang() {
        this.ulang.addEventListener('click', (event) => {
            this.#kondisiAwal()
            //Menghentikan Default Action
            event.preventDefault()
        })
    }
}

//Mengambil Element yang dibutuhkan dalam Instansiasi Class
const pilihanPlayer = document.querySelectorAll('.pilihanPlayer')
const pilihanComputer = document.querySelectorAll('.pilihanComputer')

const vs = document.getElementById('vs')
const hasilPermainan = document.getElementById('hasilPermainan')

const textHasilPermainan1 = document.querySelector('#hasilPermainan h1:nth-child(1)')
const textHasilPermainan2 = document.querySelector('#hasilPermainan h1:nth-child(2)')

const cekOpacity = hasilPermainan.classList.contains('bg-opacity-50')

const scorePlayer = document.getElementById('scorePlayer')
const scoreCom = document.getElementById('scoreCom')

const ulang = document.getElementById('ulang')

//Gagal Mengakses Abstract Class

// const aturan = new Aturan({
//     vs, 
//     hasilPermainan, 
//     textHasilPermainan1, 
//     textHasilPermainan2, 
//     cekOpacity
// })

//Instansiasi MulaiPermainan Class
const mulaiPermainan = new MulaiPermainan(
    {
        vs, 
        hasilPermainan, 
        textHasilPermainan1, 
        textHasilPermainan2, 
        cekOpacity,
        scorePlayer,
        scoreCom
    }, 
    {
        pilihanPlayer, 
        pilihanComputer
    }, 
    ulang)

//Memanggil Method dari MulaiPermainan Class
mulaiPermainan.methodBermain()
mulaiPermainan.methodUlang()