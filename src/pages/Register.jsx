import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { urlApi } from '../api/api';
import styles from './css/Auth.module.css';



const Register = () => {
    const navigate = useNavigate()
    const [user,setUser] = useState({
        lastname: "",
        firstname: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name] : e.target.value
    })
    }

    const signUp = async() => {
        await axios.post(urlApi+'/proprios/register',user)
            .then((res) => {
                if (res.data.status === 401){
                    alert(res.data.message)
                } else {
                    alert(res.data.message)
                    navigate('/login')
                }
            }
            )
            .catch((err) => {
                alert(err.response.data.message);
            })
    }

    useEffect(() => {
        document.body.style.backgroundColor = "burlywood";
    },[]);

    return(
        <>
            <div className={styles.container_auth}>
                <div className={styles.container}>
                    <span className={styles.title}>MyLocation!</span>
                    <p>Créer un nouveau compte</p>
                    <input type={"text"} placeholder="Nom" name='lastname' value={user.lastname} onChange={handleChange}/>
                    <input type={"text"} placeholder="Prenom" name='firstname' value={user.firstname} onChange={handleChange}/>
                    <input type={"text"} placeholder="Email" name='email' value={user.email} onChange={handleChange}/>
                    <input type={"text"} placeholder="Mot de passe" name='password' value={user.password} onChange={handleChange}/>
                    <button className={styles.btnOne} onClick={signUp}>Confirmer</button>
                    <p>Vous avez déjà un compte? <Link to={'/login'}>Se connecter</Link></p>
                </div>
            </div>
        </>
    )
}
export default Register