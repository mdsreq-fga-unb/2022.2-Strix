| STRIX                                           |   Versão:           1.0 |
|------------------------------------------------|-------------------------|
| Especificação de Caso de Uso: Adicionar Pendência |   Data:  30/01/2023  |
| UC001                                          |                         |

## Histórico de revisão
|    Data    | Versão |         Descrição         |   Autor   |
|:----------:|:------:|:-------------------------:|:---------:|
| 30/01/2023 | 1.0    | Inclusão dos casos de uso | Pedro Daia |

## 1. Breve Descrição
Neste caso de uso, o usuário (Personal Trainer) registra uma pendência relacionada a algum de seus alunos, para ter o controle de dívidas.

## 2. Pré-condições
	1. O personal já estar logado;
	2. Já existe ao menos 1 (um) aluno cadastrado.

## 3. Fluxo Básico de eventos
	1.  O personal, de dentro da página de finanças, clica no botão “Adicionar Nova Pendência” (FA01, FA02)
	2.  O sistema abre um formulário, com um dropdown para seleção do aluno relacionado a nova pendência, um campo para informar o valor da pendência, e um campo para informar a descrição;
	3.  O personal preenche o formulário selecionando o aluno e informando o valor e descrição da pendência, e clica no botão enviar pendência; (FE01, FE02, FE03, FE04)
	4.  O sistema salva os dados na base de dados, apresenta mensagem de confirmação, e redireciona o Personal para a página de finanças.

## 4. Fluxos Alternativos
##### FA01 - Editar Pendência
	1.  O personal, de dentro da página finanças, seleciona um aluno da lista exibida e clica no botão Visualizar;
	2.  O sistema apresenta todas as pendências relacionadas a aquele aluno;
	3.  O personal seleciona a pendência e clica no botão Editar;
	4.  O sistema apresenta formulário com o valor e a descrição atual da pendência, permitindo alteração;
	5.  O personal altera as informações desejadas e clica em Salvar; (FA02)
	6.  O sistema registra as alterações na base de dados, apresenta mensagem de confirmação, e redireciona para a página de finanças.
##### FA02 - Excluir Pendência
	1.  O personal, dentro da página de finanças, seleciona um aluno da lista exibida e clica no botão Visualizar;
	2.  O sistema apresenta todas as pendências relacionadas a aquele aluno;
	3.  O personal seleciona a pendência e clica no botão Editar;
	4.  O sistema apresenta formulário com o valor e a descrição atual da pendência, permitindo alteração;
	5.  O personal clica no botão Excluir; (FA01)
	6.  O sistema registra a exclusão da pendência da base de dados, apresenta mensagem de confirmação, e redireciona para a página de finanças.


## 5. Fluxos de Exceção
##### FE01 - Nenhum Aluno Selecionado
Após o passo 3, ao tentar salvar a pendência na base de dados, o sistema verifica a ausência da seleção de alunos, e exibe uma mensagem de erro pedindo que todos os campos sejam preenchidos. O sistema retorna ao passo 3.
##### FE02 - Nenhum Valor Informado
Após o passo 3, ao tentar salvar a pendência na base de dados, o sistema verifica que não foi informado nenhum valor para a pendência, e exibe uma mensagem de erro pedindo que todos os campos sejam preenchidos. O sistema retorna ao passo 3.
##### FE03 - Valor informado incorretamente
Após o passo 3, ao tentar salvar a pendência na base de dados, o sistema verifica que o valor informado não está no formato correto de número (tanto inteiro quanto ponto flutuante), e exibe uma mensagem de erro pedindo que informe um valor válido. O sistema retorna ao passo 3.
##### FE04 - Nenhuma descrição informada
Após o passo 3, ao tentar salvar a pendência na base de dados, o sistema verifica que não foi informado nenhuma descrição para a pendência, e exibe uma mensagem de erro pedindo que todos os campos sejam preenchidos. O sistema retorna ao passo 3.

## 6. Pós-condições
Ao final desse caso de uso, a pendência deve ser registrada de acordo com os dados que foram informados pelo personal, relacionadas ao aluno escolhido, com a finalidade de ter o controle de dívidas de todos os alunos.

## 7. Pontos de Extensão
## 8. Requisitos Especiais
## 9. Informações Adicionais