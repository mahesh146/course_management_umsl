import React, {useEffect, useState} from 'react';
import { SimpleGrid } from '@chakra-ui/react'
import {
    Box,
    Button,
    Card,
    CardBody, Container,
    Heading, List, ListIcon, ListItem,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Portal,
    Select,
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
    Tr,
    useDisclosure
} from "@chakra-ui/react";
import {
    getRequiredCourses,
    getTermsBasedOnStart,
    isPrereqDone,
    makePlan,
    serializePrereq
} from "../util/CourseGenerator";
import courses from '../data/courses.json'
import {MdCheckCircle, MdClose, MdDelete} from "react-icons/md";

import Pdf from "react-to-pdf";
function CourseMapDisplay(props) {
    const ref = React.createRef();
    const [mapData, setMapData] = useState([])

    const [yearData, setYearData] = useState(["spring", "summer", "fall"])
    const [dataView, setDataView] = useState("side-by-side")
    const [editable, setEditable] = useState(true)
    const [newCourse, setNewCourse] = useState("")
    const [addObj, setAddObj] = useState({})
    const {isOpen, onOpen, onClose} = useDisclosure()

    useEffect(()=>{
        if(props.fileData){
            setYearData(props.fileData.yearData)
            setMapData(props.fileData.mapData)
        }
    },[props.fileData])

    useEffect(()=>{
        if(props.setPrefillData && mapData){
            props.setPrefillData(mapData)
        }
    },[mapData])

    useEffect(()=>{
        if(props.prefill){
            let mpd = []
            for (let i = 0; i < Math.ceil(props.numSem/(props.summer?3:2)); i++) {
                mpd.push({
                    "summer":[],
                    "spring":[],
                    "fall":[]
                })
            }
            setMapData(mpd)
            setYearData(getTermsBasedOnStart(props.startingSem,props.summer))
        }
    },[props.prefill,props.numSem])

    useEffect(() => {
        if(props.fileData || props.prefill)
            return
        const plan = makePlan(props.summer,props.startingSem,props.prefillData,props.lockupto)
        // if (!props.summer) {
        //     setYearData(["spring", "fall"])
        // }
        setYearData(getTermsBasedOnStart(props.startingSem,props.summer))
        console.log(plan, "finalplan")
        setMapData(plan);
    }, [])


    const getNumRows = (year, termData) => {
        let ma = 0;
        termData.forEach(i => {
            ma = Math.max(mapData[year][i].length, ma)
        })
        return ma
    }

    const getCreditSum = (year, term,type,discipline) => {
        // let ma = 0;
        if(type)
            return mapData[year] && mapData[year][term].filter(i=>i.type===type).reduce((a, b) => a + (b.credit), 0)
        else{
            if(discipline){
                return mapData[year] && mapData[year][term].filter(i=>i.discipline===discipline).reduce((a, b) => a + (b.credit), 0)

            }else {
                return mapData[year] && mapData[year][term].reduce((a, b) => a + (b.credit), 0)
            }
        }
        // return ma
    }


    const deleteCourse = (year, term, course, number) => {
        console.log(year, term, course, number, "DELETE CALLED")
        const new_map_data_set = mapData[year][term].filter(i => !(i.discipline === course && i.number === number))
        const clone = JSON.parse(JSON.stringify(mapData))

        clone[year][term] = new_map_data_set
        console.log(clone, "DELETE CALLED")

        setMapData(clone)
    }

    const getPrevCourses = (currentYear, currentTerm) => {
        const coursesTillNow = []
        let termFound = false;
        for (let i = 0; i <= currentYear; i++) {
            for (let j = 0; j < yearData.length; j++) {
                mapData[i] && mapData[i][yearData[j]].forEach(course => {
                    coursesTillNow.push(course)
                })
                if (i === currentYear && yearData[j] === currentTerm) {
                    termFound = true;
                    break;
                }
            }
            if (termFound)
                break;
        }
        console.log("PREVIOUS COURSE", coursesTillNow)
        return coursesTillNow
    }

    const getRemainingCourses = (term) => {
        let years = 0
        if (props.summer) {
            years = 4
        } else {
            years = 4
        }
        const allocatedCourses = getPrevCourses(years - 1, yearData[yearData.length - 1])

        let remainingCourses = []
        courses.forEach((i) => {
            if (allocatedCourses.filter(j => (j.discipline === i.discipline && j.number === i.number && i[term] === true)).length <= 0) {
                remainingCourses.push(i)
            }
        })
        console.log(remainingCourses, 'remainingCOURSES!')
        return remainingCourses
    }

    const getAllRemainingRequiredCourses = () => {
        const requiredCourses = getRequiredCourses(courses)
        let requiredLeft = []
        yearData.forEach(term=>{
            const remainingCourses = getRemainingCourses(term)
            requiredCourses.forEach((i) => {
                if (remainingCourses.filter(j => (j.discipline === i.discipline && j.number === i.number && i[term] === true)).length > 0) {
                    requiredLeft.push(i.discipline+" "+i.number)
                }
            })
        })

        console.log(requiredLeft,"REQ LEFT")
        const uniq = [...new Set(requiredLeft)];

        return uniq
    }


    const findTotalCredits = () =>{
        let sum = 0
        let years = 0
        if (props.summer) {
            years = 4
        } else {
            years = 4
        }
        for (let i = 0; i < years; i++) {
            yearData.forEach(term=>{
                sum+=getCreditSum(i,term)
            })
        }
        return sum
    }

    const findTotalCreditsByType = (type) =>{
        let sum = 0
        let years = 0
        if (props.summer) {
            years = 4
        } else {
            years = 4
        }
        for (let i = 0; i < years; i++) {
            yearData.forEach(term=>{
                sum+=getCreditSum(i,term,type)
            })
        }
        return sum
    }
    const findTotalCreditsByDiscipline = (dis) =>{
        let sum = 0
        let years = 0
        if (props.summer) {
            years = 4
        } else {
            years = 4
        }
        for (let i = 0; i < years; i++) {
            yearData.forEach(term=>{
                sum+=getCreditSum(i,term,null,dis)
            })
        }
        return sum
    }

    const handleDownload = () => {
        const jsonState = JSON.stringify({mapData:mapData,yearData:yearData});
        const blob = new Blob([jsonState], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = 'course_state.json';
        link.href = url;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    function printDiv(divName) {
        var printContents = document.getElementById(divName).innerHTML;
        var originalContents = document.body.innerHTML;

        document.body.innerHTML = printContents;

        window.print();

        document.body.innerHTML = originalContents;
    }

    function calculateSemesters(year, semester, semestersPerYear) {
        return (year - 1) * semestersPerYear + semester;
    }


    return (
        <div>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Add Course Year {addObj.year + 1} : {addObj.term}</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <Select placeholder='Select course' onChange={(e) => {
                            setNewCourse(JSON.parse(e.target.value))
                            console.log(e.target.value)

                        }}>
                            {
                                getRemainingCourses(addObj.term).map(i => (
                                    <option value={JSON.stringify(i)}>{i.discipline} {i.number} : {i.name} : {i.credit} Credits</option>
                                ))
                            }
                        </Select>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={() => {
                            const clone = JSON.parse(JSON.stringify(mapData))
                            clone[addObj.year][addObj.term].push(newCourse)
                            setMapData(clone)
                            onClose();
                        }}>
                            Add
                        </Button>
                        <Button variant='ghost' onClick={onClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>


            <Card mt={3}>
                <CardBody>
                    {dataView==="side-by-side" && <Button colorScheme='teal' size='lg' mt={5} onClick={()=>{
                        setDataView("")
                    }}  variant={"outline"}>
                        View Vertically
                    </Button>}

                    {dataView!=="side-by-side" && <Button colorScheme='teal' size='lg' mt={5} onClick={()=>{
                        setDataView("side-by-side")
                    }}  variant={"outline"}>
                        View Side by Side
                    </Button>}

                    {dataView !== "side-by-side" && <div id={"section-to-print"}> <SimpleGrid minChildWidth='800px' spacing='10px'>

                        {
                            mapData.map((i,indx)=>(
                                <>
                                    {
                                        yearData.map((term, indx1) => (
                                            <Box>

                                                <TableContainer key={indx}>
                                                    <Table mb={10} variant='simple' size={"md"} style={{border: "1px solid black"}}>
                                                        <TableCaption placement={"top"}>Plan for Year - {indx + 1}</TableCaption>
                                                        <Thead>
                                                            <Tr>
                                                                {/*{yearData.map(i => (*/}
                                                                    <Th  colSpan={editable ? 4 : 3}
                                                                        style={{borderLeft: '1px solid black'}}>{term}</Th>
                                                                    {/*// <Th colSpan={3} style={{borderLeft:'1px solid black'}}>Summer</Th>*/}
                                                                    {/*// <Th colSpan={3} style={{borderLeft:'1px solid black'}}>Fall</Th>*/}
                                                                {/*))}*/}
                                                            </Tr>
                                                            <Tr>
                                                                {/*{yearData.map(i => (*/}
                                                                    <>
                                                                        <Th style={{borderLeft: '1px solid black'}}>Course</Th>
                                                                        <Th>Name</Th>
                                                                        <Th isNumeric>Credit</Th>
                                                                        {editable && <Th isNumeric>Delete</Th>}
                                                                    </>
                                                                {/*))}*/}
                                                            </Tr>
                                                        </Thead>
                                                        <Tbody>
                                                            {console.log(Array.from(Array(getNumRows(indx, yearData)).keys()), "finalplan loopnum")}
                                                            {
                                                                Array.from(Array(getNumRows(indx, yearData) + (editable ? 1 : 0)).keys()).map((j, id1) => (
                                                                    <Tr key={id1}>
                                                                        {[0].map(term1 => {

                                                                            if (id1 >= getNumRows(indx, yearData)) {
                                                                                return (<>
                                                                                    <Td style={{borderLeft: '1px solid black'}}></Td>
                                                                                    <Td>
                                                                                        {(calculateSemesters(indx+1,indx1+1,props.summer?3:2))>props.lockupto && <Button colorScheme='teal' size='lg'
                                                                                                onClick={() => {
                                                                                                    setAddObj({
                                                                                                        term: term,
                                                                                                        year: indx
                                                                                                    })
                                                                                                    onOpen()
                                                                                                }} variant={"outline"}>
                                                                                            ADD
                                                                                        </Button>}
                                                                                    </Td>
                                                                                    <Td isNumeric></Td>
                                                                                    {editable && <Td isNumeric></Td>}
                                                                                </>)
                                                                            }

                                                                            if (i[term].length <= 0 || !i[term][j]) {
                                                                                return (<>
                                                                                    <Td style={{borderLeft: '1px solid black'}}></Td>
                                                                                    <Td></Td>
                                                                                    <Td isNumeric></Td>
                                                                                    {editable && <Td isNumeric></Td>}
                                                                                </>)
                                                                            }
                                                                            console.log(i[term], "finalplan LOOP")
                                                                            const isPrereqdone = isPrereqDone(i[term][j], getPrevCourses(indx, term))
                                                                            return (
                                                                                <>
                                                                                    <Td bg={isPrereqdone ? "teal.300" : "red.300"}
                                                                                        style={{borderLeft: '1px solid black'}}>
                                                                                        <Popover>
                                                                                            <PopoverTrigger>
                                                                                                <div
                                                                                                    style={{cursor: "pointer"}}>{i[term][j]?.discipline} {i[term][j]?.number}</div>
                                                                                            </PopoverTrigger>
                                                                                            <Portal>
                                                                                                <PopoverContent>
                                                                                                    <PopoverArrow/>
                                                                                                    <PopoverCloseButton/>
                                                                                                    <PopoverHeader>{isPrereqdone ? "You have met the criteria!" : "You are missing out!"}</PopoverHeader>
                                                                                                    <PopoverBody>
                                                                                                        <p>In order to take this course, you
                                                                                                            need to satisfy the following
                                                                                                            conditions :</p>
                                                                                                        {
                                                                                                            serializePrereq(i[term][j]["pre"])
                                                                                                        }

                                                                                                    </PopoverBody>
                                                                                                </PopoverContent>
                                                                                            </Portal>
                                                                                        </Popover>


                                                                                    </Td>
                                                                                    {/*<Td bg={"red.500"} style={{borderLeft:'1px solid black'}}>{i[term][j]?.discipline} {i[term][j]?.number}</Td>*/}
                                                                                    <Td>{i[term][j]?.name}</Td>
                                                                                    <Td isNumeric>{i[term][j]?.credit}</Td>
                                                                                    {editable && <Td>
                                                                                        {(calculateSemesters(indx+1,indx1+1,props.summer?3:2))>props.lockupto &&
                                                                                        <Button colorScheme='teal' size='lg'
                                                                                                onClick={() => {
                                                                                                    deleteCourse(indx, term, i[term][j]?.discipline, i[term][j]?.number)
                                                                                                }} variant={"outline"}>
                                                                                            <MdDelete/>
                                                                                        </Button>
                                                                                        }
                                                                                    </Td>}
                                                                                </>
                                                                            )
                                                                        })}
                                                                    </Tr>

                                                                ))
                                                            }
                                                        </Tbody>
                                                        <Tfoot>
                                                            <Tr>
                                                                {
                                                                    [0].map(term1 => (
                                                                        <>
                                                                            <Th style={{borderLeft: '1px solid black'}}></Th>
                                                                            <Th></Th>
                                                                            {editable && <Th isNumeric></Th>}

                                                                            <Th isNumeric>{getCreditSum(indx, term)}</Th>

                                                                        </>
                                                                    ))
                                                                }

                                                            </Tr>
                                                        </Tfoot>
                                                    </Table>
                                                </TableContainer>
                                            </Box>

                                        ))
                                    }

                                </>
                            ))
                        }

                    </SimpleGrid></div>}

                    { dataView === "side-by-side" && <div ref={ref}>
                    {
                        mapData.map((i, indx) => (
                            <TableContainer key={indx}>
                                <Table mb={40} variant='simple' size={"md"} style={{border: "1px solid black"}}>
                                    <TableCaption placement={"top"}>Plan for Year - {indx + 1}</TableCaption>
                                    <Thead>
                                        <Tr>
                                            {yearData.map(i => (
                                                <Th key={i} colSpan={editable ? 4 : 3}
                                                    style={{borderLeft: '1px solid black'}}>{i}</Th>
                                                // <Th colSpan={3} style={{borderLeft:'1px solid black'}}>Summer</Th>
                                                // <Th colSpan={3} style={{borderLeft:'1px solid black'}}>Fall</Th>
                                            ))}
                                        </Tr>
                                        <Tr>
                                            {yearData.map(i => (
                                                <>
                                                    <Th style={{borderLeft: '1px solid black'}}>Course</Th>
                                                    <Th>Name</Th>
                                                    <Th isNumeric>Credit</Th>
                                                    {editable && <Th isNumeric>Delete</Th>}
                                                </>
                                            ))}
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {console.log(Array.from(Array(getNumRows(indx, yearData)).keys()), "finalplan loopnum")}
                                        {
                                            Array.from(Array(getNumRows(indx, yearData) + (editable ? 1 : 0)).keys()).map((j, id1) => (
                                                <Tr key={id1}>
                                                    {yearData.map((term,indx1) => {

                                                        if (id1 >= getNumRows(indx, yearData)) {
                                                            return (<>
                                                                <Td style={{borderLeft: '1px solid black'}}></Td>
                                                                <Td>
                                                                    {(calculateSemesters(indx+1,indx1+1,props.summer?3:2))>props.lockupto &&
                                                                        <Button colorScheme='teal' size='lg'
                                                                            onClick={() => {
                                                                                setAddObj({
                                                                                    term: term,
                                                                                    year: indx
                                                                                })
                                                                                onOpen()
                                                                            }} variant={"outline"}>
                                                                        ADD
                                                                    </Button>}
                                                                </Td>
                                                                <Td isNumeric></Td>
                                                                {editable && <Td isNumeric></Td>}
                                                            </>)
                                                        }

                                                        if (i[term].length <= 0 || !i[term][j]) {
                                                            return (<>
                                                                <Td style={{borderLeft: '1px solid black'}}></Td>
                                                                <Td></Td>
                                                                <Td isNumeric></Td>
                                                                {editable && <Td isNumeric></Td>}
                                                            </>)
                                                        }
                                                        console.log(i[term], "finalplan LOOP")
                                                        const isPrereqdone = isPrereqDone(i[term][j], getPrevCourses(indx, term))
                                                        return (
                                                            <>
                                                                <Td bg={isPrereqdone ? "teal.300" : "red.300"}
                                                                    style={{borderLeft: '1px solid black'}}>
                                                                    <Popover>
                                                                        <PopoverTrigger>
                                                                            <div
                                                                                style={{cursor: "pointer"}}>{i[term][j]?.discipline} {i[term][j]?.number}</div>
                                                                        </PopoverTrigger>
                                                                        <Portal>
                                                                            <PopoverContent>
                                                                                <PopoverArrow/>
                                                                                <PopoverCloseButton/>
                                                                                <PopoverHeader>{isPrereqdone ? "You have met the criteria!" : "You are missing out!"}</PopoverHeader>
                                                                                <PopoverBody>
                                                                                    <p>In order to take this course, you
                                                                                        need to satisfy the following
                                                                                        conditions :</p>
                                                                                    {
                                                                                        serializePrereq(i[term][j]["pre"])
                                                                                    }

                                                                                </PopoverBody>
                                                                            </PopoverContent>
                                                                        </Portal>
                                                                    </Popover>


                                                                </Td>
                                                                {/*<Td bg={"red.500"} style={{borderLeft:'1px solid black'}}>{i[term][j]?.discipline} {i[term][j]?.number}</Td>*/}
                                                                <Td>{i[term][j]?.name}</Td>
                                                                <Td isNumeric>{i[term][j]?.credit}</Td>
                                                                {editable && i[term][j] && <Td>
                                                                    {(calculateSemesters(indx+1,indx1+1,props.summer?3:2))>props.lockupto && <Button colorScheme='teal' size='lg'
                                                                            onClick={() => {
                                                                                deleteCourse(indx, term, i[term][j]?.discipline, i[term][j]?.number)
                                                                            }} variant={"outline"}>
                                                                        <MdDelete/>
                                                                    </Button>
                                                                    }
                                                                </Td>}
                                                            </>
                                                        )
                                                    })}
                                                </Tr>

                                            ))
                                        }
                                    </Tbody>
                                    <Tfoot>
                                        <Tr>
                                            {
                                                yearData.map(term => (
                                                    <>
                                                        <Th style={{borderLeft: '1px solid black'}}></Th>
                                                        <Th></Th>
                                                        {editable && <Th isNumeric></Th>}

                                                        <Th isNumeric>{getCreditSum(indx, term)}</Th>

                                                    </>
                                                ))
                                            }

                                        </Tr>
                                    </Tfoot>
                                </Table>
                            </TableContainer>

                        ))
                    }
                    </div>}
                </CardBody>
                {/*<Container>*/}
                {!props.prefill && <Box p={10}>

                    <Heading as='h2' size='lg' noOfLines={1}>
                        Criteria:
                    </Heading>

                <List spacing={3} mt={4} size={"lg"}>
                    <ListItem>

                        {getAllRemainingRequiredCourses().length <=0 &&<ListIcon as={MdCheckCircle} color='green.500' />}
                        {getAllRemainingRequiredCourses().length > 0  &&<ListIcon as={MdClose} color='red.500' />}
                        Must complete all required courses
                        {getAllRemainingRequiredCourses().length > 0  &&<>
                        {", You are missing : "}
                            {getAllRemainingRequiredCourses().join(",")}
                        </>}

                    </ListItem>
                    <ListItem>
                        {findTotalCredits()>=120 &&<ListIcon as={MdCheckCircle} color='green.500' />}
                        {findTotalCredits()< 120  &&<ListIcon as={MdClose} color='red.500' />}
                        Total Credits are {findTotalCredits()} out of 120
                    </ListItem>
                    <ListItem>
                        {findTotalCreditsByDiscipline("Cmp Sci")>=71 &&<ListIcon as={MdCheckCircle} color='green.500' />}
                        {findTotalCreditsByDiscipline("Cmp Sci")< 71  &&<ListIcon as={MdClose} color='red.500' />}
                        Computer sciences credits are {findTotalCreditsByDiscipline("Cmp Sci")} out of 71
                    </ListItem>
                    <ListItem>
                        {findTotalCreditsByType("MS")>=3 &&<ListIcon as={MdCheckCircle} color='green.500' />}
                        {findTotalCreditsByType("MS")< 3  &&<ListIcon as={MdClose} color='red.500' />}
                        Mathematical sciences credits are {findTotalCreditsByType("MS")} out of 3
                    </ListItem>
                    <ListItem>
                        {findTotalCreditsByType("NS")>=7 &&<ListIcon as={MdCheckCircle} color='green.500' />}
                        {findTotalCreditsByType("NS")< 7  &&<ListIcon as={MdClose} color='red.500' />}
                        Natural sciences credits are {findTotalCreditsByType("NS")} out of 7 including a lab course
                    </ListItem>
                    <ListItem>
                        {findTotalCreditsByType("HFA")>=9 &&<ListIcon as={MdCheckCircle} color='green.500' />}
                        {findTotalCreditsByType("HFA")< 9  &&<ListIcon as={MdClose} color='red.500' />}
                        Humanities and fine arts credits are {findTotalCreditsByType("HFA")} out of 9 credit from at least two disciplines
                    </ListItem>
                    <ListItem>
                        {findTotalCreditsByType("SBS")>=9 &&<ListIcon as={MdCheckCircle} color='green.500' />}
                        {findTotalCreditsByType("SBS")< 9  &&<ListIcon as={MdClose} color='red.500' />}
                        Social and behavioral sciences credits are {findTotalCreditsByType("SBS")} out of 9 credit from at least two disciplines, including a civics course
                    </ListItem>
                    <ListItem>
                        {findTotalCreditsByType("WOC")>=9 &&<ListIcon as={MdCheckCircle} color='green.500' />}
                        {findTotalCreditsByType("WOC")< 9  &&<ListIcon as={MdClose} color='red.500' />}
                        Written and oral communications credits are {findTotalCreditsByType("WOC")} out of 9 credit
                    </ListItem>

                </List>
                    <Button colorScheme='teal' size='lg' mt={5} onClick={()=>{
                        setEditable(false)
                        const currentView = dataView
                        setDataView('')
                        setTimeout(()=>{
                            window.print()
                            setTimeout(()=>{
                                setEditable(true)
                                setDataView(currentView)
                            },1000)
                        },1000)
                        // printDiv('section-to-print')
                    }}  variant={"outline"}>
                        Download PDF
                    </Button>


                    <Button colorScheme='teal' onClick={()=>{
                        handleDownload()
                    }} ml={10} size='lg' mt={5} variant={"outline"}>
                        Save State
                    </Button>

                </Box>}

                {/*</Container>*/}




            </Card>
        </div>
    );
}

export default CourseMapDisplay;
