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

export default function RegisterCategory() {
  const { registerCategories } = useContext(AuthContext);

  const [name, setName] = useState(''); 
  const [description, setDescription] = useState('');

  async function handleRegisterCategory(event){
    event.preventDefault();

    if(name === '' || description === '') {
      toast.error("Preencha os campos!");
      return;
    }

    let data = {
        name,
        description
    }

    await registerCategories(data);
    setName('');
    setDescription('');
  }
  
  return (
    <>
    <Head>
      <title>Strix - Cadastre uma categoria</title>
    </Head>
    <Header />
    <div className={styles.containerCenterRegister}>
      <div className={styles.login}> 
        
        <Link href="/" className={styles.subtitulo}>
          Categoria
        </Link>

        <form onSubmit={handleRegisterCategory}>
          <CustomizedInputs
            size='small' 
            label={'Nome da categoria *'} 
            type={'text'} 
            value={name}
            onChange={ (e) => setName(e.target.value) }
          />

          <CustomizedInputs 
            size='small' 
            type={"text"} 
            label={'Descrição *'}
            multiline
            rows={4}
            value={description}
            onChange={ (e) => setDescription(e.target.value) }
            variant="outlined"
            sx={{
                backgroundColor: '#D9D9D9',
                borderRadius: '10px',
                border: '0',
                marginBottom: '1rem',

            }}
          />

          <p className={styles.msg}>* Campo Obrigatório</p>
          <Button type='submit'>Cadastrar categoria</Button> 
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