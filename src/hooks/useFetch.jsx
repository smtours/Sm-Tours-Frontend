import React, { useEffect, useState } from 'react'

const useFetch = (url) => {
  const [apiData, setApiData] = useState();
    const [error, setError] = useState()
    const [isLoading, setIsLoading] = useState(false);
  
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            try {
                const response = await fetch(url)
                
                if(!response.ok){
                    setError('failed to fetch') 
                    // toast.error(error)           
                }
        
                const result = await response.json()
                setApiData(result.data)
                setIsLoading(false)
                
            } catch (error) {
                
            }
          }
         

          fetchData();
    }, [url])
  
    return {apiData, error,isLoading}
}

export default useFetch
