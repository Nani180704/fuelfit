const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch('http://localhost:5004/api/admin/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }

    // Store the admin token
    localStorage.setItem('adminToken', data.token);
    // Store admin data if needed
    localStorage.setItem('adminData', JSON.stringify(data.admin));

    // Redirect to dashboard
    navigate('/dashboard');
  } catch (error) {
    setError(error.message);
  }
}; 