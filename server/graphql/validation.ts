import { string, z } from 'zod';
import { FormState, useForm, UseFormGetValues, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

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

type CustomerObject = {startDate:string, endDate: string, minMonths: number, frequency: string, genericDaySlots: ({startTime: string, endTime: string, weekday: string} | null)[]}
function validationDict(object: CustomerObject){
    var dictionary = {
        startDate: false,
        endDate: false,
        minMonths: false,
        startTime: false,
        endTime: false,
        weekday: false, 
        frequency: false
    };
    
    if (object.startDate.toString.length < 60) {dictionary.startDate=false
    console.log("startDate")} 
    else {dictionary.startDate=true}

    if (object.endDate.toString.length < 60) {dictionary.endDate=false
    console.log("endDate")} 
    else {dictionary.endDate=true}

    if (object.minMonths.toString.length < 60) {dictionary.minMonths=false
    console.log("minMonths")}
    else {dictionary.minMonths=true}

    if (object.frequency.length < 60) {dictionary.frequency=false
    console.log("frequency")}
    else {dictionary.frequency=true}

    if (object.genericDaySlots[0]!.startTime.toString().length < 100){dictionary.startTime=false
    console.log("startTime")}
    else {dictionary.startTime=true}
    
    if (object.genericDaySlots[0]!.endTime.toString().length < 100){dictionary.endTime=false
    console.log("endTime")}
    else {dictionary.endTime=true}
    
    if (object.genericDaySlots[0]!.weekday.length < 60){dictionary.endTime=false
    console.log("weekday")}
    else {dictionary.endTime=true}

    return {
        dictionary
    }
}

export function isVaildObjectAvailabilitiesObject(object: CustomerObject){
    var dictionary = validationDict(object)

    if (dictionary.dictionary.startDate == false && dictionary.dictionary.endDate == false && dictionary.dictionary.minMonths == false && dictionary.dictionary.startTime == false && dictionary.dictionary.endTime == false && dictionary.dictionary.weekday == false && dictionary.dictionary.frequency == false) {
        console.log("all")
        return false    
    }else{
        return true
    }
}