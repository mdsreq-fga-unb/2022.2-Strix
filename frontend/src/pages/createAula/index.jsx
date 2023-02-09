import { useState, useContext } from "react";
import Head from "next/head";
import styles from "../../../styles/Home.module.scss";
import CustomizedInputs from "../../components/ui/StyledInputs/CustomizedInputs";
import { Button } from "../../components/ui/Button";
import Link from "next/link";
import { AuthContext } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import { canSSRAuth } from "../../../utils/canSSRAuth";
import { Header } from "../../components/Header";
import { setupAPIClient } from "../../services/api";
import MenuItem from "@mui/material/MenuItem";
import Router from "next/router";
import InputMask from "react-input-mask";
import { useStyleRegistry } from "styled-jsx";

export default function RegisterClass({ allStudents }) {
  const { registerClass } = useContext(AuthContext);

  const [data, setData] = useState("");
  const [hora, setHora] = useState("");
  const [duracao, setDuracao] = useState("");
  const [nomedaAula, setNomeAula] = useState("");
  const [alunos, setAlunos] = useState("");

  async function handleCreateAula(event) {
    event.preventDefault();

    if (
      data === "" ||
      hora === "" ||
      duracao === "" ||
      alunos === "" ||
      nomedaAula === ""
    ) {
      toast.error("Preencha os campos!");
      return;
    }

    let studentName = "";

    allStudents.map((st) => {
      if (st.id === alunos) studentName = st.name;
    });

    let body = {
      name: nomedaAula,
      date: data,
      time: hora,
      duration: duracao,
      studentID: alunos,
      studentName: studentName,
    };

    console.log(body);

    await registerClass(body);

    setData("");
    setNomeAula("");
    setHora("");
    setDuracao("");
    setAlunos("");
  }

  return (
    <>
      <Head>
        <title>Strix - Cadastre uma aula</title>
      </Head>
      <Header />
      <div className={styles.containerCenterRegister}>
        <div className={styles.login}>
          <Link href="/createAula" className={styles.subtitulo}>
            Registro de Aula
          </Link>

          <form onSubmit={handleCreateAula}>
            <InputMask
              mask="99/99/9999"
              maskChar=""
              value={data}
              onChange={(e) => setData(e.target.value)}
            >
              {() => (
                <CustomizedInputs
                  size="small"
                  label={"Data da aula (DD/MM/AAAA)*"}
                  type={"text"}
                />
              )}
            </InputMask>

            <InputMask
              mask="99:99"
              maskChar=""
              value={hora}
              onChange={(e) => setHora(e.target.value)}
            >
              {() => (
                <CustomizedInputs
                  size="small"
                  label={"Horário (HH:MM)*"}
                  type={"text"}
                />
              )}
            </InputMask>

            <CustomizedInputs
              size="small"
              label={"Duração da aula (em minutos)*"}
              type={"text"}
              value={duracao}
              onChange={(e) => setDuracao(e.target.value)}
            />

            <CustomizedInputs
              size="small"
              select
              label={"Alunos *"}
              type={"text"}
              value={alunos}
              onChange={(e) => {
                setAlunos(e.target.value);
              }}
              sx={{
                ".MuiSelect-icon": {
                  color: "#D9D9D9",
                },
              }}
            >
              {allStudents.map((option) => (
                <MenuItem key={option.name} value={option.id}>
                  {option.name}
                </MenuItem>
              ))}
            </CustomizedInputs>

            <CustomizedInputs
              size="small"
              type={"text"}
              label={"Nome/descrição da aula *"}
              multiline
              rows={3}
              value={nomedaAula}
              onChange={(e) => setNomeAula(e.target.value)}
              variant="outlined"
              sx={{
                backgroundColor: "#D9D9D9",
                borderRadius: "10px",
                border: "0",
                marginBottom: "1rem",
              }}
            />

            <p className={styles.msg}>* Campo Obrigatório</p>
            <Button type="submit">Cadastrar Aula</Button>
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
      allStudents: response.data,
    },
  };
});
