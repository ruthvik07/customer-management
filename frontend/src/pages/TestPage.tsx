import { useNavigate } from 'react-router-dom'

function TestPage() {
  const navigate = useNavigate()

  return (
    <>
    <div>
      <h1>Test Page</h1>
      <p>This is a test page to verify routing and authentication.</p>
    </div>

    <div>
      <h1>Back to Customer</h1>
      <button onClick={() => navigate('/customers')}>Go to Customers Page</button>
    </div>
    </>
  )
}

export default TestPage