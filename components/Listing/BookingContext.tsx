import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext } from "react";
import { FormState, useForm, UseFormGetValues, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { z } from "zod";
import { FrequencyEnum } from "../../codegen";

const formData = z.object({
    propertyHandle: z.string().nonempty({ message: "Property handle is required" }),
    startDate: z.preprocess((arg) => {
        if (typeof arg == 'string' || arg instanceof Date) return new Date(arg);
    }, z.date()),
    endDate: z.preprocess((arg) => {
        if (typeof arg == 'string' || arg instanceof Date) return new Date(arg);
    }, z.date()),
    daySlots: z.object({
        monday: z.object({
            selected: z.boolean(),
            startingTime: z.string({ required_error: 'A starting time is required for each day' }),
            endingTime: z.string({ required_error: 'A starting time is required for each day' }),
        }),
        tuesday: z.object({
            selected: z.boolean(),
            startingTime: z.string({ required_error: 'A starting time is required for each day' }),
            endingTime: z.string({ required_error: 'A starting time is required for each day' }),
        }),
        wednesday: z.object({
            selected: z.boolean(),
            startingTime: z.string({ required_error: 'A starting time is required for each day' }),
            endingTime: z.string({ required_error: 'A starting time is required for each day' }),
        }),
        thursday: z.object({
            selected: z.boolean(),
            startingTime: z.string({ required_error: 'A starting time is required for each day' }),
            endingTime: z.string({ required_error: 'A starting time is required for each day' }),
        }),
        friday: z.object({
            selected: z.boolean(),
            startingTime: z.string({ required_error: 'A starting time is required for each day' }),
            endingTime: z.string({ required_error: 'A starting time is required for each day' }),
        }),
        saturday: z.object({
            selected: z.boolean(),
            startingTime: z.string({ required_error: 'A starting time is required for each day' }),
            endingTime: z.string({ required_error: 'A starting time is required for each day' }),
        }),
        sunday: z.object({
            selected: z.boolean(),
            startingTime: z.string({ required_error: 'A starting time is required for each day' }),
            endingTime: z.string({ required_error: 'A starting time is required for each day' }),
        }),
    }),
    frequency: z.enum([FrequencyEnum.None, FrequencyEnum.Weekly, FrequencyEnum.Monthly]),

    minMonths: z.number({ required_error: 'Minimum stay is required, e.g. 1 month' })
});

export type BookingFormData = z.infer<typeof formData>;

type BookingContext = {
    defaults: BookingFormData;
    formState: FormState<BookingFormData>;
    submitForm: (formData: any) => void;
    register: UseFormRegister<BookingFormData>;
    setValue: UseFormSetValue<BookingFormData>;
    getValues: UseFormGetValues<BookingFormData>;

}

export const BookingContext = React.createContext<BookingContext>({
    defaults: {
        propertyHandle: "",
        startDate: new Date('2015-03-25'),
        daySlots: {
            monday: {
                selected: false,
                startingTime: '',
                endingTime: '',
            },
            tuesday: {
                selected: false,
                startingTime: '',
                endingTime: '',
            },
            wednesday: {
                selected: false,
                startingTime: '',
                endingTime: '',
            },
            thursday: {
                selected: false,
                startingTime: '',
                endingTime: '',
            },
            friday: {
                selected: false,
                startingTime: '',
                endingTime: '',
            },
            saturday: {
                selected: false,
                startingTime: '',
                endingTime: '',
            },
            sunday: {
                selected: false,
                startingTime: '',
                endingTime: '',
            },
        },
        frequency: FrequencyEnum.Weekly,
        endDate: new Date(),
        minMonths: 1,
    },
    formState: {} as FormState<BookingFormData>,
    submitForm: () => { },
    register: {} as UseFormRegister<BookingFormData>,
    setValue: {} as UseFormSetValue<BookingFormData>,
    getValues: {} as UseFormGetValues<BookingFormData>,
});

export const BookingProvider = ({ children }: any) => {
    const defaults = {
        propertyHandle: "",
        startDate: new Date(),
        daySlots: {
            monday: {
                selected: false,
                startingTime: '',
                endingTime: '',
            },
            tuesday: {
                selected: false,
                startingTime: '',
                endingTime: '',
            },
            wednesday: {
                selected: false,
                startingTime: '',
                endingTime: '',
            },
            thursday: {
                selected: false,
                startingTime: '',
                endingTime: '',
            },
            friday: {
                selected: false,
                startingTime: '',
                endingTime: '',
            },
            saturday: {
                selected: false,
                startingTime: '',
                endingTime: '',
            },
            sunday: {
                selected: false,
                startingTime: '',
                endingTime: '',
            },
        },
        frequency: FrequencyEnum.Weekly,
        endDate: new Date(),
        minMonths: 1,
    } as BookingFormData;
    const { register, setValue, formState, getValues } = useForm<BookingFormData>({
        resolver: zodResolver(formData),
        defaultValues: defaults,
    });
    const submitForm = (formData: any) => {
        console.log(formData);
    };
    return (
        <BookingContext.Provider
            value={{ submitForm, defaults, register, setValue, formState, getValues }}
        >
            {children}
        </BookingContext.Provider>
    );
};

export function useBookingContext() {
    const context = useContext(BookingContext);
    if (!context) {
        throw new Error('Component not wrapped by provider');
    }
    return context;
}
