import { NavLink, useNavigate } from 'react-router-dom';
import styles from './css/Navbar.module.css';

const Navbar = () => {
    const navigate = useNavigate()
    const logOut = () => {
        localStorage.removeItem("token");
        sessionStorage.removeItem("accessToken");
        navigate('/login');
    }

    return(
        <>
            <div className={styles.navbar}>
                <span className={styles.title} style={{paddingTop:'2em'}}>MyLocation!</span>
                <ul>
                    <li style={{cursor: 'pointer',color:'white',fontSize:'22px',fontWeight:600}}>
                        <i className="fa-solid fa-lg fa-user " style={{color:'white',marginRight:'19px',marginLeft:'3px'}}></i>
                        <NavLink to={'/compte'} style={{color:'white',fontSize:'22px',fontWeight:600,textDecoration:'none'}}>
                            Mon compte
                        </NavLink> 
                    </li>
                    <li style={{cursor: 'pointer',color:'white',fontSize:'22px',fontWeight:600}}>
                        <i className="fa-solid fa-lg fa-house " style={{color:'white',marginRight:'16px'}}></i>
                        <NavLink to={'/biens'} style={{color:'white',fontSize:'22px',fontWeight:600,textDecoration:'none'}}>
                            Mes biens
                        </NavLink>
                    </li>
                    <li style={{cursor: 'pointer',fontSize:'22px'}}>
                        <i className="fa-solid fa-lg fa-users " style={{color:'white',marginRight:'14px'}}></i>
                        <NavLink to={'/locataires'} style={{color:'white',fontSize:'22px',fontWeight:600,textDecoration:'none'}}>
                            Mes locataires
                        </NavLink>
                    </li>
                    <li onClick={logOut} style={{cursor: 'pointer',color:'white',fontSize:'22px',fontWeight:600,bottom:0}}>
                        <i className="fa-solid fa-lg fa-power-off " style={{color:'white',marginRight:'18px',marginLeft:'3px'}}></i>
                        Se déconnecter
                    </li>
                </ul>
            </div>
        </>
    )
}
export default Navbar