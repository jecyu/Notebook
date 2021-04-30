import styles from './index.less';
import { Logo}  from '@/components/logo/Logo';
export default function IndexPage() {
  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
      <Logo className="app-logo"></Logo>
    </div>
  );
}
