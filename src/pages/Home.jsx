import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import styles from './css/Home.module.css';
import jwtDecode from 'jwt-decode';

const Home = () => {
    const navigate = useNavigate();

    const checkValid = async() => {
        try {
            const token = localStorage.getItem("token");
            const decoded = await jwtDecode(token);
            if (token){
                if(decoded.email){
                    console.log('Acces autorisé')
                } else {
                    navigate('/login');
                    alert("Vous n'avez pas d'autorisation!");
                }
            } else {
                alert('pas de token')
            }
        } catch (error) {
            navigate('/login');
            alert("Vous n'avez pas d'autorisation!");
            localStorage.removeItem("token");
        }
    }

    useEffect(() => {
        checkValid()
    },[])

    return(
        <>
            <Navbar/>
            <div className={styles.container_home}>
                <div className={styles.container}>
                    <span>Bienvenue sur </span><span className={styles.title}>MyLocation!</span><br/>
                    <p>Voici les options proposés :</p>
                    <div className={styles.choice}>
                        <div className={styles.biens} onClick={() => navigate('/biens')}>
                            Biens
                        </div>
                        <div className={styles.locataire} onClick={() => navigate('/locataires')}>
                            Locataires
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Home