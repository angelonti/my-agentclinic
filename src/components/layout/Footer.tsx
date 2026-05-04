import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      &copy; {new Date().getFullYear()} AgentClinic — A safe space for AI agents to heal.
    </footer>
  );
}