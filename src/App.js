import React, { useState, useEffect } from "react";
import { db } from "./firebase.js";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";


function App() {
  const [customers, setCustomers] = useState([]);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: ""
  });
  const [editingCustomerId, setEditingCustomerId] = useState(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    const querySnapshot = await getDocs(collection(db, "Customers"));
    const customerList = [];
    querySnapshot.forEach((doc) => {
      customerList.push({ id: doc.id, ...doc.data() });
    });
    setCustomers(customerList);
  };

  const handleInputChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value
    }));
  };

  const handleAddCustomer = async () => {
    try {
      const docRef = await addDoc(collection(db, "Customers"), formData);
      console.log("Document written with ID: ", docRef.id);
      setFormData({ first_name: "", last_name: "" });
      fetchCustomers(); // Refresh customer list
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const handleDeleteCustomer = async (id) => {
    try {
      await deleteDoc(doc(db, "Customers", id));
      console.log("Document deleted with ID: ", id);
      fetchCustomers(); // Refresh customer list
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  const handleEditCustomer = (id, first_name, last_name) => {
    setEditingCustomerId(id);
    setFormData({ first_name, last_name });
  };

  const handleUpdateCustomer = async () => {
    try {
      const customerRef = doc(db, "Customers", editingCustomerId);
      await updateDoc(customerRef, {
        first_name: formData.first_name,
        last_name: formData.last_name
      });
      console.log("Document updated with ID: ", editingCustomerId);
      setEditingCustomerId(null);
      setFormData({ first_name: "", last_name: "" });
      fetchCustomers(); // Refresh customer list
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  return (
    <div>
      <div>
        <h1>Customer List</h1>
        <input
          type="text"
          name="first_name"
          value={formData.first_name}
          placeholder="First name"
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="last_name"
          value={formData.last_name}
          placeholder="Last name"
          onChange={handleInputChange}
        />
        <button onClick={handleAddCustomer}>Add Customer</button>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td>
                  {editingCustomerId === customer.id ? (
                    <input
                      type="text"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleInputChange}
                    />
                  ) : (
                    customer.first_name
                  )}
                </td>
                <td>
                  {editingCustomerId === customer.id ? (
                    <input
                      type="text"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleInputChange}
                    />
                  ) : (
                    customer.last_name
                  )}
                </td>
                <td>
                  {editingCustomerId === customer.id ? (
                    <>
                      <button onClick={handleUpdateCustomer}>Save</button>
                      <button onClick={() => setEditingCustomerId(null)}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEditCustomer(customer.id, customer.first_name, customer.last_name)}>
                        Edit
                      </button>
                      <button onClick={() => handleDeleteCustomer(customer.id)}>Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
