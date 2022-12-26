import InputMask from 'react-input-mask';
import { alpha, TextField } from '@mui/material';
import { theme } from '../Theme';
import styles from './styles.module.scss';

const sx = {
    "& .MuiInputLabel-root": {
        color: '#48577E',
        fontSize: '1.2rem',
        backgroundColor: '#D9D9D9',
        borderRadius: '10px',
        paddingX: '10px',
        left: '-5px'
    },
    "& .MuiOutlinedInput-root": {
        "& > fieldset": {
            borderColor: theme.palette.primary.main,
            borderRadius: '15px',
            borderWidth: '3px'
        },
    },

    "& .MuiOutlinedInput-root.Mui-focused": {
        "& > fieldset": {
            borderColor: theme.palette.secondary.main,
            borderWidth: '3px',
            boxShadow: `${alpha(theme.palette.secondary.main, 0.25)} 0 0 0 3px`,
        }
    },
    
    "& .MuiOutlinedInput-root:hover": {
        "& > fieldset": {
            borderColor: theme.palette.primary.light,
            boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
            borderWidth: '3px'
        }
    }
}

export function TextInput(props) {
    return (
        <TextField
            className={styles.textField}
            onChange={props.onChange}
            value={props.value}
            label={props.label} 
            required
            type="text"
            sx={sx}
        />
    )
}

export function NumberInput(props) {
    return (
        <InputMask 
            mask={props.mask}
            maskChar=""
            value={props.value} 
            onChange={props.onChange}
        >
            {() => <TextField
                className={styles.textField}
                label={props.label} 
                required
                sx={sx}
            />}
        </InputMask>
    )
}

export function CPFInput(props) {
    return (
        <TextField
            value={props.value}
            className={styles.textFieldDisabled}
            label={props.label} 
            required
            disabled
            sx={{...sx, "& .MuiInputLabel-root": {
                color: '#48577E',
                fontSize: '1.2rem',
                backgroundColor: '#979797',
                borderRadius: '10px',
                paddingX: '10px',
                left: '-5px'
            },
            "& .MuiOutlinedInput-root:hover": {
                "& > fieldset": {}
            }}}
        />
    )
}
