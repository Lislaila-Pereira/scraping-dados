import requests
from bs4 import BeautifulSoup

def get_medals():
    # Ler o conteúdo do arquivo HTML
    with open('site.html', 'r', encoding='utf-8') as file:
        response_text = file.read()

    soup = BeautifulSoup(response_text, 'html.parser')
    medals_table = soup.find('table', class_='sc-koXPp dqSZZa')

    pos = []
    paises = []
    bronze = []
    prata = []
    ouro = []
    total_medalhas = []

    # Contador para controlar o número de linhas de dados válidas processadas
    linhas_validas = 0

    for row in medals_table.find_all('tr')[1:]:
        # Ignorar linhas sem dados
        if "sc-eeDRCY fnycLW" in row.get('class', []):
            continue

        columns = row.find_all('td')
        if len(columns) > 1:
            rank = columns[0].text.strip()  # Posição
            pais = columns[1].text.strip()  # Nome do país
            medalha_ouro = columns[2].text.strip() # Medalhas de ouro
            medalha_prata = columns[3].text.strip() # Medalhas de prata
            medalha_bronze = columns[4].text.strip() # Medalhas de bronze
            total = columns[5].text.strip()  # Total de medalhas

            pos.append(rank)
            paises.append(pais)
            ouro.append(medalha_ouro)
            prata.append(medalha_prata)
            bronze.append(medalha_bronze)
            total_medalhas.append(total)
            linhas_validas += 1

        # Parar após coletar dados das primeiras 5 linhas válidas
        if linhas_validas == 5:
            break

    # Dados para enviar para o servidor
    dataset = [
        {"pos": pos[i], "pais": paises[i], "ouro": ouro[i], "prata": prata[i], "bronze": bronze[i], "total": total_medalhas[i]}
        for i in range(len(pos))
    ]

    # Enviando dados para o servidor
    url_server = "http://node-service:3000/dados"
    response_server = requests.post(url_server, json=dataset)

    if response_server.status_code == 200:
        print('Dados enviados com sucesso!')
    else:
        print('Falha ao enviar dados:', response_server.status_code)

if __name__ == '__main__':
    get_medals()
