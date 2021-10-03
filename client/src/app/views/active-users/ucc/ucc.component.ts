import { EmailComponent } from './../email/email.component';
import { Component, createPlatform, OnInit, ViewChild } from "@angular/core";
import { CommonHttpService } from "../../../services/common-http.service";
import { FormGroup, FormControl, FormBuilder, FormArray } from "@angular/forms";
import { data, post, type } from "jquery";
import { DatePipe } from "@angular/common";
import {
  NgbModal,
  ModalDismissReasons,
  NgbModalOptions,
  NgbModalRef,
} from "@ng-bootstrap/ng-bootstrap";
import { ActivatedRoute, Router } from "@angular/router";
import { constants } from "../../../constants/proj.constants";
import { NotificationsService } from "../../../services/web-push/notifications.service";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";

import {
  faUserCheck,
  faFileContract,
  faAlignLeft,
  faCheckCircle,
  faTimesCircle,
  faAddressCard,
  faMapMarkedAlt,
  faMoneyCheckAlt,
  faFrownOpen,
  faTrashAlt,
  faAngleDoubleRight,
} from "@fortawesome/free-solid-svg-icons";

import { ThrowStmt } from "@angular/compiler";
import { MatDialog } from "@angular/material/dialog";



@Component({
  selector: "app-ucc",
  templateUrl: "./ucc.component.html",
  styleUrls: ["./ucc.component.css"],
})
export class UccComponent implements OnInit {
  uccData: any;
  additionaldata: any;
  keys = Object.keys;
  fatcaData: any;
  uboData: any;
  uboformatted: any = [];
  deformat: any = [];
  uccform: FormGroup;
  activeusers: any = [];
  iindata: any;
  usrdetails: any;
  dataavail: Boolean = false;
  spinner: Boolean = true;
  showDetails: Boolean = false;

  fatca_pan: any;
  fatca_name: any;
  imagePath = "../uploads/025db780fb5f5f750de599e187c074a/1614770685_h4-slide.png"

  showonboarding: Boolean = false;
  showfatca: Boolean = false;
  showUbo: Boolean = false;
  showDocs: Boolean = false;
  showSigned: Boolean = false;
  showUnsigned: Boolean = false;
  selectedEmail: any;

  uccStatus: Boolean = true;
  fatcaStatus: Boolean = true;
  unsigned_form: Boolean = false;
  signed_form: Boolean = false;
  usriin: any;
  pandata: any;

  // mine
  activeUsers: any;
  userInfo: any;
  userFatcaData: any;
  userUboData: any;
  showUserInfo: Boolean = false;
  dataFilled: Boolean = true;
  dataMessage: String;
  userOboardErros: Boolean = false;
  userOnboarded: Boolean = false;
  nseErrors: any;
  nseSubmission: Boolean = false; //spinner for submitting nse data
  nseEditStatus: Boolean = false; //spnner for edit customer
  userDocsStatus: Boolean = false;

  // spinners
  userUpdated: Boolean = false;
  userFatcaStatus: Boolean = false;
  userUboStatus: Boolean = false;
  mainSpinner: Boolean = false;
  hasOnboardErros: Boolean = false;
  removeError: Boolean = false;
  enableRetrigger: Boolean = false;
  creatingTiff: boolean;
  userStepsStatus: Boolean = false;
  updateIINStatus: boolean = false;
  // icons
  faUser = faUserCheck;
  faDoc = faFileContract;
  faForm = faAlignLeft;
  faUnDoc = faTimesCircle;
  faSnDoc = faCheckCircle;
  faAddr = faAddressCard;
  faLoca = faMapMarkedAlt;
  faBank = faMoneyCheckAlt;
  faSad = faFrownOpen;
  faDel = faTrashAlt;
  faRight = faAngleDoubleRight;

  uccForm: any;
  userIdenForm: any;
  fatcaForm: any;
  additionalKycForm: any;
  uboForm: any;
  uboFormArray = new FormArray([]);
  userDocs: any;

  // default dropdowns
  netWorth_signs: string[] = ["+", "-"];
  default: string;
  occupationValues: any = [
    { value: "4", data: "Agriculturist" },
    { value: "1", data: "Business" },
    { value: "1A", data: "Business Manufacturing" },
    { value: "1B", data: "Business Trading" },
    { value: "43", data: "Forex Dealer" },
    { value: "2A", data: "Government Service" },
    { value: "6", data: "Housewife" },
    { value: "2B", data: "Non-Government Service" },
    { value: "9", data: "Not Specified" },
    { value: "8", data: "Others" },
    { value: "41", data: "Private Sector Service" },
    { value: "3C", data: "Profession - Engineering" },
    { value: "3B", data: "Profession - Finance" },
    { value: "3D", data: "Profession - Legal" },
    { value: "3A", data: "Profession - Medicine" },
    { value: "3", data: "Professional" },
    { value: "42", data: "Public Sector / Government Service" },
    { value: "5", data: "Retired" },
    { value: "2", data: "Service" },
    { value: "7", data: "Student" },
  ];
  corporateServices: any = [
    { value: "01", data: "Foreign Exchange / Money Changer Services" },
    {
      value: "02",
      data:
        "Gaming / Gambling / LotteryServices [e.g. casinos, betting syndicates] ",
    },
    { value: "03", data: "Money laundering / Pawning" },
    { value: "04", data: "to be blank if the same is not applicable" },
  ];
  incomeCodes: any = [
    { value: "31", data: "Below 1 Lakh" },
    { value: "32", data: " 1 <=5 Lacs" },
    { value: "33", data: "5 <=10 Lacs" },
    { value: "34", data: "10 <= 25 Lacs" },
    { value: "35", data: " 25 Lacs < = 1 Crore" },
    { value: "36", data: "Above 1 Crore" },
  ];
  bankcodes: any;
  exemptionCodes: any;
  stateCodes: any;
  countryData: any;
  cityData: any;
  userSteps: any;
  // card date values
  createdAt: any;
  updatedAt: any;
  // default dropdowm selected values
  selectedOcc: any; //occupation code
  selectedCorSer: any; //corporate server code
  selectedIncomeCode: any; //income code
  selectedBank: any; //selected Bank
  selectedAcT: any; //selected account type
  selectedResidence: any; //selected tax residence
  selectedFFI: any; //select foriegn fin institute
  selectedFFTCat: any; //selected NFFE category
  selectedStock: any; //selected Stock exchange
  selectedSponser: any; //selected sponser availability YES/NO
  selectedGIIN: any; // selected GIIN applicable YES/NO
  selectedExemtion: any; //selected exemption code
  selectedGIINotApp: any; //selected giin not applicable category
  selectedAddressType: any; //selected address type
  selectedState: any; // selected place of incorporation

  // ubo defaults
  selectedTaxResC: any;
  selectedCitizenshipC: any;
  selectedBirthC: any;
  selectedAddressTypeUBO: any;
  selectedUboC: any;
  selectedUboS: any;
  selectedUboCity: any;
  // to change dropdown to input text
  selectedCountryIndia: Boolean = true;
  processMode: FormGroup;
  noInternet: boolean;
  response: Object;
  retriggerMessage: string;
  iinActiveStatus: any;
 

  constructor(
    private httpSrv: CommonHttpService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    public datepipe: DatePipe,
     public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private notSrv: NotificationsService,
    private toastSrv: ToastrService,
    private spinnerr: NgxSpinnerService
  ) { }


  ngOnInit() {
    this.mainSpinner = true;
    this.httpSrv.getInfo("active_users").subscribe((activeUsers) => {
      console.log(activeUsers);
      this.mainSpinner = false;
      this.activeUsers = activeUsers.activeUsers;
      console.log("hahaha", this.activeUsers);
    }, err => {
      this.mainSpinner = false;
      this.noInternet = true
      this.toastSrv.error(err.error.message)
    });
    this.httpSrv.getInfo("bank_codes").subscribe((bankDetails) => {
      // console.log("bank", bankDetails);
      this.bankcodes = bankDetails.banksDetailes;
    });
    this.httpSrv.getInfo("exemption_codes").subscribe((exemptionCodes) => {
      this.exemptionCodes = exemptionCodes.exemptionDetailes;
    });
    this.httpSrv.getInfo("state_codes").subscribe((stateData) => {
      this.stateCodes = stateData.stateData;
    });
    this.httpSrv.getInfo("country_data").subscribe((countrydata) => {
      this.countryData = countrydata.countryData;
    });
    this.httpSrv.getInfo("city_data").subscribe((cityData) => {
      this.cityData = cityData.cityData;
    });
  }

  details1(id: any) {
    this.userInfo = this.activeUsers.filter((ele) => ele.id === id)[0];
    this.iinActiveStatus = this.userInfo.iin_status
    this.initUccForm();
    this.getUserSteps()
  }
  getUserSteps() {
    this.httpSrv.getMoreData('success/get_user_status', { user_key: this.userInfo.user_key }).subscribe((response) => {
      console.log(response)
      this.userSteps = response['result'][0]
      console.log(this.userSteps)
      if (this.userSteps.fatca) {
        this.fatcaStatus = true
      }
      for (let property in this.userSteps) {
         if (this.userSteps[property]) {
          let date = new Date(this.userSteps[property]),
            day = date.getDate(),
            month = date.getMonth() + 1,
            year = date.getFullYear()
          this.userSteps[property] = day+"-"+month+"-"+year
        }
      }
     
      this.userStepsStatus = true
    }, err => {
      console.log(err)
    })
  }

  showboarding() {
    this.showfatca = false;
    this.showUbo = false;
    this.showUnsigned = false;
    this.showDocs = false;
    this.dataFilled = true;
    this.showonboarding = !this.showonboarding;
  }
  initUccForm() {
    this.hasOnboardErros = true
    this.loadErrors()
    this.processMode = new FormGroup({
      process_mode: new FormControl(''),
      holding_nature: new FormControl('')
    })
    this.uccForm = new FormGroup({
      userIdenForm: new FormGroup({
        mf_email: new FormControl(this.userInfo.mf_email),
        pan: new FormControl(this.userInfo.pan),
        mf_phone: new FormControl(this.userInfo.mf_phone),
      }),
      company_name: new FormControl(this.userInfo.company_name),
      user_key: new FormControl(this.userInfo.user_key),
      address1: new FormControl(this.userInfo.address1),
      address2: new FormControl(this.userInfo.address2),
      pincode: new FormControl(this.userInfo.pincode),
      city: new FormControl(this.userInfo.city),
      state: new FormControl(this.userInfo.state),
      country: new FormControl(this.userInfo.country),
      bank: new FormControl(this.userInfo.bank),
      acc_no: new FormControl(this.userInfo.acc_no),
      ifsc: new FormControl(this.userInfo.ifsc),
      branch_name: new FormControl(this.userInfo.branch_name),
      branch_addr: new FormControl(this.userInfo.branch_addr),
      acc_type: new FormControl(this.userInfo.acc_type),
      iin: new FormControl(this.userInfo.iin),
      tax_type: new FormControl(this.userInfo.tax_type),
      exemption: new FormControl(this.userInfo.exemption),
    });
   
    this.userIdenForm = this.uccForm.get("userIdenForm");
    this.userIdenForm.disable();
    this.uccForm.controls["iin"].disable();
    if (this.uccForm.controls["iin"].value !== null) {
      this.userOnboarded = true;
    }

    this.selectedBank = this.uccForm.controls["bank"].value;
    this.selectedAcT = this.uccForm.controls["acc_type"].value;
    this.showUserInfo = true;
    console.log("user infooooo", this.uccForm.controls['iin'].value);

    //get iin status for retirgger link enable/disable
    
  }
  getIINStatus() {
    if (this.uccForm.controls['iin'].value) {
      this.httpSrv.postxml("nse/get_iin_status", { iin: this.uccForm.controls['iin'].value }).subscribe((data) => {
        // console.log(data, "iin status")
        let res = data
        let parser = new DOMParser(),
          xmlDoc = parser.parseFromString(res, "text/xml"),
          status = xmlDoc.getElementsByTagName("ACTIVATION_STATUS")[0].childNodes[0].nodeValue;
        if (status === "NO") {
          this.enableRetrigger = true;
        }
      }, err => {
        console.log(err, 'iin status error')
      })
    }
  }

  // get fatca info
  getOtherInfoOfUser(api) {
    let { user_key } = this.uccForm.value;
    let data = { user_key };
    console.log("owwww", data);
    this.userFatcaStatus = true;
    this.httpSrv.getMoreData(api, data).subscribe((data) => {
      //  stop spinner
      this.userFatcaStatus = false;
      this.userFatcaData = data;
      if (this.userFatcaData.status === 404) {
        this.dataFilled = false;
        this.dataMessage = this.userFatcaData.message;
      } else {
        this.dataFilled = true;
        this.initFatcaForm();
        this.showfatca = !this.showfatca;
      }
    }, err => {
      this.toastSrv.error(err.message)
    });

    // hide all forms
    this.showonboarding = false;
    this.showUbo = false;
    this.showUnsigned = false;
    this.showDocs = false;
  }
  getUboData(api) {
    this.showDocs = false;
    let { user_key } = this.uccForm.value;
    let data = { user_key };
    this.userUboStatus = true;
    this.httpSrv.getMoreData(api, data).subscribe((data) => {
      console.log("UUBBOO", data)
      this.userUboStatus = false;
      this.userUboData = data
      if (this.userUboData.status === 404) {
        this.dataFilled = false;
        this.dataMessage = this.userUboData.message;
      } else {
        this.dataFilled = true;
        this.initUboForm()
        this.showUbo = !this.showUbo;
      }
      
    });
    this.showonboarding = false;
    this.showSigned = false;
    this.showUnsigned = false;
    this.showfatca = false;
  }
  initFatcaForm() {
    this.showDocs = false;
    this.additionalKycForm = new FormGroup({
      user_key: new FormControl(this.userFatcaData.fatcaData[0].user_key),
      app_income_code: new FormControl(
        this.userFatcaData.fatcaData[0].app_income_code
      ),
      net_worth_sign: new FormControl(
        this.userFatcaData.fatcaData[0].net_worth_sign
      ),
      net_worth: new FormControl(this.userFatcaData.fatcaData[0].net_worth),
      net_worth_date: new FormControl(
        new Date(this.userFatcaData.fatcaData[0].net_worth_date)
      ),
      occ_code: new FormControl(this.userFatcaData.fatcaData[0].occ_code),
      corp_servs: new FormControl(this.userFatcaData.fatcaData[0].corp_servs),
      insert_date: new FormControl(this.userFatcaData.fatcaData[0].insert_date),
    });
    this.default = this.userFatcaData.fatcaData[0].net_worth_sign;
    this.additionalKycForm.controls["net_worth_sign"].setValue(this.default, {
      onlySelf: true,
    });
    this.selectedOcc = this.additionalKycForm.controls["occ_code"].value;
    this.selectedCorSer = this.additionalKycForm.controls["corp_servs"].value;
    this.selectedIncomeCode = this.additionalKycForm.controls[
      "app_income_code"
    ].value;

    this.createdAt = new Date(
      this.additionalKycForm.controls["insert_date"].value
    ).toLocaleString();

    this.fatcaForm = new FormGroup({
      user_key: new FormControl(this.userFatcaData.fatcaData[0].user_key),
      addr_type: new FormControl(this.userFatcaData.fatcaData[0].addr_type),
      country_of_birth: new FormControl(
        this.userFatcaData.fatcaData[0].country_of_birth
      ),
      place_birth: new FormControl(this.userFatcaData.fatcaData[0].place_birth),
      tax_residence: new FormControl(
        this.userFatcaData.fatcaData[0].tax_residence
      ),
      country_tax_residency1: new FormControl(
        this.userFatcaData.fatcaData[0].country_tax_residency1
      ),
      id1_type: new FormControl(this.userFatcaData.fatcaData[0].id1_type),
      tax_payer_identityno1: new FormControl(
        this.userFatcaData.fatcaData[0].tax_payer_identityno1
      ),
      country_tax_residency2: new FormControl(
        this.userFatcaData.fatcaData[0].country_tax_residency2
      ),
      id2_type: new FormControl(this.userFatcaData.id2_type),
      tax_payer_identityno2: new FormControl(
        this.userFatcaData.fatcaData[0].tax_payer_identityno2
      ),
      country_tax_residency3: new FormControl(
        this.userFatcaData.fatcaData[0].country_tax_residency3
      ),
      id3_type: new FormControl(this.userFatcaData.id3_type),
      tax_payer_identityno3: new FormControl(
        this.userFatcaData.fatcaData[0].tax_payer_identityno3
      ),
      ffi_drnfe: new FormControl(this.userFatcaData.fatcaData[0].ffi_drnfe),
      nffe_catg: new FormControl(this.userFatcaData.fatcaData[0].nffe_catg),
      nature_bus: new FormControl(this.userFatcaData.fatcaData[0].ffi_drnfe),
      act_nfe_subcat: new FormControl(
        this.userFatcaData.fatcaData[0].act_nfe_subcat
      ),
      stock_exchange: new FormControl(
        this.userFatcaData.fatcaData[0].stock_exchange
      ),
      listed_company: new FormControl(
        this.userFatcaData.fatcaData[0].listed_company
      ),
      giin_applicable: new FormControl(
        this.userFatcaData.fatcaData[0].giin_applicable
      ),
      giin: new FormControl(this.userFatcaData.fatcaData[0].giin),

      sponcer_availability: new FormControl(
        this.userFatcaData.fatcaData[0].sponcer_availability
      ),
      sponcer_entity: new FormControl(
        this.userFatcaData.fatcaData[0].sponcer_entity
      ),
      giin_not_app: new FormControl(
        this.userFatcaData.fatcaData[0].giin_not_app
      ),
      giin_exemption: new FormControl(
        this.userFatcaData.fatcaData[0].giin_exemption
      ),
    });

    // this.fatcaForm.controls["country_of_birth"].disable();
    // set default values in fatca form
    this.selectedResidence = this.fatcaForm.controls["tax_residence"].value;
    this.selectedFFI = this.fatcaForm.controls["ffi_drnfe"].value;
    this.selectedFFTCat = this.fatcaForm.controls["nffe_catg"].value;
    this.selectedStock = this.fatcaForm.controls["stock_exchange"].value;
    this.selectedSponser = this.fatcaForm.controls[
      "sponcer_availability"
    ].value;
    // this.selectedSponser = this.fatcaForm.controls["giin_applicable"].value;
    this.selectedExemtion = this.fatcaForm.controls["giin_exemption"].value;
    this.selectedGIIN = this.fatcaForm.controls["giin_applicable"].value;
    this.selectedGIINotApp = this.fatcaForm.controls["giin_not_app"].value;
    this.selectedAddressType = this.fatcaForm.controls["addr_type"].value;
    this.selectedState = this.fatcaForm.controls["place_birth"].value;

    if (this.selectedResidence === "no") {
      this.fatcaForm.controls["country_tax_residency2"].disable();
      this.fatcaForm.controls["id2_type"].disable();
      this.fatcaForm.controls["tax_payer_identityno2"].disable();
      this.fatcaForm.controls["country_tax_residency3"].disable();
      this.fatcaForm.controls["id3_type"].disable();
      this.fatcaForm.controls["tax_payer_identityno3"].disable();
    }
    if (this.selectedFFI === "yes") {
      this.fatcaForm.controls["nffe_catg"].disable();
      this.fatcaForm.controls["nature_bus"].disable();
      this.fatcaForm.controls["act_nfe_subcat"].disable();
      this.fatcaForm.controls["stock_exchange"].disable();
      this.fatcaForm.controls["listed_company"].disable();
    }
    this.changeFFICategory(this.selectedFFTCat);
    this.changeGIINApplicable(this.selectedGIIN);
    this.changeSponserAvail(this.selectedSponser);
    this.changeResidence(this.fatcaForm.controls['tax_residence'].value)
    console.log("fattt", this.fatcaForm.value);
    console.log("adddddd", this.additionalKycForm.value);
  }
  initUboForm() {
    this.uboForm = new FormGroup({
      users: new FormArray([])
    })
    const control = <FormArray>this.uboForm.get('users');
    for (let user of this.userUboData.uboData) {
      const temp = new FormGroup({
        ubo_master_codes: new FormControl(
          user.ubo_master_codes
        ),
        ubo_name: new FormControl(user.ubo_name),
        ubo_pan_no: new FormControl(user.ubo_pan_no),
        ubo_country_tax_residency: new FormControl(
          user.ubo_country_tax_residency
        ),
        ubo_cocn: new FormControl(user.ubo_cocn),
        ubo_cob: new FormControl(user.ubo_cob),
        ubo_add_type: new FormControl(user.ubo_add_type),
        ubo_addr: new FormControl(user.ubo_addr),
        ubo_country: new FormControl(user.ubo_country),
        ubo_state: new FormControl(user.ubo_state),
        ubo_city: new FormControl(user.ubo_city),
        ubo_pin: new FormControl(user.ubo_pin),
        ubo_hold_percent: new FormControl(
          user.ubo_hold_percent
        ),
        user_key: new FormControl(user.user_key),
        id: new FormControl(user.id)
      })
      control.push(temp)
    }

    console.log(this.uboForm, "uboformm")
  }
  changeSponserAvail(value) {
    if (value === "yes") {
      this.fatcaForm.controls["sponcer_entity"].enable();
    } else {
      this.fatcaForm.controls["sponcer_entity"].disable();
    }
  }
  changeGIINApplicable(value) {
    if (value === "yes") {
      this.fatcaForm.controls["giin"].enable();
      this.fatcaForm.controls["sponcer_availability"].enable();
      this.fatcaForm.controls["sponcer_entity"].enable();
      this.fatcaForm.controls["giin_exemption"].enable();

      this.fatcaForm.controls["giin_not_app"].disable();
    } else {
      this.fatcaForm.controls["giin"].disable();
      this.fatcaForm.controls["sponcer_availability"].disable();
      this.fatcaForm.controls["sponcer_entity"].disable();
      this.fatcaForm.controls["giin_exemption"].disable();

      this.fatcaForm.controls["giin_not_app"].enable();
    }
  }
  changeResidence(residence) {
    if (residence === "Y") {
      this.fatcaForm.controls["country_tax_residency2"].enable();
      this.fatcaForm.controls["id2_type"].enable();
      this.fatcaForm.controls["tax_payer_identityno2"].enable();
      this.fatcaForm.controls["country_tax_residency3"].enable();
      this.fatcaForm.controls["id3_type"].enable();
      this.fatcaForm.controls["tax_payer_identityno3"].enable();
    } else {
      this.fatcaForm.controls["country_tax_residency2"].disable();
      this.fatcaForm.controls["id2_type"].disable();
      this.fatcaForm.controls["tax_payer_identityno2"].disable();
      this.fatcaForm.controls["country_tax_residency3"].disable();
      this.fatcaForm.controls["id3_type"].disable();
      this.fatcaForm.controls["tax_payer_identityno3"].disable();
    }
  }
  changeFFI(ffi) {
    if (ffi === "yes") {
      this.fatcaForm.controls["nffe_catg"].disable();
      this.fatcaForm.controls["nature_bus"].disable();
      this.fatcaForm.controls["act_nfe_subcat"].disable();
      this.fatcaForm.controls["stock_exchange"].disable();
      this.fatcaForm.controls["listed_company"].disable();
    } else {
      this.fatcaForm.controls["nffe_catg"].enable();
    }
  }
  changeFFICategory(value) {
    if (value === "") {
       this.fatcaForm.controls["listed_company"].disable();
      this.fatcaForm.controls["nature_bus"].disable();
      this.fatcaForm.controls["act_nfe_subcat"].disable();
       this.fatcaForm.controls["stock_exchange"].disable();
    }
    if (value === "L") {
      this.fatcaForm.controls["stock_exchange"].enable();

      this.fatcaForm.controls["listed_company"].disable();
      this.fatcaForm.controls["nature_bus"].disable();
      this.fatcaForm.controls["act_nfe_subcat"].disable();
    }
    if (value === "RL") {
      this.fatcaForm.controls["stock_exchange"].enable();
      this.fatcaForm.controls["listed_company"].enable();

      this.fatcaForm.controls["nature_bus"].disable();
      this.fatcaForm.controls["act_nfe_subcat"].disable();
    }
    if (value === "A") {
      this.fatcaForm.controls["nature_bus"].enable();
      this.fatcaForm.controls["act_nfe_subcat"].enable();

      this.fatcaForm.controls["stock_exchange"].disable();
      this.fatcaForm.controls["listed_company"].disable();
    }
    if (value === "P") {
      this.fatcaForm.controls["nature_bus"].enable();

      this.fatcaForm.controls["act_nfe_subcat"].disable();
      this.fatcaForm.controls["stock_exchange"].disable();
      this.fatcaForm.controls["listed_company"].disable();
    }
    if (value === "NA") {
      this.fatcaForm.controls["nature_bus"].disable();
      this.fatcaForm.controls["act_nfe_subcat"].disable();
      this.fatcaForm.controls["stock_exchange"].disable();
      this.fatcaForm.controls["listed_company"].disable();
    }
  }
  changeUBOTaxR(val, i, event) {
  
    this.uboForm.get('users').controls[i].controls.ubo_country_tax_residency.setValue(val)
    this.uboForm.get('users').controls[i].controls.ubo_cocn.setValue(val)
    this.uboForm.get('users').controls[i].controls.ubo_cob.setValue(val)
  }
  changeUBOCountry(val, i) {
    if (val !== "IND") {
      this.selectedCountryIndia = false;
    } else {
      this.selectedCountryIndia = true;
    }
  }

  updateUcc() {
    console.log(this.uccForm.value, 'ucc')
    this.userUpdated = true;
    this.httpSrv.updateUcc("update_user", this.uccForm.value).subscribe(
      (response) => {
        this.userUpdated = false;
        this.toastSrv.success(response.message);
      },
      (err) => {
        this.userUpdated = false;
        this.toastSrv.error(err.message);
      }
    );
  }
  updateKyc() {
    this.userUpdated = true;
    console.log(this.additionalKycForm.value, "adddddd");
    this.httpSrv
      .updateUcc("update_add_kyc", this.additionalKycForm.value)
      .subscribe(
        (response) => {
          this.userUpdated = false;
          this.toastSrv.success(response.message);
        },
        (err) => {
          this.userUpdated = false;
          this.toastSrv.error(err.message);
        }
      );
  }
  updateFatca() {
    console.log(this.fatcaForm.value, this, this.additionalKycForm.value, "fatcaform")
    this.userUpdated = true;
    this.httpSrv.updateUcc("update_fatca", this.fatcaForm.value).subscribe(
      (response) => {
        this.userUpdated = false;
        this.toastSrv.success(response.message);
      },
      (err) => {
        this.userUpdated = false;
        console.log(err)
        this.toastSrv.error(err.error.message);
      }
    );
  }
  updateUBO(api, i) {
    this.userUpdated = true;
    this.httpSrv
      .updateUcc("update_ubo", this.uboForm.controls['users'].controls[i].value)
      .subscribe(
        (response) => {
          this.userUpdated = false;
          this.toastSrv.success(response.message);
        },
        (err) => {
          this.userUpdated = false;
          this.toastSrv.error(err.message);
        }
      );
  }

  submitucc() {
    this.nseSubmission = true;
    let dataToBeSubmitted = {
      ...this.uccForm.value,
      ...this.uccForm.controls['userIdenForm'].value,
      process_mode: this.processMode.controls["process_mode"].value,
      holding_nature: this.processMode.controls["holding_nature"].value
    };
    // console.log("post data", postedData);
    this.httpSrv.postxml("nse/post_ucc", dataToBeSubmitted).subscribe((data) => {
      console.log(data, "nse responsee")
      let res = data;
      this.nseSubmission = false; //stop the spinner
      let parser = new DOMParser(),
        xmlDoc = parser.parseFromString(res, "text/xml"),
        returnCode = xmlDoc.getElementsByTagName("service_return_code")[0].childNodes[0].nodeValue;
      if (returnCode === "0") {
        let iinConfirmLink = xmlDoc.getElementsByTagName("FH_PAN_IIN_CONF_LINK")[0].innerHTML;
        let url = iinConfirmLink.split("'")[1]
        this.toastSrv.info("Data submitted to nse. Received success response.")
        window.open(url, "_blank")
        let iin = xmlDoc.getElementsByTagName("return_msg")[0].childNodes[0].nodeValue,
          ac_iin = iin.split(":"),
          iinData = {
            iin: ac_iin[ac_iin.length - 1].trim(),
            user_key: this.uccForm.controls["user_key"].value
          }
        console.log(iinData, "iinData")
        this.toastSrv.show("Saving IIN please wait...")
        this.nseSubmission = true;

        // save iin in local db
        this.httpSrv.updateUcc("add_iin", iinData).subscribe((data) => {
          console.log(data)
          this.nseSubmission = false;
          this.toastSrv.success("IIN saved successfully.")
          this.userOnboarded = true;
        }, err => {
          this.nseSubmission = false;
          this.toastSrv.error(err.message)
          console.log(err)
        })

        //save the date with user key to track steps.
        let data = {
          user_key: this.uccForm.controls['user_key'].value,
          column_name: "onboarding",
          value: Date.now()
        }
        this.httpSrv.getMoreData("success/add/user_status", data).subscribe((response) => {
          // console.log(response, "response")
          this.toastSrv.success("Date updated successfully.")
          window.alert("Date saved succesfully.")
        }, err => { this.toastSrv.error("Failed to save the date.") })
      } else {
        this.toastSrv.warning("Recieved failure response from NSE.")
        this.toastSrv.warning("Please resolve errors before submitting the data again.")
        this.userOboardErros = true
        this.userOnboarded = false;
        console.log(returnCode, "error")
        let response = xmlDoc.getElementsByTagName("service_response");
        console.log(response)
        let errors = []
        for (let i = 0; i < response.length; i++) {
          // console.log(response[i].getElementsByTagName("return_msg")[0].childNodes[0].nodeValue.trim())
          errors.push(response[i].getElementsByTagName("return_msg")[0].childNodes[0].nodeValue.trim())
        }
        let data = {
          user_key: this.uccForm.controls['user_key'].value,
          errors: errors
        }
        this.toastSrv.success("Saving errors in the DB")
        this.httpSrv.getMoreData("errors/onboarding/add_error", data).subscribe((data) => {
          console.log(data)
          this.nseSubmission = false;
          this.toastSrv.success("Errors saved successfully.")
          this.httpSrv.getMoreData("errors/onboarding/get_errors", { user_key: this.userInfo.user_key }).subscribe((data) => {
            console.log(data, "Erroro")
            this.nseErrors = data
            if (this.nseErrors.result.length === 0) {
              this.userOboardErros = false;
            } else {
              this.userOboardErros = true;
            }
          }, error => {
            this.toastSrv.error(error)
          })
        }, err => {
          console.log(err)
          this.toastSrv.error(err.message)
        })
        //  console.log(this.nseErrors.result)
      }
    }, err => {
      console.log(err)
      this.toastSrv.error(err.message)
    })
  }
  editUcc() {
     this.nseEditStatus = true;
    let dataToBeSubmitted = {
      ...this.uccForm.value,
      ...this.uccForm.controls['userIdenForm'].value,
      iin: this.uccForm.controls['iin'].value
    };
    this.httpSrv.postxml("nse/edit_customer", dataToBeSubmitted).subscribe((data) => {
      // console.log(data, "nse responsee")
      let res = data;
      this.nseEditStatus = false; //stop the spinner
      let parser = new DOMParser(),
        xmlDoc = parser.parseFromString(res, "text/xml"),
        returnCode = xmlDoc.getElementsByTagName("service_return_code")[0].childNodes[0].nodeValue;
      if (returnCode === "0") {
        let message = xmlDoc.getElementsByTagName("return_msg")[0].childNodes[0].nodeValue;
        this.toastSrv.show(message)
        this.nseEditStatus = true;
        //save the date with user key to track steps.
        let data = {
          user_key: this.uccForm.controls['user_key'].value,
          column_name: "onboarding_update",
          value: Date.now()
        }
        this.httpSrv.getMoreData("success/update/user_status", data).subscribe((response) => {
          // console.log(response, "response")
          this.toastSrv.success("Date updated successfully.")
          window.alert("user updated  succesfully.")
        }, err => { this.toastSrv.error("Failed to save the date.") })
      } else {
        this.toastSrv.warning("Recieved failure response from NSE.")
        this.toastSrv.warning("Please resolve errors before submitting the data again.")
        this.userOboardErros = true
        this.userOnboarded = false;
        let response = xmlDoc.getElementsByTagName("service_response");
        let errors = []
        for (let i = 0; i < response.length; i++) {
          errors.push(response[i].getElementsByTagName("return_msg")[0].childNodes[0].nodeValue.trim())
        }
        let data = {
          user_key: this.uccForm.controls['user_key'].value,
          errors: errors
        }
        this.toastSrv.success("Saving errors in the DB")
        this.httpSrv.getMoreData("errors/onboarding/add_error", data).subscribe((data) => {
          console.log("Add Error Response:", data)
          this.nseEditStatus = false;
          this.toastSrv.success("Errors saved successfully.")
          this.httpSrv.getMoreData("errors/onboarding/get_errors", { user_key: this.userInfo.user_key }).subscribe((data) => {
            this.nseErrors = data
            if (this.nseErrors.result.length === 0) {
              this.userOboardErros = false;
            } else {
              this.userOboardErros = true;
            }
          }, error => {
            this.toastSrv.error(error)
          })
        }, err => {
          console.log(err)
          this.toastSrv.error(err.message)
        })
        //  console.log(this.nseErrors.result)
      }
    }, err => {
      console.log(err)
      this.toastSrv.error(err.message)
    })
  }

  submitFatca() {
    this.nseSubmission = true;
    console.log(this.userInfo.tax_type)
    let dataToBeSubmitted;
    if (this.userInfo.tax_type === '01') {
      dataToBeSubmitted = {
      ...this.uccForm.value,
      ...this.uccForm.controls['userIdenForm'].value,
      ...this.additionalKycForm.value,
      ...this.fatcaForm.value,
      };
    } else {
       dataToBeSubmitted = {
      ...this.uccForm.value,
      ...this.uccForm.controls['userIdenForm'].value,
      ...this.additionalKycForm.value,
      ...this.fatcaForm.value,
      ...this.uboForm.value,
      };
    }
    console.log("post data", dataToBeSubmitted);
    this.httpSrv.postxml("nse/post_fatca_ubo", dataToBeSubmitted).subscribe((data) => {
      console.log(data, "nse responsee")
      let res = data;
      this.nseSubmission = false; //stop the spinner
      let parser = new DOMParser(),
        xmlDoc = parser.parseFromString(res, "text/xml"),
        returnCode = xmlDoc.getElementsByTagName("service_return_code")[0].childNodes[0].nodeValue;
      if (returnCode === "0") {
        let response = xmlDoc.getElementsByTagName("service_response");
        this.toastSrv.info("Data submitted to nse. Received success response.")
        for (let i = 0; i < response.length; i++) {
          this.toastSrv.success(response[i].getElementsByTagName("Status_Desc")[0].childNodes[0].nodeValue.trim())
        }
        let data = {
          user_key: this.uccForm.controls['user_key'].value,
          column_name: "fatca",
          value: Date.now()
        }
        this.httpSrv.getMoreData("success/add/user_status", data).subscribe((response) => {
          this.toastSrv.success("Date saved successfully.")
          console.log(response, "local response")

        }, err => { this.toastSrv.error("Failed to save the date.") })
      } else {
        this.toastSrv.warning("Recieved failure response from NSE.")
        this.toastSrv.warning("Please resolve errors before submitting the data again.")
        this.userOboardErros = true
        this.userOnboarded = false;
        console.log(returnCode, "error")
        let response = xmlDoc.getElementsByTagName("service_response");
        console.log(response)
        let errors = []
        if (!response[0].getElementsByTagName("return_msg")[0]) {
          for (let i = 0; i < response.length; i++) {
            // console.log(response[i].getElementsByTagName("return_msg")[0].childNodes[0].nodeValue.trim())
            errors.push(response[i].getElementsByTagName("Status_Desc")[0].childNodes[0].nodeValue.trim())
          }
        }
        else {
          for (let i = 0; i < response.length; i++) {
            // console.log(response[i].getElementsByTagName("return_msg")[0].childNodes[0].nodeValue.trim())
            errors.push(response[i].getElementsByTagName("return_msg")[0].childNodes[0].nodeValue.trim())
          }
        }
        let data = {
          user_key: this.uccForm.controls['user_key'].value,
          errors: errors
        }
        this.toastSrv.success("Saving errors in the DB")
        this.httpSrv.getMoreData("errors/onboarding/add_error", data).subscribe((data) => {
          console.log(data)
          this.nseSubmission = false;
          this.toastSrv.success("Errors saved successfully.")
          this.httpSrv.getMoreData("errors/onboarding/get_errors", { user_key: this.userInfo.user_key }).subscribe((data) => {
            console.log(data, "Erroro")
            this.nseErrors = data
            if (this.nseErrors.result.length === 0) {
              this.userOboardErros = false;
            } else {
              this.userOboardErros = true;
            }
          }, error => {
            this.toastSrv.error(error)
          })
        }, err => {
          console.log(err)
          this.toastSrv.error(err.message)
        })
        //  console.log(this.nseErrors.result)
      }
    }, err => {
      console.log(err)
      this.toastSrv.error(err.message)
    })
  }
  deleteError(id) {
    this.removeError = true;
    let data = {
      "id": id,
      user_key: this.uccForm.controls['user_key'].value
    }
    console.log(data, "deletye")
    this.httpSrv.delete("errors/onboarding/delete_error", data).subscribe(data => {
      console.log(data)
      this.removeError = false;
      this.toastSrv.success("Error deleted successfully.")
      this.loadErrors()
    }, err => {
      this.removeError = false;
      console.log(err)
      this.toastSrv.error(err.message)
    })
  }

  loadErrors() {
    this.httpSrv.getMoreData("errors/onboarding/get_errors", { user_key: this.userInfo.user_key }).subscribe((data) => {
      this.hasOnboardErros = false;
      console.log(data, "Erroro")
      this.nseErrors = data
      if (this.nseErrors.result.length === 0) {
        this.userOboardErros = false;
      } else {
        this.userOboardErros = true;
      }
    }, error => {
      this.hasOnboardErros = false;
      this.toastSrv.error(error)
    })
  }

  saveErrors(xmlDoc) {
    this.toastSrv.warning("Recieved failure response from NSE.")
    this.toastSrv.warning("Please resolve errors before submitting the data again.")
    this.userOboardErros = true
    this.userOnboarded = false;
    let response = xmlDoc.getElementsByTagName("service_response");
    console.log(response)
    let errors = []
    for (let i = 0; i < response.length; i++) {
      // console.log(response[i].getElementsByTagName("return_msg")[0].childNodes[0].nodeValue.trim())
      errors.push(response[i].getElementsByTagName("return_msg")[0].childNodes[0].nodeValue.trim())
    }
    let data = {
      user_key: this.uccForm.controls['user_key'].value,
      errors: errors
    }
    this.toastSrv.success("Saving errors in the DB")
    this.httpSrv.getMoreData("errors/onboarding/add_error", data).subscribe((data) => {
      console.log(data)
      this.nseSubmission = false;
      this.toastSrv.success("Errors saved successfully.")
      this.httpSrv.getMoreData("errors/onboarding/get_errors", { user_key: this.userInfo.user_key }).subscribe((data) => {
        console.log(data, "Erroro")
        this.nseErrors = data
        if (this.nseErrors.result.length === 0) {
          this.userOboardErros = false;
        } else {
          this.userOboardErros = true;
        }
      }, error => {
        this.toastSrv.error(error)
      })
    }, err => {
      console.log(err)
      this.toastSrv.error(err.message)
    })
  }

  updateUsrStatus() {
    console.log("entered into update status");

    let pdata: any = {};
    pdata.mail = this.selectedEmail;
    pdata.onb = 1;
    // this.httpSrv.postxml("postuserstatus", pdata).subscribe((data) => {
    //   console.log("success");
    //   this.uccStatus = false;
    // });
  }

  retrigger() {
    this.nseSubmission = true;
    let data = {
      iin: this.uccForm.controls['iin'].value,
      pan: this.uccForm.controls["userIdenForm"].controls['pan'].value
    }
    this.httpSrv.postxml("nse/retrigger_iin", data).subscribe((data) => {
      console.log(data, "retrigger data")
      this.nseSubmission = false
      let res = data;
      let parser = new DOMParser(),
        xmlDoc = parser.parseFromString(res, "text/xml"),
       returnCode = xmlDoc.getElementsByTagName("service_return_code")[0].childNodes[0].nodeValue;
        if (returnCode === "1") {
          this.retriggerMessage = xmlDoc.getElementsByTagName("return_msg")[0].childNodes[0].nodeValue;
        }else{
           let iinConfirmLink = xmlDoc.getElementsByTagName("Confirmation_Link")[0].innerHTML;
          this.toastSrv.info("Received success response.")
          window.open(iinConfirmLink, "_blank")
        }
     
    }, err => {
      this.nseSubmission = false
      this.toastSrv.error(err.message)
    })
   
  }
  updateIIN() {
     this.updateIINStatus = true
     let data = {
       user_key: this.userInfo.user_key,
       iin_status:1
   }
    this.httpSrv.updateUcc("update_user", data).subscribe(
      (response) => {
        this.updateIINStatus = false;
        this.toastSrv.success(response.message);
      },
      (err) => {
        this.updateIINStatus = false;
        this.toastSrv.error(err.message);
      }
    );
  }

  showfatcaform() {
    this.showonboarding = false;
    this.showSigned = false;
    this.showUnsigned = false;
    this.showDocs = false;
    this.showfatca = !this.showfatca;
  }

  showdocs() {
    this.showfatca = false;
    this.showonboarding = false;
    this.showSigned = false;
    this.showUnsigned = false;
    this.showUbo = false;
    this.showDocs = !this.showDocs;

    this.userDocsStatus = true;
    this.httpSrv.getMoreData("get_docs", { user_key: this.uccForm.controls['user_key'].value }).subscribe(res => {
      console.log(res)
      this.userDocsStatus = false;
      if (res['result'].length !== 0) {
        let { user_key, ...rest } = res['result'][0];
        this.userDocs = rest
        this.toastSrv.success("Docs fetched successfully.")
      }
    }, err => {
      this.toastSrv.error(err.error.message)
    })
  }

  createTiff(key, value) {
    console.log(value.split('.').pop() === 'tiff')
    this.creatingTiff = true
    let data = {
      key: key,
      value: value,
      user_key: this.uccForm.controls['user_key'].value
    }
    this.httpSrv.getMoreData("convert_to_tiff", data).subscribe((result) => {
      this.creatingTiff = false;
      this.toastSrv.success("Tiff Created Successfully")
      this.showDocs = !this.showDocs;
      this.showdocs()
    }, err => {
      this.creatingTiff = false;
      this.toastSrv.error(err.message)
    })
  }

  raiseAlert() {
    let data = {
      email: this.userInfo.mf_email,
      user_key: this.userInfo.user_key
    }
    let alertDialog = this.dialog.open(EmailComponent, { width: '600px', data: data });
    alertDialog.afterClosed().subscribe(result => {
      // this.loadAlerts()
    });
  }

  showunsigned() {
    this.showonboarding = false;
    this.showfatca = false;
    this.showSigned = false;
    this.showUnsigned = !this.showUnsigned;
    this.showDocs = false;
  }

  showsigned() {
    this.showonboarding = false;
    this.showfatca = false;
    this.showSigned = !this.showSigned;
    this.showUnsigned = false;
    this.showDocs = false;
  }

}
