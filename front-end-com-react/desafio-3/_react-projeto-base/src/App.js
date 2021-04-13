import React, { useState } from 'react';
import Header from './components/Header';
import ButtonContainerAno from './components/ButtonContainerAno';
import ButtonContainerMes from './components/ButtonContainerMes';
import Summary from './components/Summary';
import Todo from './components/Todo';

import axios from 'axios';

export default () => {

  const [ selectedTodo, setSelectedTodo ] = useState([]);
  const [ visibleComponents, setVisibleComponents ] = useState(false);
  const [ selectedYear, setSelectedYear ] = useState(null);

  const getTodo = async (mes, ano) => {
    if (ano) {
      setVisibleComponents(true);
      setSelectedYear(ano);
      const todo = async() => {
          const res = await axios.get('http://localhost:3001/todos?year=' + ano);
          const allTodo = res.data;
          setSelectedTodo(allTodo);
        }
      todo();
    }

    if (mes && selectedYear !== null) {
      const todo = async() => {
        const res = await axios.get('http://localhost:3001/todos?year=' + selectedYear + '&month=' + mes);
        const allTodo = res.data;
        setSelectedTodo(allTodo);
      }
      todo();
    }
  };

  return (
    <>
      <Header />
      <ButtonContainerAno onClick={getTodo} />
      <ButtonContainerMes onClick={getTodo} />
      {
        !!visibleComponents && (
          <>
            <Summary todo={selectedTodo} />
            <Todo todo={selectedTodo} />
          </>
        )
      }
    </>
  )
}
