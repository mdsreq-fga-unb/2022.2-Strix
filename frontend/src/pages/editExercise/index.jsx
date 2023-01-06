import { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import styles from '../../../styles/Home.module.scss';
import CustomizedInputs from '../../components/ui/StyledInputs/CustomizedInputs';
import { Button } from '../../components/ui/Button';
import Link from 'next/link';
import { AuthContext } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
import { canSSRAuth } from '../../../utils/canSSRAuth';
import { Header } from '../../components/Header';
import { api } from '../../services/apiClient';

export default function EditStudent() {
  const [name, setName] = useState(''); 
  const [reps, setReps] = useState('');
  const [time, setTime] = useState('');
  const [observation, setObservation] = useState('');
  

  const { idState, updatedStudent, deleteStudent } = useContext(AuthContext);// puxando do contexto

  async function detailStudentRequest(x){
    try{
      const response = await api.get('/student/detail', {
        params:{
          id: x,
        }
      });

      const { name, reps, time, observation} = response.data;
      setName(name);
      setBirthdDate(reps);
      setPhone(time);
      setCpf(observation);
      console.log('detalhes pego com sucesso!')
    }catch(error){
      console.log('Erro ao tentar puxar os detalhes do exercicio!')
    }
  }
  useEffect(() => {
    detailStudentRequest(idState);
  }, [])

  async function handleEditStudent(event){
    event.preventDefault();
 
    let data = {
      "id": idState,
      name,
      reps,
      time,
      observation
    }

    console.log(data)

    await updatedStudent(data);
  }

  async function handleDelete(){
    let data = {
      "student_id": idState,
    }
    await deleteStudent(data);
  }

  return (
    <>
    <Head>
      <title>Strix - Edição de exercício</title>
    </Head>
    <Header />
    <div className={styles.containerCenterRegister}>
      <div className={styles.login}> 
        
        <Link href="/" className={styles.subtitulo}>
          Edição de exercício
        </Link>

        <form onSubmit={handleEditStudent}>
          <CustomizedInputs
            size='small' 
            label={'Nome do exercício'} 
            type={'text'} 
            value={name}
            onChange={ (e) => setName(e.target.value) }
          />

          <CustomizedInputs 
            size='small' 
            type={"text"} 
            label={'Número de Repetições'} 
            value={reps}
            onChange={ (e) => setBirthdDate(e.target.value) }
          />

          <CustomizedInputs 
            size='small' 
            type={'text'} 
            label={'Tempo de execução'} 
            value={time}
            onChange={ (e) => setPhone(e.target.value) }
          />

          <CustomizedInputs
            size='small' 
            type={'text'} 
            label={'Observação do exercício'} 
            value={observation}
            onChange={ (e) => setCpf(e.target.value) }
          />

          <p className={styles.msg}>* Campo Obrigatório</p>
          <Button type='submit'>Salvar</Button>
          <Button type='button' className={styles.delete} onClick={ handleDelete}>Deletar</Button>  
        </form> 
      </div>
    </div>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  return {
      props: {}
  }
})