const websocket = new WebSocket('ws://localhost:8765')

websocket.onmessage = event => {
    const data = JSON.parse(event.data)
    // console.log(data)

    const bitcoinDataDiv = document.getElementById("bitcoin");
    bitcoinDataDiv.innerHTML = `
        <h2>Bitcoin</h2>
        <p>Rank: ${data.bitcoin.rank}</p>
        <p>Preço (USD): ${data.bitcoin.preco}</p>
        <p>Capitalização de Mercado (USD): ${data.bitcoin.capitalização}</p>
        <p>Fornecimento em Circulação: ${data.bitcoin.fornecimento}</p>
        <p>Variação nas últimas 24h: ${data.bitcoin.percentualVariado24h}%</p>
        <p>Veja as cotações anteriores dos últimos 5 dias:
        <p>${data.bitcoin.historico.join('<br>')}`;

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