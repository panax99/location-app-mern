import axios from 'axios'
import React, { useEffect, useState } from 'react'

const useFetch = (url,method,body) => {
    const [data,setData] = useState(null);
    const [error,setError] = useState(null);
    const [isLoading,setIsLoading] = useState(false);

    useEffect(async() => {
        if (method === "get") {
            await axios.get(url)
                .then(res => {
                    setData(res.data);
                })
                .catch(err => {
                    setError(err)
                })
        } else {
            axios.post(url,body)
                .catch(err => {
                    setError(err)
                })
        }
    }, [url,method,body])

    return { data,error,isLoading }
    
}

export default useFetch