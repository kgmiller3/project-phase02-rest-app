const baseURL = 'http://localhost:4000/customers';

export async function getAll(setCustomers) {
  const myInit = {
    method: 'GET',
    mode: 'cors' };
  const fetchData = async (url) => {
    try {
      const response = await fetch(url, myInit);
      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.status}`);
      }
      const data = await response.json();
      setCustomers(data);
    } catch (error) {
      alert(error);
    }
  }
  fetchData(baseURL);
}

 export async function deleteById(id, postopCallback) {
  const myInit = {
    method: 'DELETE',
    mode: 'cors' };
  const deleteItem = async (url) => {
    try {
      const response = await fetch(url, myInit);
      if (!response.ok) {
        throw new Error(`Error deleting data: ${response.status}`);
      }
      await response.json();
      postopCallback(); // Call the callback after successful delete
    } catch (error) {
      alert(error);
    }
  }
  deleteItem(`${baseURL}/${id}`);
}


export async function get(id){
  const myInit = {
    method: 'GET',
    mode: 'cors' };
  const fetchData = async (url) => {
    try {
      const response = await fetch(url, myInit);
      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      alert(error);
    }
  }
  return fetchData(`${baseURL}/${id}`);
}



export async function post(customer,postopCallback){
  delete customer.id; // Ensure no id is sent for new items
  const myInit = {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(customer)
  };  
  const fetchData = async (url) => {
    try {
      const response = await fetch(url, myInit);
      if (!response.ok) {
        throw new Error(`Error posting data: ${response.status}`);
      }
      await response.json();
      postopCallback(); // Call the callback after successful post
     
    } catch (error) {
      alert(error);
    }
  }
    fetchData(baseURL);
} 


export function put(customer, postopCallback) {
  const myInit = {
    method: 'PUT',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(customer)
  };  
  const fetchData = async (url) => {
    try {
      const response = await fetch(url, myInit);
      if (!response.ok) {
        throw new Error(`Error updating data: ${response.status}`);
      }
      await response.json();
      postopCallback(); // Call the callback after successful update
    } catch (error) {
      alert(error);
    }
  }
  fetchData(`${baseURL}/${customer.id}`);
}
