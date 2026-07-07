'use client'

import { useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

export default function Registro() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState('')
  const [exito, setExito] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setCargando(true)
    setError('')

    const { error } = await supabase.auth.signUp({ email, password })

    if (error) {
      setError(error.message)
    } else {
      setExito(true)
    }
    setCargando(false)
  }

  if (exito) {
    return (
      <div>
        <h1>Revisa tu correo</h1>
        <p className="subtitle">
          Te enviamos un link de confirmación a {email}. Ábrelo para activar tu cuenta.
        </p>
      </div>
    )
  }

  return (
    <div>
      <h1>Crear cuenta</h1>
      <p className="subtitle">Regístrate para poder publicar tus autos y motos</p>
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
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {error && <p className="error">{error}</p>}
        <button type="submit" disabled={cargando}>
          {cargando ? 'Creando cuenta...' : 'Crear cuenta'}
        </button>
      </form>
      <p className="subtitle" style={{ marginTop: 16 }}>
        ¿Ya tienes cuenta? <a href="/login" style={{ color: '#e8c9ff' }}>Ingresa aquí</a>
      </p>
    </div>
  )
}
