import * as React from 'react';
import { useContext } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { setupAPIClient } from '../../services/api';
import { canSSRAuth } from '../../../utils/canSSRAuth';
import { Header } from '../../components/Header';
import { Button } from '../../components/ui/Button';
import Router from 'next/router';
import styles from './styles.module.scss';
import { AuthContext } from '../../contexts/AuthContext';

export default function AulasPage({ classes }) {
  const { studentIdState } = useContext(AuthContext);

  const columns = [
    { field: 'id', headerName: 'ID', width: 90, editable: false },
    {
      field: 'name',
      headerName: 'Nome',
      width: 170,
      editable: false,
    },
    {
      field: 'date',
      headerName: 'Data',
      width: 170,
      editable: false,
    },
    {
      field: 'time',
      headerName: 'Horário',
      width: 170,
      editable: false,
    },
    {
      field: 'duration',
      headerName: 'Duração',
      width: 170,
      editable: false,
    },
    {
      field: 'studentName',
      headerName: 'Aluno',
      width: 170,
      editable: false,
    },
    {
      field: "Editar",
      headerName: "Editar",
      sortable: false,
      width: 122,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation();
  
          const api = params.api;
          const thisRow = {};
  
          api
            .getAllColumns()
            .filter((c) => c.field !== '__check__' && !!c)
            .forEach(
              (c) => (thisRow[c.field] = params.getValue(params.id, c.field)),
            );
          let id = thisRow.id;
          studentIdState(id);
          Router.push('/editAula');
          return console.log(JSON.stringify(thisRow, null, 4));
        };
  
        return <Button onClick={onClick}>Editar</Button>;
      }
    },
  ];


  return (
    <div className={styles.containerCenter}>
      <Header />
      <p className={styles.titulo}>Minhas Aulas</p>
      <DataGrid
        rows={classes}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        columnVisibilityModel={{ // Para esconder a coluna id
            id: false
          } 
        }

        sx={{
          height: 400,
          backgroundColor: 'transparent',
          color: '#FFF',
          border: 0,
          borderRadius: '10px',
          '& .MuiDataGrid-cell:hover': {
            color: '#48577E',
            backgroundColor: '#3AAFA1;'
          },
          '& .MuiDataGrid-row:hover': {
            backgroundColor: '#3AAFA1',
            color: '#FFF'
          },
          '& .MuiDataGrid-row': {
            background: '#3AAFA1',
          }
        }}
      />
        <Button onClick={handleRegisterLink} style={{ 
          backgroundColor: '#3A62AF',
          height: '60px',
          width: '480px',
          fontSize: '20px',
          marginBottom: '50px'
        }}>
          Adicionar nova aula
        </Button> 
      </div>
  );
}

function handleRegisterLink() {
    Router.push('/createAula');
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    const apiClient = setupAPIClient(ctx);
    const classRes = await apiClient.get('/class/detail');
    return {
        props: {
            classes: classRes.data
        }
    }
})