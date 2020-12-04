import React,{useState} from 'react'
import {Link, useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';
import { Select, MenuItem } from '@material-ui/core';

import './styles.css';

import api from '../../services/api';

export default function NewIncident(){
    const [title,setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [contact, setContact] = useState('');

    const ongId = localStorage.getItem('ongId');
    const history = useHistory();

    async function handleNewIncident(e){
        e.preventDefault()

        const data ={
            title,
            description,
            value:contact
        };

        try{
            await api.post('interprise',data,{
                headers:{
                    Authorization: ongId
                }
            });
            history.push('/profile');
        }catch(err){
            alert('Erro ao cadastrar caso, tente novamente.')
        }
    }

    return(
        <div className="new-incident-container">
            <div className="content">
                <section className="title-area">
                    <h1 className="title">Cadastrar Fornecedor
                        <p>
                            Descreva que tipo de forncedor é você.
                        </p>
                    </h1>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041"/>
                        Voltar para home
                    </Link>

                </section>

                <form onSubmit={handleNewIncident}>
                    <input 
                        placeholder="Título" 
                        value={title}
                        onChange={e=>setTitle(e.target.value)}
                    />
                    <textarea 
                        placeholder="Descrição" 
                        value={description}
                        onChange={e=>setDescription(e.target.value)}
                    />
                    <input 
                        placeholder="Contato" 
                        value={contact}
                        onChange={e=>setContact(e.target.value)}
                    />    
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
} 