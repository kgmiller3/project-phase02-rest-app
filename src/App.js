import React, {useState, useEffect} from 'react';
import { getAll, post, put, deleteById } from './memdb.js'
import './App.css';
import CustomerList from './components/CustomerList.js';
import CustomerAddUpdateForm from './components/CustomerAddUpdateForm.js';

function log(message){console.log(message);}

export function App(params) {
     let blankCustomer = { "id": -1, "name": "", "email": "", "password": "" };
     const [customers, setCustomers] = useState([]);
     const [formObject, setFormObject] = useState(blankCustomer);
     let mode = (formObject.id >= 0) ? 'Update' : 'Add';
   
     useEffect(() => {
       log("in useEffect()");
       getCustomers();
     }, []);
   
     const getCustomers =  function(){
       log("in getCustomers()");
       setCustomers(getAll());
     }
   
     const handleListClick = function(item){
       log("in handleListClick()");
       if (item.id === formObject.id ) {
         log("Item already selected, deselecting");
         setFormObject(blankCustomer);
         return;
       }
       setFormObject(item);
     }  
   
     const handleInputChange = function (event) {
       log("in handleInputChange()");
       const { name, value } = event.target;
       let newFormObject = { ...formObject, [name]: value };
       setFormObject(newFormObject);
     }
   
     let onCancelClick = function () {
       log("in onCancelClick()");
       setFormObject(blankCustomer);
     }
   
     let onDeleteClick = function () {
       log("in onDeleteClick()");
       if (formObject.id >= 0) {
         deleteById(formObject.id);
         setFormObject(blankCustomer);
       } else {
         alert("Nothing to delete");
       }
     }
   
     let onSaveClick = function () {
       log("in onSaveClick()");
       if (mode === 'Add') {
         post(formObject);
       }
       if (mode === 'Update') {
         put(formObject.id, formObject);
       }
       setFormObject(blankCustomer);
     
     }

      let updatearams = {
        handleInputChange: handleInputChange,
        onSaveClick: onSaveClick,
        onDeleteClick: onDeleteClick,
        onCancelClick: onCancelClick,
        mode: mode,
        formObject: formObject
    }
    
  return (
      <div className="App">
      <CustomerList   
       customers={customers}
      formObject={formObject}
      handleListClick={handleListClick} />
      <CustomerAddUpdateForm 
      {...updatearams}/>
    </div>
  );
}

export default App;
