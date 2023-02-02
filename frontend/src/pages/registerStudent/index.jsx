import { useState, useContext, useEffect } from "react";
import Head from "next/head";
import styles from "../../../styles/Home.module.scss";
import CustomizedInputs from "../../components/ui/StyledInputs/CustomizedInputs";
import { Button } from "../../components/ui/Button";
import Link from "next/link";
import { AuthContext } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import { canSSRAuth } from "../../../utils/canSSRAuth";
import { Header } from "../../components/Header";
import * as cpfValidator from "cpf-cnpj-validator";
import InputMask from "react-input-mask";

export default function RegisterStudent() {
  const { registerStudent } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [birthDate, setBirthdDate] = useState("");
  const [phone, setPhone] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");

  const [cpfValid, setCpfValid] = useState(true);

  async function handleRegisterStudent(event) {
    event.preventDefault();

    if (
      name === "" ||
      birthDate === "" ||
      phone === "" ||
      cpf === "" ||
      email === ""
    ) {
      toast.error("Preencha os campos!");
      //alert('Preencha todos os campos!')
      return;
    }
    let invalid = false;

    if (birthDate.length < 10) {
      toast.error("Data de nascimento inválida!");
      invalid = true;
    }
    if (phone.length < 15) {
      toast.error("Telefone inválido!");
      invalid = true;
    }
    if (!cpfValid) {
      toast.error("CPF inválido!");
      invalid = true;
    }
    if (invalid) {
      return;
    }

    const user_id = "10cbc1a4-8ff3-4f1a-9c55-b0edfe0dc2ac"; // Como só temos um usuário, esse id é único

    let data = {
      name,
      birthDate,
      phone,
      cpf,
      email,
      user_id,
    };

    await registerStudent(data);
  }

  useEffect(() => {
    setCpfValid(cpfValidator.cpf.isValid(cpf));
  }, [cpf]);

  const validateName = (text) => {
    let nome = "";
    nome = nome.concat(text);
    let tam = nome.length;
    const letraspermitidas =
      "ABCEDFGHIJKLMNOPQRSTUVXWYZ abcdefghijklmnopqrstuvxwyzáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ";
    while (tam--) {
      if (!letraspermitidas.includes(nome.charAt(tam))) {
        return false;
      }
    }
    return true;
  };

  return (
    <>
      <Head>
        <title>Strix - Faça seu cadastro</title>
      </Head>
      <Header />
      <div className={styles.containerCenterRegister}>
        <div className={styles.login}>
          <Link href="/" className={styles.subtitulo}>
            Cadastro de aluno
          </Link>

          <form onSubmit={handleRegisterStudent}>
            <CustomizedInputs
              size="small"
              label={"Nome completo"}
              type={"text"}
              required
              value={name}
              onChange={(e) =>
                validateName(e.target.value) ? setName(e.target.value) : null
              }
            />

            <InputMask
              mask="99/99/9999"
              maskChar=""
              value={birthDate}
              onChange={(e) => setBirthdDate(e.target.value)}
            >
              {() => (
                <CustomizedInputs
                  size="small"
                  type={"text"}
                  label={"Data de nascimento"}
                  required
                  error={birthDate.length > 0 && birthDate.length < 10}
                />
              )}
            </InputMask>

            <InputMask
              mask="(99) 99999-9999"
              maskChar=""
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            >
              {() => (
                <CustomizedInputs
                  size="small"
                  type={"text"}
                  label={"Telefone"}
                  required
                  error={phone.length > 0 && phone.length < 15}
                />
              )}
            </InputMask>

            <InputMask
              mask="999.999.999-99"
              maskChar=""
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
            >
              {() => (
                <CustomizedInputs
                  size="small"
                  type={"text"}
                  label={"CPF"}
                  required
                  error={!cpfValid && cpf.length > 0}
                />
              )}
            </InputMask>

            <CustomizedInputs
              size="small"
              type={"email"}
              label={"E-mail"}
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <p className={styles.msg}>* Campo Obrigatório</p>
            <Button type="submit">Cadastrar</Button>
          </form>

          {/* <Link href="/" className={styles.text}>
          Esqueci minha senha
        </Link> */}
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  return {
    props: {},
  };
});
