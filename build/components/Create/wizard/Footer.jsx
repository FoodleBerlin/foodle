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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var client_1 = __importDefault(require("../../../client"));
var createListing_1 = require("../../../codegen/createListing");
var Wizard_1 = require("./Wizard");
var Wizard_module_scss_1 = __importDefault(require("./Wizard.module.scss"));
var Footer = function (props) {
    var _a = (0, Wizard_1.useWizardContext)(), formState = _a.formState, nextStep = _a.nextStep, register = _a.register, setValue = _a.setValue, previousStep = _a.previousStep, getValues = _a.getValues;
    var isoString = function (time) {
        if (time == '') {
            return new Date('1900-01-01T01:00:00').toISOString();
        }
        return new Date('2000-01-01T' + time + ':00').toISOString();
    };
    var wiz = getValues();
    var session = props.session;
    var selectedDaySlots = [];
    (0, react_1.useEffect)(function () {
        var _a = wiz.availability.daySlots, monday = _a.monday, tuesday = _a.tuesday, wednesday = _a.wednesday, thursday = _a.thursday, friday = _a.friday, saturday = _a.saturday, sunday = _a.sunday;
        if (monday.selected) {
            var startTime = isoString(monday.startingTime), endTime = isoString(monday.endingTime), weekday = 'Monday';
            selectedDaySlots.push({ startTime: startTime, endTime: endTime, weekday: weekday });
        }
        if (tuesday.selected) {
            var startTime = isoString(tuesday.startingTime), endTime = isoString(tuesday.endingTime), weekday = 'Tuesday';
            selectedDaySlots.push({ startTime: startTime, endTime: endTime, weekday: weekday });
        }
        if (wednesday.selected) {
            var startTime = isoString(wednesday.startingTime), endTime = isoString(wednesday.endingTime), weekday = 'Wednesday';
            selectedDaySlots.push({ startTime: startTime, endTime: endTime, weekday: weekday });
        }
        if (thursday.selected) {
            var startTime = isoString(thursday.startingTime), endTime = isoString(thursday.endingTime), weekday = 'Thursday';
            selectedDaySlots.push({ startTime: startTime, endTime: endTime, weekday: weekday });
        }
        if (friday.selected) {
            var startTime = isoString(friday.startingTime), endTime = isoString(friday.endingTime), weekday = 'Friday';
            selectedDaySlots.push({ startTime: startTime, endTime: endTime, weekday: weekday });
        }
        if (saturday.selected) {
            var startTime = isoString(saturday.startingTime), endTime = isoString(saturday.endingTime), weekday = 'Saturday';
            selectedDaySlots.push({ startTime: startTime, endTime: endTime, weekday: weekday });
        }
        if (sunday.selected) {
            var startTime = isoString(sunday.startingTime), endTime = isoString(sunday.endingTime), weekday = 'Saturday';
            selectedDaySlots.push({ startTime: startTime, endTime: endTime, weekday: weekday });
        }
    });
    var images = [];
    wiz.images.forEach(function (image) {
        images.push(image.fileName);
    });
    var handleSubmit = function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client_1.default.mutate({
                        mutation: createListing_1.CreateListing,
                        variables: {
                            size: Number(wiz.size),
                            ownerId: props.session.id,
                            street: wiz.location.street,
                            streetNumber: Number(wiz.location.number),
                            zip: Number(wiz.location.zip),
                            city: wiz.location.city,
                            description: wiz.description,
                            rules: wiz.rules.split('.'),
                            hourlyPrice: Number(wiz.hourlyPrice),
                            facilities: wiz.facilities,
                            deposit: Number(wiz.deposit),
                            images: images,
                            pickup: false,
                            serviceFee: Number(0),
                            partialSpace: wiz.partialSpace === 'partial' ? true : false,
                            availabilities: {
                                startDate: new Date(wiz.availability.startDate).toISOString(),
                                endDate: new Date(wiz.availability.endDate).toISOString(),
                                genericDaySlots: selectedDaySlots,
                                minMonths: Number(wiz.minMonths),
                                frequency: wiz.availability.repeat,
                            },
                        },
                    })];
                case 1:
                    res = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    var error = function () {
        if (formState.errors.partialSpace ||
            formState.errors.size ||
            formState.errors.location ||
            formState.errors.description ||
            formState.errors.facilities ||
            formState.errors.minMonths ||
            formState.errors.hourlyPrice ||
            formState.errors.deposit ||
            formState.errors.availability ||
            formState.errors.rules ||
            formState.errors.images) {
            return true;
        }
    };
    return (<div className={Wizard_module_scss_1.default['footer']}>
      <div className={Wizard_module_scss_1.default['footer-container']}>
        <button onClick={function () { return previousStep(props.step); }} className={props.step === 1 ? Wizard_module_scss_1.default['hidden'] : Wizard_module_scss_1.default['secondary-btn-small']}>
          back
        </button>

        <button className={Wizard_module_scss_1.default['primary-btn-small']} disabled={error() ? true : false} onClick={function () {
            nextStep(props.step);
            props.step === 5 ? handleSubmit() : console.log(getValues());
        }}>
          {props.step === 5 ? 'submit' : 'next'}
        </button>
      </div>
    </div>);
};
exports.default = Footer;
