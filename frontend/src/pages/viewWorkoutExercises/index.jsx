import * as React from 'react';
import { useContext, useEffect } from 'react';
import { DataGrid, visibleGridColumnsLengthSelector } from '@mui/x-data-grid';
import { setupAPIClient } from '../../services/api';
import { canSSRAuth } from '../../../utils/canSSRAuth';
import { Header } from '../../components/Header';
import { Button } from '../../components/ui/Button';

import styles from './styles.module.scss';
import { AuthContext } from '../../contexts/AuthContext';
import { useState } from 'react';
import CustomizedInputs from '../../components/ui/StyledInputs/CustomizedInputs';
import { MenuItem } from '@mui/material';
import { api } from '../../services/apiClient';
import Router from 'next/router';

import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import { toast } from 'react-toastify';

export default function viewWorkoutExercises({ exercises, students }) {
  const { listIdExercise, trainingName, pickUpNameStudent, pickUpIdExercise, trainingId } = useContext(AuthContext);
  const [state, setState] = useState([]); // array
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedExercise, setSelectedExercise] = useState({}); // objeto

  useEffect(() => {
    let new_arr = [];
    for (let a = 0; a < exercises.length; a++){
        for (let b = 0; b < listIdExercise.length; b++){
            if(exercises[a].id === listIdExercise[b]){
                new_arr.push(exercises[a]);
            }
        }
    }
    new_arr && setState(new_arr)
  }, [])


  function isOverflown(element) {
    return (
      element.scrollHeight > element.clientHeight ||
      element.scrollWidth > element.clientWidth
    );
  }
  
  const GridCellExpand = React.memo(function GridCellExpand(props) {
    const { width, value } = props;
    const wrapper = React.useRef(null);
    const cellDiv = React.useRef(null);
    const cellValue = React.useRef(null);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [showFullCell, setShowFullCell] = React.useState(false);
    const [showPopper, setShowPopper] = React.useState(false);
  
    const handleMouseEnter = () => {
      const isCurrentlyOverflown = isOverflown(cellValue.current);
      setShowPopper(isCurrentlyOverflown);
      setAnchorEl(cellDiv.current);
      setShowFullCell(true);
    };
  
    const handleMouseLeave = () => {
      setShowFullCell(false);
    };
  
    React.useEffect(() => {
      if (!showFullCell) {
        return undefined;
      }
  
      function handleKeyDown(nativeEvent) {
        // IE11, Edge (prior to using Bink?) use 'Esc'
        if (nativeEvent.key === 'Escape' || nativeEvent.key === 'Esc') {
          setShowFullCell(false);
        }
      }
  
      document.addEventListener('keydown', handleKeyDown);
  
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }, [setShowFullCell, showFullCell]);
  
    return (
      <Box
        ref={wrapper}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        sx={{
          alignItems: 'center',
          lineHeight: '24px',
          width: '100%',
          height: '100%',
          position: 'relative',
          display: 'flex',
        }}
      >
        <Box
          ref={cellDiv}
          sx={{
            height: '100%',
            width,
            display: 'block',
            position: 'absolute',
            top: 0,
          }}
        />
        <Box
          ref={cellValue}
          sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
        >
          {value}
        </Box>
        {showPopper && (
          <Popper
            open={showFullCell && anchorEl !== null}
            anchorEl={anchorEl}
            style={{ width, marginLeft: -17 }}
          >
            <Paper
              elevation={1}
              style={{ minHeight: wrapper.current.offsetHeight - 3 }}
            >
              <Typography variant="body2" style={{ padding: 8 }}>
                {value}
              </Typography>
            </Paper>
          </Popper>
        )}
      </Box>
    );
  });
  
  GridCellExpand.propTypes = {
    value: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
  };
  
  function renderCellExpand(params) {
    return (
      <GridCellExpand value={params.value || ''} width={params.colDef.computedWidth} />
    );
  }
  
  renderCellExpand.propTypes = {
    /**
     * The column of the row that the current cell belongs to.
     */
    colDef: PropTypes.object.isRequired,
    /**
     * The cell value.
     * If the column has `valueGetter`, use `params.row` to directly access the fields.
     */
    value: PropTypes.string,
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 90, editable: false },
    {
      field: 'name',
      headerName: 'Nome',
      width: 170,
      //width: 194,
      editable: false,
      renderCell: renderCellExpand,
    },
    {
      field: 'reps',
      headerName: 'Repetições',
      width: 170,
      //width: 194,
      editable: false,
      renderCell: renderCellExpand,
    },
    {
      field: 'time',
      headerName: 'Duração',
      width: 170,
      //width: 194,
      editable: false,
      renderCell: renderCellExpand,
    },
    {
      field: 'observation',
      headerName: 'Observações',
      width: 170,
      //width: 194,
      editable: false,
      renderCell: renderCellExpand,
    },
    {
      field: 'category_name',
      headerName: 'Categoria',
      width: 170,
      //width: 194,
      editable: false,
      renderCell: renderCellExpand,
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
          pickUpIdExercise(id);
          Router.push('/editExercise');
          //return console.log(JSON.stringify(thisRow, null, 4));
        };
  
        return <Button onClick={onClick}>Editar</Button>;
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
          let idRow = thisRow.id;
          let newState = [];

          for (let c = 0; c < state.length; c++){
            if (state[c].id === idRow) {
              newState = state.filter(el => el !== state[c]);
              setState(newState);
              console.log("NewState é: " + newState);
            }
          }

          //return console.log(JSON.stringify(thisRow, null, 4));
        };
  
        return <Button style={{
          backgroundColor: '#AF3A3A'
        }} onClick={onClick}>Excluir</Button>;
      }
    },
  ];

  async function handleSendTraining(){
    //alert('Treino enviado')
    try {
      let data = {
        name: trainingName,
        student: selectedStudent,
        listExercises: state
      }

      const response = await api.post('/createPdfRoot', data);
      console.log("Treino criado com sucesso!")
      pickUpNameStudent(selectedStudent);
      Router.push('/emailTraining');
      
    } catch (error) {
      //toast.error("Erro ao criar o pdf na raiz do projeto");
      console.log("erro ao criar o pdf na raiz do projeto ", error)
    }
  }

  async function handleWorkoutView(){
    const data = {
      name: trainingName,
      student: selectedStudent,
      listExercises: state
    }

    function displayPDF(buffer){
      const blob = new Blob([buffer], { type: 'application/pdf' });
      const objectURL = URL.createObjectURL(blob);
      window.open(objectURL);
    }

    api.post('/generatePdf', data, {
      responseType: 'arraybuffer'
    })
    .then(response => {
      const buffer = new Uint8Array(response.data);
      displayPDF(buffer);
    })
    .catch(error => {
      console.log(error);
    });
  }

  async function handleWorkoutAdd(){
    if(state.includes(selectedExercise)) {
      toast.error('esse exercício já está adicionado no treino');
      return;
    } else {
      setState([...state, selectedExercise])
    }
  }

  async function handleUpdateTraining(){
    try{
      let listId = [];
      for(let a = 0; a < state.length; a++){
        listId.push(state[a].id);
      }

      let data = {
        id: trainingId,
        name: trainingName,
        exercise_id: listId
      }
  
      const response = await api.put('/updateTraining', data);
      toast.success('Dados atualizados com sucesso!');

    }catch(error){

    }
  }

  return (
    <div className={styles.containerCenter}>
      <Header />
      <p className={styles.titulo}>Detalhes do treino</p>
      <p className={styles.textGrid}>Exercícios do treino</p>
      <DataGrid
        rows={state}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        columnVisibilityModel={{
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

      <p className={styles.text}>Adicione um exercício ao treino</p>
      <div>
      <CustomizedInputs
            size='small' 
            select
            label={'Selecionar exercício'} 
            type={'text'} 
            value={selectedExercise}
            onChange={(e) => (setSelectedExercise(e.target.value))}
            sx={{
                '.MuiSelect-icon':{
                  color: '#D9D9D9'
                },
                width: '340px'
              }}
            >
              {exercises.map((option) => (
                <MenuItem key={option.name} value={option}>
                  {option.name}
                </MenuItem>
              ))}
          </CustomizedInputs>

          <Button onClick={handleWorkoutAdd} style={{ 
            backgroundColor: '#3AAFA1',
            height: '40px',
            width: '120px',
            fontSize: '15px',
            padding: '0',
            marginLeft: '20px'
          }}>Adicionar ao treino</Button>
      </div>


      <p className={styles.text}>Selecione o aluno para enviar o treino</p>

        <div>
          <CustomizedInputs
            size='small' 
            select
            label={'Selecionar aluno'} 
            type={'text'} 
            value={selectedStudent}
            onChange={(e) => (setSelectedStudent(e.target.value))}
            sx={{
                '.MuiSelect-icon':{
                  color: '#D9D9D9'
                },
                width: '340px'
              }}
            >
              {students.map((option) => (
                <MenuItem key={option.name} value={option.name}>
                  {option.name}
                </MenuItem>
              ))}
          </CustomizedInputs>

          <Button onClick={handleWorkoutView} style={{ 
            backgroundColor: '#3AAFA1',
            height: '40px',
            width: '120px',
            fontSize: '15px',
            padding: '0',
            marginLeft: '20px'
          }}>Visualizar treino</Button>
        </div>

        <Button onClick={handleSendTraining} style={{ 
          backgroundColor: '#3A62AF',
          height: '60px',
          width: '480px',
          fontSize: '20px',
          marginBottom: '50px',
          marginRight: '10px'
        }}>
          Enviar treino
        </Button>
        <Button onClick={handleUpdateTraining} style={{ 
          backgroundColor: '#AF3A3A',
          height: '60px',
          width: '480px',
          fontSize: '20px',
          marginBottom: '50px',
          //marginLeft: '10px'
        }}>
          Salvar as alterações do treino
        </Button>
      </div>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);
  const response = await apiClient.get('/listExercises');
  const responseStudents = await apiClient.get('/listStudents');
    return {
        props: {
          exercises: response.data,
          students: responseStudents.data
        }
    }
})