import React,{useState} from 'react';
import {Link,useHistory} from 'react-router-dom';
import {FiLogIn} from 'react-icons/fi';

import api from '../../services/api'

import './styles.css'
import '../../global.css'

import heroesImg from '../../assets/heroes.svg';

export default function Logon(){
    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogin(e){
        e.preventDefault();
        try{
            const response = await api.post('sessions',{id});
            localStorage.setItem('ongId',id);
            localStorage.setItem('ongName', response.data.name);
            history.push('/profile');
        }catch(err){
            alert('Falha no login, tente novamente.');
        }
    }

    return(
        <div className="logon-container">
            <section className="form">
            <h1 className="title">SAPA<b className="title-skin">THANOS</b></h1>
                <form onSubmit={handleLogin}>
                    <h1>
                        Faça seu Login
                    </h1>

                    <input placeholder="Email"
                    />
                    <input placeholder="Senha"
                        type="password"
                        value={id}
                        onChange={e=>setId(e.target.value)}
                    />
                    <button className="button" type="submit" href="/profile">
                        Entrar
                    </button>
                </form>
            </section>

            <img className="image-cart" src={heroesImg} alt="Heroes"/>
        </div>
    );
}