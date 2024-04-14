import React from 'react';
import {
    Card, CardBody,
    Heading, List, ListIcon, ListItem,
    Stack,
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Td,
    Text,
    Tfoot,
    Th,
    Thead,
    Tr
} from "@chakra-ui/react";
import {MdCheckCircle} from "react-icons/md";

function Outcomes(props) {
    return (
        <Stack>

            <Card>
                <CardBody>
                    <Heading as='h2' size='xl' noOfLines={1}>
                        Learning Outcomes
                    </Heading>
                        <Text fontSize="xl">
                            Upon completion of the program, graduates will be able to:
                        </Text>

                    <List spacing={3}>
                        <ListItem>
                            <ListIcon as={MdCheckCircle} color='green.500' />
                            Apply logical reasoning, algorithmic and mathematical principles, and computer science theory to understand and solve a wide variety of computational problems
                        </ListItem>
                        <ListItem>
                            <ListIcon as={MdCheckCircle} color='green.500' />
                            Analyze computing problems, their size and scope, and input-output requirements
                        </ListItem>
                        <ListItem>
                            <ListIcon as={MdCheckCircle} color='green.500' />
                            Compare multiple general-purpose programming languages and select and use the appropriate languages for specific applications
                        </ListItem>
                        <ListItem>
                            <ListIcon as={MdCheckCircle} color='green.500' />
                            Design, implement (code) and document solutions to computational problems
                        </ListItem>
                        <ListItem>
                            <ListIcon as={MdCheckCircle} color='green.500' />
                            Create software systems following specific design and performance requirements within practical constraints
                        </ListItem>
                        <ListItem>
                            <ListIcon as={MdCheckCircle} color='green.500' />
                            Implement Internet applications on client and server sides
                        </ListItem>
                        <ListItem>
                            <ListIcon as={MdCheckCircle} color='green.500' />
                            Work effectively in teams to design, implement and evaluate solutions to computational problems
                        </ListItem>
                        <ListItem>
                            <ListIcon as={MdCheckCircle} color='green.500' />
                            Effectively communicate computer science concepts and solutions, verbally and in writing
                        </ListItem>
                        <ListItem>
                            <ListIcon as={MdCheckCircle} color='green.500' />
                            Recognize and promote the professional, social, ethical and legal issues and responsibilities in the computing / software profession
                        </ListItem>

                    </List>

                </CardBody>
            </Card>



        </Stack>
    );
}

export default Outcomes;
