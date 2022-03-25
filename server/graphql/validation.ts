import { z } from 'zod';

export function isValidStrings(args: string, maxLength: number){
    if (args == "") {
        return true
    }
    if (args.length < maxLength) {
        if (!/[^a-zA-Z0-9]/.test(args)) {
            return false
        }
    }
    else {return true}
}

export function isValidNumbers(args: number, maxLength: number){
    if (args == null){
        return true
    }
    if (args.toString().length < maxLength){
        return false
    }
    else {return true}
}

/*This is a checking a list of Strings for special characters and max character length*/
export function isValidListStrings(args: string[], maxLength: number){
    for (let i = 0; i < args.length; i++) {
        if (args[i].length < maxLength) {
            if (!/[^a-zA-Z0-9]/.test(args[i])){
                return false
            }
        }
        else {return true}
    }
}



export function isVaildObject(object: Object){
    // console.log(object.constructor.arguments)
    console.log("test function")
    // console.log(object)
    // console.log(object.startDate)
    // console.log(object.endDate)
    // if (object.startDate.length < 60) {
    //     return false
    // }
    // else if (object.startDate.length > 60) {return true}
    // if (object.endDate.length < 60) {
    //     return false
    // }
    // else if (object.endDate.length > 60) {return true}
    // console.log(object.minMonths)
    // console.log(object.genericDaySlots)
    // console.log(object.frequency)
}

