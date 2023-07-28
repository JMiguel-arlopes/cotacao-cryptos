import requests
import json
import asyncio
import websockets


def main():
    # inicializa o servidor WebSocket na porta 8765
    start_server = websockets.serve(enviar_dados, "localhost", 8765)
    asyncio.get_event_loop().run_until_complete(start_server)
    asyncio.get_event_loop().run_forever()


async def enviar_dados(websockets, _):

    while True:
        #obtém os dados atualizados da moeda
        bitcoin_data = crypto_data("bitcoin")
        ethereum_data = crypto_data("ethereum")
        polygon_data = crypto_data("polygon")

        # construir um dicionário para enviar ao Front 
        data = {
            "bitcoin": bitcoin_data,
            "ethereum": ethereum_data,
            "polygon": polygon_data
        }

        await websockets.send(json.dumps(data))

        # aguarda um intervalo de tempo para reiniciar o looping
        await asyncio.sleep(5)

    
# ideia: mostre a variação

# bitcoin_realTime = requests.get('https://economia.awesomeapi.com.br/json/last/BTC-BRL').json()
# bitcoin_preco_realTime = bitcoin_realTime["BTCBRL"]["bid"]
# print(f"a cotação atual do Bitcoin é R${bitcoin_preco_realTime},00")

# bitcoin_past = requests.get('https://economia.awesomeapi.com.br/BTC-BRL/5').json()

# for artigos in bitcoin_past:
#     position = bitcoin_past.index(artigos) + 1
#     cotacao = artigos["bid"]
    # print(f"A {position} cotação atrás, o BitCoin custava R${cotacao},00")

def crypto_data(coin):
    # Inserindo dados atuais da moeda
    url = requests.get(f'https://api.coincap.io/v2/assets/{coin}').json()

    data = url['data']
    
    nome = data['name']
    simbolo = data['symbol']
    rank = data['rank']
    preco = data['priceUsd']
    capitalizacao = data['marketCapUsd']
    fornecimento = data['supply']
    variacao_percentual_24h = data['changePercent24Hr']
    print( variacao_percentual_24h)

    # return {
    #     "nome": nome,
    #     "simbolo": simbolo,
    #     "rank": rank,
    #     "preco": preco, 
    #     "capitalização": capitalizacao,
    #     "fornecimento": fornecimento,
    #     "percentualVariado24h": variacao_percentual_24h 
    # }

    # print(f"\nA {nome}, com símbolo de {simbolo}, está em {rank}° lugar no rank")
    # print(f"Seu preço atual é US${preco}")
    # print(f"Sua capitalização de mercado é US${capitalizacao}")
    # print(f"A Quantidade total de {nome}'s em circulação no mercado é {fornecimento}")
    # print(f"A variação no preço da {nome} nas ultimas 24h é de {variacao_percentual_24h}%")

    # inserindo histórico dos ultimos 5 dias da moeda
    url_historico = requests.get(f"https://api.coincap.io/v2/assets/{coin}/history?interval=d1&limit=5").json()['data']

    # print("\nVeja o Histórico de Preços da Moedas nos ultimos 5 dias:")
    list_historico = []
    for past_price in url_historico[:5]:
        list_historico.append(past_price['priceUsd'])
        # historico_data = past_price['date']
        # historico_timestamp = past_price['time']

    return {
        "nome": nome,
        "simbolo": simbolo,
        "rank": rank,
        "preco": preco, 
        "capitalização": capitalizacao,
        "fornecimento": fornecimento,
        "percentualVariado24h": variacao_percentual_24h,
        "historico": list_historico
    }
        # print(f"\nA moeda custava US${historico_preco} no dia {historico_data}")
        # print(f"O timestamp era {historico_timestamp}seg")

main()
# crypto_data("bitcoin")
# crypto_data("ethereum")
# crypto_data("polygon")

