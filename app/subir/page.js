'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

const REGIONES = [
  'Arica y Parinacota', 'Tarapacá', 'Antofagasta', 'Atacama', 'Coquimbo',
  'Valparaíso', 'Metropolitana', "O'Higgins", 'Maule', 'Ñuble',
  'Biobío', 'La Araucanía', 'Los Ríos', 'Los Lagos', 'Aysén', 'Magallanes'
]

export default function Subir() {
  const [usuario, setUsuario] = useState(null)
  const [verificando, setVerificando] = useState(true)
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState('')
  const [exito, setExito] = useState(false)

  const [form, setForm] = useState({
    categoria: 'auto',
    tipo_moto: '',
    marca: '',
    modelo: '',
    anio: '',
    version: '',
    precio: '',
    kilometraje: '',
    combustible: '',
    transmision: '',
    cilindrada: '',
    color: '',
    puertas: '',
    estado: 'usado',
    numero_duenos: '',
    papeles_al_dia: true,
    revision_tecnica: true,
    region: '',
    comuna: '',
    telefono_contacto: '',
    descripcion: '',
    aire_acondicionado: false,
    camara_retroceso: false,
    bluetooth: false,
    vidrios_electricos: false,
  })

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUsuario(data.user)
      setVerificando(false)
    })
  }, [])

  function actualizar(campo, valor) {
    setForm((prev) => ({ ...prev, [campo]: valor }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setCargando(true)
    setError('')

    const { error } = await supabase.from('autos').insert({
      ...form,
      anio: Number(form.anio),
      precio: Number(form.precio),
      kilometraje: Number(form.kilometraje),
      puertas: form.puertas ? Number(form.puertas) : null,
      numero_duenos: form.numero_duenos ? Number(form.numero_duenos) : null,
      user_id: usuario.id,
    })

    if (error) {
      setError(error.message)
    } else {
      setExito(true)
    }
    setCargando(false)
  }

  if (verificando) return <p>Cargando...</p>

  if (!usuario) {
    return (
      <div>
        <h1>Necesitas una cuenta</h1>
        <p className="subtitle">
          Para publicar un auto o moto primero debes{' '}
          <a href="/registro" style={{ color: '#e8c9ff' }}>crear una cuenta</a> o{' '}
          <a href="/login" style={{ color: '#e8c9ff' }}>iniciar sesión</a>.
        </p>
      </div>
    )
  }

  if (exito) {
    return (
      <div>
        <h1>¡Publicado!</h1>
        <p className="subtitle">Tu {form.categoria === 'moto' ? 'moto' : 'auto'} ya está visible en Lunara.</p>
        <a href="/" style={{ color: '#e8c9ff' }}>Ver publicaciones</a>
      </div>
    )
  }

  return (
    <div>
      <h1>Publicar vehículo</h1>
      <p className="subtitle">Completa los datos, mientras más detalles mejor</p>

      <form onSubmit={handleSubmit}>
        <label>
          Tipo de vehículo
          <select value={form.categoria} onChange={(e) => actualizar('categoria', e.target.value)}>
            <option value="auto">Auto</option>
            <option value="moto">Moto</option>
          </select>
        </label>

        {form.categoria === 'moto' && (
          <label>
            Tipo de moto
            <input
              placeholder="Scooter, deportiva, naked, enduro..."
              value={form.tipo_moto}
              onChange={(e) => actualizar('tipo_moto', e.target.value)}
            />
          </label>
        )}

        <label>
          Marca
          <input required value={form.marca} onChange={(e) => actualizar('marca', e.target.value)} />
        </label>

        <label>
          Modelo
          <input required value={form.modelo} onChange={(e) => actualizar('modelo', e.target.value)} />
        </label>

        <label>
          Versión (opcional)
          <input value={form.version} onChange={(e) => actualizar('version', e.target.value)} />
        </label>

        <label>
          Año
          <input required type="number" value={form.anio} onChange={(e) => actualizar('anio', e.target.value)} />
        </label>

        <label>
          Precio (CLP)
          <input required type="number" value={form.precio} onChange={(e) => actualizar('precio', e.target.value)} />
        </label>

        <label>
          Kilometraje
          <input required type="number" value={form.kilometraje} onChange={(e) => actualizar('kilometraje', e.target.value)} />
        </label>

        <label>
          Combustible
          <select value={form.combustible} onChange={(e) => actualizar('combustible', e.target.value)}>
            <option value="">Selecciona</option>
            <option value="bencina">Bencina</option>
            <option value="diesel">Diésel</option>
            <option value="hibrido">Híbrido</option>
            <option value="electrico">Eléctrico</option>
          </select>
        </label>

        <label>
          Transmisión
          <select value={form.transmision} onChange={(e) => actualizar('transmision', e.target.value)}>
            <option value="">Selecciona</option>
            <option value="manual">Manual</option>
            <option value="automatica">Automática</option>
          </select>
        </label>

        <label>
          Cilindrada
          <input value={form.cilindrada} onChange={(e) => actualizar('cilindrada', e.target.value)} />
        </label>

        <label>
          Color
          <input value={form.color} onChange={(e) => actualizar('color', e.target.value)} />
        
