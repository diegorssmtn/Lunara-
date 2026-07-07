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
        </label>

        {form.categoria === 'auto' && (
          <label>
            Número de puertas
            <input type="number" value={form.puertas} onChange={(e) => actualizar('puertas', e.target.value)} />
          </label>
        )}

        <label>
          Estado
          <select value={form.estado} onChange={(e) => actualizar('estado', e.target.value)}>
            <option value="nuevo">Nuevo</option>
            <option value="seminuevo">Seminuevo</option>
            <option value="usado">Usado</option>
          </select>
        </label>

        <label>
          Número de dueños anteriores
          <input type="number" value={form.numero_duenos} onChange={(e) => actualizar('numero_duenos', e.target.value)} />
        </label>

        <div className="checkbox-row">
          <input
            type="checkbox"
            checked={form.papeles_al_dia}
            onChange={(e) => actualizar('papeles_al_dia', e.target.checked)}
          />
          <span>Papeles al día</span>
        </div>

        <div className="checkbox-row">
          <input
            type="checkbox"
            checked={form.revision_tecnica}
            onChange={(e) => actualizar('revision_tecnica', e.target.checked)}
          />
          <span>Revisión técnica vigente</span>
        </div>

        <label>
          Región
          <select required value={form.region} onChange={(e) => actualizar('region', e.target.value)}>
            <option value="">Selecciona</option>
            {REGIONES.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </label>

        <label>
          Comuna
          <input required value={form.comuna} onChange={(e) => actualizar('comuna', e.target.value)} />
        </label>

        <label>
          Teléfono de contacto (WhatsApp idealmente)
          <input value={form.telefono_contacto} onChange={(e) => actualizar('telefono_contacto', e.target.value)} />
        </label>

        <label>
          Descripción
          <textarea value={form.descripcion} onChange={(e) => actualizar('descripcion', e.target.value)} />
        </label>

        <p className="subtitle">Equipamiento</p>

        <div className="checkbox-row">
          <input type="checkbox" checked={form.aire_acondicionado} onChange={(e) => actualizar('aire_acondicionado', e.target.checked)} />
          <span>Aire acondicionado</span>
        </div>
        <div className="checkbox-row">
          <input type="checkbox" checked={form.camara_retroceso} onChange={(e) => actualizar('camara_retroceso', e.target.checked)} />
          <span>Cámara de retroceso</span>
        </div>
        <div className="checkbox-row">
          <input type="checkbox" checked={form.bluetooth} onChange={(e) => actualizar('bluetooth', e.target.checked)} />
          <span>Bluetooth</span>
        </div>
        <div className="checkbox-row">
          <input type="checkbox" checked={form.vidrios_electricos} onChange={(e) => actualizar('vidrios_electricos', e.target.checked)} />
          <span>Vidrios eléctricos</span>
        </div>

        {error && <p className="error">{error}</p>}

        <button type="submit" disabled={cargando}>
          {cargando ? 'Publicando...' : 'Publicar'}
        </button>
      </form>
    </div>
  )
}
