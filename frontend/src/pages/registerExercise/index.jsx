import { useState, useContext } from 'react';
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

export default function RegisterExercise({ listCategories }) {

  const { registerExercise } = useContext(AuthContext);

  const [name, setName] = useState(''); 
  const [reps, setReps] = useState('');
  const [time, setTime] = useState('');
  const [observation, setObservation] = useState('');
  const [category_name, setCategory_name] = useState('');

  async function handleRegisterExercise(event){
    event.preventDefault();

    if(name === '' || reps === '' || time === '' || category_name === '' || observation === '') {
      toast.error("Preencha os campos!");
      return;
    }

    let data = {
        name,
        reps,
        time,
        category_name,
        observation
    }

    console.log(data)

    await registerExercise(data);
    setName('');
    setObservation('');
    setReps('');
    setTime('');
    setCategory_name('');
  }

  function handleRegisterLink(){
    Router.push('/registerCategory');
  }
  
  return (
    <>
    <Head>
      <title>Strix - Cadastre um exercício</title>
    </Head>
    <Header />
    <div className={styles.containerCenterRegister}>
      <div className={styles.login}> 
        
        <Link href="/registerExercise" className={styles.subtitulo}>
          Exercícios
        </Link>

        <form onSubmit={handleRegisterExercise}>
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
          <Button type='submit'>Cadastrar Exercício</Button> 
          <Button onClick={handleRegisterLink} type='button' style={{ 
          backgroundColor: '#AF3A3A',
          marginTop: '2rem'
        }}>Cadastrar Nova Categoria</Button> 
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
      },
    };
});