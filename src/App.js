import React, {useState, useEffect} from 'react';
import { getAll, deleteById, post, put} from './restdb.js'
import './App.css';
import CustomerList from './components/CustomerList.js';
import CustomerAddUpdateForm from './components/CustomerAddUpdateForm.js';

function log(message){console.log(message);}

export function App(params) {
     let blankCustomer = { "id": -1, "name": "", "email": "", "password": "" };
     const [customers, setCustomers] = useState([]);
     const [formObject, setFormObject] = useState(blankCustomer);
     let mode = (formObject.id !== -1) ? 'Update' : 'Add';
   
     useEffect(() => {
       log("in useEffect()");
       getCustomers();
     }, [formObject]);
   
     const getCustomers =  function(){
       log("in getCustomers()");
       getAll(setCustomers);
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
       let postOpCallback = () => {setFormObject(blankCustomer);}
       if (formObject.id !== -1) {
         deleteById(formObject.id,postOpCallback);
       } else {
         alert("Nothing to delete");
         setFormObject(blankCustomer);
       }
     }
   
     let onSaveClick = function () {
       log("in onSaveClick()");
        if (formObject.name === "" || formObject.email === "" || formObject.password === "") {
          alert("Please fill in all fields");
          return;
        }
        let postOpCallback = () => {setFormObject(blankCustomer);}
       if (mode === 'Add') {
         post(formObject, postOpCallback);
       }
       if (mode === 'Update') {
         put(formObject, postOpCallback);
       }
       //setFormObject(blankCustomer);
     
     }

      let updateparams = {
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
      {...updateparams}/>
    </div>
  );
}

export default App;
