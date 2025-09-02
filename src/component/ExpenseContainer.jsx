import React, { useEffect } from 'react'
import Form from './Form'
import { useState } from 'react'
import {v4 as uid} from 'uuid'
import History from './history'
import BalanceContainer from './BalanceContainer'

function ExpenseContainer() {
  const EXPENSE=[{id:uid(),title:"food",amount:50},{id:uid(),title:"transport",amount:20}]
  const [expense,setExpense] = useState(EXPENSE)

  function addExpense(title,amount){
      try {
        const newExpense = fetch("https://expensetrackerproject-scsj.onrender.com/post",{
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify({title,amount})
        })
        getExpense();
      } catch (error) {
          console.log(error)
      }
  }

  async function getExpense(){
    const response = await fetch("https://expensetrackerproject-scsj.onrender.com/get");
    const data = await response.json();
    setExpense(data.expenses);
  }

  useEffect(()=>{
    getExpense();
  },[]);

  async function deleteExpense(id){
      await fetch(`https://expensetrackerproject-scsj.onrender.com/delete/${id}`,{
        method:"DELETE"
      });
      getExpense();
  }

  return (
    <div className='expense-container'>
      <BalanceContainer expense={expense}/>
        <Form addExpense={addExpense}/>
        <History expense={expense} deleteExpense={deleteExpense}/>
    </div>
  )
}

export default ExpenseContainer