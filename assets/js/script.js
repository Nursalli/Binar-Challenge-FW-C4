class Aturan {

}

class MulaiPermainan {
    #stylePilihan = 'pilihan'
    #styleHasil = 'hasil'
    #waktuAnimasiMulai = 100
    #waktuAnimasiSelesai = 1300
    #hasilPP

    //Menampilkan Hasil Permainan
    vs = document.getElementById('vs')
    hasilPermainan = document.getElementById('hasilPermainan')

    //Logika Aturan Permainan

    //Cek Style Selain Draw
    cekOpacity = hasilPermainan.classList.contains('bg-opacity-50')

    hasil1 = document.querySelector('#hasilPermainan h1:nth-child(1)')
    hasil2 = document.querySelector('#hasilPermainan h1:nth-child(2)')

    ulang = document.getElementById('ulang')

    constructor(pilihanPlayer, pilihanComputer){
        this.pilihanPlayer = pilihanPlayer
        this.pilihanComputer = pilihanComputer
    }

    #animasiPilihanComputer() {
        let waktu = this.#waktuAnimasiMulai
        for(let i = 0; i < this.pilihanComputer.length; i++){
            setTimeout(() => {
                this.pilihanComputer[i].classList.add(this.#stylePilihan)
            }, waktu)

            for(let i = 0; i < this.pilihanComputer.length; i++){
                waktu += 100
                setTimeout(() => {
                    this.pilihanComputer[i].classList.remove(this.#stylePilihan)
                }, waktu)
            }
        }
    }

    #hasilPilihanComputer(hasilPC) {
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
    
    #hasilPilihanPlayer(pp) {
        return pp.getAttribute('id')
    }

    #hasilPertandingan(hasilPP, hasilPC){
        if(hasilPP == hasilPC){
            this.hasil1.style.display = 'none'
            this.hasil2.innerHTML = 'Draw'
            this.hasilPermainan.classList.remove('bg-opacity-50')
        } else if(hasilPP == 'batu') {
            if (hasilPC == 'gunting') {
                this.hasil1.style.display = 'block'
                this.hasil1.innerHTML = 'PLAYER 1' 
                this.hasil2.innerHTML = 'Win'

                if (!this.cekOpacity) this.hasilPermainan.classList.add('bg-opacity-50')
            } else {
                this.hasil1.style.display = 'block'
                this.hasil1.innerHTML = 'COM'
                this.hasil2.innerHTML = 'Win'

                if (!this.cekOpacity) this.hasilPermainan.classList.add('bg-opacity-50')
            }
        } else if(hasilPP == 'gunting'){
            if (hasilPC == 'batu') {
                this.hasil1.style.display = 'block'
                this.hasil1.innerHTML = 'COM'
                this.hasil2.innerHTML = 'Win'

                if (!this.cekOpacity) this.hasilPermainan.classList.add('bg-opacity-50')
            } else{
                this.hasil1.style.display = 'block'
                this.hasil1.innerHTML = 'PLAYER 1'
                this.hasil2.innerHTML = 'Win'
                
                if (!this.cekOpacity) this.hasilPermainan.classList.add('bg-opacity-50')
            }
        } else if(hasilPP == 'kertas'){
            if (hasilPC == 'batu') {
                this.hasil1.style.display = 'block'
                this.hasil1.innerHTML = 'PLAYER 1'
                this.hasil2.innerHTML = 'Win'

                if (!this.cekOpacity) this.hasilPermainan.classList.add('bg-opacity-50')
            } else {
                this.hasil1.style.display = 'block'
                this.hasil1.innerHTML = 'COM'
                this.hasil2.innerHTML = 'Win'

                if (!this.cekOpacity) this.hasilPermainan.classList.add('bg-opacity-50')
            }
        } else {
            return 'error'
        }
    }

    bertanding() {
        this.pilihanPlayer.forEach((pp) => {
            pp.addEventListener('click', () => {
                //Memberi Style Pilihan Player 1
                pp.classList.add(this.#stylePilihan)

                //Memberi Animasi Acak Pada Pilihan Computer
                this.#animasiPilihanComputer()

                //Memberi Animasi Hasil Permainan
                setTimeout(() => {
                    //Ambil Pilihan Player dan Computer
                    let hasilPilihanPlayer = this.#hasilPilihanPlayer(pp)
                    let hasilPC = Math.floor( Math.random() * pilihanComputer.length + 1 )
                    this.pilihanComputer[hasilPC - 1].classList.add(this.#stylePilihan)
                    
                    let hasilPilihanComputer = this.#hasilPilihanComputer(hasilPC)
                    this.#hasilPertandingan(hasilPilihanPlayer, hasilPilihanComputer)

                    this.vs.style.display = 'none'
                    this.hasilPermainan.style.display = 'block'
                    this.hasilPermainan.classList.add(this.#styleHasil)

                },this.#waktuAnimasiSelesai)
            })
        })
    }

    kembali() {
        this.ulang.addEventListener('click', () => {
            this.pilihanPlayer.forEach((pp) => {
                pp.classList.remove(this.#stylePilihan)
            });
        
            this.pilihanComputer.forEach((pc) => {
                pc.classList.remove(this.#stylePilihan)
            });
        
            this.vs.style.display = 'block'
            this.hasilPermainan.style.display = 'none'
            this.hasilPermainan.classList.remove(this.#styleHasil)
        })
    }
}

const pilihanPlayer = document.querySelectorAll('.pilihanPlayer')
const pilihanComputer = document.querySelectorAll('.pilihanComputer')

const mulaiPermainan = new MulaiPermainan(pilihanPlayer, pilihanComputer)

mulaiPermainan.bertanding()
mulaiPermainan.kembali()