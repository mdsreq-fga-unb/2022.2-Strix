import * as React from 'react';
import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { setupAPIClient } from '../../services/api';
import { canSSRAuth } from '../../../utils/canSSRAuth';
import Button from '@mui/material/Button';



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
    field: "edit",
    headerName: "Edit",
    sortable: false,
    width: 130,
    disableClickEventBubbling: true,
    renderCell: () => {
      return (
        <Button variant="contained" color="primary">
          Edit
        </Button>
      );
    }
  },
  {
    field: "delete",
    headerName: "Delete",
    sortable: false,
    width: 130,
    disableClickEventBubbling: true,
    renderCell: () => {
      return (
        <Button
          variant="contained"
          color="secondary"
        >
          Delete
        </Button>
      );
    }
  }
];

export default function Teste({ students }) {
  const[studentItem, setStudentItem] = useState('');

    const handleOnCellClick = (params) => {
        setStudentItem(params)
        // console.log(studentItem &&
        //     `Final clicked: id = ${studentItem.id}, Campo = ${studentItem.field}, valor do campo selecionado: ${studentItem.value}`)
    }

  return (
    <>
    <h1>Lista de alunos</h1>
    <div style={{ 
        height: 400, 
        width: '90%', 
        background: '#fff' , 
        backgroundColor: '#fff', 
        margin: '3rem auto', 
        padding: '1rem', 
        borderRadius: '5px'
    }}>
      <DataGrid
        rows={students}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        //checkboxSelection
        onCellClick={handleOnCellClick}
      />
    </div>
    <p>{studentItem &&
        `Último Campo Selecionado: id = ${studentItem.id}, Campo = ${studentItem.field}, valor: ${studentItem.value}`}</p>
    {/* {studentItem &&
        `Último Campo Selecionado: id = ${studentItem.id}, Campo = ${studentItem.field}, valor: ${studentItem.value}`}
      {!studentItem && `Clique em uma coluna`} */}
    </>
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