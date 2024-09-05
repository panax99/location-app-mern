import React, { useState } from 'react'
import useFetch from '../hooks/useFetch';

const Test = () => {
    const [user,setUser] = useState({
        usernamme: '',
        mail: ''
    });
    const {data,error,isLoading} = useFetch('http://localhost:8080/api/users','get',null);



    const handleChange = (e) => {
        setUser({
            ...prev,
            [e.target.name] : e.target.value
        }
        )
    }
    const submit = () => {

    }

    return (
        <div style={{background:"red"}}>
            Test ttgtgy:
            <input type="text" name='username' placeholder='username' value={user.usernamme} onChange={handleChange}/>
            <input type="text" name='mail' placeholder='mail' value={user.mail} onChange={handleChange}/>
            <button onClick={submit}>Dark</button>
            { user && 
                <div>
                    <p>{data.usernamme}</p>
                    <p>{data.mail}</p>
                </div>
            }
        </div>
    )
}


export default Test