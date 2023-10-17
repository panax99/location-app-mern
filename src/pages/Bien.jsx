import axios from "axios";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { urlApi } from "../api/api";
import Navbar from "../components/Navbar"
import styles from "./css/Options.module.css"

const Bien = () => {
    {/* STATES */}
    const [show,setShow] = useState(false);
    const [showUpdate,setShowUpdate] = useState(false);
    const [showDelete,setShowDelete] = useState(false);
    const [idUser,setIdUser] = useState("");
    const [users,setUsers] = useState([]);
    //const [user,setUser] = useState({});
    const [bien,setBien] = useState([]);
    const [idDelete,setIdDelete] = useState('');
    const [idUpdate,setIdUpdate] = useState('');
    const [dataBien,setDataBien] = useState({
        type: "",
        loyer: "",
        surface: "",
        adresse: ""
    });
    const [dataLocModif,setDataLocModif] = useState({
        type: "",
        loyer: "",
        surface: "",
        adresse: ""
    });
    {/* END STATES */}

    const navigate = useNavigate()

    {/* HANDLE INPUTS */}
    const handleChange = (e) => {
        setDataBien({
            ...dataBien,
            [e.target.name] : e.target.value
        })
    }
    const handleChangeModif = (e) => {
        setDataLocModif({
            ...dataLocModif,
            [e.target.name] : e.target.value
        })
    }
    {/* END HANDLE INPUTS */}

    {/* DATA HANDLING */} 
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
                console.log(userFilter[0]?._id)
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
            await axios.get(`${urlApi}/proprios/${idUser}/bien`)
                .then((res) => {
                    if (res.data.message){
                        console.log(res.data.message)
                    } else {
                        setBien(res.data);
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
            await axios.get(`${urlApi}/bien/${idUser}/`)
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
    const postData = async() => {
        if (idUser) {
            await axios.post(`${urlApi}/proprios/${idUser}/bien`,dataBien)
                .then((res) => {
                    alert(res.data.message);
                    console.log(res.data);
                    setShow(false);
                    setDataBien({
                        type: "",
                        loyer: "",
                        surface: "",
                        adresse: ""
                    });
                })
                .catch((err) => {
                    alert(err)
                    console.error(err)
                })
        } else {
            console.log('Nothing to do!');
        }
    }
    
    const deleteBien = async() => {
        const idBien = bien.map(bien => bien._id);
        await axios.delete(`${urlApi}/proprios/${idUser}/bien/${idDelete}`)
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
    const updateBien = async() => {
        const idBien = bien.map(bien => bien._id);
        await axios.put(`${urlApi}/proprios/${idUser}/bien/${idUpdate}`,dataLocModif)
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
    {/* END DATA HANDLING */}
    //const fileredLocataire = bien.filter(bien => bien._id === dataLocModif.);

    {/* EFFECTS */}

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
        fetchData();
    },[show || showDelete || showUpdate])

    //after posting data 
    useEffect(() => {
        fetchData
    },[postData])

    useEffect(() => {
        fetchOneData();
    },[idUser])

    useEffect(() => {
        show ? document.body.style.backgroundColor = "darkgray" : null
    },[show])

    {/* END EFFECTS */}

    return(
        <>
            <Navbar/>

            {/*MAIN */}
            <div className={styles.container_options}>
                <div className={styles.container}>
                    <span style={{color:'burlywood'}}>Biens </span><br/>
                    <div className={styles.btn_ajout} onClick={() => setShow(!show)}>Ajouter nouveau</div>
                    <div className={styles.choice}>
                    {
                        bien.length > 0 ? (
                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th>Type</th>
                                        <th>Loyer</th>
                                        <th>Surface</th>
                                        <th>Adresse</th>
                                        <th style={{width:'20px'}}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        bien.map((bien) => (
                                            <tr key={bien._id}>
                                                <td>{bien.type}</td>
                                                <td>{bien.loyer} Ar</td>
                                                <td>{bien.surface}</td>
                                                <td>{bien.adresse}</td>
                                                <td style={{width:'fit-content',display:'flex',alignItems:'center'}}> 
                                                    <div className={styles.btn_modif} onClick={() => {
                                                        setShowUpdate(!showUpdate)
                                                        setIdUpdate(bien._id)
                                                    }}
                                                    >
                                                        <i className="fas fa-pen"></i>
                                                    </div>
                                                    <div className={styles.btn_suppr} onClick={() => {
                                                        setShowDelete(!showDelete)
                                                        setIdDelete(bien._id);
                                                    }}>
                                                        <i className="fas fa-trash"></i>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        ) : (
                            <div className={styles.table}>
                                <p style={{textAlign:'center'}}>Aucun bien enregistré.</p>
                            </div>
                        )
                    }
                    </div>
                </div>
            </div>

            {/*MODALS */}

            <div className={show ? styles.modal : styles.modal_none}>
                <h2>Nouveau bien</h2>
                <input type={"text"} placeholder="Type" name='type' value={dataBien.type} onChange={handleChange}/>
                <input type={"text"} placeholder="Loyer" name='loyer' value={dataBien.loyer} onChange={handleChange}/>
                <input type={"text"} placeholder="Surface" name='surface' value={dataBien.surface} onChange={handleChange}/>
                <input type={"text"} placeholder="Adresse" name='adresse' value={dataBien.adresse} onChange={handleChange}/>
                
                <div className={styles.btn_ajout_confirm} onClick={() => postData()} key={bien._id}>Valider</div>

            </div>

            <div className={showUpdate ? styles.modal : styles.modal_none}>
                <h2>Modifier le bien</h2>
                <input type={"text"} placeholder="Type" name='type' value={dataLocModif.type} onChange={handleChangeModif}/>
                <input type={"text"} placeholder="Loyer" name='loyer' value={dataLocModif.loyer} onChange={handleChangeModif}/>
                <input type={"text"} placeholder="surface" name='surface' value={dataLocModif.surface} onChange={handleChangeModif}/>
                <input type={"text"} placeholder="Adresse postal" name='adresse' value={dataLocModif.adresse} onChange={handleChangeModif}/>

                <div className={styles.btn_ajout_confirm} onClick={updateBien}>Valider</div>
            </div>

            <div className={showDelete ? styles.modal : styles.modal_none} style={{height:'40%'}}>
                <h2>Supprimer le bien</h2>
                <p>Etes vous sûr de vouloir supprimer?</p>
                <div className={styles.btn_ajout_confirm} onClick={deleteBien}>Supprimer</div>
                <div className={styles.btn_ajout_confirm} onClick={() => setShowDelete(false)} style={{marginTop:'5px'}}>Annuler</div>
            </div>
            
        </>
    )
}
export default Bien