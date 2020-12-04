import React,{useState} from 'react'
import {Link, useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';
import { Select, MenuItem } from '@material-ui/core';

import './styles.css'
import logoImg from '../../assets/logo.svg';

import api from '../../services/api';

export default function NewIncident(){
    const [title,setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const ongId = localStorage.getItem('ongId');
    const history = useHistory();

    async function handleNewIncident(e){
        e.preventDefault()

        const data ={
            title,
            description,
            value
        };

        try{
            await api.post('incidents',data,{
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
                    <h1 className="title">Cadastrar Pedido
                        <p>
                            Descreva o pedido e sua área.
                        </p>
                    </h1>
                    <Link className="back-link" to="/provider/new">
                    <p>é um fornecedor ? <b className="title-skin">Cadastre um forncedor</b></p>
                    </Link>
                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041"/>
                        Voltar para home
                    </Link>

                </section>

                <form onSubmit={handleNewIncident}>
                    <input 
                        placeholder="Titulo" 
                        value={title}
                        onChange={e=>setTitle(e.target.value)}
                    />
                    <textarea 
                        placeholder="Descrição" 
                        value={description}
                        onChange={e=>setDescription(e.target.value)}
                    />
                    <Select
                        className="picker"
                        value={value}
                        onChange={e=>setValue(e.target.value)} 
                        displayEmpty
                    >   
                        <MenuItem disabled>Área</MenuItem>
                        <MenuItem value='marketing'>Marketing</MenuItem>
                        <MenuItem value='producao'>Produção</MenuItem>
                        <MenuItem value='vendas'>Vendas</MenuItem>
                        <MenuItem value='logistica'>Logística</MenuItem>
                        <MenuItem value='financeiro'>Financeiro</MenuItem>                        
                        <MenuItem value='rh'>RH</MenuItem>                        
                        <MenuItem value='compras'>Compras</MenuItem>

                    </Select>     
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
} 