'use client'

import { Box, Heading, Text, Button, VStack } from '@chakra-ui/react'

export default function Home() {
  return (
    <Box p={8}>
      <VStack spacing={4} align="center">
        <Heading>Welcome to Next.js with Chakra UI</Heading>
        <Text>This is a sample page using Chakra UI components</Text>
        <Button colorScheme="blue">Click me!</Button>
      </VStack>
    </Box>
  )
}