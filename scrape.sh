#!/bin/bash

# Baixar o conteúdo da página
wget -O site.html 'https://ge.globo.com/olimpiadas/quadro-de-medalhas-olimpiadas-paris-2024/'

# Executar o script Python para manipular os dados
python3 data_cleaning.py
