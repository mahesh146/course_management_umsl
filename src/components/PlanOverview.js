import React from 'react';
import {Heading} from "@chakra-ui/react";

function PlanOverview(props) {
    return (
        <div>
            <Heading as={"h3"} size={"2xl"}>Welcome</Heading>
            This tool is to help MS Computer Science students plan their program so that they may meet their course requirements within a desired time span. The tool can be used by new or existing students.

            <Heading mt={10} as={"h3"} size={"2xl"}>Instructions: Degree planning is a two part process</Heading>
            <Heading mt={10} as={"h3"} size={"xl"}>Course Declarations</Heading>
            In the declaration section, students will indicate courses that they've already taken and courses that are required beyond the standard requirements.
            <Heading mt={10} as={"h3"} size={"xl"}>Course Selection</Heading>
            In the course selection section, students will choose which courses they plan to take to complete their CS Masters degree. The course information that facilitates planning comes from two primary sources: the upcoming scheduled courses available in <a target={"_blank"} style={{color:"blue"}} href="https://myview.umsl.edu/">MyView</a> for registration, and the <a target={"_blank"} style={{color:"blue"}}
            href="https://www.umsl.edu/cmpsci/undergraduate-studies/3yearcourse.html">course rotation</a>, which include the standard 3-year rotation & unofficial rotation. Courses not listed in either rotation can still be planned as unspecified elective. Click here for a full list of CS courses.
            Warning: This tool is to be used in an advisory capacity. Plans must be finalized with a faculty advisor. Selecting courses and sections is for planning purposes only and does not register a student in those courses.

            Limitations: This tool is designed for conventional degree programs. Programs heavy in individual studies, thesis hours, etc. may need to be flushed out outside the tool. This tool is not optimized for mobile devices. This tool does not allow selection of certificates to be taken with the program.


            <Heading mt={10} as={"h3"} size={"xl"}>Course Sources</Heading>
            Course planning requires knowledge of upcoming course availability which can be found by observing scheduled courses and the <a target={"_blank"} style={{color:"blue"}}
                                                                                                                                            href="https://www.umsl.edu/cmpsci/undergraduate-studies/3yearcourse.html">course rotation</a>.


            <Heading mt={10} as={"h3"} size={"xl"}>Scheduled Courses</Heading>
            Courses listed in <a style={{color:"blue"}} target={"_blank"} href="https://myview.umsl.edu/">MyView</a> (https://myview.umsl.edu/ ) and available for registration, typically only known for the upcoming semester (e.g. spring or summer / fall)


            <Heading mt={10} as={"h3"} size={"xl"}>Course Rotations</Heading>
            Official 3-Year Course Rotation contains courses officially planned by the CS department. The <a target={"_blank"} style={{color:"blue"}}
                                                                                                             href="https://www.umsl.edu/cmpsci/undergraduate-studies/3yearcourse.html">course rotation</a>  (https://www.umsl.edu/cmpsci/undergraduate-studies/3yearcourse.html ) allows for future planning.
            Unofficial Course Rotation contains courses planned for rotation by the CS department, but susceptible to change.


                <a href="https://bulletin.umsl.edu/artsandsciences/computerscience/#courseinventory" style={{color:"blue"}} target={"_blank"}> Complete list of CS courses</a>  - https://bulletin.umsl.edu/artsandsciences/computerscience/#courseinventory



        </div>
    );
}

export default PlanOverview;
