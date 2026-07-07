'use client'

import { useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setCargando(true)
    setError('')

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError('Correo o contraseña incorrectos')
    } else {
      window.location.href = '/subir'
    }
    setCargando(false)
  }

  return (
    <div>
      <h1>Ingresar</h1>
      <p className="subtitle">Ingresa a tu cuenta para publicar</p>
      <form onSubmit={handleSubmit}>
        <label>
          Correo electrónico
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Contraseña
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {error && <p className="error">{error}</p>}
        <button type="submit" disabled={cargando}>
          {cargando ? 'Ingresando...' : 'Ingresar'}
        </button>
      </form>
      <p className="subtitle" style={{ marginTop: 16 }}>
        ¿No tienes cuenta? <a href="/registro" style={{ color: '#e8c9ff' }}>Regístrate aquí</a>
      </p>
    </div>
  )
}
