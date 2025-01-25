import { Metadata } from "next"
import "./styles.css"

export const metadata: Metadata = {
  title: {
    default: 'TeamTask',
    template: '%s - TeamTask',
  },
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body>
        {children}
        <footer>
          <div>
            <h2>Auth</h2>
          </div>
        </footer>
      </body>
    </html>
  )
}
