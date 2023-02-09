| STRIX                                           |   Versão:           1.0 |
|------------------------------------------------|-------------------------|
| Especificação de Caso de Uso: Enviar Treino |   Data:  25/01/2023    |

## Histórico de revisão
|    Data    | Versão |         Descrição         |   Autor   |
|:----------:|:------:|:-------------------------:|:---------:|
| 25/01/2023 | 1.0    | Inclusão dos casos de uso | Beatriz |

## 1. Breve Descrição
Este caso de uso é utilizado pelo personal trainer para criar o treino a fim de enviá-lo ao final.

## 2. Pré-condições
	1. O personal já estar logado;
	2. Já existe ao menos 1 (um) exercício cadastrado;
	3. Já existe ao menos 1 (um) aluno cadastrado.

## 3. Fluxo Básico de eventos
	1.  O personal seleciona a opção “criar treino”; (FA01, FA02)
	2.  O sistema apresenta as informações a serem preenchidas para a inclusão de um treino;
	3.  O personal preenche as informações necessárias e seleciona a opção de enviar o treino; (FE01)
	4.  O sistema exibe os alunos cadastrados para a seleção;
	5.  O personal seleciona o aluno desejado e clica em enviar; (FE02)
	6.  O sistema envia ao email do aluno selecionado e exibe mensagem de confirmação; (FA03)
	7.  O sistema deve salvar o treino na base de dados.

## 4. Fluxos Alternativos
#### 4.1 Criar Treino
##### 4.1.1 FA01 - Editar Treino
	1.  O personal seleciona a opção de editar determinado treino;
	2.  O sistema apresenta as informações a serem editadas;
	3.  O personal altera as informações e seleciona a opção de salvar o treino; (FE01)
##### 4.1.1.1 FA02 - Excluir Treino
	1.  O personal seleciona o treino desejado;
	2.  O sistema apresenta as informações do treino;
	3.  O personal seleciona a opção “excluir”;
	4.  O sistema apresenta uma tela para confirmação de exclusão;
	5.  O personal conforma a exclusão;
#### 4.2 Enviar Treino
##### 4.2.1 FA03 - Enviar Treino Existente
	1.  O personal seleciona a opção de enviar o treino desejado;
	2.  O sistema exibe a lista de alunos cadastrados;
	3.  O personal seleciona o aluno desejado; (FE02)

## 5. Fluxos de Exceção
##### 5.1 FE01 - Nenhum Exercício Selecionado
Nos passos 3.3 e 4.1.1.3 o sistema verifica que não foi feita a seleção de ao menos 1 exercício no treino e informa ao personal. O sistema retorna ao passo 3.3 ou 4.1.1.3 conforme o local que foi chamado.
##### 5.2 FE02 - Nenhum Aluno Selecionado
No passo 3.5 e 4.2.1.3 o sistema verifica que não foi feita a seleção de ao menos 1 aluno para o envio do treino e informa ao personal. O sistema retorna ao passo 3.5 ou 4.2.1.3 conforme o local que foi chamado.

## 6. Pós-condições
Ao final desse caso de uso, o treino deve ter sido enviado ao email do aluno com o objetivo de informar as séries de exercícios a serem realizadas por ele.

## 7. Pontos de Extensão
## 8. Requisitos Especiais
## 9. Informações Adicionais
