import { Header } from "../../components/Header";
import styles from "./styles.module.scss";
import { canSSRAuth } from "../../../utils/canSSRAuth";
import { setupAPIClient } from "../../services/api";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "../../components/ui/Button";
import Router from 'next/router';
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export default function FinancasPage({ pendentStudents }) {
  const { studentPendenciesState } = useContext(AuthContext);
  const {studentName} = useContext(AuthContext);

  function handleNewPendencyClick() {
    Router.push("/registerPendency");
  }

  const columns = [
    { field: "nome", headerName: "Nome", width: 150, editable: false },
    { field: "studentId", headerName: "ID", width: 150, editable: false, hide: true },
    {
      field: "qtd_pendencias",
      headerName: "Quantidade de pendências",
      width: 300,
      editable: false,
    },
    {
      field: "saldo_devedor",
      headerName: "Saldo devedor",
      width: 300,
      editable: false,
    },
    {
      field: "visualizar",
      headerName: "Ação",
      sortable: false,
      width: 200,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation();

          const api = params.api;
          const thisRow = {};

          api
            .getAllColumns()
            .filter((c) => c.field !== "__check__" && !!c)
            .forEach(
              (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
            );
          let student_id = thisRow.studentId;
          let nome = thisRow.nome;
          studentPendenciesState(student_id);
          studentName(nome);
          Router.push('/detailPendency');
          return console.log(JSON.stringify(thisRow, null, 4));
        };

        return <Button onClick={onClick}>Visualizar</Button>;
      },
    },
  ];

  return (
    <div className={styles.containerCenter}>
      <Header />
      <p className={styles.titulo}>Alunos Com Pendências</p>
      <DataGrid
        rows={pendentStudents}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        sx={{
          height: 400,
          backgroundColor: "transparent",
          color: "#FFF",
          border: 0,
          borderRadius: "10px",
          "& .MuiDataGrid-cell:hover": {
            color: "#48577E",
            backgroundColor: "#3AAFA1;",
          },
          "& .MuiDataGrid-row:hover": {
            backgroundColor: "#3AAFA1",
            color: "#FFF",
          },
          "& .MuiDataGrid-row": {
            background: "#3AAFA1",
          },
        }}
      />

      <Button
        onClick={handleNewPendencyClick}
        style={{
          backgroundColor: "#3A62AF",
          height: "60px",
          width: "480px",
          fontSize: "20px",
        }}
      >
        Adicionar nova pendência
      </Button>
    </div>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);
  try {
    const response = await apiClient.get("/listPendentStudents");
    console.log("response de /listPendentStudents: " + response)
    const res = await response.data;
    console.log("e a response.data é: %s", res.data);
    return {
      props: {
        pendentStudents: res,
      },
    };
  } catch (err) {
    console.log("erro: " + err.data);
    return err;
  }

});
