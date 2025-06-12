//CustomerList.js
import React, {useState} from 'react';
import { useEffect } from 'react';
import { getAll, post, put, deleteById } from '../memdb.js';    


function log(message){console.log(message);}
 
function CustomerList(props) {
return (
    
      <div className="boxed" >
        <h4>Customer List</h4>
        <table id="customer-list">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Pass</th>
            </tr>
          </thead>
          <tbody>
            {props.customers.map(
              (item, index) => {
                return (<tr key={item.id} 
                className={ (item.id === props.formObject.id )?'selected': ''}
                onClick={()=>props.handleListClick(item)} 
                >
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.password}</td>
                </tr>);
              }
            )}
          </tbody>
        </table>
   
    </div>
  );

}
export default CustomerList;