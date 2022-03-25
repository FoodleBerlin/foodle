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
    console.log(object)
    console.log(object.constructor.arguments)
}

