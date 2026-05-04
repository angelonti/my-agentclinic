import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import styles from './Layout.module.css';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.layout}>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </div>
  );
}