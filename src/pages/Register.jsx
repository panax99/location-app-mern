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
    const [watchPwd,setWatchPwd] = useState(false);

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
                <div className={styles.container+" relative space-y-5"}>
                    <span className={styles.title}>MyLocation!</span>
                    <p>Créer un nouveau compte</p>
                    <input type={"text"} className="py-3 outline-none focus:border-b-orange-300 focus:border-" placeholder="Nom" name='lastname' value={user.lastname} onChange={handleChange}/>
                    <input type={"text"} className="py-3 outline-none focus:border-b-orange-300 focus:border-" placeholder="Prenom" name='firstname' value={user.firstname} onChange={handleChange}/>
                    <input type={"text"} className="py-3 outline-none focus:border-b-orange-300 focus:border-" placeholder="Email" name='email' value={user.email} onChange={handleChange}/>
                    <div className='relative flex w-full items-center justify-center overflow-hidden'>
                        <input type={`${watchPwd ? "text" : "password"}`} className="py-3 outline-none focus:border-b-orange-300 focus:border-" placeholder="Mot de passe" name='password' value={user.password} onChange={handleChange}/>
                        <i className={`fas ${watchPwd ? "fa-eye-slash" : "fa-eye"}  fa-md absolute justify-end right-0`} onClick={() => {setWatchPwd(prev => !prev)}}/>
                    </div>
                    <button className={"py-2 px-3 bg-gradient-to-bl text-white from-orange-200 to-[#DEB887] w-full rounded "} onClick={signUp}>Confirmer</button>
                    <p >Vous avez déjà un compte? <Link to={'/login'} className='text-orange-300'>Se connecter</Link></p>
                </div>
            </div>
        </>
    )
}
export default Register