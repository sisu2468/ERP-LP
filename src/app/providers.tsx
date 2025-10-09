'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'
import { LanguageProvider } from '@/contexts/LanguageContext'
import theme from './theme'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </ChakraProvider>
    </CacheProvider>
  )
}