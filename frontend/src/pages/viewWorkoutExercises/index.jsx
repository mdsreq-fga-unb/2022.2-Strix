import * as React from 'react';
import { useContext, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { setupAPIClient } from '../../services/api';
import { canSSRAuth } from '../../../utils/canSSRAuth';
import { Header } from '../../components/Header';
import { Button } from '../../components/ui/Button';

import styles from './styles.module.scss';
import { AuthContext } from '../../contexts/AuthContext';
import { useState } from 'react';

export default function viewWorkoutExercises({ exercises }) {
  const { listIdExercise } = useContext(AuthContext);
  const [state, setState] = useState([]);

  useEffect(() => {
    let new_arr = [];
    for (let a = 0; a < exercises.length; a++){
        for (let b = 0; b < listIdExercise.length; b++){
            if(exercises[a].id === listIdExercise[b]){
                new_arr.push(exercises[a]);
                //setState([...state, exercises[a]])
            }
        }
    }
    new_arr && setState(new_arr)
  }, [])

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
      headerName: 'Categoria',
      width: 150,
      editable: false,
    },
    {
      field: "Editar",
      headerName: "Editar",
      sortable: false,
      width: 130,
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
          //return console.log(JSON.stringify(thisRow, null, 4));
        };
  
        return <Button onClick={onClick}>Editar</Button>;
      }
    },
  ];

  return (
    <div className={styles.containerCenter}>
      <Header />
      <p className={styles.titulo}>Exercícios do treino</p>
      <DataGrid
        rows={state}
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