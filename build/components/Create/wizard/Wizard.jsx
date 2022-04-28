"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useWizardContext = exports.WizardProvider = exports.formData = exports.touchDirtyValidate = void 0;
var react_1 = __importStar(require("react"));
var Step1_1 = __importDefault(require("./Step1"));
var Step2_1 = __importDefault(require("./Step2"));
var Step3_1 = __importDefault(require("./Step3"));
var Step4_1 = __importDefault(require("./Step4"));
var Step5_1 = __importDefault(require("./Step5"));
var Wizard_module_scss_1 = __importDefault(require("./Wizard.module.scss"));
var zod_1 = require("zod");
var react_hook_form_1 = require("react-hook-form");
var zod_2 = require("@hookform/resolvers/zod");
var Sidebar_1 = __importDefault(require("../../Layout/Sidebar"));
var Footer_1 = __importDefault(require("./Footer"));
function Wizard(props) {
    var wizardContext = useWizardContext();
    return (<div className="flex">
      <Sidebar_1.default user={props.session}>
        <div className={Wizard_module_scss_1.default['sidebar-container']}>
          {/* <div> */}
          {['Property', 'Features', 'Logistics', 'Photos', 'Summary'].map(function (stage, index) {
            return (<div key={index + 1} className={wizardContext.step >= index + 1 ? Wizard_module_scss_1.default['item__activeOrPassed'] : Wizard_module_scss_1.default['item']}>
                <div className={Wizard_module_scss_1.default['dots']}></div>
                <span className={'small-text'}>{stage}</span>
              </div>);
        })}
          {/* </div> */}
        </div>
      </Sidebar_1.default>
      <div className={Wizard_module_scss_1.default['wizard']}>
        {wizardContext.step == 1 && <Step1_1.default></Step1_1.default>}
        {wizardContext.step == 2 && <Step2_1.default></Step2_1.default>}
        {wizardContext.step == 3 && <Step3_1.default></Step3_1.default>}
        {wizardContext.step == 4 && <Step4_1.default></Step4_1.default>}
        {wizardContext.step == 5 && <Step5_1.default></Step5_1.default>}
      </div>
      <Footer_1.default session={props.session} step={wizardContext.step}/>
    </div>);
}
exports.default = Wizard;
exports.touchDirtyValidate = {
    shouldTouch: true,
    shouldDirty: true,
    shouldValidate: true,
};
// regex to match only alphabetic characters
var onlyString = /^[a-zA-Z_ ]*$/;
exports.formData = zod_1.z.object({
    /* STEP 1 */
    partialSpace: zod_1.z.enum(['partial', 'full']),
    size: zod_1.z.number({ required_error: 'Size is required', invalid_type_error: 'Size can not be empty' }).min(1).max(1000),
    location: zod_1.z.object({
        street: zod_1.z
            .string({ required_error: 'Street is required', invalid_type_error: 'Street must be string' })
            .nonempty({ message: "Street can't be empty" })
            .refine(function (val) { return onlyString.test(val); }, { message: "Address can't contain numbers" }),
        number: zod_1.z.number({ required_error: 'Number is required', invalid_type_error: "Number can't be empty" }),
        zip: zod_1.z.number({ required_error: 'Zip is required', invalid_type_error: "Zip can't be empty" }),
        city: zod_1.z
            .string({ required_error: 'City is required' })
            .nonempty({ message: "City can't be empty" })
            .refine(function (val) { return onlyString.test(val); }, { message: "City can't contain numbers" }),
        country: zod_1.z
            .string({ required_error: 'Country is required' })
            .nonempty({ message: "Country can't be empty" })
            .refine(function (val) { return onlyString.test(val); }, { message: "Country can't contain numbers" }),
    }),
    /* STEP 2 */
    description: zod_1.z
        .string({ required_error: 'Description is required' })
        .min(20, { message: 'Must be 20 or more characters long' })
        .max(7000, { message: 'You reached the maximum amount of characters' })
        .nonempty({ message: 'Description can not be empty' }),
    facilities: zod_1.z
        .string({ required_error: 'Features are required' })
        .array()
        .min(1, { message: 'At least one feature must be selected' }),
    /* STEP 3 */
    hourlyPrice: zod_1.z
        .number({ required_error: 'Rent per hour is required', invalid_type_error: 'Rent per hour can not be empty' })
        .min(1, { message: 'Rent must be greater than or equal to 1' }),
    deposit: zod_1.z.number().min(0, { message: 'Deposit must be greater than or equal to 1' }).optional(),
    availability: zod_1.z.object({
        startDate: zod_1.z.preprocess(function (arg) {
            if (typeof arg == 'string' || arg instanceof Date)
                return new Date(arg);
        }, zod_1.z.date()),
        daySlots: zod_1.z.object({
            monday: zod_1.z.object({
                selected: zod_1.z.boolean(),
                startingTime: zod_1.z.string({ required_error: 'A starting time is required for each day' }),
                endingTime: zod_1.z.string({ required_error: 'A starting time is required for each day' }),
            }),
            tuesday: zod_1.z.object({
                selected: zod_1.z.boolean(),
                startingTime: zod_1.z.string({ required_error: 'A starting time is required for each day' }),
                endingTime: zod_1.z.string({ required_error: 'A starting time is required for each day' }),
            }),
            wednesday: zod_1.z.object({
                selected: zod_1.z.boolean(),
                startingTime: zod_1.z.string({ required_error: 'A starting time is required for each day' }),
                endingTime: zod_1.z.string({ required_error: 'A starting time is required for each day' }),
            }),
            thursday: zod_1.z.object({
                selected: zod_1.z.boolean(),
                startingTime: zod_1.z.string({ required_error: 'A starting time is required for each day' }),
                endingTime: zod_1.z.string({ required_error: 'A starting time is required for each day' }),
            }),
            friday: zod_1.z.object({
                selected: zod_1.z.boolean(),
                startingTime: zod_1.z.string({ required_error: 'A starting time is required for each day' }),
                endingTime: zod_1.z.string({ required_error: 'A starting time is required for each day' }),
            }),
            saturday: zod_1.z.object({
                selected: zod_1.z.boolean(),
                startingTime: zod_1.z.string({ required_error: 'A starting time is required for each day' }),
                endingTime: zod_1.z.string({ required_error: 'A starting time is required for each day' }),
            }),
            sunday: zod_1.z.object({
                selected: zod_1.z.boolean(),
                startingTime: zod_1.z.string({ required_error: 'A starting time is required for each day' }),
                endingTime: zod_1.z.string({ required_error: 'A starting time is required for each day' }),
            }),
        }),
        repeat: zod_1.z.enum(['none', 'weekly']),
        endDate: zod_1.z.preprocess(function (arg) {
            if (typeof arg == 'string' || arg instanceof Date)
                return new Date(arg);
        }, zod_1.z.date()),
    }),
    minMonths: zod_1.z.number({ required_error: 'Minimum stay is required, e.g. 1 month' }),
    rules: zod_1.z
        .string({ required_error: 'Rules are required' })
        .min(10, { message: 'Must be 10 or more characters long' })
        .max(7000, { message: 'You reached the maximum amount of characters' })
        .nonempty({ message: 'Rules can not be empty' }),
    images: zod_1.z
        .object({
        fileName: zod_1.z.string(),
        url: zod_1.z.string(),
        id: zod_1.z.number(),
    })
        .array()
        .min(1)
        .max(5),
});
var WizardContext = react_1.default.createContext({
    step: 1,
    defaults: {
        /* STEP 1 */
        partialSpace: 'full',
        size: 0,
        location: {
            city: 'Berlin',
            country: 'Germany',
            number: 0,
            street: 'Foodlestreet',
            zip: 0,
        },
        /* STEP 2 */
        description: '',
        facilities: ['Unfurnished'],
        /* STEP 3 */
        hourlyPrice: 0,
        deposit: 0,
        availability: {
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
            repeat: 'weekly',
            endDate: new Date(),
        },
        minMonths: 1,
        rules: '',
        /* STEP 4 */
        images: [],
    },
    formState: {},
    nextStep: function () { },
    previousStep: function () { },
    submitForm: function () { },
    register: {},
    setValue: {},
    getValues: {},
});
var WizardProvider = function (_a) {
    var children = _a.children;
    var _b = (0, react_1.useState)(1), step = _b[0], setStep = _b[1];
    var defaults = {
        /* STEP 1 */
        size: 0,
        partialSpace: 'full',
        location: {
            city: 'Berlin',
            country: 'Germany',
            number: 0,
            street: 'Foodlestreet',
            zip: 0,
        },
        /* STEP 2 */
        description: '',
        facilities: ['Unfurnished'],
        stay: {
            hours: 0,
            weeks: 0,
        },
        /* STEP 3 */
        hourlyPrice: 0,
        deposit: 0,
        availability: {
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
            // startingTimes: ['', '', '', '', '', '', ''],
            // endingTimes: ['', '', '', '', '', '', ''],
            repeat: 'weekly',
            endDate: new Date(),
        },
        minMonths: 1,
        rules: '',
        /* STEP 4 */
        images: [],
    };
    var _c = (0, react_hook_form_1.useForm)({
        resolver: (0, zod_2.zodResolver)(exports.formData),
        defaultValues: defaults,
    }), register = _c.register, setValue = _c.setValue, formState = _c.formState, getValues = _c.getValues;
    var nextStep = function (currentStep) {
        if (currentStep === 5)
            return;
        setStep(currentStep + 1);
    };
    var previousStep = function (currentStep) {
        if (currentStep === 1)
            return;
        setStep(currentStep - 1);
    };
    var submitForm = function (formData) {
        console.log(formData);
    };
    return (<WizardContext.Provider value={{ step: step, nextStep: nextStep, previousStep: previousStep, submitForm: submitForm, defaults: defaults, register: register, setValue: setValue, formState: formState, getValues: getValues }}>
      {children}
    </WizardContext.Provider>);
};
exports.WizardProvider = WizardProvider;
function useWizardContext() {
    var context = (0, react_1.useContext)(WizardContext);
    if (!context) {
        throw new Error('Component not wrapped by provider');
    }
    return context;
}
exports.useWizardContext = useWizardContext;
