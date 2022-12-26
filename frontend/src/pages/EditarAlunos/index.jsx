import {Fragment, useState} from 'react';
import Head from 'next/head';
import styles from './styles.module.scss';
import Button from '@mui/material/Button';
import { CPFInput, NumberInput, TextInput } from '../../components/Inputs';
import SpringModal from '../../components/Modal';
import { Excluir } from '../../components/Confirm';

export default function EditarAlunos() {
    const validaNome = (text) => {
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
    const [name, setName] = useState("Fulano de Tal")
    const handleInputName = ({ target: { value } }) => {
        if (validaNome(value)) {
            setName(value)
        }
    }
    
    const [date, setDate] = useState("11/11/2000")
    const handleInputDate = ({ target: { value } }) => setDate(value)
    
    const [phone, setPhone] = useState("99123456789")
    const handleInputPhone = ({ target: { value } }) => setPhone(value)
    
    const [cpf, setCpf] = useState("123.456.789-00")
    
    const [email, setEmail] = useState("fulano@email.com")
    const handleInputEmail = ({ target: { value } }) => setEmail(value)
    
    const [openModal, setOpenModal] = useState(false)
    const handleOpenModal = () => setOpenModal(true)
    const handleCloseModal = () => setOpenModal(false)

    return (
        <Fragment>
            <Head>
                <title>Strix - Edição de Aluno</title>
            </Head>
            <SpringModal
                open={openModal}
                handleClose={handleCloseModal}
                component={<Excluir message="Confirmar exclusão?" funcNo={handleCloseModal}/>}
            />
            <div className={styles.container}>
                <h1 className={styles.title}>Edição de Aluno</h1>
                <div className={styles.group}>
                    <div className={styles.fields}>
                        <TextInput
                            value={name} 
                            label="Nome completo"
                            onChange={handleInputName}
                        />
                        <NumberInput 
                            value={date}
                            mask="99/99/9999"
                            label="Data de nascimento"
                            onChange={handleInputDate}
                        />
                        <NumberInput 
                            value={phone}
                            mask="(99) 99999-9999"
                            label="Telefone"
                            onChange={handleInputPhone}
                        />
                        <CPFInput
                            value={cpf} 
                            label="CPF"
                        />
                        <TextInput
                            value={email} 
                            label="E-mail"
                            onChange={handleInputEmail}
                        />
                    </div>
                    <div className={styles.buttons}>
                        <Button
                            variant={'contained'}
                            color={'primary'}
                            className={styles.button}
                            size={'large'}
                        >
                            Salvar
                        </Button>
                        <Button
                            variant={'contained'}
                            color={'error'}
                            className={styles.button}
                            size={'large'}
                            onClick={handleOpenModal}
                        >
                            Excluir Aluno
                        </Button>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
