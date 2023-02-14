import '@/styles/globals.scss';
import Layout from '../layout/Layout';
import { useEffect, useState, useContext } from 'react'
import { useRouter } from 'next/router';
import { createContext } from "react";
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient();

const AppContext = createContext();



export default function App({ Component, pageProps }) {

    const [loca, setloca] = useState('')

    const { isFallback, events } = useRouter()

    const googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement({ pageLanguage: 'en' }, 'google_translate_element')
    }

    useEffect(() => {
        const id = 'google-translate-script'

        const addScript = () => {
            const s = document.createElement('script')
            s.setAttribute('src', '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit')
            s.setAttribute('id', id)
            const q = document.getElementById(id)
            if (!q) {
                document.body.appendChild(s)
                window.googleTranslateElementInit = googleTranslateElementInit
            }
        }

        const removeScript = () => {
            const q = document.getElementById(id)
            if (q) q.remove()
            const w = document.getElementById('google_translate_element')
            if (w) w.innerHTML = ''
        }

        isFallback || addScript()

        events.on('routeChangeStart', removeScript)
        events.on('routeChangeComplete', addScript)

        return () => {
            events.off('routeChangeStart', removeScript)
            events.off('routeChangeComplete', addScript)
        }
    }, [])



    return (
        <QueryClientProvider client={queryClient}>
            <AppContext.Provider value={{ loca, setloca }} setloca={setloca}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </AppContext.Provider>
        </QueryClientProvider>

    );
}

export function useApppContext() {
    return useContext(AppContext);
}
