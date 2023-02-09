| STRIX                                           |   Versão:           1.0 |
|------------------------------------------------|-------------------------|
| Especificação de Caso de Uso: Enviar Treino |   Data:  30/01/2023    |
| UC001                                          |                         |

## Histórico de revisão
|    Data    | Versão |         Descrição         |   Autor   |
|:----------:|:------:|:-------------------------:|:---------:|
| 30/01/2023 | 1.0    | Inclusão dos casos de uso | Israel |

## 1. Breve Descrição
Este caso de uso é utilizado pelo personal trainer para criar o exercício a fim de montar treinos.

## 2. Pré-condições
	1. O personal já estar logado;

## 3. Fluxo Básico de eventos
	1.  O personal seleciona a opção “Exercícios”;
	2.  O sistema apresenta as informações a serem preenchidas para a inclusão de um exercício;
	3.  O personal preenche as informações necessárias e seleciona a opção de Cadastrar exercício; (FA01, FE01)
	4.  O sistema deve salvar o exercício na base de dados.

## 4. Fluxos Alternativos
#### 4.1 Cadastrar Categoria
##### 4.1.1 FA01 - Adicionar nova categoria
	1.  O personal preenche as informações necessárias e seleciona a opção de Cadastrar categoria; (FE01)
	2.  O sistema retorna para o cadastro de exercício com a nova categoria cadastrada;(FE01)

## 5. Fluxos de Exceção
##### 5.1 FE01 – Informações não preenchidas
Nos passos 3.3 e 4.1.1.1 o sistema verifica que não foi preenchida ao menos 1 informação obrigatória e informa ao personal. O sistema retorna ao passo 3.3 ou 4.1.1.1 conforme o local que foi chamado.

## 6. Pós-condições
Ao final desse caso de uso, o sistema deve exibir a lista de exercícios cadastrados.

## 7. Pontos de Extensão
## 8. Requisitos Especiais
## 9. Informações Adicionais