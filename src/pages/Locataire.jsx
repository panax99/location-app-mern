import axios from "axios";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { urlApi } from "../api/api";
import Navbar from "../components/Navbar"
import styles from "./css/Options.module.css"

const Locataire = () => {
    const [show,setShow] = useState(false);
    const [showUpdate,setShowUpdate] = useState(false);
    const [showDelete,setShowDelete] = useState(false);
    const [idUser,setIdUser] = useState("");
    const [users,setUsers] = useState([]);
    const [user,setUser] = useState({});
    const [locataire,setLocataire] = useState([]);

    const [dataLoc,setDataLoc] = useState({
        lastname: "",
        firstname: "",
        address: "",
        email: "",
        telephone: "",
        bien: ""
    });

    const [dataLocModif,setDataLocModif] = useState({
        lastname: "",
        firstname: "",
        address: "",
        email: "",
        telephone: "",
        bien: ""
    });
    const navigate = useNavigate()

    // handle change inputs
    const handleChange = (e) => {
        setDataLoc({
            ...dataLoc,
            [e.target.name] : e.target.value
        })
    }
    const handleChangeModif = (e) => {
        setDataLocModif({
            ...dataLocModif,
            [e.target.name] : e.target.value
        })
    }

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
    const getUserAuth = () => {
        if (users.length > 0){
            const token = localStorage.getItem("token");
            const decode = jwtDecode(token);
            if (decode) {
                const emailUser = decode.email;
                const userFilter = users.filter(user => user.email === emailUser);
                setIdUser(userFilter[0]?._id);
                console.log(userFilter[0]?._id);
            } else {
                navigate('/login');
                alert('Session expiré!');
                localStorage.removeItem("token");
            }
        } else {
            console.log("Nothing to do! Users not fetched")
        }
    }
    const fetchData = async() => {
        if (idUser) {
            await axios.get(`${urlApi}/proprios/${idUser}/loc`)
                .then((res) => {
                    if (res.data.message){
                        console.log(res.data.message)
                    } else {
                        setLocataire(res.data);
                        console.log(res.data);
                    }
                })
                .catch(err => 
                    console.error(err.response.data.message)
                )
        } else {
            console.log('Nothing to do!');
        }
    }
    const fetchOneData = async() => {
        if (idUser) {
            await axios.get(`${urlApi}/loc/${idUser}/`)
                .then((res) => {
                    if (res.data.message){
                        console.log(res.data.message)
                    } else {
                        setDataLocModif(res.data);
                        console.log(res.data);
                    }
                })
                .catch(err => 
                    console.error(err.response.data.message)
                )
        } else {
            console.log('Nothing to do!');
        }
    }
    const postData = async(idBien) => {
        if (idUser) {
            await axios.post(`${urlApi}/proprios/${idUser}/loc/bien/${idBien}`)
                .then((res) => {
                    if (res.data.message){
                        console.log(res.data.message)
                    } else {
                        setLocataire(res.data);
                        console.log(res.data);
                    }
                })
                .catch((err) => {
                    alert(err.response.data.message)
                    console.error(err.response.data.message)
                })
        } else {
            console.log('Nothing to do!');
        }
    }
    const deleteLocataire = async() => {
        const idLoc = locataire.map(locataire => locataire._id);
        await axios.delete(`${urlApi}/proprios/${idUser}/loc/${idLoc}`)
            .then((res) => {
                if (res.data.message){
                    alert(res.data.message);
                    setShowDelete(false);
                } else {
                    console.log(res.data);
                }
            })
            .catch((err) => {
                alert(err.response.data.message);
                console.error(err.response.data.message);
            })
    }
    const updateLocataire = async() => {
        const idLoc = locataire.map(locataire => locataire._id);
        await axios.put(`${urlApi}/proprios/${idUser}/loc/${idLoc}`,dataLocModif)
            .then((res) => {
                if (res.data.message){
                    alert(res.data.message);
                    setShowUpdate(false);
                } else {
                    console.log(res.data);
                }
            })
            .catch((err) => {
                alert(err.response.data.message);
                console.error(err.response.data.message);
            })
    }
    //const fileredLocataire = locataire.filter(locataire => locataire._id === dataLocModif.);

    useEffect(() => {
        getUsers();
    },[])

    useEffect(() => {
        getUserAuth();
    },[users])

    useEffect(() => {
        fetchData();
    },[idUser])

    useEffect(() => {
        fetchOneData();
    },[idUser])

    useEffect(() => {
        show ? document.body.style.backgroundColor = "darkgray" : null
    },[show])

    return(
        <>
            <Navbar/>

            {/*MAIN */}
            <div className={styles.container_options}>
                <div className={styles.container}>
                    <span style={{color:'burlywood'}}>Locataires </span><br/>
                    <div className={styles.btn_ajout} onClick={() => setShow(!show)}>Ajouter nouveau</div>
                    <div className={styles.choice}>
                    {
                        locataire.length > 0 ? (
                            <table className={styles.table}>
                                <thead>
                                    <td>Nom</td>
                                    <td>Prenom</td>
                                    <td>Email</td>
                                    <td>Adresse</td>
                                    <td>Téléphone</td>
                                    <td>Bien</td>
                                    <td>Actions</td>
                                </thead>
                                <tbody>
                                    {
                                        locataire.map((locataire) => (
                                            <tr key={locataire._id}>
                                                <td>{locataire.lastname}</td>
                                                <td>{locataire.firstname}</td>
                                                <td>{locataire.email}</td>
                                                <td>{locataire.address}</td>
                                                <td>{locataire.telephone}</td>
                                                <td>{locataire.bien}</td>
                                                <td style={{width:'15%',display:'flex',alignItems:'center'}}> 
                                                    <div className={styles.btn_modif} onClick={() => setShowUpdate(!showUpdate)}><i className="fas fa-pen"></i></div>
                                                    <div className={styles.btn_suppr} onClick={() => setShowDelete(!showDelete)}><i className="fas fa-trash"></i></div>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        ) : (
                            <div className={styles.table}>
                                <p style={{textAlign:'center'}}>Aucun locataire inscrit.</p>
                            </div>
                        )
                    }
                    </div>
                </div>
            </div>

            {/*MODALS */}

            <div className={show ? styles.modal : styles.modal_none}>
                <h2>Nouveau locataire</h2>
                <input type={"text"} placeholder="Nom" name='lastname' value={dataLoc.lastname} onChange={handleChange}/>
                <input type={"text"} placeholder="Prenom" name='firstname' value={dataLoc.firstname} onChange={handleChange}/>
                <input type={"text"} placeholder="Email" name='email' value={dataLoc.email} onChange={handleChange}/>
                <input type={"text"} placeholder="Adresse postal" name='address' value={dataLoc.address} onChange={handleChange}/>
                <input type={"text"} placeholder="Téléphone" name='telephone' value={dataLoc.telephone} onChange={handleChange}/>
                <input type={"text"} placeholder="Bien" name='bien' value={dataLoc.bien} onChange={handleChange}/>
                
                <div className={styles.btn_ajout_confirm} onClick={() => postData(dataLoc.bien)}>Valider</div>

            </div>

            <div className={showUpdate ? styles.modal : styles.modal_none}>
                <h2>Modifier le locataire</h2>
                <input type={"text"} placeholder="Nom" name='lastname' value={dataLocModif.lastname} onChange={handleChangeModif}/>
                <input type={"text"} placeholder="Prenom" name='firstname' value={dataLocModif.firstname} onChange={handleChangeModif}/>
                <input type={"text"} placeholder="Email" name='email' value={dataLocModif.email} onChange={handleChangeModif}/>
                <input type={"text"} placeholder="Adresse postal" name='address' value={dataLocModif.address} onChange={handleChangeModif}/>
                <input type={"text"} placeholder="Téléphone" name='telephone' value={dataLocModif.telephone} onChange={handleChangeModif}/>
                <input type={"text"} placeholder="Bien" name='bien' value={dataLocModif.bien} onChange={handleChangeModif}/>
                <div className={styles.btn_ajout_confirm} onClick={updateLocataire}>Valider</div>
            </div>

            <div className={showDelete ? styles.modal : styles.modal_none}>
                <h2>Supprimer le locataire</h2>
                <p>Etes vous sûr de vouloir supprimer?</p>
                <div className={styles.btn_ajout_confirm} onClick={deleteLocataire}>Supprimer</div>
                <div className={styles.btn_ajout_confirm} onClick={() => setShowDelete(!show)}>Annuler</div>
            </div>
            
        </>
    )
}
export default Locataire