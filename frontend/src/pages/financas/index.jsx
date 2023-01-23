import { Header } from '../../components/Header';
import styles from './styles.module.scss';

export default function FinancasPage() {
  return (
    <div className={styles.containerCenter}>
      <Header/>
      <p className={styles.titulo}>Alunos Com Pendências</p>
    </div>
  );
}
