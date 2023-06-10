import Header from '@/components/Header/Header'
import './styles/globals.css'
import { ThemeProvider } from 'next-themes'

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
    <ThemeProvider enableSystem={true} attribute="class">
    <html className="min-w-screen min-h-screen bg-gray-100 dark:bg-blue-800" lang="en">
      <body className="font-sans text-base text-gray-900">
        <Header/>
        {children}
      </body>
      </html>
    </ThemeProvider>
  )
}
