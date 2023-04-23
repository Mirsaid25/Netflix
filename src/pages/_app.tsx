import Preloader from '@/Components/Preloader'
import { SessionIdContext } from '@/Contexts/SessionIdContext'
import '@/styles/globals.css'
import axios from 'axios'
import type { AppProps } from 'next/app'
import Link from 'next/link'
import {useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export const APIkey = "d8c00e564262e291fb38f263b4c7128e"

export default function App({ Component, pageProps }: AppProps) {
    const [token, settoken] = useState<string | undefined>()

    const [sessionId, setSessionId] = useState<string | undefined>()

    const [userInfo, setUserInfo] = useState<object | undefined>()

    const router = useRouter()
    
    const confirmedToken = router.asPath.slice(16,56)

    useEffect(()=>{

        axios.get(`https://api.themoviedb.org/3/authentication/token/new?api_key=${APIkey}`)
            .then(res => {
                if(res.status === 200 || res.status === 201){
                    settoken(res.data.request_token)
                }
            })
            .catch(err=> console.log(err))

        router.asPath.includes("approved=true") ? 
        (
            axios.post(`https://api.themoviedb.org/3/authentication/session/new?api_key=${APIkey}` , {"request_token": confirmedToken})
                .then(res => {
                    if(res.status === 200 || res.status === 201){
                        setSessionId(res.data.session_id);

                        axios.get(`https://api.themoviedb.org/3/account?api_key=${APIkey}&session_id=${res.data.session_id}`)
                            .then(res=> {
                                if(res.status === 200 || res.status === 201){
                                    setUserInfo(res.data);
                                }
                            })
                    }
                })
                .catch(err=> console.log(err))
        )
        :
        null
    }, [])
                    
    return (
        token !== undefined ?(
            sessionId !== undefined ? 
                (
                    <SessionIdContext.Provider value={{sessionId, userInfo}}>
                        <Component {...pageProps} />
                    </SessionIdContext.Provider>
                ) 
                :
                (
                    <div className='w-full flex flex-col items-center justify-center h-screen'>
                        <Link href={`https://www.themoviedb.org/authenticate/${token}?redirect_to=http://localhost:3000/`} className="py-[5%] px-[15%] bg-[#3657CB] rounded-[10px]">
                            <div className="text-white ">Потвердить токен</div>
                        </Link> 
                    </div>
                )
                // 
        )
        : 
        (<Preloader/>)
	)    
    
}
