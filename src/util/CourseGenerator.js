//years is the number of years
import courses from '../data/courses.json'

export const getTermsBasedOnStart = (start,summer)=>{
    if(summer){
        switch (start) {
            case "spring": return ["spring","summer","fall"]
            case "summer": return ["summer","fall","spring"]
            case "fall": return ["fall","spring","summer"]
        }
    }
    else {
        switch (start) {
            case "spring": return ["spring","fall"]
            case "summer": return ["fall","spring"]
            case "fall": return ["fall","spring"]
        }
    }
}
function calculateSemesters(year, semester, semestersPerYear) {
    return (year - 1) * semestersPerYear + semester;
}
export const makePlan = (summer,startingSem,prefillData,lockedupto) => {

    const isSummerEnabled = summer;

    let targetCreditPerSem = 6;

    let mapData = []

    // for (let i = 0; i < years; i++) {
    //     mapData.push({
    //         // "summer": [],
    //         "spring": [],
    //         "fall": [],
    //     })
    // }
    let terms = []
    let years = 0
    if(isSummerEnabled){
        years = 4
        targetCreditPerSem = 3
        terms = getTermsBasedOnStart(startingSem,isSummerEnabled)
    }else {
        years = 4
        terms = getTermsBasedOnStart(startingSem,isSummerEnabled)
    }


    // console.log(courses,"COURSE GENERATOR")
    // console.log(,"COURSE GENERATOR")
    const requiredCourses = getRequiredCourses(courses)

    // find required courses in prefill data

    let completedCourses = []
    // console.log(isPrereqDone({
    //     "discipline": "Cmp Sci",
    //     "number": "1000",
    //     "name": "COMPUTER SCIENCE EXPERIENCES",
    //     "mandatory": true,
    //     "pre": {},
    //     "summer": true,
    //     "fall": true,
    //     "spring": true,
    //     "credit": 3
    // },[]),"IS PRE REQ DONE OR NOT")

    for (let i = 0; i < years; i++) {
        const mapObj = {}
        for (let j = 0; j < terms.length; j++) {
            let currentCredit = 0
            let assignedCourse = []
            const currentSem = calculateSemesters(i+1,j+1,isSummerEnabled?3:2)
            if(currentSem <= lockedupto){
                prefillData[i][terms[j]].forEach(cor=>{
                    assignedCourse.push(cor)
                    completedCourses.push(cor)
                    currentCredit+=cor.credit
                })
                mapObj[terms[j]] = assignedCourse
                continue;
            }


            const eligibleCourses = getCoursesWithCompletedPrereq(requiredCourses,completedCourses,terms[j])

            if(terms[j]==="fall"){
                targetCreditPerSem = 9
            }else {
                if(isSummerEnabled)
                targetCreditPerSem = 3
                else
                    targetCreditPerSem = 6
            }
            eligibleCourses.forEach(course=>{
                if(currentCredit<targetCreditPerSem && !isCourseDone(course,completedCourses)){
                    assignedCourse.push(course)
                    completedCourses.push(course)
                    currentCredit+=course.credit
                }
            })
            mapObj[terms[j]] = assignedCourse
        }
        console.log("YEAR = "+i,mapObj,"MAP OBJ F1")
        mapData.push(mapObj)
    }
    return mapData
}

// function findLinkedCourses(course) {
//     if(course){
//
//     }
// }

export function getRequiredCourses(courses) {
    return courses.filter(i=>i.mandatory)
}

function getCourse(dis,code) {
    return courses.filter(i=>(i.discipline===dis && i.number===code))[0]
}

function getCoursesWithCompletedPrereq(courses,completedCourses,term) {
    const completed = []
    courses.forEach(i=>{
        if(isPrereqDone(i,completedCourses)){
            completed.push(i)
        }
    })
    // console.log(term,"COMPLETED BEFORE FILTER",completed,completed.filter(i=>i[term]===true))
    return completed.filter(i=>i[term]===true)
}


function isCourseDone(course,completedCourses){
    if(!course)
        return true

    return completedCourses.filter(i=>(i.discipline===course.discipline && i.number === course.number)).length >= 1
}

export const serializePrereq = (obj)=>{
    if (!obj) {
        return "";
    }
    if(Object.keys(obj).length<=0)
        return "None"
    if (obj.operator) {
        var operator = obj.operator.toUpperCase();
        var nest = obj.nest.map(function(elem) {
            return serializePrereq(elem);
        }).join(" " + operator + " ");
        return "(" + nest + ")";
    } else {
        var discipline = obj.discipline;
        var number = obj.number;
        var concurrent = obj.concurrent ? " (concurrent)" : "";
        return discipline + " " + number + concurrent;
    }
}



export function isPrereqDone(course,completedCourses) {
    // console.log("IS PRE REQ CALLED",course,completedCourses)
    if(!course)
        return true
    if(course.hasOwnProperty("pre") && Object.keys(course.pre).length===0) {
        // console.log("FOUND EMPTY PRE, RETURN TRUE")
        return true;
    }




    if(course.hasOwnProperty("pre") && course.pre.hasOwnProperty("operator") && course.pre.operator === "AND"){
        // console.log("FOUND PRE WITH AND")

        let condition = true;
        for (let i = 0; i < course.pre.nest.length; i++) {
            condition = ((isPrereqDone(getCourse(course.pre.nest[i].discipline,course.pre.nest[i].number),completedCourses)
                && isCourseDone(getCourse(course.pre.nest[i].discipline,course.pre.nest[i].number),completedCourses)) && condition)
                // || course.pre.nest[i]['concurrent'])
        }
        return condition;
    }
    if(course.hasOwnProperty("pre") && course.pre.hasOwnProperty("operator") && course.pre.operator === "OR"){
        // console.log("FOUND PRE WITH OR")

        let condition = true;
        for (let i = 0; i < course.pre.nest.length; i++) {
            condition = ((isPrereqDone(getCourse(course.pre.nest[i].discipline,course.pre.nest[i].number),completedCourses) &&
                isCourseDone(getCourse(course.pre.nest[i].discipline,course.pre.nest[i].number),completedCourses))
                // || course.pre.nest[i]['concurrent']
            )|| condition
        }
        return condition;
    }




    if(course.hasOwnProperty("discipline") && course.hasOwnProperty("concurrent")){
        // console.log("FOUND DIS, RETURN IS PREREQ")
        return isPrereqDone(getCourse(course.discipline,course.number),completedCourses)
    }



    if(course.hasOwnProperty("name")){
        // console.log("FOUND NAME, RETURN IS COURSE DONE")

        return isCourseDone(course,completedCourses)
    }

    // console.log("FOUND NOTHING, RETURN TRUE")
    return true
}
