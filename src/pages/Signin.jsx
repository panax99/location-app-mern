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
    const [watchPwd,setWatchPwd] = useState(false);


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
                <div className={styles.container+" space-y-5"}>
                    <span className={styles.title}>MyLocation!</span>
                    <p>Connectez-vous ici</p>
                    <div className='relative flex flex-col mb-3 w-full items-center space-y-3 justify-center overflow-hidden'>
                        <input type={"text"} className="py-3 outline-none focus:border-b-orange-300 focus:border-" placeholder="Email" name='email' value={user.email} onChange={handleChange}/>
                        <div className='relative flex w-full items-center justify-center overflow-hidden'>
                            <input type={`${watchPwd ? "text" : "password"}`} className="py-3 outline-none focus:border-b-orange-300 focus:border-" placeholder="Mot de passe" name='password' value={user.password} onChange={handleChange}/>
                            <i className={`fas ${watchPwd ? "fa-eye-slash" : "fa-eye"}  fa-md absolute justify-end right-0`} onClick={() => {setWatchPwd(prev => !prev)}}/>
                        </div>
                    </div>
                    
                    <button className={"py-2 px-3 bg-gradient-to-bl text-white from-orange-200 to-[#DEB887] w-full rounded "} onClick={signIn}>Confirmer</button>
                    <p c>Vous n'avez pas de compte? <Link to={'/register'} className='text-orange-300'>S'inscrire</Link></p>
                </div>
            </div>
        </>
    )
}
export default Signin