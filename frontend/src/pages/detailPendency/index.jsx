import { useContext, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { setupAPIClient } from "../../services/api";
import { canSSRAuth } from "../../../utils/canSSRAuth";
import { Header } from "../../components/Header";
import { Button } from "../../components/ui/Button";
import Router from "next/router";
import styles from "./styles.module.scss";
import { AuthContext } from "../../contexts/AuthContext";
import { useState } from "react";
import { api } from "../../services/apiClient";

export default function DetailPendencyPage({ pendencies }) {
  const { pendencyStudentId } = useContext(AuthContext);
  const { pendencyStudentName } = useContext(AuthContext);
  const [state, setState] = useState([]);
  const { setDetailedPendency } = useContext(AuthContext);

  useEffect(() => {
    let new_arr = [];
    console.log("total de pendencias existentes: %d", pendencies.length);
    console.log("id do student vindo do props: %s", pendencyStudentId);
    console.log("nome: %s", pendencyStudentName);
    for (let i = 0; i < pendencies.length; i++) {
      console.log(
        "id do student da pendencia atual: %s",
        pendencies[i].studentId
      );
      if (pendencies[i].studentId === pendencyStudentId) {
        console.log("pendencia %d achada pro aluno", i);
        new_arr.push(pendencies[i]);
      }
    }
    setState(new_arr);
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 90, editable: false, hide: true },
    {
      field: "price",
      headerName: "Valor",
      width: 150,
      editable: false,
    },
    {
      field: "description",
      headerName: "Descrição",
      width: 500,
      editable: false,
    },
    {
      field: "Editar",
      headerName: "Editar",
      sortable: false,
      width: 130,
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

          const id = thisRow.id;
          setDetailedPendency(id);
          Router.push("/editPendency");
        };

        return <Button onClick={onClick}>Editar</Button>;
      },
    },
  ];

  return (
    <div className={styles.containerCenter}>
      <Header />
      <p className={styles.titulo}>Pendências do {pendencyStudentName}</p>
      <DataGrid
        rows={state}
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
    </div>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);
  console.log("mandando request no detailPendency getSSP");
  const res = await apiClient.get("/listAllPendencies");
  console.log("response from detailPendency: " + res);
  return {
    props: {
      pendencies: await res.data,
    },
  };
});
