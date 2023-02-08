import { useState, useEffect, useContext } from "react";
import Head from "next/head";
import styles from "../../../styles/Home.module.scss";
import CustomizedInputs from "../../components/ui/StyledInputs/CustomizedInputs";
import { Button } from "../../components/ui/Button";
import Link from "next/link";
import { AuthContext } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import { canSSRAuth } from "../../../utils/canSSRAuth";
import { Header } from "../../components/Header";
import { api } from "../../services/apiClient";
import { Excluir } from "../../components/Confirm";
import SpringModal from "../../components/Modal";
import InputMask from "react-input-mask";

export default function EditPendency() {
  const { pendencyId, deletePendency, updatePendency } = useContext(AuthContext);
  const [valor, setValor] = useState("");
  const [descricao, setDescricao] = useState("");

  async function detailPendencyRequest(id) {
    try {
      const response = await api.get("/pendency/detail", {
        params: {
          pendencyId: id,
        },
      });
      console.log('RESPONSE.DATA: %s', response.data);
      const { price, description } = response.data;
      setValor(price);
      setDescricao(description);
      console.log(valor + " e descricao: " + descricao);
      console.log("detalhes pego com sucesso!");
    } catch (error) {
      console.log("Erro ao tentar puxar os detalhes da pendencia!" + error);
    }
  }

  async function handleDelete(){
    await deletePendency(pendencyId);
  }

  async function handleEditPendency(event) {
    event.preventDefault();
    await updatePendency({pendencyId, valor, descricao})
  }

  useEffect(() => {
    detailPendencyRequest(pendencyId);
  }, []);

  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <>
      <Head>
        <title>Strix - Edição de pendência</title>
      </Head>
      <Header />
      <div className={styles.containerCenterRegister}>
        <div className={styles.login}>
          <Link href="/" className={styles.subtitulo}>
            Edição de Pendência
          </Link>

          <form onSubmit={handleEditPendency}>
            <CustomizedInputs
              size="small"
              label={"valor"}
              type={"text"}
              value={valor}
              required
              onChange={(e) => setValor(e.target.value)}
            />

            <CustomizedInputs
              size="small"
              label={"descricao"}
              type={"text"}
              value={descricao}
              required
              onChange={(e) => setDescricao(e.target.value)}
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
                Excluir Pendência
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
}
