"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var image_1 = __importDefault(require("next/image"));
var Wizard_1 = require("./Wizard");
var Wizard_module_scss_1 = __importDefault(require("./Wizard.module.scss"));
var PriceLine_1 = __importDefault(require("../PriceLine"));
function Step5() {
    var wiz = (0, Wizard_1.useWizardContext)().getValues();
    console.log(JSON.stringify(wiz));
    return (<div>
      <div className={Wizard_module_scss_1.default['step5']}>
        <div className={Wizard_module_scss_1.default['formItem']}>
          <h2 className={Wizard_module_scss_1.default['step2__marginHeadline'] + ' header-tertiary'}>Summary</h2>
          <div className="gallery__container">
            <div className="gallery">
              {wiz.images.map(function (image, index) { return (<div key={index} className={'gallery__item gallery__item--' + index}>
                  <image_1.default src={image.file} width={460} height={516} className="gallery__img" alt={'Image ' + index}/>
                </div>); })}
            </div>
          </div>

          <div className={Wizard_module_scss_1.default['step5__titleWrapper'] + ' ' + Wizard_module_scss_1.default['step2__marginHeadline']}>
            <h3 className="header-tertiary">Industrial Grade Kitchen in Mitte</h3>
            <div className={Wizard_module_scss_1.default['step5__flexWrapper']}>
              <p className="body-text">{wiz.hourlyPrice}</p>
              <p className="body-text">€/h</p>
            </div>
          </div>
        </div>
        <div className={Wizard_module_scss_1.default['formItem']}>
          <h2 className={Wizard_module_scss_1.default['step2__marginHeadline'] + ' header-tertiary'}>Overview</h2>
          <div className={Wizard_module_scss_1.default['step5__flexWrapper']}>
            <p className="body-text-secondary">Size -&nbsp; </p>
            <p className="body-text-secondary">{wiz.size}</p>
            <p className="body-text-secondary">&nbsp;square meters</p>
          </div>
          <br />
          <div className={Wizard_module_scss_1.default['step5__featureTagWrapper']}>
            {wiz.facilities.map(function (feature) { return (<span key={feature} className="feature-tag">
                <p>{feature.toUpperCase()}</p>
              </span>); })}
          </div>
          <br />
          <p className="small-text">{wiz.description}</p>
          <div className={Wizard_module_scss_1.default['step5__overview--container']}>
            <image_1.default src="/landing-2.jpg" width={460} height={516} className={Wizard_module_scss_1.default['step5__overview--img']} alt="Image 1"/>
          </div>
        </div>
        <div className={Wizard_module_scss_1.default['formItem']}>
          <h2 className={Wizard_module_scss_1.default['step2__marginHeadline'] + ' header-tertiary'}>Pricing</h2>
          <PriceLine_1.default label="Rental Fee" text={wiz.hourlyPrice + '€ / hr'}/>
          <PriceLine_1.default label="Booking Fee" text={wiz.hourlyPrice + '€ / hr'}/>
          <PriceLine_1.default label="Service Fee" text="0€"/>
          <PriceLine_1.default label="Deposit" text={wiz.deposit + '€'}/>
          <PriceLine_1.default label="Cancellation Type" text="Full Refund 2 weeks before, partial after."/>
        </div>
        <div className={Wizard_module_scss_1.default['formItem']}>
          <h2 className={Wizard_module_scss_1.default['step2__marginHeadline'] + ' header-tertiary'}>Rules</h2>
          <p className="small-text">
            No smoking on property. <br /> <br />
            Multiple people allowed. <br /> <br />
            Cleaning after mandatory. <br /> <br />
            Full day book only. <br /> <br />
            Pick up spot offered. <br />
          </p>
        </div>
        <div className={Wizard_module_scss_1.default['formItem']}>
          <h2 className={Wizard_module_scss_1.default['step2__marginHeadline'] + ' header-tertiary'}>Availability</h2>
          <div className={Wizard_module_scss_1.default['step5__availabilityGrid']}>
            <div className={Wizard_module_scss_1.default['step5__availabilityDate']}>
              <p className="small-text">March</p>
              <p className="small-text">2022</p>
            </div>

            <div className={Wizard_module_scss_1.default['step5__nextMonthButton']}>
              <button className="flat-btn">&lt; PREVIOUS MONTH</button>
              <button className="flat-btn">NEXT MONTH &gt;</button>
            </div>
            <div className={Wizard_module_scss_1.default['step5__weekDayCheckboxWrapper--week1'] + ' ' + Wizard_module_scss_1.default['weekDays__container']}>
              <input type="checkbox" id="1-weekday-mon" className={Wizard_module_scss_1.default['weekDays__checkbox'] + ' weekday'}/>
              <label htmlFor="1-weekday-mon">M</label>
              <input type="checkbox" id="1-weekday-tue" className={Wizard_module_scss_1.default['weekDays__checkbox'] + ' weekday'}/>
              <label htmlFor="1-weekday-tue">T</label>
              <input type="checkbox" id="1-weekday-wed" className={Wizard_module_scss_1.default['weekDays__checkbox'] + ' weekday'}/>
              <label htmlFor="1-weekday-wed">W</label>
              <input type="checkbox" id="1-weekday-thu" className={Wizard_module_scss_1.default['weekDays__checkbox'] + ' weekday'}/>
              <label htmlFor="1-weekday-thu">T</label>
              <input type="checkbox" id="1-weekday-fri" className={Wizard_module_scss_1.default['weekDays__checkbox'] + ' weekday'}/>
              <label htmlFor="1-weekday-fri">F</label>
              <input type="checkbox" id="1-weekday-sat" className={Wizard_module_scss_1.default['weekDays__checkbox'] + ' weekday'}/>
              <label htmlFor="1-weekday-sat">S</label>
              <input type="checkbox" id="1-weekday-sun" className={Wizard_module_scss_1.default['weekDays__checkbox'] + ' weekday'}/>
              <label htmlFor="1-weekday-sun">S</label>
            </div>
            <div className={Wizard_module_scss_1.default['step5__weekDayCheckboxWrapper--week2'] + ' ' + Wizard_module_scss_1.default['weekDays__container']}>
              <input type="checkbox" id="2-weekday-mon" className={Wizard_module_scss_1.default['weekDays__checkbox'] + ' weekday'}/>
              <label htmlFor="2-weekday-mon">M</label>
              <input type="checkbox" id="2-weekday-tue" className={Wizard_module_scss_1.default['weekDays__checkbox'] + ' weekday'}/>
              <label htmlFor="2-weekday-tue">T</label>
              <input type="checkbox" id="2-weekday-wed" className={Wizard_module_scss_1.default['weekDays__checkbox'] + ' weekday'}/>
              <label htmlFor="2-weekday-wed">W</label>
              <input type="checkbox" id="2-weekday-thu" className={Wizard_module_scss_1.default['weekDays__checkbox'] + ' weekday'}/>
              <label htmlFor="2-weekday-thu">T</label>
              <input type="checkbox" id="2-weekday-fri" className={Wizard_module_scss_1.default['weekDays__checkbox'] + ' weekday'}/>
              <label htmlFor="2-weekday-fri">F</label>
              <input type="checkbox" id="2-weekday-sat" className={Wizard_module_scss_1.default['weekDays__checkbox'] + ' weekday'}/>
              <label htmlFor="2-weekday-sat">S</label>
              <input type="checkbox" id="2-weekday-sun" className={Wizard_module_scss_1.default['weekDays__checkbox'] + ' weekday'}/>
              <label htmlFor="2-weekday-sun">S</label>
            </div>
            <div className={Wizard_module_scss_1.default['step5__weekDayCheckboxWrapper--week3'] + ' ' + Wizard_module_scss_1.default['weekDays__container']}>
              <input type="checkbox" id="3-weekday-mon" className={Wizard_module_scss_1.default['weekDays__checkbox'] + ' weekday'}/>
              <label htmlFor="3-weekday-mon">M</label>
              <input type="checkbox" id="3-weekday-tue" className={Wizard_module_scss_1.default['weekDays__checkbox'] + ' weekday'}/>
              <label htmlFor="3-weekday-tue">T</label>
              <input type="checkbox" id="3-weekday-wed" className={Wizard_module_scss_1.default['weekDays__checkbox'] + ' weekday'}/>
              <label htmlFor="3-weekday-wed">W</label>
              <input type="checkbox" id="3-weekday-thu" className={Wizard_module_scss_1.default['weekDays__checkbox'] + ' weekday'}/>
              <label htmlFor="3-weekday-thu">T</label>
              <input type="checkbox" id="3-weekday-fri" className={Wizard_module_scss_1.default['weekDays__checkbox'] + ' weekday'}/>
              <label htmlFor="3-weekday-fri">F</label>
              <input type="checkbox" id="3-weekday-sat" className={Wizard_module_scss_1.default['weekDays__checkbox'] + ' weekday'}/>
              <label htmlFor="3-weekday-sat">S</label>
              <input type="checkbox" id="3-weekday-sun" className={Wizard_module_scss_1.default['weekDays__checkbox'] + ' weekday'}/>
              <label htmlFor="3-weekday-sun">S</label>
            </div>
            <div className={Wizard_module_scss_1.default['step5__weekDayCheckboxWrapper--week4'] + ' ' + Wizard_module_scss_1.default['weekDays__container']}>
              <input type="checkbox" id="4-weekday-mon" className={Wizard_module_scss_1.default['weekDays__checkbox'] + ' weekday'}/>
              <label htmlFor="4-weekday-mon">M</label>
              <input type="checkbox" id="4-weekday-tue" className={Wizard_module_scss_1.default['weekDays__checkbox'] + ' weekday'}/>
              <label htmlFor="4-weekday-tue">T</label>
              <input type="checkbox" id="4-weekday-wed" className={Wizard_module_scss_1.default['weekDays__checkbox'] + ' weekday'}/>
              <label htmlFor="4-weekday-wed">W</label>
              <input type="checkbox" id="4-weekday-thu" className={Wizard_module_scss_1.default['weekDays__checkbox'] + ' weekday'}/>
              <label htmlFor="4-weekday-thu">T</label>
              <input type="checkbox" id="4-weekday-fri" className={Wizard_module_scss_1.default['weekDays__checkbox'] + ' weekday'}/>
              <label htmlFor="4-weekday-fri">F</label>
              <input type="checkbox" id="4-weekday-sat" className={Wizard_module_scss_1.default['weekDays__checkbox'] + ' weekday'}/>
              <label htmlFor="4-weekday-sat">S</label>
              <input type="checkbox" id="4-weekday-sun" className={Wizard_module_scss_1.default['weekDays__checkbox'] + ' weekday'}/>
              <label htmlFor="4-weekday-sun">S</label>
            </div>
            <div className={Wizard_module_scss_1.default['step5__weekDayCheckboxWrapper--week5'] + ' ' + Wizard_module_scss_1.default['weekDays__container']}>
              <input type="checkbox" id="5-weekday-mon" className={Wizard_module_scss_1.default['weekDays__checkbox'] + ' weekday'}/>
              <label htmlFor="5-weekday-mon">M</label>
              <input type="checkbox" id="5-weekday-tue" className={Wizard_module_scss_1.default['weekDays__checkbox'] + ' weekday'}/>
              <label htmlFor="5-weekday-tue">T</label>
              <input type="checkbox" id="5-weekday-wed" className={Wizard_module_scss_1.default['weekDays__checkbox'] + ' weekday'}/>
              <label htmlFor="5-weekday-wed">W</label>
              <input type="checkbox" id="5-weekday-thu" className={Wizard_module_scss_1.default['weekDays__checkbox'] + ' weekday'}/>
              <label htmlFor="5-weekday-thu">T</label>
              <input type="checkbox" id="5-weekday-fri" className={Wizard_module_scss_1.default['weekDays__checkbox'] + ' weekday'}/>
              <label htmlFor="5-weekday-fri">F</label>
              <input type="checkbox" id="5-weekday-sat" className={Wizard_module_scss_1.default['weekDays__checkbox'] + ' weekday'}/>
              <label htmlFor="5-weekday-sat">S</label>
              <input type="checkbox" id="5-weekday-sun" className={Wizard_module_scss_1.default['weekDays__checkbox'] + ' weekday'}/>
              <label htmlFor="5-weekday-sun">S</label>
            </div>
          </div>
        </div>
        <div className={Wizard_module_scss_1.default['step5__thingsToKnowContainer']}></div>
      </div>
    </div>);
}
exports.default = Step5;
