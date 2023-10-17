import { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import styles from './css/Home.module.css';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { urlApi } from '../api/api';

const Account = () => {
    const navigate = useNavigate();
    const [userAuth,setUserAuth] = useState({});
    const [users,setUsers] = useState([]);

    // fetch data  
    const getUsers = async() => {
        await axios.get(urlApi+'/proprios')
            .then((res) => {
                if (res.data.message) {
                    console.log(res.data.message)
                } else {
                    setUsers(res.data);
                }
            })
            .catch(err => 
                console.error(err.response.data.message)
            )
    }

    //in the auth
    const getUserAuth = () => {
        if (users){
            const token = localStorage.getItem("token");
            const decode = jwtDecode(token);
            if (decode) {
                const emailUser = decode.email;
                const userFilter = users.filter(user => user.email === emailUser);
                setUserAuth(userFilter[0] ? userFilter[0] : userFilter);
                console.log(userFilter);
            } else {
                navigate('/login');
                alert('Session expiré!');
                localStorage.removeItem("token");
            }
        } else {
            console.log("Nothing to do! Users not fetched")
        }
    }

    //
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
        getUserAuth();
    },[users])

    useEffect(() => {
        checkValid()
        getUsers()
    },[])

    return(
        <>
            <Navbar/>
            <div className={styles.container_home}>
                <div className={styles.container}>
                    <span className={styles.title}>MyLocation!</span><br/>
                    <p>Vos informations :</p>
                    <div className={styles.choice}>
                    {    
                        <>
                            <div className={styles.p} style={{textAlign:"start"}}>
                                Nom : {userAuth.lastname}
                            </div>
                            <div className={styles.p}>
                                Prenom : {userAuth.firstname}
                            </div>
                            <div className={styles.p}>
                                Email : {userAuth.email}
                            </div>
                            <div className={styles.p}>
                                Biens: {userAuth.biens?.length}
                            </div>
                            <div className={styles.p}>
                                Locataires: {userAuth.locataires?.length}
                            </div>
                            
                    </>
                    }
                    </div>
                </div>
            </div>
        </>
    )
}
export default Account