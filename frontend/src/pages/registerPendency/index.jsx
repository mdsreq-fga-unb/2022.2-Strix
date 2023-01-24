import { useState, useContext } from 'react';
import Head from 'next/head';
import styles from '../../../styles/Home.module.scss';
import CustomizedInputs from '../../components/ui/StyledInputs/CustomizedInputs';
import { Button } from '../../components/ui/Button';
import { AuthContext } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
import { canSSRAuth } from '../../../utils/canSSRAuth';
import { Header } from '../../components/Header';
import { setupAPIClient } from '../../services/api';
import MenuItem from '@mui/material/MenuItem';

export default function RegisterPendency({ studentsList }) {
  const { registerPendency } = useContext(AuthContext);
  const [studentId, setStudentId] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  async function handleRegisterPendency(event) {
    event.preventDefault();

    if (studentId === "" || price === "" || description === "") {
      toast.error("Preencha os campos!");
      return;
    }

    let data = {
      studentId,
      price,
      description,
    };

    console.log(data);

    await registerPendency(data);

    setStudentId("");
    setPrice("");
    setDescription("");
  }

  return (
    <>
      <Head>
        <title>Strix - Registre nova pendência</title>
      </Head>
      <Header />
      <div className={styles.containerCenterRegister}>
        <div className={styles.login}>
          <p className={styles.subtitulo}>Nova Pendência</p>

          <form onSubmit={handleRegisterPendency}>
            <CustomizedInputs
              size="small"
              select
              label={"Aluno *"}
              type={"text"}
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              sx={{
                ".MuiSelect-icon": {
                  color: "#D9D9D9",
                },
              }}
            >
              {studentsList.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
                </MenuItem>
              ))}
            </CustomizedInputs>

            <CustomizedInputs
              size="small"
              label={"Valor *"}
              type={"text"}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            <CustomizedInputs
              size="small"
              type={"text"}
              label={"Descrição *"}
              multiline
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              variant="outlined"
              sx={{
                backgroundColor: "#D9D9D9",
                borderRadius: "10px",
                border: "0",
                marginBottom: "1rem",
              }}
            />
            <p className={styles.msg}>* Campo Obrigatório</p>
            <Button type="submit">Registrar Pendência</Button>
          </form>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);
  const response = await apiClient.get("/listStudents");
  return {
    props: {
      studentsList: response.data,
    },
  };
});
