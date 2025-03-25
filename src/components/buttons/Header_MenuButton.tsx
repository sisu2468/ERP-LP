import { MenuButton, Button } from "@chakra-ui/react";

export default function Header_MenuButton({ children, pathname, item }: { children: React.ReactNode, pathname: string, item: any }) {
    return (
        <MenuButton
            as={Button}
            variant="ghost"
            className="nav-item"
            px="3"
            py="2"
            fontSize="sm"
            fontWeight="medium"
            color={pathname === item.path ? 'gray.900' : 'gray.500'}
            borderBottom="2px"
            borderColor={pathname === item.path ? 'orange.500' : 'transparent'}
            _hover={{
                color: 'gray.900',
                borderColor: 'orange.500',
            }}
        >
            {children}
        </MenuButton>
    )
}
