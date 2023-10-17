import { useEffect,useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './css/Auth.module.css';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { urlApi } from '../api/api';

const Signin = () => {
    const navigate = useNavigate()
    const [user,setUser] = useState({
        email: "",
        password: ""
    });

    const checkValid = async() => {
        try {
            const accessToken = sessionStorage.getItem("accessToken");
            const decoded = await jwtDecode(accessToken);
            if (accessToken) {
                if(decoded.email){   
                    navigate('/');
                    alert("Veuillez vous déconnectez!");
                } else {
                    console.log('Connectez vous')
                }
            }
        } catch (error) {
            navigate('/login')
            sessionStorage.removeItem("accessToken");
        }
    }
    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name] : e.target.value
        })
    }

    useEffect(() => {
        checkValid()
    },[])

    const signIn = async() => {
        await axios.post(urlApi+'/proprios/login',user)
            .then((res) => {
                sessionStorage.setItem("accessToken",res.data.accessToken);
                localStorage.setItem("token",res.data.token);
                alert(res.data.message);
                navigate('/');
            })
            .catch((err) => {
                alert(err.response.data.message);
                console.error(err);
            })
    }
    return(
        <>
            <div className={styles.container_auth}>
                <div className={styles.container}>
                    <span className={styles.title}>MyLocation!</span>
                    <p>Connectez-vous ici</p>
                    <input type={"text"} placeholder="Email" name='email' value={user.email} onChange={handleChange}/>
                    <input type={"text"} placeholder="Mot de passe" name='password' value={user.password} onChange={handleChange}/>
                    <button className={styles.btnOne} onClick={signIn}>Confirmer</button>
                    <p>Vous n'avez pas de compte? <Link to={'/register'}>S'inscrire</Link></p>
                </div>
            </div>
        </>
    )
}
export default Signin