const websocket = new WebSocket('ws://localhost:8765')

function formataDolar(item, dataDiv, jsonMoeda) {
    const text = dataDiv.querySelector(`[data-${item}] span`)
    text.textContent = parseFloat(jsonMoeda[item]).toFixed(2).replace('.', ',')
}

function formataSimples(item, dataDiv, jsonMoeda) {
    const text = dataDiv.querySelector(`[data-${item}] span`)
    text.textContent = parseInt(jsonMoeda[item])
}

function incrementaDado(IDMoeda, jsonMoeda) {
    const dataDiv = document.getElementById(IDMoeda);
    // console.log(new Intl.NumberFormat('en', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 })
    //     .format(substituiValor('preco', dataDiv, jsonMoeda)))

    formataSimples('rank', dataDiv, jsonMoeda)
    formataDolar('preco', dataDiv, jsonMoeda)
    formataDolar('capitalização', dataDiv, jsonMoeda)
    formataSimples('fornecimento', dataDiv, jsonMoeda)
    formataDolar('percentualVariado24h', dataDiv, jsonMoeda)


    // substituiValor("historico.join('<br>')", dataDiv, jsonMoeda)


    // const p = dataDiv.querySelector('[data-preco] span')
    // p.textContent = jsonMoeda.preco

    // const rank = DataDiv.querySelector('[data-rank]')
    // rank.textContent += jsonMoeda.rank

}

websocket.onmessage = event => {
    const data = JSON.parse(event.data)

    incrementaDado("bitcoin", data.bitcoin)

    // const bitcoinDataDiv = document.getElementById("bitcoin");

    // const dataRank = bitcoinDataDiv.querySelector('[data-rank]')
    // dataRank.textContent += data.bitcoin.rank

    // bitcoinDataDiv.innerHTML = `
    //     <h2>Bitcoin</h2>
    //     <p>Rank: ${ta.bitcoin.rank}</p>
    //     <p>Preço (USD): ${data.bitcoin.preco}</p>
    //     <p>Capitalização de Mercado (USD): ${data.bitcoin.capitalização}</p>
    //     <p>Fornecimento em Circulação: ${data.bitcoin.fornecimento}</p>
    //     <p>Variação nas últimas 24h: ${data.bitcoin.percentualVariado24h}%</p>
    //     <p>Veja as cotações anteriores dos últimos 5 dias:</p>
    //     <p>${data.bitcoin.historico.join('<br>')}</p>`;

    const ethereumDataDiv = document.getElementById("ethereum");
    ethereumDataDiv.innerHTML = `
        <h2>Ethereum</h2>
        <p>Rank: ${data.ethereum.rank}</p>
        <p>Preço (USD): ${data.ethereum.preco}</p>
        <p>Capitalização de Mercado (USD): ${data.ethereum.capitalização}</p>
        <p>Fornecimento em Circulação: ${data.ethereum.fornecimento}</p>
        <p>Variação nas últimas 24h: ${data.ethereum.percentualVariado24h}%</p>
        <p>Veja as cotações anteriores dos últimos 5 dias:
        <p>${data.ethereum.historico.join('<br>')}`;

    const polygonDataDiv = document.getElementById("matic");
    polygonDataDiv.innerHTML = `
        <h2>Polygon</h2>
        <p>Rank: ${data.polygon.rank}</p>
        <p>Preço (USD): ${data.polygon.preco}</p>
        <p>Capitalização de Mercado (USD): ${data.polygon.capitalização}</p>
        <p>Fornecimento em Circulação: ${data.polygon.fornecimento}</p>
        <p>Variação nas últimas 24h: ${data.polygon.percentualVariado24h}%</p>
        <p>Veja as cotações anteriores dos últimos 5 dias:
        <p>${data.polygon.historico.join('<br>')}`;
}




const moedas = document.querySelectorAll('[data-box]')
const container = document.querySelectorAll('.box')
const btn = document.querySelectorAll('h3')

moedas.forEach(moeda => {
    moeda.addEventListener('click', (el) => {
        let atributesCoin = el.target.dataset.box
        console.log(atributesCoin)

        container.forEach(box => {
            console.log(box.dataset.box)
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