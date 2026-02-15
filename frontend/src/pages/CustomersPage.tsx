import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'

type Customer = {
  id: number
  firstName: string
  lastName: string
  email: string
  phone: string
}

function CustomersPage() {

  const [customers, setCustomers] = useState<Customer[]>([])
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editForm, setEditForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: ""
  })
  const navigate = useNavigate()

  useEffect(() => {
    fetchCustomers()
  }, [])

  async function fetchCustomers() {
    try {
      const response = await api.get('/api/customers')
      setCustomers(response.data)
    } catch (err) {
      console.error("Failed to fetch customers", err)
    }
  }

  async function handleAddCustomer() {
    try {
      await api.post('/api/customers', {
        firstName,
        lastName,
        email,
        phone
      })
      setFirstName("")
      setLastName("")
      setEmail("")
      setPhone("")
      fetchCustomers()
    } catch (err) {
      console.error("Failed to add customer", err)
    }
  }

  async function handleDelete(id: number) {
    try {
      await api.delete(`/api/customers/${id}`)
      fetchCustomers()
    } catch (err) {
      console.error("Failed to delete customer", err)
    }
  }

  function handleEdit(customer: Customer) {
    setEditingId(customer.id)
    setEditForm({
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email,
      phone: customer.phone
    })
  }

  async function handleSave(id: number) {
    try {
      await api.put(`/api/customers/${id}`, editForm)
      setEditingId(null)
      fetchCustomers()
    } catch (err) {
      console.error("Failed to update customer", err)
    }
  }

  function handleLogout() {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <div className="bg-white shadow-sm px-8 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">Customer Management</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Logout
        </button>
      </div>

      <div className="max-w-4xl mx-auto p-8 flex flex-col gap-8">

        {/* Add customer form */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Add Customer</h2>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={handleAddCustomer}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Add Customer
          </button>
        </div>

        {/* Customer list */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Customers ({customers.length})
          </h2>
          <div className="flex flex-col gap-3">
            {customers.length === 0 && (
              <p className="text-gray-400 text-center py-8">No customers yet</p>
            )}
            {customers.map(customer => (
              <div
                key={customer.id}
                className="border border-gray-100 rounded-lg p-4 hover:bg-gray-50 transition-colors"
              >
                {editingId === customer.id ? (
                  // Edit mode
                  <div className="flex flex-col gap-3">
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={editForm.firstName}
                        onChange={(e) => setEditForm({ ...editForm, firstName: e.target.value })}
                        className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        value={editForm.lastName}
                        onChange={(e) => setEditForm({ ...editForm, lastName: e.target.value })}
                        className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        value={editForm.email}
                        onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                        className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        value={editForm.phone}
                        onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                        className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleSave(customer.id)}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  // Normal mode
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-gray-800">
                        {customer.firstName} {customer.lastName}
                      </p>
                      <p className="text-sm text-gray-500">{customer.email}</p>
                      <p className="text-sm text.gray-500">{customer.phone}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(customer)}
                        className="bg-blue-100 hover:bg-blue-200 text-blue-600 px-4 py-2 rounded-lg transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(customer.id)}
                        className="bg-red-100 hover:bg-red-200 text-red-600 px-4 py-2 rounded-lg transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

export default CustomersPage