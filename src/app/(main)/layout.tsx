import { Metadata } from "next"
import NavBar from "./navbar"
import "./styles.css"

export const metadata: Metadata = {
  title: {
    default: 'TeamTask',
    template: '%s - TeamTask',
  },
}

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body>
        <header>
          <div>
            <h1>TeamTask</h1>
            <NavBar />
          </div>
        </header>
        {children}
        <footer>
          <div>
            <h2>Main</h2>
          </div>
        </footer>
      </body>
    </html>
  )
}
