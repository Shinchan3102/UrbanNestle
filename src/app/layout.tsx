import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/shared/Navbar'
import ToasterProvider from '@/providers/ToasterProvider'
import { getCurrentUser } from '@/libs/actions/getCurrentUser'

const poppins = Poppins({ weight: ['100', '200', '300', '400', '500', '600', '700', '900', '800'], subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'UrbanNestle',
  description: 'Discover the perfect urban retreat with UrbanNestle. Explore a curated collection of stylish and comfortable accommodations in the heart of vibrant cities. Immerse yourself in a world of unique stays, where every home tells a story. Book your urban getaway today and experience the charm of city living with UrbanNestle.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const currentUser=await getCurrentUser();
  return (
    <html lang="en">
      <body className={poppins.className}>
        <main className='min-h-screen flex flex-col'>
          <ToasterProvider />
          <div className='relative h-20'>
            <Navbar currentUser={currentUser} />
          </div>
          <div className='flex-1 flex flex-col'>
            {children}
          </div>
        </main>
      </body>
    </html>
  )
}
