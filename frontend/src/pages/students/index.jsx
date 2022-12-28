import * as React from 'react';
import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { setupAPIClient } from '../../services/api';
import { canSSRAuth } from '../../../utils/canSSRAuth';
//import Button from '@mui/material/Button';
import { Header } from '../../components/Header';
import { Button } from '../../components/ui/Button';
import Router from 'next/router';
import styles from './styles.module.scss';

const columns = [
  { field: 'id', headerName: 'ID', width: 90, editable: false },
  {
    field: 'name',
    headerName: 'Name',
    width: 150,
    editable: false,
  },
  {
    field: 'cpf',
    headerName: 'CPF',
    width: 150,
    editable: false,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 150,
    editable: false,
  },
  {
    field: 'birthDate',
    headerName: 'Data de Nascimento',
    width: 150,
    editable: false,
  },
  {
    field: 'phone',
    headerName: 'Telefone',
    width: 150,
    editable: false,
  },
  {
    field: "Editar",
    headerName: "Editar",
    sortable: false,
    width: 130,
    disableClickEventBubbling: true,
    renderCell: () => {
      return (
        <Button >
          Editar
        </Button>
      );
    }
  },
  {
    field: "Excluir",
    headerName: "Excluir",
    sortable: false,
    width: 130,
    disableClickEventBubbling: true,
    renderCell: () => {
      return (
        <Button style={{ backgroundColor: 'var(--red-700)' }}>
          Delete
        </Button>
      );
    }
  }
];

export default function Students({ students }) {
  const[studentItem, setStudentItem] = useState('');

  const handleOnCellClick = (params) => {
      setStudentItem(params)
      // console.log(studentItem &&
      //     `Final clicked: id = ${studentItem.id}, Campo = ${studentItem.field}, valor do campo selecionado: ${studentItem.value}`)
  }

  function handleLink(){
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
        //checkboxSelection
        onCellClick={handleOnCellClick}

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
        <Button onClick={handleLink} style={{ 
          backgroundColor: '#3A62AF',
          height: '60px',
          width: '400px',
          fontSize: '20px',
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



// {/* <p>{studentItem &&
//     `Último Campo Selecionado: id = ${studentItem.id}, Campo = ${studentItem.field}, valor: ${studentItem.value}`}</p> */}
// {/* {studentItem &&
//     `Último Campo Selecionado: id = ${studentItem.id}, Campo = ${studentItem.field}, valor: ${studentItem.value}`}
//   {!studentItem && `Clique em uma coluna`} */}
 
