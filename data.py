from flask import Flask, jsonify, g
import requests

# Código posto na núvem da pythonanywhere para a API ir para WEB.
# obs: Usei a API da CoinCap em Python para puxar dados das moedas Bitcoin, MATIC e Ethereum e fiz uma API própria
# para puxá-la utilizando Javascript e assim inserir ao Front-End

app = Flask(__name__)
def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
    return response

def obter_dados_moeda(coin):
    link = f'https://api.coincap.io/v2/assets/{coin}'
    url = requests.get(link).json()
    data = url['data']

    nome = data['name']
    simbolo = data['symbol']
    rank = data['rank']
    preco = data['priceUsd']
    capitalizacao = data['marketCapUsd']
    fornecimento = data['supply']
    variacao_percentual_24h = data['changePercent24Hr']

    url_historico = requests.get(f"https://api.coincap.io/v2/assets/{coin}/history?interval=d1&limit=5").json()['data']
    list_historico = [past_price['priceUsd'] for past_price in url_historico[:5]]

    resposta = {
        "nome": nome,
        "simbolo": simbolo,
        "rank": rank,
        "preco": preco,
        "capitalização": capitalizacao,
        "fornecimento": fornecimento,
        "percentualVariado24h": variacao_percentual_24h,
        "historico": list_historico
    }

    return resposta

@app.route('/')
def root():
    # Verifica se já existe um contexto de aplicativo
    if not hasattr(g, 'app_context'):
        g.app_context = app.app_context()

    # Chama a função para obter os dados das moeda
    with app.app_context():
        bitcoin_data = obter_dados_moeda("bitcoin")
        ethereum_data = obter_dados_moeda("ethereum")
        polygon_data = obter_dados_moeda("polygon")

    # Retorno para a API
    resposta = {
        "bitcoin": bitcoin_data,
        "ethereum": ethereum_data,
        "polygon": polygon_data
    }
    print(resposta)
    return jsonify(resposta)

if __name__ == '__main__':
    app.run()