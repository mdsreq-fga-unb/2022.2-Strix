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
import { Excluir } from '../../components/Confirm';
import SpringModal from '../../components/Modal';
import InputMask from 'react-input-mask';

export default function EditStudent() {
  const [name, setName] = useState(''); 
  const [birthDate, setBirthdDate] = useState('');
  const [phone, setPhone] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');

  const { idState, updatedStudent, deleteStudent } = useContext(AuthContext);// puxando do contexto

  async function detailStudentRequest(x){
    try{
      const response = await api.get('/student/detail', {
        params:{
          id: x,
        }
      });

      const { name, birthDate, phone, cpf, email } = response.data;
      setName(name);
      setBirthdDate(birthDate);
      setPhone(phone);
      setCpf(cpf);
      setEmail(email);
      console.log('detalhes pego com sucesso!')
    }catch(error){
      console.log('Erro ao tentar puxar os detalhes do aluno!')
    }
  }
  useEffect(() => {
    detailStudentRequest(idState);
  }, [])

  async function handleEditStudent(event){
    event.preventDefault();

    let invalid = false
    if (name.length < 2) {
      toast.error("Nome muito curto, mínimo de duas letras!")
      invalid = true
    }
    if (invalidBirthDate) {
      toast.error("Data de nascimento inválida!")
      invalid = true
    }
    if (phone.length < 15) {
      toast.error("Telefone inválido!")
      invalid = true
    }
    if (invalid) {
      return
    }

    let data = {
      "id": idState,
      name,
      birthDate,
      phone,
      cpf,
      email
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

  const validateName = (text) => {
    let nome = ""
    nome = nome.concat(text)
    let tam = nome.length
    const letraspermitidas="ABCEDFGHIJKLMNOPQRSTUVXWYZ abcdefghijklmnopqrstuvxwyzáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ"
    while (tam--) {
      if(!letraspermitidas.includes(nome.charAt(tam))) {
        return false
      }
    }
    return true
  }

  const [openModal, setOpenModal] = useState(false)
  const handleOpenModal = () => setOpenModal(true)
  const handleCloseModal = () => setOpenModal(false)

  const [invalidBirthDate, setnvalidBirthdDate] = useState(false);
  useEffect(() => {
    if (birthDate.length == 0 || birthDate.length == 10) {
      setnvalidBirthdDate(false)
    } else {
      setnvalidBirthdDate(true)
    }
  }, [birthDate])

  return (
    <>
    <Head>
      <title>Strix - Edição de aluno</title>
    </Head>
    <Header />
    <div className={styles.containerCenterRegister}>
      <div className={styles.login}> 
        
        <Link href="/" className={styles.subtitulo}>
          Edição de aluno
        </Link>

        <form onSubmit={handleEditStudent}>
          <CustomizedInputs
            size='small' 
            label={'Nome Completo'} 
            type={'text'} 
            value={name}
            required
            onChange={ (e) => validateName(e.target.value) ? setName(e.target.value) : null }
          />

          <InputMask 
            mask="99/99/9999"
            maskChar=""
            value={birthDate}
            onChange={ (e) => setBirthdDate(e.target.value) }
          >
            {() => <CustomizedInputs 
              size='small' 
              type={"text"} 
              label={'Data de Nascimento'}
              required
              error={invalidBirthDate}
            />}
          </InputMask>

          <InputMask 
            mask="(99) 99999-9999"
            maskChar=""
            value={phone}
            onChange={ (e) => setPhone(e.target.value) }
          >
            {() => <CustomizedInputs 
              size='small' 
              type={'text'} 
              label={'Telefone'} 
              required
              error={phone.length > 0 && phone.length < 15 ? true : false}
            />}
          </InputMask>

          <CustomizedInputs
            size='small' 
            type={'text'} 
            label={'CPF'} 
            value={cpf}
            onChange={ (e) => setCpf(e.target.value) }
            required
            disabled
          />

          <CustomizedInputs 
            size='small' 
            type={'email'} 
            label={'E-mail'} 
            value={email}
            onChange={ (e) => setEmail(e.target.value) }
            required
          />

          <p className={styles.msg}>* Campo Obrigatório</p>
          <div className={styles.buttons}>
            <Button type='submit' style={{width: '170px', marginTop: '2rem'}}>Salvar</Button>
            <Button type='button' style={{width: '170px'}} className={styles.delete} onClick={handleOpenModal}>Excluir Aluno</Button>
          </div>
          
          <SpringModal
            open={openModal}
            handleClose={handleCloseModal}
            component={<Excluir funcNo={handleCloseModal} funcYes={handleDelete}/>}
          />
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