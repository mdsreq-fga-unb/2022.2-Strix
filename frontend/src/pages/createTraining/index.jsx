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

export default function SetUpTraining({ exercises }) {
  const [listIdExercises, setListIdExercises] = useState([]);
  const [name, setName] = useState('');
  const [nameDefinido, setNameDefinido] = useState('');

  const columns = [
    { field: 'id', headerName: 'ID', width: 90, editable: false },
    {
      field: 'name',
      headerName: 'Nome',
      width: 170,
      editable: false,
    },
    {
      field: 'reps',
      headerName: 'Repetições',
      width: 170,
      editable: false,
    },
    {
      field: 'time',
      headerName: 'Duração',
      width: 170,
      editable: false,
    },
    {
      field: 'observation',
      headerName: 'Observações',
      width: 170,
      editable: false,
    },
    {
      field: 'category_name',
      headerName: 'Categorias',
      width: 170,
      editable: false,
    },
    {
      field: "Adicionar ao treino",
      headerName: "Adicionar ao treino",
      sortable: false,
      width: 140,
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
        setListIdExercises([ ...listIdExercises, id]);
        toast.success('Exercício adicionado com sucesso!')
        return console.log(JSON.stringify(thisRow, null, 4));
        };
  
        return <Button onClick={onClick}>Adicionar</Button>;
      }
    },
  ];

  async function handleRegisterTraining(){
    try{
      let data = {
        "name": nameDefinido,
        "exercise_id": listIdExercises
      }
      console.log(data)
      const response = await api.post('/training', data);
      toast.success('Treino criado com sucesso!');
      setNameDefinido('');
      setName('');
      setListIdExercises([]);
      Router.push('/viewTraining');
    }catch(err){
      toast.error("Erro ao criar treino!");
      console.log("erro ao criar treino ", err);
    }
  }

  function handleName(event){
    event.preventDefault();
    setNameDefinido(name);
    toast.success('Nome definido com sucesso!')
    //setName('');
  }

  return (
    <div className={styles.containerCenter}>
      <Header />
      <p className={styles.titulo}>Montar treino</p>
      <DataGrid
        rows={exercises}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        columnVisibilityModel={{ // Para esconder a coluna id
          id: false
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

        <form onSubmit={handleName}>
        <CustomizedInputs
            size='small' 
            label={'Nome do treino'} 
            type={'text'}
            value={name}
            onChange={ (e) => setName(e.target.value) }
          />
          <Button type='submit' style={{ 
          backgroundColor: '#3AAFA1',
          height: '40px',
          width: '120px',
          fontSize: '15px',
          padding: '0',
          marginLeft: '20px'
        }}>
          Confirmar
        </Button> 
        </form>
        

        <Button onClick={handleRegisterTraining} style={{ 
          backgroundColor: '#3A62AF',
          height: '60px',
          width: '480px',
          fontSize: '20px',
          marginBottom: '50px'
        }}>
          Criar treino
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