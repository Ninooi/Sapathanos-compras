import React,{useState,useEffect} from 'react';
import {Link,useHistory} from 'react-router-dom'
import { FiPower, FiTrash, FiPlus} from 'react-icons/fi'
import api from '../../services/api'

import './styles.css'

import logoImg from '../../assets/logo.svg'

export default function Profile(){

    const [incidents, setIncidents] = useState([]);
    const [alternateText, setAlternateText] = useState(false);

    const ongId = localStorage.getItem('ongId');
    const history = useHistory();
    

    useEffect(()=>{
        api.get(`profile`,{
            headers:{
                Authorization: ongId,
            }
        }).then(response=>{
            setIncidents(response.data);
        })
    },[ongId]);

    async function handleDeleteIncident(id){
        const deleteItemRoute = alternateText === false ? 'incidents' : 'interprise';
        try{
           await api.delete(`${deleteItemRoute}/${id}`,{
               headers:{
                   Authorization: ongId
               }
           });

           setIncidents(incidents.filter(incident=>incident.id !== id));
        }catch(err){
            alert('Erro ao deletar o caso, tente novamente.');
        }
    }

    async function handleGenerateAllPage(){
        const response = await api.get(`profile`,{
               headers:{
                   Authorization: ongId
               }
           });
        setAlternateText(false);
        setIncidents(response.data);
    }


    async function handleGeneratePage(queryParams){
        const response = await api.get(`/incidents/filtered/${queryParams}`)
        setAlternateText(false);
        setIncidents(response.data);
    }

    async function handleGenerateProviderPage(){
        const response = await api.get(`/interprise`)
        setAlternateText(true);
        setIncidents(response.data);
    }

    async function handleLogout(){
        localStorage.clear();
        history.push('/');
    }

    return(
        <div className="profile-container">
            <header>
                <div className="menu">
                    <div className="inside-container-menu">
                        <button className="menu-item" onClick={()=>handleGenerateAllPage()} >Todos</button>
                        <button className="menu-item" onClick={()=>handleGeneratePage('marketing')}>Marketing</button>
                        <button className="menu-item" onClick={()=>handleGeneratePage('producao')}>Produção</button>
                        <button className="menu-item" onClick={()=>handleGeneratePage('vendas')}>Vendas</button>
                        <button className="menu-item" onClick={()=>handleGeneratePage('logistica')}>Logística</button>
                        <button className="menu-item" onClick={()=>handleGeneratePage('financeiro')}>Financeiro</button>
                        <button className="menu-item" onClick={()=>handleGeneratePage('rh')}>RH</button>
                        <button className="menu-item" onClick={()=>handleGeneratePage('compras')}>Compras</button>
                        <button className="menu-item" onClick={()=>handleGenerateProviderPage()}>Fornecedores</button>
                    </div>
                </div>
                <button type="button" className="button-register" onClick={handleLogout}>
                    <FiPower size={18} color="#e02041" />
                </button>
            </header>
            <div className="pedidos-area" >
            <h1>Pedidos</h1> <Link className="add-button" to="/requests/new">
                <FiPlus size={20} color="#43b581" /> Adicionar
            </Link>
            </div>
            <ul>
                {incidents.map(incident =>(
                    <li key={incident.id}>
                    <strong>Pedido:</strong>
                    <p>{incident.title}</p>
                    <strong>Descrição:</strong>
                    <p>{incident.description}</p>
                    <strong>{ alternateText === false ? 'Tipo' : 'Contato' }</strong>
                    <p>{incident.value}</p>
                    <button type="button" onClick={()=>handleDeleteIncident(incident.id)} >
                        <FiTrash size={20} color="#a8a8b3"/>
                    </button>
                </li>
                ))}
            </ul>
        </div>
    )
}