import { Icon, Card, CardHeader, CardBody, List, ListItem, ListIcon, Heading, VStack, Text } from "@chakra-ui/react";

import { FaCheckCircle } from "react-icons/fa";

interface FeatureCardProps {
    title: string;
    icon: React.ElementType;
    features: string[];
}

export default function FeatureCard({ title, icon, features }: FeatureCardProps) {
    return (
        <Card
            height="full"
            shadow="lg"
            _hover={{ transform: 'translateY(-4px)', transition: '0.3s' }}
        >
            <CardHeader>
                <VStack spacing={4}>
                    <Icon as={icon} w={10} h={10} color="orange.500" />
                    <Heading size="md" textAlign="center">
                        {title}
                    </Heading>
                </VStack>
            </CardHeader>
            <CardBody>
                <List spacing={3}>
                    {features.map((feature, index) => (
                        <ListItem key={index} display="flex" alignItems="flex-start">
                            <ListIcon as={FaCheckCircle} color="green.500" mt={1} />
                            <Text>{feature}</Text>
                        </ListItem>
                    ))}
                </List>
            </CardBody>
        </Card>
    );
}