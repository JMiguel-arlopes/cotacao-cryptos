// interação com botões
const moedas = document.querySelectorAll('[data-box]')
const container = document.querySelectorAll('.box')
const btn = document.querySelectorAll('h3')

moedas.forEach(moeda => {
    moeda.addEventListener('click', (el) => {
        const atributesCoin = el.target.dataset.box

        if (!atributesCoin) return;

        container.forEach(box => {
            if (atributesCoin == box.dataset.box) {
                box.classList.add('active')
            } else {
                box.classList.remove('active')
            }
        })
        btn.forEach(el => el.classList.remove('active'))
        el.target.classList.add('active')
    })
})