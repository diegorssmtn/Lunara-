'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Home() {
  const [vehiculos, setVehiculos] = useState([])
  const [categoria, setCategoria] = useState('todos')
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    async function cargarVehiculos() {
      setCargando(true)
      let query = supabase
        .from('autos')
        .select('*')
        .eq('activo', true)
        .order('creado_en', { ascending: false })

      if (categoria !== 'todos') {
        query = query.eq('categoria', categoria)
      }

      const { data, error } = await query
      if (!error) setVehiculos(data)
      setCargando(false)
    }
    cargarVehiculos()
  }, [categoria])

  return (
    <div>
      <h1>Lunara</h1>
      <p className="subtitle">Compra y vende autos y motos en Chile</p>

      <div className="tabs">
        <button
          className={`tab ${categoria === 'todos' ? 'active' : ''}`}
          onClick={() => setCategoria('todos')}
        >
          Todos
        </button>
        <button
          className={`tab ${categoria === 'auto' ? 'active' : ''}`}
          onClick={() => setCategoria('auto')}
        >
          Autos
        </button>
        <button
          className={`tab ${categoria === 'moto' ? 'active' : ''}`}
          onClick={() => setCategoria('moto')}
        >
          Motos
        </button>
      </div>

      {cargando && <p>Cargando publicaciones...</p>}

      {!cargando && vehiculos.length === 0 && (
        <p>Todavía no hay publicaciones en esta categoría. ¡Sé el primero en publicar!</p>
      )}

      <div className="grid">
        {vehiculos.map((v) => (
          <a href={`/vehiculo/${v.id}`} key={v.id} className="card">
            <div className="card-img">Sin foto todavía</div>
            <div className="card-body">
              <span className="badge">{v.categoria === 'moto' ? 'Moto' : 'Auto'}</span>
              <div className="card-title">{v.marca} {v.modelo} {v.anio}</div>
              <div className="card-price">
                ${Number(v.precio).toLocaleString('es-CL')}
              </div>
              <div className="card-meta">
                {v.kilometraje?.toLocaleString('es-CL')} km · {v.comuna}, {v.region}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
