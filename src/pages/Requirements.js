import React from 'react';
import {
    Card, CardBody,
    Heading,
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

function Requirements(props) {
    return (
        <Stack>

            <Card>
                <CardBody>
                    <Heading as='h2' size='xl' noOfLines={1}>
                        General Education Requirements
                    </Heading>
                        <Text fontSize="xl">
                            All department majors must satisfy the university and appropriate school or college general education requirements. All mathematics courses may be used to meet the university’s general education breadth of study requirement in natural sciences and mathematics.
                        </Text>
                </CardBody>
            </Card>

            <Card>
                <CardBody>
                    <Heading as='h2' size='xl' noOfLines={1}>
                        Satisfactory/Unsatisfactory Restrictions
                    </Heading>
                    <Text fontSize="xl">
                        All department majors may not take mathematical and computer sciences courses on a satisfactory/unsatisfactory basis. Students considering graduate study should consult with their advisers about taking work on a satisfactory/unsatisfactory basis.
                    </Text>
                </CardBody>
            </Card>




            <Card>
                <CardBody>
                    <Heading as='h2' size='xl' noOfLines={1}>
                        Degree Requirements
                    </Heading>
                    <Text fontSize="xl">
                        All courses of the department presented to meet the degree requirements must be completed with a grade of C- or better. At least four courses numbered 3000 or above must be taken in residence. Students must have a 2.0 grade point average in the computer science courses completed.
                        <br/><br/>
                        A minimum grade of C- is required to meet the prerequisite requirement for any course except with permission of the department.
                        <br/><br/>
                        Students who are ready to begin their program with CMP SCI 2250 Programming and Data Structures, will be granted credit for CMP SCI 1250, Introduction to Computing, once they complete CMP SCI 2250 with a grade of C- or better.
                        <br/><br/>
                        Note: Courses that are prerequisites for higher-level courses may not be taken for credit or quality points if the higher-level course has been satisfactorily completed.
                    </Text>
                </CardBody>
            </Card>

            {/*<Card>*/}
            {/*    <CardBody>*/}
            {/*        <Heading as='h2' size='xl' noOfLines={1}>*/}
            {/*            Degree Requirements in Computer Science*/}
            {/*        </Heading>*/}
            {/*        <Text fontSize="xl">*/}
            {/*            Candidates for the B. S. Computer Science degree must complete the following work:*/}
            {/*        </Text>*/}
            {/*    </CardBody>*/}
            {/*</Card>*/}
            {/*<Card>*/}
            {/*    <CardBody>*/}
            {/*        <TableContainer>*/}
            {/*            <Table variant='simple'>*/}
            {/*                <TableCaption>Computer Science Core</TableCaption>*/}
            {/*                <Thead>*/}
            {/*                    <Tr>*/}
            {/*                        <Th>Code</Th>*/}
            {/*                        <Th>Name</Th>*/}
            {/*                        <Th isNumeric>Credit</Th>*/}
            {/*                    </Tr>*/}
            {/*                </Thead>*/}
            {/*                <Tbody>*/}
            {/*                    <Tr>*/}
            {/*                        <Td>CMP SCI 1000</Td>*/}
            {/*                        <Td>Computer Science Experiences</Td>*/}
            {/*                        <Td isNumeric>1</Td>*/}
            {/*                    </Tr>*/}
            {/*                    <Tr>*/}
            {/*                        <Td>feet</Td>*/}
            {/*                        <Td>centimetres (cm)</Td>*/}
            {/*                        <Td isNumeric>30.48</Td>*/}
            {/*                    </Tr>*/}
            {/*                    <Tr>*/}
            {/*                        <Td>yards</Td>*/}
            {/*                        <Td>metres (m)</Td>*/}
            {/*                        <Td isNumeric>0.91444</Td>*/}
            {/*                    </Tr>*/}
            {/*                </Tbody>*/}
            {/*                <Tfoot>*/}
            {/*                    <Tr>*/}
            {/*                        <Th>To convert</Th>*/}
            {/*                        <Th>into</Th>*/}
            {/*                        <Th isNumeric>multiply by</Th>*/}
            {/*                    </Tr>*/}
            {/*                </Tfoot>*/}
            {/*            </Table>*/}
            {/*        </TableContainer>*/}
            {/*    </CardBody>*/}
            {/*</Card>*/}





        </Stack>
    );
}

export default Requirements;
