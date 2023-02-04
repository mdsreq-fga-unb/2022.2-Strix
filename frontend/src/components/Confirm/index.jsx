import { Box, Button } from "@mui/material";
import { Fragment } from "react"
import styles from './styles.module.scss';

const BoxStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: 24,
    p: 4,
}

export const Excluir = ({funcNo, funcYes}) => {
    return (
        <Fragment>
            <Box sx={BoxStyle} className={styles.container}>
                <h1 className={styles.title}>Confirmar exclusão?</h1>
                <div className={styles.buttons}>
                    <Button
                        variant={'contained'}
                        color={'primary'}
                        className={styles.button}
                        size={'large'}
                        onClick={funcNo}
                    >
                        Não
                    </Button>
                    <Button
                        variant={'contained'}
                        color={'error'}
                        className={styles.button}
                        size={'large'}
                        onClick={funcYes}
                    >
                        Sim
                    </Button>
                </div>
            </Box>
        </Fragment>
    )
}