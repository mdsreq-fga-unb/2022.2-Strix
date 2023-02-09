import { useState, useEffect, useContext } from "react";
import Head from "next/head";
import styles from "../../../styles/Home.module.scss";
import CustomizedInputs from "../../components/ui/StyledInputs/CustomizedInputs";
import { Button } from "../../components/ui/Button";
import Link from "next/link";
import { AuthContext } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import { setupAPIClient } from "../../services/api";
import MenuItem from "@mui/material/MenuItem";
import { canSSRAuth } from "../../../utils/canSSRAuth";
import { Header } from "../../components/Header";
import { api } from "../../services/apiClient";
import { Excluir } from "../../components/Confirm";
import SpringModal from "../../components/Modal";
import InputMask from "react-input-mask";

export default function EditAulaPage({ allStudents }) {
  const [className, setClassName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState("");
  const [studentID, setStudentID] = useState("");
  const [studentName, setStudentName] = useState("");

  const { classID_ctx, updateClass, deleteClass } = useContext(AuthContext);

  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  async function detailClassRequest(x) {
    try {
        console.log("pegando do ID %s", x)
      const response = await api.get("/class/detail", { x });
      const { id, name, date, time, duration, studentID } = response.data[0];
      allStudents.map((st) => {
        if (st.id == studentID) {
          setStudentName(st.name);
        }
      });
      setClassName(name);
      setDate(date);
      setTime(time);
      setDuration(duration);
      setStudentID(studentID);
    } catch (error) {
      console.log("Erro ao tentar puxar os detalhes do aluno!");
    }
  }
  useEffect(() => {
    detailClassRequest(classID_ctx);
  }, []);

  return (
    <>
      <Head>
        <title>Strix - Edição de aluno</title>
      </Head>
      <Header />
      <div className={styles.containerCenterRegister}>
        <div className={styles.login}>
          <Link href="/" className={styles.subtitulo}>
            Edição de aula
          </Link>

          <form onSubmit={handleEditClass}>
            <InputMask
              mask="99/99/9999"
              maskChar=""
              value={date}
              onChange={(e) => setDate(e.target.value)}
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
              value={time}
              onChange={(e) => setTime(e.target.value)}
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
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />

            <CustomizedInputs
              size="small"
              select
              label={"Alunos *"}
              type={"text"}
              value={studentID}
              onChange={(e) => {
                setStudentID(e.target.value);
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
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              variant="outlined"
              sx={{
                backgroundColor: "#D9D9D9",
                borderRadius: "10px",
                border: "0",
                marginBottom: "1rem",
              }}
            />

            <p className={styles.msg}>* Campo Obrigatório</p>
            <div className={styles.buttons}>
              <Button
                type="submit"
                style={{ width: "170px", marginTop: "2rem" }}
              >
                Salvar
              </Button>
              <Button
                type="button"
                style={{ width: "170px" }}
                className={styles.delete}
                onClick={handleOpenModal}
              >
                Excluir Aula
              </Button>
            </div>

            <SpringModal
              open={openModal}
              handleClose={handleCloseModal}
              component={
                <Excluir funcNo={handleCloseModal} funcYes={handleDelete} />
              }
            />
          </form>
        </div>
      </div>
    </>
  );

  async function handleEditClass(event) {
    event.preventDefault();
    let body = {
      classID: classID_ctx,
      name: className,
      date: date,
      time: time,
      duration: duration,
      studentID: studentID,
      studentName: studentName,
    };
    await updateClass(body);
  }

  async function handleDelete() {
    let body = {
        classID: classID_ctx,
    };
    await deleteClass(body);
  }
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  try {
    const apiClient = setupAPIClient(ctx);
    const response = await apiClient.get("/listStudents");
    return {
      props: {
        allStudents: response.data,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      redirect: {
        destination: "/students",
        statusCode: 307,
      },
    };
  }
});
