//Kondisi Awal vs dan Hasil Permainan
const vs = document.getElementById('vs')
vs.style.display = 'block'

const hasilPermainan = document.getElementById('hasilPermainan')
hasilPermainan.style.display = 'none'

const pilihanPlayer = document.querySelectorAll('.pilihanPlayer')
const pilihanComputer = document.querySelectorAll('.pilihanComputer')

pilihanPlayer.forEach((pp) => {
    pp.addEventListener('click', () => {
        //Memberi Style Pilihan Player 1
        pp.classList.add('pilihan')
        
        //Memberi Animasi Acak Pada Pilihan Computer
        let waktu = 100;
        for(let i = 0; i < pilihanComputer.length; i++){
            setTimeout(() => {
                pilihanComputer[i].classList.add('pilihan')
            }, waktu)

            for(let i = 0; i < pilihanComputer.length; i++){
                waktu += 100
                setTimeout(() => {
                    pilihanComputer[i].classList.remove('pilihan')
                }, waktu)
            }
        }

        //Memberi Animasi Hasil Permainan
        setTimeout(() => {
            //Ambil Pilihan Player dan Computer
            const hasilPP = pp.getAttribute('id')
            let hasilPC = Math.floor( Math.random() * pilihanComputer.length + 1 )

            pilihanComputer[hasilPC - 1].classList.add('pilihan')

            //Mencari Pilihan Computer
            switch(hasilPC){
                case 1:
                    hasilPC = 'batu'
                    break
                case 2:
                    hasilPC = 'kertas'
                    break
                case 3:
                    hasilPC = 'gunting'
                    break
                default:
                    hasilPC = 'Error'
                    break
            }

            //Menampilkan Hasil Permainan
            const vs = document.getElementById('vs')
            const hasilPermainan = document.getElementById('hasilPermainan')

            //Logika Aturan Permainan

            //Cek Style Selain Draw
            const cekOpacity = hasilPermainan.classList.contains('bg-opacity-50')

            const hasil1 = document.querySelector('#hasilPermainan h1:nth-child(1)')
            const hasil2 = document.querySelector('#hasilPermainan h1:nth-child(2)')
            

            if(hasilPP == hasilPC){
                hasil1.style.display = 'none'
                hasil2.innerHTML = 'Draw'
                hasilPermainan.classList.remove('bg-opacity-50')
            } else if(hasilPP == 'batu') {
                if (hasilPC == 'gunting') {
                    hasil1.style.display = 'block'
                    hasil1.innerHTML = 'PLAYER 1' 
                    hasil2.innerHTML = 'Win'

                    if (!cekOpacity) hasilPermainan.classList.add('bg-opacity-50')
                } else {
                    hasil1.style.display = 'block'
                    hasil1.innerHTML = 'COM'
                    hasil2.innerHTML = 'Win'

                    if (!cekOpacity) hasilPermainan.classList.add('bg-opacity-50')
                }
            } else if(hasilPP == 'gunting'){
                if (hasilPC == 'batu') {
                    hasil1.style.display = 'block'
                    hasil1.innerHTML = 'COM'
                    hasil2.innerHTML = 'Win'

                    if (!cekOpacity) hasilPermainan.classList.add('bg-opacity-50')
                } else{
                    hasil1.style.display = 'block'
                    hasil1.innerHTML = 'PLAYER 1'
                    hasil2.innerHTML = 'Win'
                    
                    if (!cekOpacity) hasilPermainan.classList.add('bg-opacity-50')
                }
            } else if(hasilPP == 'kertas'){
                if (hasilPC == 'batu') {
                    hasil1.style.display = 'block'
                    hasil1.innerHTML = 'PLAYER 1'
                    hasil2.innerHTML = 'Win'

                    if (!cekOpacity) hasilPermainan.classList.add('bg-opacity-50')
                } else {
                    hasil1.style.display = 'block'
                    hasil1.innerHTML = 'COM'
                    hasil2.innerHTML = 'Win'

                    if (!cekOpacity) hasilPermainan.classList.add('bg-opacity-50')
                }
            } else {
                return 'error'
            }

            vs.style.display = 'none'
            hasilPermainan.style.display = 'block'
            hasilPermainan.classList.add('hasil')
        }, waktu += 100)
    })
});

//Mengembalikan Kondisi Semula
const refresh = document.getElementById('ulang')

refresh.addEventListener('click', () => {
    pilihanPlayer.forEach((pp) => {
        pp.classList.remove('pilihan')
    });

    pilihanComputer.forEach((pc) => {
        pc.classList.remove('pilihan')
    });

    vs.style.display = 'block'
    hasilPermainan.style.display = 'none'
    hasilPermainan.classList.remove('hasil')
})