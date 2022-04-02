const vs = document.getElementById('vs')
vs.style.display = 'block'

const hasilPermainan = document.getElementById('hasilPermainan')
hasilPermainan.style.display = 'none'

const pilihanPlayer = document.querySelectorAll('.pilihanPlayer')
const pilihanComputer = document.querySelectorAll('.pilihanComputer')

pilihanPlayer.forEach((pp) => {
    pp.addEventListener('click', () => {
        pp.classList.add('pilihan')

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

        setTimeout(() => {
            vs.style.display = 'none'

            const hasil1 = document.querySelector('#hasilPermainan h1:nth-child(1)')
            const hasil2 = document.querySelector('#hasilPermainan h1:nth-child(2)')

            hasil1.innerHTML = 'Player 1'
            hasil2.innerHTML = 'Lose'

            hasilPermainan.style.display = 'block'
            hasilPermainan.classList.add('hasil')
        }, waktu += 100)
    })
});

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
})