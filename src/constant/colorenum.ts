'use client'

type ColorMode = 'light' | 'dark';

export const getColors = (colorMode: ColorMode) => ({
    bgColor: colorMode === 'light' ? 'white' : 'gray.800',
    cardBg: colorMode === 'light' ? 'gray.50' : 'gray.900',
    headingColor: colorMode === 'light' ? 'gray.900' : 'white',
    accentColor: colorMode === 'light' ? 'orange.500' : 'orange.300',
    borderColor: colorMode === 'light' ? 'gray.200' : 'gray.700',
    iconBg: colorMode === 'light' ? 'white' : 'gray.800',
    textColor: colorMode === 'light' ? 'gray.600' : 'gray.300',

    bgColor1: colorMode === 'light' ? 'gray.100' : 'gray.900',
    cardBg1: colorMode === 'light' ? 'white' : 'gray.800',
    headingColor1: colorMode === 'light' ? 'gray.900' : 'white',
    accentColor1: colorMode === 'light' ? 'orange.500' : 'orange.300',
    borderColor1: colorMode === 'light' ? 'gray.200' : 'gray.700',
    textColor1: colorMode === 'light' ? 'gray.900' : 'white',

});