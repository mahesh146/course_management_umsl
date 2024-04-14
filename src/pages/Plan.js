import React, {useState} from 'react';
import {
    Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button,
    Card, CardBody, Center,
    Heading, Input, Select,
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
import CourseMapDisplay from "../components/CourseMapDisplay";
import PlanOverview from "../components/PlanOverview";

function Plan(props) {

    const [newJoin,setNewJoin] = useState(true);
    const [summer,setSummer] = useState(true);
    const [currentPage,setCurrentPage] = useState(-1);
    const [fileData,setFileData] = useState(undefined);
    const [numberOfSem,setNumberOfSem] = useState(0);
    const [prefillData,setprefillData] = useState([]);
    const [startingSem,setStartingSem] = useState("");

    return (
        <div>
            {/*<Card>*/}
            {/*    <CardBody>*/}
            {/*        <Breadcrumb spacing='8px' separator={">"}>*/}
            {/*            {currentPage >= 0 && <BreadcrumbItem>*/}
            {/*                <BreadcrumbLink href='#'>User Details</BreadcrumbLink>*/}
            {/*            </BreadcrumbItem>}*/}

            {/*            {currentPage >= 1 && <BreadcrumbItem>*/}
            {/*                <BreadcrumbLink href='#'>Edit Plan</BreadcrumbLink>*/}
            {/*            </BreadcrumbItem>}*/}

            {/*            {currentPage >= 2 && <BreadcrumbItem isCurrentPage>*/}
            {/*                <BreadcrumbLink href='#'>Finalize</BreadcrumbLink>*/}
            {/*            </BreadcrumbItem>}*/}
            {/*        </Breadcrumb>*/}
            {/*    </CardBody>*/}
            {/*</Card>*/}

            {currentPage === 0 && <>
                <Card mt={3}>
                    <CardBody>

                        <Heading as='h4' size='md' noOfLines={1}>
                            Summer term?
                        </Heading>
                        <Text fontSize="md" mt={2}>
                            Have you taken the summer term to reduce your four year degree to three years?
                        </Text>

                        <Stack mt={4} spacing={4} direction='row' align='center'>
                            <Button colorScheme='teal' size='sm' onClick={()=>{setSummer(true)}} variant={summer?"solid":'outline'}>
                                Yes, I want plans for summer
                            </Button>
                            <Button colorScheme='teal' size='sm' onClick={()=>{setSummer(false)}} variant={summer?'outline':"solid"}>
                                No, I do not want plans for summer
                            </Button>
                        </Stack>

                    </CardBody>
                </Card>

                <Card mt={3}>
                    <CardBody>

                        <Heading as='h4' size='md' noOfLines={1}>
                            Starting Semester
                        </Heading>
                        <Text fontSize="md" mt={2}>
                            I am starting from
                        </Text>

                        <Select mt={3} placeholder='Select Semester' onChange={(e) => {
                            setStartingSem(e.target.value)
                            console.log(e.target.value)

                        }}>
                            { (summer ? ["spring","summer","fall"] : ["spring","fall"]).map(i => (
                                    <option value={i}>{i}</option>
                                ))
                            }
                        </Select>

                    </CardBody>
                </Card>
            <Card mt={3}>
                <CardBody>
                    <Heading as='h4' size='md' noOfLines={1}>
                        New joinee?
                    </Heading>
                    <Text fontSize="md" mt={2}>
                        Have you just joined and want to make a full plan for all years or do you already have some courses you have taken
                    </Text>

                    <Stack mt={4} spacing={4} direction='row' align='center'>
                        <Button colorScheme='teal' size='sm' onClick={()=>{setNewJoin(true)}} variant={newJoin?"solid":'outline'}>
                            Yes, I want to make a full plan
                        </Button>
                        <Button colorScheme='teal' size='sm' onClick={()=>{
                            if(startingSem===""){
                                alert("Please select a starting sem")
                                return
                            }
                            setNewJoin(false)
                        }} variant={newJoin?'outline':"solid"}>
                            No, I have already taken some courses
                        </Button>
                    </Stack>

                    {
                        !newJoin && <Text fontSize="md" mt={4}>
                            Enter the number of semesters you've completed
                            <Input mt={2} type="number" value={numberOfSem} onChange={(e)=>{setNumberOfSem(e.target.value)}}/>
                            <Text fontSize="md" mt={2}>
                                Please fill the courses you've completed
                            </Text>
                            <CourseMapDisplay setPrefillData={setprefillData} prefill lockupto={0} numSem={numberOfSem} startingSem={startingSem} summer={summer}/>
                        </Text>
                    }

                </CardBody>
            </Card>




                <Card mt={3}>
                    <CardBody>

                        <Heading as='h4' size='md' noOfLines={1}>
                            Existing State?
                        </Heading>
                        <Text fontSize="md" mt={2}>
                            Have you already used this software and saved the state file? You can load it back in!
                        </Text>

                        <Stack mt={4} spacing={4} direction='row' align='center'>
                            <input type="file" onChange={(e)=>{
                                const handleUpload = (event) => {
                                    const file = event.target.files[0];
                                    const reader = new FileReader();
                                    reader.onload = (event) => {
                                        const jsonState = event.target.result;
                                        const newState = JSON.parse(jsonState);
                                        setFileData(newState);
                                        setCurrentPage(currentPage+1)
                                    };
                                    reader.readAsText(file);
                                };
                                handleUpload(e)

                            }}/>
                        </Stack>

                    </CardBody>
                </Card>
            </>}

            {
                currentPage === 1 && <CourseMapDisplay prefillData={prefillData} lockupto={numberOfSem} startingSem={startingSem} fileData={fileData} summer={summer}/>
            }
            {
                currentPage === -1 && <PlanOverview />
            }

            <Center>
                { currentPage === -1 && <Button colorScheme='teal' size='lg' mt={5} onClick={()=>{
                    setCurrentPage(currentPage+1)
                }} variant={"outline"}>
                    Next
                </Button>}
            </Center>

            <Center>
                { currentPage === 0 && <Button colorScheme='teal' size='lg' mt={5} onClick={()=>{
                    if(startingSem===""){
                        alert("Please select the starting sem")
                        return
                    }
                    setCurrentPage(currentPage+1)
                }} variant={"outline"}>
                Next
            </Button>}

                {currentPage===1 && <Button colorScheme='teal' size='lg' mt={5} onClick={()=>{setCurrentPage(currentPage-1)}} variant={"outline"}>
                    Back
                </Button>}

            </Center>



        </div>
    );
}

export default Plan;
