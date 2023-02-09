import * as React from 'react';
import { useContext } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { setupAPIClient } from '../../services/api';
import { canSSRAuth } from '../../../utils/canSSRAuth';
import { Header } from '../../components/Header';
import { Button } from '../../components/ui/Button';
import Router from 'next/router';
import styles from './styles.module.scss';
import { AuthContext } from '../../contexts/AuthContext';

export default function Students({ students }) {
  const { studentIdState } = useContext(AuthContext);

  const columns = [
    { field: 'id', headerName: 'ID', width: 90, editable: false },
    {
      field: 'name',
      headerName: 'Nome',
      width: 170,
      editable: false,
    },
    {
      field: 'cpf',
      headerName: 'CPF',
      width: 170,
      editable: false,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 170,
      editable: false,
    },
    {
      field: 'birthDate',
      headerName: 'Data de Nascimento',
      width: 170,
      editable: false,
    },
    {
      field: 'phone',
      headerName: 'Telefone',
      width: 170,
      editable: false,
    },
    {
      field: "Editar",
      headerName: "Editar",
      sortable: false,
      width: 122,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation();
  
          const api = params.api;
          const thisRow = {};
  
          api
            .getAllColumns()
            .filter((c) => c.field !== '__check__' && !!c)
            .forEach(
              (c) => (thisRow[c.field] = params.getValue(params.id, c.field)),
            );
          let id = thisRow.id;
          studentIdState(id);
          Router.push('/editStudent');
          return console.log(JSON.stringify(thisRow, null, 4));
        };
  
        return <Button onClick={onClick}>Editar</Button>;
      }
    },
  ];

  function handleRegisterLink(){
    Router.push('/registerStudent');
  }

  return (
    <div className={styles.containerCenter}>
      <Header />
      <p className={styles.titulo}>Meus alunos</p>
      <DataGrid
        rows={students}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        columnVisibilityModel={{ // Para esconder a coluna id
            id: false
          } 
        }

        //components={{ Toolbar: GridToolbar }}

        sx={{
          height: 400,
          backgroundColor: 'transparent',
          color: '#FFF',
          border: 0,
          borderRadius: '10px',
          '& .MuiDataGrid-cell:hover': {
            color: '#48577E',
            backgroundColor: '#3AAFA1;'
          },
          '& .MuiDataGrid-row:hover': {
            backgroundColor: '#3AAFA1',
            color: '#FFF'
          },
          '& .MuiDataGrid-row': {
            background: '#3AAFA1',
          }
        }}
      />
        <Button onClick={handleRegisterLink} style={{ 
          backgroundColor: '#3A62AF',
          height: '60px',
          width: '480px',
          fontSize: '20px',
          marginBottom: '50px'
        }}>
          Adicionar novo aluno
        </Button> 
      </div>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    const apiClient = setupAPIClient(ctx);
    const response = await apiClient.get('/listStudents');
    return {
        props: {
            students: response.data
        }
    }
})

/*
  - A propriedade columnVisibilityModel permite definir quais colunas estarão visíveis ou não. Contudo,
ela trava a funcionalidade de Show columns que nos permitia escolher quais colunas estariam visíveis dinamicamente, em tempo de execução, e tb a propriedade hide, que nos permitia esconder uma coluna.
  - Set the column visibility model of the grid. If defined, the grid will ignore the hide property in [[GridColDef]].
*/