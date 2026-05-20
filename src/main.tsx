import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Error Boundary to catch rendering crashes
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('❌ Application Error:', error)
    console.error('Error Info:', errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          backgroundColor: '#ffffff',
          color: '#000000',
          fontFamily: 'system-ui, sans-serif',
          padding: '20px',
          textAlign: 'center'
        }}>
          <div>
            <h1>⚠️ Application Error</h1>
            <p style={{ marginBottom: '10px', color: '#666' }}>
              {this.state.error?.message || 'Unknown error occurred'}
            </p>
            <details style={{ textAlign: 'left', color: '#999', fontSize: '12px' }}>
              <summary>Error Details</summary>
              <pre style={{ overflow: 'auto', marginTop: '10px' }}>
                {this.state.error?.stack}
              </pre>
            </details>
            <button
              onClick={() => window.location.reload()}
              style={{
                marginTop: '20px',
                padding: '10px 20px',
                backgroundColor: '#0066ff',
                color: '#ffffff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              Reload Page
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
)
