import React from 'react'
import ExpenseItem from './Expenseitem'

function history(props) {
  return (
    <div className='history'>
        <h1>History</h1>
        {props.expense.map((item)=>(
            <ExpenseItem key={item.id} expense={item} deleteExpense={props.deleteExpense}/>
        ))
        }
    </div>
  )
}

export default history