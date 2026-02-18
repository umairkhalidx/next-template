import styles from './homepage.module.css';
import MainFooter from './MainFooter';
import MainHeader from './MainHeader';

export default function HomePage() {
    return (
        <>
            <MainHeader />
            <main className={styles.main}>
                {/* Scrollable area for background transition */}
            </main>
            <MainFooter />
        </>
    );
}
