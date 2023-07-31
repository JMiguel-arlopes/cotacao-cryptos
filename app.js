// const websocket = new WebSocket('ws://localhost:8765')


async function puxarDadosAPI() {
    const response = await fetch('https://joaoarlopes.pythonanywhere.com/');

    if (!response.ok) {
        throw new Error('Erro na resposta da API');
    }

    const data = await response.json();
    console.log(data);
}

puxarDadosAPI();



// function formataDolar(item, dataDiv, jsonMoeda) {
//     const text = dataDiv.querySelector(`[data-${item}] span`)
//     text.textContent = parseFloat(jsonMoeda[item]).toFixed(2).replace('.', ',')
// }

// function formataSimples(item, dataDiv, jsonMoeda) {
//     const text = dataDiv.querySelector(`[data-${item}] span`)
//     text.textContent = parseInt(jsonMoeda[item])
// }

// function listaPrecos(item, dataDiv, jsonMoeda) {
//     for (i = 0; i < jsonMoeda.historico.length; i++) {
//         const text = dataDiv.querySelector(`[data-${item}="${i}"] span`)
//         text.textContent = jsonMoeda.historico[i]
//     }
// }

// function incrementaDado(IDMoeda, jsonMoeda) {
//     const dataDiv = document.getElementById(IDMoeda);
//     // console.log(new Intl.NumberFormat('en', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 })
//     //     .format(substituiValor('preco', dataDiv, jsonMoeda)))

//     formataSimples('rank', dataDiv, jsonMoeda)
//     formataDolar('preco', dataDiv, jsonMoeda)
//     formataDolar('capitalização', dataDiv, jsonMoeda)
//     formataSimples('fornecimento', dataDiv, jsonMoeda)
//     formataDolar('percentualVariado24h', dataDiv, jsonMoeda)

//     listaPrecos('historico', dataDiv, jsonMoeda)

// }

// websocket.onmessage = event => {
//     const data = JSON.parse(event.data)

//     incrementaDado("bitcoin", data.bitcoin)
//     incrementaDado("ethereum", data.ethereum)
//     incrementaDado("matic", data.polygon)

//     for (let i = 0; i < data.bitcoin.historico.length; i++) {
//         console.log(data.bitcoin.historico[i])
//     }
// }




const moedas = document.querySelectorAll('[data-box]')
const container = document.querySelectorAll('.box')
const btn = document.querySelectorAll('h3')

moedas.forEach(moeda => {
    moeda.addEventListener('click', (el) => {
        const atributesCoin = el.target.dataset.box

        container.forEach(box => {
            if (atributesCoin === box.dataset.box) {
                box.classList.add('active')
            } else {
                box.classList.remove('active')
            }
        })
        btn.forEach(el => el.classList.remove('active'))
        el.target.classList.add('active')
    })
})