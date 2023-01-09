import * as React from 'react';
import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { setupAPIClient } from '../../services/api';
import { canSSRAuth } from '../../../utils/canSSRAuth';
import { Header } from '../../components/Header';
import { Button } from '../../components/ui/Button';
import Router from 'next/router';
import styles from './styles.module.scss';
import { toast } from 'react-toastify';
import CustomizedInputs from '../../components/ui/StyledInputs/CustomizedInputs';
import { api } from '../../services/apiClient';

export default function ViewExercises({ exercises }) {

  const columns = [
    { field: 'id', headerName: 'ID', width: 90, editable: false },
    {
      field: 'name',
      headerName: 'Nome',
      width: 150,
      editable: false,
    },
    {
      field: 'reps',
      headerName: 'Repetições',
      width: 150,
      editable: false,
    },
    {
      field: 'time',
      headerName: 'Duração',
      width: 150,
      editable: false,
    },
    {
      field: 'observation',
      headerName: 'Observações',
      width: 150,
      editable: false,
    },
    {
      field: 'category_name',
      headerName: 'Categorias',
      width: 150,
      editable: false,
    },
    {
      field: "Editar",
      headerName: "Editar",
      sortable: false,
      width: 150,
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
        return console.log(JSON.stringify(thisRow, null, 4));
        };
  
        return <Button onClick={onClick}>Editar</Button>;
      }
    },
  ];

  function handleRegisterLink(){
    Router.push('/registerExercise');
  }

  return (
    <div className={styles.containerCenter}>
      <Header />
      <p className={styles.titulo}>Meus Exercícios</p>
      <DataGrid
        rows={exercises}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}

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
        }}>
          Adicionar novo exercício
        </Button> 
      </div>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    const apiClient = setupAPIClient(ctx);
    const response = await apiClient.get('/listExercises');
    return {
        props: {
            exercises: response.data
        }
    }
})