import { ColorMode, extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  config: {
    initialColorMode: 'light', // Set the initial color mode to light
    useSystemColorMode: false, // Don't use system color mode to prevent DevTools from triggering dark mode
  },
  styles: {
    global: (props: { colorMode: ColorMode }) => ({
      body: {
        bg: props.colorMode === 'dark' ? 'hsl(220 17.647% 20% / 1)' : '#FFFFFF', // Dark mode background or light mode background
        color: props.colorMode === 'dark' ? '#FFFFFF' : 'hsl(220 17.647% 20% / 1)', // Dark mode text color or light mode text color
      },
    }),
  },
  colors: {
    orange: {
      50: '#FFF3E0',
      100: '#FFE0B2',
      150: '#FFD399', // New intermediate value
      200: '#FFC784',
      250: '#FFBA6B', // New intermediate value
      300: '#FFAD52',
      350: '#FFA039', // New intermediate value
      400: '#FF9320',
      450: '#FF8507', // New intermediate value
      500: '#FF7700',
      550: '#ED6F00', // New intermediate value
      600: '#DB6700',
      700: '#B85600',
      800: '#964600',
      900: '#733600',
    },
    // You can customize the color palette for light and dark mode here
    brand: {
      50: '#F0E6FF',
      100: '#D3A8FF',
      200: '#B780FF',
      300: '#9A57FF',
      400: '#7D2CFF',
      500: '#5B00E6', // Main color
      600: '#4700B4',
      700: '#320082',
      800: '#1E004F',
      900: '#090021',
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'bold', // Makes the button text bold by default
      },
      variants: {
        solid: {
          bg: 'orange.400',
          color: 'white',
          _hover: {
            bg: 'brand.600',
          },
        },
      },
    },
  },
});

export default theme;
