import * as React from 'react';
import { useContext, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { setupAPIClient } from '../../services/api';
import { canSSRAuth } from '../../../utils/canSSRAuth';
import { Header } from '../../components/Header';
import { Button } from '../../components/ui/Button';
import styles from './styles.module.scss';
//import { AuthContext } from '../../contexts/AuthContext';
// -- modal -- 
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { api } from '../../services/apiClient';

export default function ViewTraining({ training }) {
  const [listExercisesId, setListExercisesId] = useState([]); // recebe exercise_id
  const [exercises, setExercises] = useState([]);

  async function detailTraining(x){
    try {
      const response = await api.get('/training/detail', {
        params:{
          id: x,
        }
      });

      const { exercise_id } = response.data; // exercise_id é um array
      setListExercisesId(exercise_id);
      console.log('a função detailTraining foi chamada!')
    } catch (error) {
      console.log("erro ao recuperar os detalhes do treino ", error)
    }
  }

  async function detailExercise(x){
    try {
      const response = await api.get('/exercise/detail', {
        params:{
          id: x
        }
      });

      const { id, name, reps, time, observation, category_name } = response.data;
      let exerciseData = {
        "id": id,
        "name": name,
        "reps": reps,
        "time": time,
        "observation": observation,
        "category_name": category_name
      };
      setExercises([ ...exercises, exerciseData]); // adiciona um objeto ao array
      console.log('A função detailExercise foi chamada!');
      console.log(exercises);
    } catch (error) {
      console.log("erro ao recuperar os detalhes do exercício ", error)
    }
  }

  async function executeMap(){
    listExercisesId.forEach(x => detailExercise(x));
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  // let exemplo = {
  //     "id": "12c9323d-c75c-433b-bd1a-1a700defbaf6",
  //     "name": "Rosca direta",
  //     "reps": "20 repetições",
  //     "time": "não tem",
  //     "observation": "3 seções com intervalo de 1 min e carga de 20 kg",
  //     "category_name": "Exercício de força"
  //   };

  const arrayObj = [{
    id: '123',
    name: "nome 1"
  }, {
    id: '456',
    name: "name 2"
  }];

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const columns = [
    { field: 'id', headerName: 'ID', width: 350, editable: false },
    {
      field: 'name',
      headerName: 'Nome',
      width: 350,
      editable: false,
    },
    {
      field: "Editar",
      headerName: "Editar",
      sortable: false,
      width: 272,
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
          detailTraining(id);
          executeMap();
          handleOpen();
          //return console.log(JSON.stringify(thisRow, null, 4));
        };
  
        return (
          <div>
            <Button onClick={onClick}>Visualizar treino</Button>

            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                {exercises.map((x) => (
                  <>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      Name: {x.name}
                    </Typography>

                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      ID: {x.id}
                    </Typography>  
                  </>
                ))}
              </Box>

              {/* <Box sx={style}>
                {arrayObj.map((obj) => (
                  <>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      Name: {obj.name}
                    </Typography>

                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      ID: {obj.id}
                    </Typography>
                  </> 
                ))}
              </Box> */}

            </Modal>
          </div>
        );

      }
    },
  ];

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