"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var codegen_1 = require("../../codegen");
var Account_module_scss_1 = __importDefault(require("../../pages/account/Account.module.scss"));
var ProfileButton_1 = __importDefault(require("./ProfileButton"));
var ProfileForm = function (props) {
    var _a, _b, _c;
    var _d = (0, codegen_1.useUpdateUserMutation)({
        endpoint: 'http://localhost:5000/graphql',
        fetchParams: {
            headers: {
                'Content-Type': 'application/json',
                jwt: props.jwt,
            },
        },
    }), mutate = _d.mutate, data = _d.data;
    var checkExists = function (image) {
        return image ? true : false;
    };
    var submit = function () {
        var dobChecked = !isNaN(Date.parse(dob ? dob : '')) ? dob + 'T00:00:00Z' : null;
        var zipChecked = zip && zip !== '' ? parseInt(zip) : null;
        mutate({
            id: props.session.id,
            fullName: fullName,
            zip: zipChecked,
            description: description,
            dob: dobChecked,
            passportS3Id: passport ? passport.s3Id : null,
            solvencyS3Id: solvency ? solvency.s3Id : null,
            licenseS3Id: license ? license.s3Id : null,
        });
        console.log({ data: data });
    };
    var user = (_a = props.user) === null || _a === void 0 ? void 0 : _a.findUser.User;
    var _e = (0, react_1.useState)(), passport = _e[0], setPassport = _e[1];
    var _f = (0, react_1.useState)(), solvency = _f[0], setSolvency = _f[1];
    var _g = (0, react_1.useState)(), license = _g[0], setLicense = _g[1];
    var _h = (0, react_1.useState)(user ? user.dob : ''), dob = _h[0], setDob = _h[1];
    var _j = (0, react_1.useState)(user ? user.fullName : ''), fullName = _j[0], setFullName = _j[1];
    var _k = (0, react_1.useState)(user && user.zip ? (_b = user.zip) === null || _b === void 0 ? void 0 : _b.toString() : ''), zip = _k[0], setZip = _k[1];
    var _l = (0, react_1.useState)(user && user.description ? user === null || user === void 0 ? void 0 : user.description : ''), description = _l[0], setDescription = _l[1];
    var text = function (e) {
        var _a, _b;
        return ((_a = e === null || e === void 0 ? void 0 : e.target) === null || _a === void 0 ? void 0 : _a.value) ? (_b = e === null || e === void 0 ? void 0 : e.target) === null || _b === void 0 ? void 0 : _b.value : '';
    };
    return (<>
      <h3 className="header-secondary bold">My Profile</h3>
      <p className="body-text grey-text mt-one">
        This is your personal information, autofilled during booking requests for you to customize.
      </p>
      <form className="mt-three" action="">
        <section>
          <label className="body-text bold-medium">First and last name</label>
          <br />
          <input onChange={function (e) { return setFullName(text(e)); }} maxLength={50} value={fullName} className="profile-form mt-one" type="text" placeholder={user && (user === null || user === void 0 ? void 0 : user.fullName) ? user === null || user === void 0 ? void 0 : user.fullName : 'Jane Doe'}/>
        </section>

        <section>
          <label className="body-text bold-medium">Date of Birth</label>
          <br />
          <input onChange={function (e) {
            setDob(text(e));
        }} value={dob} maxLength={50} className="profile-form" type="text" placeholder={user && user.dob ? user.dob : '2000-12-24'}/>
        </section>
        <section>
          <label className="body-text bold-medium">Zip Code</label>
          <br />
          <input onChange={function (e) { return setZip(text(e)); }} maxLength={50} value={zip} className="profile-form mt-one" type="text" placeholder={user && user.zip ? (_c = user === null || user === void 0 ? void 0 : user.zip) === null || _c === void 0 ? void 0 : _c.toString() : '13407'}/>
        </section>
        <section>
          <label className="body-text  bold-medium">Please tell us about yourself</label>
          <br />
          <textarea onChange={function (e) { return setDescription(text(e)); }} className={Account_module_scss_1.default['description-input'] + ' profile-form mt-one'} placeholder={user && user.description ? user.description : 'Please tell us about yourself'} cols={60} value={description} rows={20} style={{ height: 200 }} maxLength={200}/>
        </section>
        <footer className={Account_module_scss_1.default['account__document-grid'] + ' flex-space-between'}>
          <h2 className="mt-one-half body-text">Passport</h2>
          <h2 className="mt-one-half body-text">License</h2>
          <h2 className="mt-one-half body-text">Solvency</h2>
          <ProfileButton_1.default imageSetter={function (image) { return setPassport(image); }} alreadyUploaded={checkExists(passport)} image={passport}/>
          <ProfileButton_1.default imageSetter={function (image) { return setLicense(image); }} alreadyUploaded={checkExists(license)} image={license}/>
          <ProfileButton_1.default imageSetter={function (image) { return setSolvency(image); }} alreadyUploaded={checkExists(solvency)} image={solvency}/>
        </footer>
      </form>
      <button onClick={function () { return submit(); }} className={'primary-btn-small save-btn'}>
        Save
      </button>
    </>);
};
exports.default = ProfileForm;
