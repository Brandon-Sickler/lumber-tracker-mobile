import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [lumberPackages, setLumberPackages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newPackage, setNewPackage] = useState({ packageNumber: '', vendor: '', notes: '' });
  const [formError, setFormError] = useState(null);

  const fetchLumberPackages = () => {
    setIsLoading(true);
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
    fetch(`${apiUrl}/api/lumberPackages`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setLumberPackages(data);
        setIsLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchLumberPackages();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewPackage({ ...newPackage, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
    fetch(`${apiUrl}/api/lumberPackages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPackage),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setLumberPackages([...lumberPackages, data]);
        setNewPackage({ packageNumber: '', vendor: '', notes: '' });
        fetchLumberPackages();
      })
      .catch(error => {
        console.error('Error:', error);
        setFormError(error.message);
      });
  };

  const handleDelete = (id) => {
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
    fetch(`${apiUrl}/api/lumberPackages/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        fetchLumberPackages();
      })
      .catch(error => {
        console.error('Error:', error);
        setError(error.message);
      });
  };

  const styles = {
    app: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      marginBottom: '20px',
    },
    input: {
      padding: '10px',
      fontSize: '16px',
    },
    button: {
      padding: '10px',
      fontSize: '16px',
      backgroundColor: '#4CAF50',
      color: 'white',
      border: 'none',
      cursor: 'pointer',
    },
    ul: {
      listStyleType: 'none',
      padding: 0,
    },
    li: {
      backgroundColor: '#f9f9f9',
      marginBottom: '10px',
      padding: '15px',
      borderRadius: '5px',
    },
    error: {
      color: 'red',
      fontWeight: 'bold',
    },
  };

  if (isLoading) return <div style={styles.app}>Loading...</div>;
  if (error) return <div style={styles.app}>Error: {error}</div>;

  return (
    <div className="App" style={styles.app}>
      <header className="App-header">
        <h1>Lumber Tracker</h1>
      </header>
      <main>
        <h2>Add New Lumber Package</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            name="packageNumber"
            value={newPackage.packageNumber}
            onChange={handleInputChange}
            placeholder="Package Number"
            required
            style={styles.input}
          />
          <input
            type="text"
            name="vendor"
            value={newPackage.vendor}
            onChange={handleInputChange}
            placeholder="Vendor"
            required
            style={styles.input}
          />
          <textarea
            name="notes"
            value={newPackage.notes}
            onChange={handleInputChange}
            placeholder="Notes"
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Add Package</button>
        </form>
        {formError && <p style={styles.error}>{formError}</p>}
        
        <h2>Lumber Packages</h2>
        <ul style={styles.ul}>
          {lumberPackages.map(pkg => (
            <li key={pkg.id} style={styles.li}>
              <strong>{pkg.packageNumber}</strong> - {pkg.vendor}
              <p>{pkg.notes}</p>
              <button onClick={() => handleDelete(pkg.id)} style={styles.button}>Delete</button>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;