import React, { useState, useContext, useEffect } from 'react';
import './Dashboard.css';
import AppContext from '../../context/AppContext';
import Loading from '../Loading/Loading';
import { Link } from 'react-router-dom';

import fetchTotalbooks from '../../api/fetchTotalbooks';
import fetchTotalfunc from '../../api/fetchTotalfunc';
import fetchTotalEditora from '../../api/fetchTotalEditora';

const Dashboard = () => {
  const { carregando, setLoading } = useContext(AppContext);
  const [totalBooks, setTotalBooks] = useState(0);
  const [totalFunc, setTotalFunc] = useState(0);
  const [totalEditora, setTotalEditora] = useState(0);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [books, func, editora] = await Promise.all([
        fetchTotalbooks(),
        fetchTotalfunc(),
        fetchTotalEditora()
      ]);
      setTotalBooks(books);
      setTotalFunc(func);
      setTotalEditora(editora);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    carregando ? <Loading /> :
      <div className="dash-container">
        <div className="dash-box">
          <h1>Bem vindo, Visitante!</h1>

          <Link to='/dashboard/relatorio'>
         <button className="submit1" type="button"><h2>Informações Relevantes</h2></button>
         </Link>


         <Link to='/dashboard/insertlivro'>
         <button className="submit1" type="button"><h2>Inserindo Livros</h2></button>
         </Link>

             
         <Link to='/dashboard/inserteditora'>
         <button className="submit1" type="button"><h2>Inserindo Editora</h2></button>
         </Link>

    
         <Link to='/dashboard/insertautor'>
         <button className="submit1" type="button"><h2>Inserindo Autor</h2></button>
         </Link>


         <Link to="/">
              <button className="cancelar" type="submit"><h2>Voltar para home
                </h2>
              </button>
            </Link>

        </div>
      </div>
  );
};

export default Dashboard;
