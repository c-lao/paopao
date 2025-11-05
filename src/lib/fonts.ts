import { Inter } from 'next/font/google'
import { Alata } from 'next/font/google'

export const interSans = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

export const alata = Alata({
  variable: '--font-alata',
  subsets: ['latin'],
  weight: '400',
})
