// const websocket = new WebSocket('ws://localhost:8765')

async function puxarDadosAPI() {
    try {
        const response = await fetch('https://joaoarlopes.pythonanywhere.com/');

        if (!response.ok) {
            throw new Error('Erro na resposta da API');
        }

        const data = await response.json();
        // console.log(data)
        atualizaDados(data)

    }
    catch (error) {
        console.error('Erro na requisição:', error);
    }

    setTimeout(puxarDadosAPI, 30000)
}

async function conversorValorMoeda() {
    try {
        const response = await fetch('http://economia.awesomeapi.com.br/json/last/USD-BRL')

        if (!response.ok) {
            throw new Error('Erro na Resposta do conversor')
        }

        const data = await response.json();
        const conversor = data.USDBRL.bid
        return conversor

    } catch (error) {
        console.error('Erro na requisição do conversor:', error);
    }
}


function atualizaDados(data) {
    incrementaDado("bitcoin", data.bitcoin)
    incrementaDado("ethereum", data.ethereum)
    incrementaDado("matic", data.polygon)
}

function incrementaDado(IDMoeda, jsonMoeda) {
    const dataDiv = document.getElementById(IDMoeda);
    // console.log(new Intl.NumberFormat('en', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 })
    //     .format(substituiValor('preco', dataDiv, jsonMoeda)))

    formataRank('rank', dataDiv, jsonMoeda)
    formataDolar('preco', dataDiv, jsonMoeda)
    formataDolar('capitalização', dataDiv, jsonMoeda)
    formataQuantidadeMoedas('fornecimento', dataDiv, jsonMoeda)
    formataPorcentagem('percentualVariado24h', dataDiv, jsonMoeda)

    listaPrecos('historico', dataDiv, jsonMoeda)
}

async function formataDolar(item, dataDiv, jsonMoeda) {
    try {
        const conversor = await conversorValorMoeda();
        const text = dataDiv.querySelector(`[data-${item}] span`)
        text.textContent = parseFloat(conversor * jsonMoeda[item])
            .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    } catch {
        console.error('Erro ao formatar o valor do dólar:', error);
    }
}

function formataPorcentagem(item, dataDiv, jsonMoeda) {
    const text = dataDiv.querySelector(`[data-${item}] span`)
    text.textContent = parseFloat(jsonMoeda[item])
        .toFixed(2)
        .replace('.', ',') + '%'
}

function formataRank(item, dataDiv, jsonMoeda) {
    const text = dataDiv.querySelector(`[data-${item}] span`)
    text.textContent = parseInt(jsonMoeda[item]) + '° lugar'
}

function formataQuantidadeMoedas(item, dataDiv, jsonMoeda) {
    const text = dataDiv.querySelector(`[data-${item}] span`)
    text.textContent = parseInt(jsonMoeda[item]) + ' Moedas'
}

function formataSimples(item, dataDiv, jsonMoeda) {
    const text = dataDiv.querySelector(`[data-${item}] span`)
    text.textContent = parseInt(jsonMoeda[item])
}

async function listaPrecos(item, dataDiv, jsonMoeda) {
    const conversor = await conversorValorMoeda()
    for (i = 0; i < jsonMoeda.historico.length; i++) {
        const text = dataDiv.querySelector(`[data-${item}="${i}"] span`)
        text.textContent = parseFloat(jsonMoeda.historico[i] * conversor)
            .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    }
}

puxarDadosAPI()

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

