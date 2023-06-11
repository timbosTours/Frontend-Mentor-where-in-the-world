import Header from '@/components/Header/Header'
import Providers from './providers'
import './styles/globals.css'

export const metadata = {
  title: 'Where in the World?',
  description: 'Explore the countries of the world',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className="min-w-screen min-h-screen bg-gray-100 dark:bg-blue-800" lang="en">
      <body className="font-sans text-base text-gray-900">
        <Providers>
        <Header />
          {children}
        </Providers>
      </body>
      </html>
  )
}
