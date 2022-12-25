import Button from '@mui/material/Button';
import Head from 'next/head';

export default function Home() {
  return (
    <>
    <Head>
      <title>Strix - Página Inicial</title>
    </Head>
    <div>
      <h1 className={'title'}>WISE - Projeto de Requisitos :)</h1>
      <Button variant="contained">Teste Botão - material ui</Button>
    </div>
    </>
  )
}
