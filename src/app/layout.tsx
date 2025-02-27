import { Metadata } from "next"

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
      <body>{children}</body>
    </html>
  )
}
