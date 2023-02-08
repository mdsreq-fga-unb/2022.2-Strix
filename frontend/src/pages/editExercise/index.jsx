import { useState, useContext, useEffect } from 'react';
import Head from 'next/head';
import styles from '../../../styles/Home.module.scss';
import CustomizedInputs from '../../components/ui/StyledInputs/CustomizedInputs';
import { Button } from '../../components/ui/Button';
import Link from 'next/link';
import { AuthContext } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
import { canSSRAuth } from '../../../utils/canSSRAuth';
import { Header } from '../../components/Header';
import { setupAPIClient } from '../../services/api';
import MenuItem from '@mui/material/MenuItem';
import Router from 'next/router';
import { api } from '../../services/apiClient';

export default function EditExercise({ listCategories }) {

  const { idExercise, updatedExercise, deleteExercise  } = useContext(AuthContext);

  const [name, setName] = useState(''); 
  const [reps, setReps] = useState('');
  const [time, setTime] = useState('');
  const [observation, setObservation] = useState('');
  const [category_name, setCategory_name] = useState('');

  async function detailExerciseRequest(x){
    try {
      const response = await api.get('/exercise/detail', {
        params:{
          id: x
        }
      });

      const { name,  reps, time, observation, category_name } = response.data;
      setName(name);
      setReps(reps);
      setTime(time);
      setObservation(observation);
      setCategory_name(category_name);
      console.log('detalhes do exercício pego com sucesso!')
    } catch (error) {
      console.log('Erro ao tentar puxar os detalhes do exercício!', error);
    }
  }

  useEffect(() => {
    detailExerciseRequest(idExercise);
  }, []);

  async function handleEditExercise(event){
    event.preventDefault();

    let data = {
      "id": idExercise,
      name,
      reps,
      time,
      observation,
      category_name
    }

    console.log(data);

    await updatedExercise(data);

    //alert('Salvar edição!');
  }

  async function handleDeleteExercise(){
    //alert('Deletar exercício');
    let data = {
      "exercise_id": idExercise
    }

    await deleteExercise(data);
    
  }
  
  return (
    <>
    <Head>
      <title>Strix - Edite um exercício</title>
    </Head>
    <Header />
    <div className={styles.containerCenterRegister}>
      <div className={styles.login}> 
        
        <Link href="/editExercise" className={styles.subtitulo}>
          Editar Exercícios
        </Link>

        <form onSubmit={handleEditExercise}>
          <CustomizedInputs
            size='small' 
            label={'Nome do exercício *'} 
            type={'text'} 
            value={name}
            onChange={ (e) => setName(e.target.value) }
          />

          <CustomizedInputs
            size='small' 
            label={'Repetições *'} 
            type={'text'} 
            value={reps}
            onChange={ (e) => setReps(e.target.value) }
          />

          <CustomizedInputs
            size='small' 
            label={'Duração do exercício *'} 
            type={'text'} 
            value={time}
            onChange={ (e) => setTime(e.target.value) }
          />

          <CustomizedInputs
            size='small' 
            select
            label={'Categoria *'} 
            type={'text'} 
            value={category_name}
            onChange={(e) => (setCategory_name(e.target.value))}
            sx={{
              '.MuiSelect-icon':{
                color: '#D9D9D9'
              }
            }}
          >
            {listCategories.map((option) => (
              <MenuItem key={option.name} value={option.name}>
                {option.name}
              </MenuItem>
            ))}
          </CustomizedInputs>

          <CustomizedInputs 
            size='small' 
            type={"text"} 
            label={'Observação *'}
            multiline
            rows={3}
            value={observation}
            onChange={ (e) => setObservation(e.target.value) }
            variant="outlined"
            sx={{
                backgroundColor: '#D9D9D9',
                borderRadius: '10px',
                border: '0',
                marginBottom: '1rem',
            }}
          />

          <p className={styles.msg}>* Campo Obrigatório</p>
          <Button type='submit'>Salvar</Button> 
          <Button onClick={handleDeleteExercise} type='button' style={{ 
          backgroundColor: '#AF3A3A',
          marginTop: '2rem'
        }}>Deletar</Button> 
        </form>
        
      </div>
    </div>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    const apiClient = setupAPIClient(ctx);
    const response = await apiClient.get('/listCategories');
    return {
        props: {
          listCategories: response.data
        }
    }
  })