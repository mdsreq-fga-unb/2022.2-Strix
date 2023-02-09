| STRIX                                           |   Versão:           1.0 |
|------------------------------------------------|-------------------------|
| Especificação de Caso de Uso: Visualizar Aluno |   Data:  31/01/2023     |

## Histórico de revisão
|    Data    | Versão |         Descrição         |   Autor   |
|:----------:|:------:|:-------------------------:|:---------:|
| 31/01/2023 | 1.0    | Inclusão dos casos de uso | Guilherme |

## 1. Breve Descrição
Esse caso de uso consiste na visualização dos alunos do personal, apenas usuários autenticados podem executar este caso de uso, o ator pertencente ao caso de uso é o personal.

## 2. Pré-condições
	1. O personal já estar logado;
	2. Já existe ao menos UM aluno cadastrado.

## 3. Fluxo Básico de eventos
	1. O caso de uso se inicia quando o personal decide visualizar os alunos cadastrados;
	2. O sistema exibe um menu de opções;
	3. O personal seleciona a opção “Alunos” no menu;
	4. O sistema exibe os alunos cadastrados para a visualização (FA01 e FA02);
	5. O caso de uso se encerra;

## 4. Fluxos Alternativos
##### FA01 - Editar Alunos
	1. O personal seleciona a opção de editar o aluno;
	2. O sistema apresenta as informações a serem editadas;
	3. O personal informa as informações a serem editadas;
	4. O personal salva as informações;
	5. Retorna ao passo 5 do fluxo básico
###### FA02 - Excluir alunos
	1.  O personal seleciona a opção de excluir o aluno
	2.  O sistema exibe uma opção de confirmar exclusão do aluno;
	3.  O personal seleciona em confirmar exclusão 
	4.  Retorna ao passo 5 do fluxo básico.

## 5. Fluxos de Exceção
Não será possível entrar em um fluxo de exceção pois uma pré-condição é ter pelo menos um aluno cadastrado, o único fluxo alternativo seria caso não tivesse um aluno cadastrado e o sistema retornará uma lista vazia.

## 6. Pós Condições
Ao final desse caso de uso, o personal será capaz de visualizar os alunos cadastrados no sistema com a finalidade de editar os alunos caso necessário ou gerenciar a quantidade.

## 7. Pontos de Extensão
## 8. Requisitos Especiais
## 9. Informações Adicionais
