import * as React from 'react';
import { useContext } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { setupAPIClient } from '../../services/api';
import { canSSRAuth } from '../../../utils/canSSRAuth';
import { Header } from '../../components/Header';
import { Button } from '../../components/ui/Button';
import styles from './styles.module.scss';
import { AuthContext } from '../../contexts/AuthContext';
import Router from 'next/router';

export default function ViewTraining({ training }) {
  const { exerciseListIdState } = useContext(AuthContext);

  const columns = [
    {
      field: 'name',
      headerName: 'Nome do treino',
      width: 350,
      editable: false,
    },
    { field: 'id', headerName: 'ID do treino', width: 300, editable: false },
    {
      field: 'exercise_id',
      headerName: 'Id dos exercícios',
      width: 350,
      editable: false,
    },
    {
      field: "Visualizar treino",
      headerName: "Visualizar treino",
      sortable: false,
      width: 200,
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

          let exercise_id = thisRow.exercise_id;
          exerciseListIdState(exercise_id);
          Router.push('/viewWorkoutExercises');
          return console.log(JSON.stringify(thisRow, null, 4));
        };

        return <Button onClick={onClick}>Visualizar treino</Button>;
      }
    },
  ];

  function handleRegisterLink(){
    Router.push('/createTraining');
  }

  return (
    <div className={styles.containerCenter}>
      <Header />
      <p className={styles.titulo}>Meus Treinos</p>
      <DataGrid
        rows={training}
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
          Montar novo treino
        </Button> 
    </div>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    const apiClient = setupAPIClient(ctx);
    const response = await apiClient.get('/listTraining');
    return {
        props: {
            training: response.data
        }
    }
})