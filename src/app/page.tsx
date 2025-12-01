'use client'

import HomePage from "@/components/pages/home/HomePage";
import { Box } from "@chakra-ui/react";

export default function Home() {
  return (
    <Box>
      <HomePage />
    </Box>
  )
}

// Note: Metadata is in layout.tsx since this is a client component