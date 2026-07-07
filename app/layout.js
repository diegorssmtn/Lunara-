import './globals.css'

export const metadata = {
  title: 'Lunara — Marketplace de Autos y Motos',
  description: 'Compra y vende autos y motos en Chile',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <header className="navbar">
          <a href="/" className="logo">Lunara</a>
          <nav>
            <a href="/subir">Publicar</a>
            <a href="/login">Ingresar</a>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  )
}
