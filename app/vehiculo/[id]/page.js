'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { supabase } from '../../../lib/supabaseClient'

export default function DetalleVehiculo() {
  const { id } = useParams()
  const [v, setV] = useState(null)
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    async function cargar() {
      const { data } = await supabase.from('autos').select('*').eq('id', id).single()
      setV(data)
      setCargando(false)
    }
    cargar()
  }, [id])

  if (cargando) return <p>Cargando...</p>
  if (!v) return <p>No se encontró esta publicación.</p>

  return (
    <div>
      <span className="badge">{v.categoria === 'moto' ? 'Moto' : 'Auto'}</span>
      <h1>{v.marca} {v.modelo} {v.anio}</h1>
      <p className="card-price" style={{ fontSize: 24 }}>
        ${Number(v.precio).toLocaleString('es-CL')}
      </p>

      <div className="card-img" style={{ height: 260, borderRadius: 14, marginBottom: 20 }}>
        Sin foto todavía
      </div>

      <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', marginBottom: 20 }}>
        <div><strong>Kilometraje:</strong> {v.kilometraje?.toLocaleString('es-CL')} km</div>
        <div><strong>Combustible:</strong> {v.combustible || '—'}</div>
        <div><strong>Transmisión:</strong> {v.transmision || '—'}</div>
        <div><strong>Color:</strong> {v.color || '—'}</div>
        <div><strong>Estado:</strong> {v.estado || '—'}</div>
        <div><strong>Ubicación:</strong> {v.comuna}, {v.region}</div>
      </div>

      {v.descripcion && (
        <>
          <h3>Descripción</h3>
          <p className="subtitle">{v.descripcion}</p>
        </>
      )}

      {v.telefono_contacto && (
        <p>
          <strong>Contacto:</strong> {v.telefono_contacto}
        </p>
      )}
    </div>
  )
}
