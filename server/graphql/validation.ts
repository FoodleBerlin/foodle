import { z } from 'zod';

export function isValidStrings(args: string, maxLength: number){
    if (args == "") {
        return false
    }
    if (args.length < maxLength) {
        if (!/[^a-zA-Z0-9]/.test(args)) {
            return true
        }
    }
    else {return false}
}

export function isValidNumbers(args: number, maxLength: number){
    if (args == null){
        return false
    }
    if (args.toString().length < maxLength){
        return true
    }
    else {return false}
}

export function isValidListStrings(args: string[], maxLength: number){
    for (let i = 0; i < args.length; i++) {
        if (args[i].length < maxLength) {
            if (!/[^a-zA-Z0-9]/.test(args[i])){
                return true
            }
        }
        else {return false}
    }
}
