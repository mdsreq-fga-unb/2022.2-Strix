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
import { api } from '../../services/apiClient';
import { toast } from 'react-toastify';

export default function ViewTraining({ training }) {
  const { exerciseListIdState, pickUpNameTraining, pickUpIdTraining } = useContext(AuthContext);

  async function deleteTraining(id){
    try{
      const response = await api.delete('/trainingDelete', {
        params:{
          training_id: id
        }
      })

      toast.success('Treino deletado com sucesso!');
    }catch(err){
      console.log('Erro ao tentar deletar treino.', err);
    }
  }

  const columns = [
    {
      field: 'name',
      headerName: 'Nome do treino',
      width: 663,
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
      headerName: "Detalhes do treino",
      sortable: false,
      width: 186,
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
          let id = thisRow.id
          let exercise_id = thisRow.exercise_id;
          let name = thisRow.name;
          pickUpIdTraining(id);
          exerciseListIdState(exercise_id);
          pickUpNameTraining(name);
          Router.push('/viewWorkoutExercises');
          return console.log(JSON.stringify(thisRow, null, 4));
        };

        return <Button onClick={onClick}>Detalhes do treino</Button>;
      }
    },
    {
      field: "Excluir",
      headerName: "Excluir",
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
          deleteTraining(id);
          Router.push('/viewTraining');
        };
  
        return <Button style={{
          backgroundColor: '#AF3A3A'
        }} onClick={onClick}>Excluir</Button>;
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
        columnVisibilityModel={{
          id: false,
          exercise_id: false
        } 
      }

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