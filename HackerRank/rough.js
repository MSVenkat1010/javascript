function ServiceAuthorizationUpdate(props) {
  let { level } = useParams();

  const [serviceLevel, setServiceLevel] = useState(level);
  const [serviceLevelCode,setServiceLevelCode]=useState("")
  const [allowNavigation, setAllowNavigation] = React.useState(false);
  const [prompt, setPrompt] = useState(false);
  const [confirm, setConfirm] = useState(false);
  
  
  const readOnly = global.globalIsReadOnly();



  useEffect(() => {
    if (level === "DME") {
      setServiceLevelCode("SV1")
      setServiceLevel("Professional Service");
      setNavLevel({
        name:"View/Edit Authorization",
        url:"/ViewEditAuthRequest"
      })
    } else if (level === "HCBC") {
      setServiceLevelCode("SV1")
      setServiceLevel("Professional Service");
      setNavLevel({
        name:"View/Edit Authorization",
        url:"/ViewEditAuthRequest"
      })
    } else if (level === "Dental") {
      setServiceLevelCode("SV3")
      setServiceLevel("Dental Service");
      setNavLevel({
        name:"View/Edit Authorization",
        url:"/ViewEditAuthRequest"
      })
    } else if (level === "Professional") {
      setServiceLevelCode("SV1")
      setServiceLevel("Professional Service");
      setNavLevel({
        name:"View/Edit Authorization",
        url:"/ViewEditAuthRequest"
      })
    } else if (level === "Institutional") {
      setServiceLevelCode("SV2")
      setServiceLevel("Institutional Service");
      setNavLevel({
        name:"View/Edit Authorization",
        url:"/ViewEditAuthRequest"
      })
    }

  }, [level]);

  const serviceAuthDataO = useSelector(
    (state) =>
      state &&
      state.viewEditAuthRequest &&
      state.viewEditAuthRequest.serviceAuthData &&
      state.viewEditAuthRequest.serviceAuthData
  );
  const serviceAuthData = serviceAuthDataO && serviceAuthDataO.data;

  //

  /* useEffect(() => {
    if (
      serviceAuthData &&
      serviceAuthData.basicServicesDetailsVO &&
      serviceAuthData.basicServicesDetailsVO.eventProviderDetailsList &&
      serviceAuthData.basicServicesDetailsVO.eventProviderDetailsList.length > 0
    ) {
      setEventProviderDetailsList(
        serviceAuthData.basicServicesDetailsVO.eventProviderDetailsList
      );
    }
  }, [serviceAuthData]); */
  const inititalPEDValues = getPEDValues(
    serviceAuthData &&
    serviceAuthData.otherServices &&
    serviceAuthData.otherServices.patientEventDetailVO
  );
  //To Map eventprovider list from backend
  const initialEventproviderList = serviceAuthData &&
  serviceAuthData.basicServicesDetailsVO &&
  serviceAuthData.basicServicesDetailsVO.eventProviderDetailsList
  const userData=JSON.parse(localStorage.getItem("loginState"));
  const orgId = userData && userData.orgId;
  const otherProviderID = JSON.parse(localStorage.getItem("providerID"));
  const initialRequestingProvHeader = {
    supplementalProvData: 
    serviceAuthData&&
    serviceAuthData.basicServicesDetailsVO&&
    serviceAuthData.basicServicesDetailsVO.requestingProviderDetailsVO&& 
    serviceAuthData.basicServicesDetailsVO.requestingProviderDetailsVO.supplementalProviderList?
    serviceAuthData.basicServicesDetailsVO.requestingProviderDetailsVO.supplementalProviderList:[],
    medicaidId: orgId || null,
    providerID: otherProviderID && otherProviderID.providerID,
    providerIDType: "XX",
    entityCode:       serviceAuthData &&
    serviceAuthData.otherServices &&
    serviceAuthData.otherServices.requestingProvider &&
    serviceAuthData.otherServices.requestingProvider.entityCode ?
    serviceAuthData.otherServices.requestingProvider.entityCode: "1P",
    entityType:       serviceAuthData &&
    serviceAuthData.otherServices &&
    serviceAuthData.otherServices.requestingProvider &&
    serviceAuthData.otherServices.requestingProvider.entityType ?
    serviceAuthData.otherServices.requestingProvider.entityType: "1",
    providerCd:      serviceAuthData &&
    serviceAuthData.otherServices &&
    serviceAuthData.otherServices.requestingProvider &&
    serviceAuthData.otherServices.requestingProvider.providerCode ?
    serviceAuthData.otherServices.requestingProvider.providerCode: "",
    taxonomyCode:
      serviceAuthData &&
      serviceAuthData.otherServices &&
      serviceAuthData.otherServices.requestingProvider &&
      serviceAuthData.otherServices.requestingProvider.taxonomyCode ?
      serviceAuthData.otherServices.requestingProvider.taxonomyCode.slice(
        0,
        -1
      ): '',
    provName:
      serviceAuthData &&
      serviceAuthData.otherServices &&
      serviceAuthData.otherServices.requestingProvider &&
      serviceAuthData.otherServices.requestingProvider.providerName
      ? serviceAuthData.otherServices.requestingProvider.providerName
      : '',
    lastName:
      serviceAuthData &&
      serviceAuthData.otherServices &&
      serviceAuthData.otherServices.requestingProvider &&
      serviceAuthData.otherServices.requestingProvider.lastName,
    firstName:
      serviceAuthData &&
      serviceAuthData.otherServices &&
      serviceAuthData.otherServices.requestingProvider &&
      serviceAuthData.otherServices.requestingProvider.firstName
      ? serviceAuthData.otherServices.requestingProvider.firstName
      : '',
    middleInitial:
      serviceAuthData &&
      serviceAuthData.otherServices &&
      serviceAuthData.otherServices.requestingProvider &&
      serviceAuthData.otherServices.requestingProvider.middleInitial
      ? serviceAuthData.otherServices.requestingProvider.middleInitial
      : '',
    suffix:
      serviceAuthData &&
      serviceAuthData.otherServices &&
      serviceAuthData.otherServices.requestingProvider &&
      serviceAuthData.otherServices.requestingProvider.suffix
      ? serviceAuthData.otherServices.requestingProvider.suffix
      : '',
    addressLine1:
      serviceAuthData &&
      serviceAuthData.otherServices &&
      serviceAuthData.otherServices.requestingProvider &&
      serviceAuthData.otherServices.requestingProvider.addressLine1
      ? serviceAuthData.otherServices.requestingProvider.addressLine1
      : '',
    addressLine2:
      serviceAuthData &&
      serviceAuthData.otherServices &&
      serviceAuthData.otherServices.requestingProvider &&
      serviceAuthData.otherServices.requestingProvider.addressLine2
      ? serviceAuthData.otherServices.requestingProvider.addressLine2
      : '',
    city:
      serviceAuthData &&
      serviceAuthData.otherServices &&
      serviceAuthData.otherServices.requestingProvider &&
      serviceAuthData.otherServices.requestingProvider.city
      ? serviceAuthData.otherServices.requestingProvider.city
      : '',
    state:
      serviceAuthData &&
      serviceAuthData.otherServices &&
      serviceAuthData.otherServices.requestingProvider &&
      serviceAuthData.otherServices.requestingProvider.state ?
      serviceAuthData.otherServices.requestingProvider.state.slice(0, -1) : '',
    zip:
      serviceAuthData &&
      serviceAuthData.otherServices &&
      serviceAuthData.otherServices.requestingProvider &&
      serviceAuthData.otherServices.requestingProvider.zip
      ? serviceAuthData.otherServices.requestingProvider.zip
      :'',
    zip4:
      serviceAuthData &&
      serviceAuthData.otherServices &&
      serviceAuthData.otherServices.requestingProvider &&
      serviceAuthData.otherServices.requestingProvider.zip4
      ? serviceAuthData.otherServices.requestingProvider.zip4
      : '',
    country:
      serviceAuthData &&
      serviceAuthData.otherServices &&
      serviceAuthData.otherServices.requestingProvider &&
      serviceAuthData.otherServices.requestingProvider.country
      ? serviceAuthData.otherServices.requestingProvider.country
      : '',
    countrySubdiv:
      serviceAuthData &&
      serviceAuthData.otherServices &&
      serviceAuthData.otherServices.requestingProvider &&
      serviceAuthData.otherServices.requestingProvider.countrySubdiv
     ?  serviceAuthData.otherServices.requestingProvider.countrySubdiv
      : '',
    medicaidSupplementalProviderVO: {
      auditUserID: null,
      auditTimeStamp: null,
      addedAuditUserID: null,
      addedAuditTimeStamp: null,
      versionNo: 0,
      dbRecord: false,
      sortColumn: null,
      auditKeyList: [],
      auditKeyListFiltered: false,
      providerID: orgId,
      providerIDType: "1D",
      providerIDTypeDesc: null,
      providerName: null,
      licenseState: null,
      usedIndicator: null,
      sequenceId: null,
      sequenceNumber: null,
      evPrvSuppPsysIdList: null,
    },
  }
 //To map supplemental Response 
 //initialSP
 const initialSP = initialsupplementalProviderList();
  function initialsupplementalProviderList(){
    let datasp=[]
    serviceAuthData &&
    serviceAuthData.basicServicesDetailsVO &&
    serviceAuthData.basicServicesDetailsVO.requestingProviderDetailsVO &&
    serviceAuthData.basicServicesDetailsVO.requestingProviderDetailsVO.supplementalProviderList.map((item,index)=>{
      datasp.push({
        providerID:item.providerID,
        providerIDType:item.providerIDType&&item.providerIDType.split('-')[0],
        rowId:Number.parseInt(item.sequenceId),
        conditionCode:null,
      })
    })
   
return datasp
  } 
  const serviceAuthAddData = useSelector(
    (state) => state.serviceSearch.saIdPayload
  );

  var memberContactInfo = serviceAuthData&&
  serviceAuthData.otherServices&&
  serviceAuthData.otherServices.eventProvider&&
  serviceAuthData.otherServices.eventProvider.sAContactInfoVO

  const initialContractInfo = {
    name: memberContactInfo && memberContactInfo.name || null,
    phone: memberContactInfo && memberContactInfo.phone || null,
    extension: memberContactInfo && memberContactInfo.extension || null,
    fax: memberContactInfo && memberContactInfo.fax || null,
    email: memberContactInfo && memberContactInfo.email || null
  };

  const [reqPrvContractInfo, setReqPrvContractInfo] = useState(
    initialContractInfo
  );
  const [PEDValues, setPEDValues] = useState(inititalPEDValues);
  const [tabValue, setTabValue] = useState(0);
  const [quickLinks, setQuickLinks] = useState([
    "Service Authorization",
    "Member",
    "Provider",
    "Diagnosis",
    "Service Line Item Information",
    "Service Authorization Additional Line Information",
    "CMdS Reject Reasons",
  ]);
  const [spinnerLoader, setspinnerLoader] = React.useState(false);
  const [requestingProvInfo, setRequestingProvInfo] = useState(
    initialRequestingProvHeader
  );
  //To Map eventProvider list from backend
  const [eventProviderDetailsList, setEventProviderDetailsList] = useState(initialEventproviderList);
  const [opType, setOperationType] = useState("");
  const serviceAuthLIData = useSelector(
    (state) => state.serviceSearch.saLIPayload
  );

  const isCopy = useSelector((state) => state.serviceSearch.isCopy);

  const [isCopySA, setIsCopySA] = useState(false);
  const [isSaveDisabled, setIsSaveDisabled] = useState(false);

  const isAllNull = (...values) => {
    let flag = true;
    values.map((value) => {
      if (value && value !== "-1") {
        flag = false;
      }
    });
    return flag;
  };
  const handleServiceAuthCopy = () => {
    setIsCopySA(true);
    setSuccessMessages(["The Service Authorization was successfully copied."]);
    
    props.history.push({
      pathname: `/SubmitAuthorization/${level}`,
      serviceAuthData: serviceAuthData,
      isCopy:true
    });
  };
  const [isProtected, setIsProtected] = React.useState(false);
  React.useEffect(() => {
    if (readOnly ||
      (initializeValues.currentStatus &&
     // initializeValues.saMediaType == "P" ||
      // initializeValues.saMediaType == "p"
      initializeValues.currentStatus == "p" || initializeValues.currentStatus == "P"
      || initializeValues.currentStatus == "a" || initializeValues.currentStatus == "A"
      || initializeValues.currentStatus == "d" || initializeValues.currentStatus == "D"
      || initializeValues.currentStatus == "v" || initializeValues.currentStatus == "V"
    )) {

      setIsProtected(true);
    }
  }, [serviceAuthData]);


  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    if (newValue == 0) {
      setQuickLinks([
        "Service Authorization",
        "Member",
        "Provider",
        "Diagnosis",
        "Service Line Item Information",
        "Service Authorization Additional Line Information",
        "CMdS Reject Reasons",
      ]);
    }
    if (newValue == 1) {
      setQuickLinks([
        "Provider Information",
        "Member Information",
        "Claim Information",
        "Basic Line Item Information",
      ]);
    }
    if (newValue == 2) {
      setQuickLinks([
        "Claim  Information  ",
        "Claim Provider Information",
        "Coordination of Benefits",
      ]);
    }
  };

  const changePEDValues = (name, dec, isDate, checkBox) => (event) => {

    let val;
    if (isDate) {
      val = event;
    } else {
      val = event.target.value;
    }
    if (dec) {
      if (isNaN(val)) return;
      let index = val.indexOf(".");
      if (index && index >= 0 && val.length > index + 1 + dec) return;
    }
    if (checkBox) {
      val = checkBox;
    }
    setPEDValues({ ...PEDValues, [name]: val });
  };

  useEffect(() => {
    if (isCopySA) {
      setValues({
        ...values,
        ["serviceAuthID"]: null,
        ["enteredDate"]: formatAMPM(new Date()),
      });
      setIsSaveDisabled(false)
    }
  }, [isCopySA]);

  const initializeValues = {
    authType:
      level === "HCBC"
        ? "HCBC"
        : level === "Dental"
          ? "DE"
          : level === "Institutional"
            ? "MD"
            : level === "DME"
              ? "DM"
              : level === "Professional"
                ? "MD"
                : "DE",
    currentStatus: serviceAuthData &&
      serviceAuthData.basicServicesDetailsVO &&
      serviceAuthData.basicServicesDetailsVO.serviceAuthHeaderDetails &&
      serviceAuthData.basicServicesDetailsVO.serviceAuthHeaderDetails.currentStatus,
    saMediaType: "W",
    saReceivedDate: "",
    saInputSource: "N",
    externalSAId: "",
    saRequestedBeginDate: "",
    saRequestedEndDate: "",
    attachments: "no",
    saAddUpdate: "Add",
    patientEventFag: false,
    specialConsiderations: false,
    serviceAuthID:
      serviceAuthData &&
      serviceAuthData.basicServicesDetailsVO &&
      serviceAuthData.basicServicesDetailsVO.serviceAuthHeaderDetails &&
      serviceAuthData.basicServicesDetailsVO.serviceAuthHeaderDetails
        .serviceAuthID,
    submitterID: "ZYSJIWD",
    approvedBeginDate: "",
    approvedEndDate: "",
    transactPurpose: "Request",
    enteredDate: serviceAuthData &&
      serviceAuthData.basicServicesDetailsVO &&
      serviceAuthData.basicServicesDetailsVO.serviceAuthHeaderDetails &&
      serviceAuthData.basicServicesDetailsVO.serviceAuthHeaderDetails.enteredDate
      ? serviceAuthData.basicServicesDetailsVO.serviceAuthHeaderDetails.enteredDate : formatAMPM(
        new Date()
      ),
    certAction:
      serviceAuthData &&
      serviceAuthData.basicServicesDetailsVO &&
      serviceAuthData.basicServicesDetailsVO.serviceAuthHeaderDetails &&
      serviceAuthData.basicServicesDetailsVO.serviceAuthHeaderDetails.certificationActionCode,
    reviewDecisionReason: serviceAuthData && serviceAuthData.basicServicesDetailsVO && serviceAuthData.basicServicesDetailsVO.serviceAuthHeaderDetails && serviceAuthData.basicServicesDetailsVO.serviceAuthHeaderDetails.certificationDecisionReasoncode,
    transactType: serviceAuthData && serviceAuthData.basicServicesDetailsVO && serviceAuthData.basicServicesDetailsVO.serviceAuthHeaderDetails && serviceAuthData.basicServicesDetailsVO.serviceAuthHeaderDetails.trasactionTypeCode


  };


  useEffect(() => {
    if (
      serviceAuthAddData != null &&
      serviceAuthAddData.data &&
      serviceAuthAddData.data != null &&
      (opType === "addSA" || opType === "editSA")
    ) {
      setspinnerLoader(false);
      props.history.push({
        pathname: "/SASubmitted",
        serviceAuthAddData: serviceAuthAddData,
        isSearch: false,
        path: window.location.pathname,
      });
    }
  }, [serviceAuthAddData]);

  const [values, setValues] = useState(initializeValues);
  //const [confirm, setConfirm] = useState(false);
  const [cancelType, setCancelType] = useState(false);
  const [authData, setAuthData] = useState({}); // Redo Demo
  const [showDetails, setShowDetails] = useState(false);
  const [exceptionDetail, setExceptionDetail] = useState([]);
  const [readResolution, setReadResolution] = useState(true);

  const locationDropdown = useSelector(
    (state) => state.claimException && state.claimException.locationPayload
  );
  const userDropDown = useSelector(
    (state) => state.claimException && state.claimException.userPayload
  );

  const handelPromptSet = (set) => {
    if (set) setPrompt(true);
  };
  const enableNavigation=(boolean)=>{
    setAllowNavigation(boolean)
  }
  const [proEven,setProEven]=useState("");
  const valiDateProv = ()=>{
    let evenLen = eventProviderDetailsList
    let servLen = []
     serviceAuthLIData && serviceAuthLIData.data.map((item)=>{
       if(item.servicingProviderLineItemList && item.servicingProviderLineItemList.length >0){
       servLen.push(item.servicingProviderLineItemList)}
 
     })
if(proEven != "Yes"){   if(   evenLen.length<=0 && servLen.length<=0){
     setErrorMessages([ServiceAuthConstants.PATIENT_EVENT_ERROR]);
     return false;
   }else{
    return true;
   }}
  else{
   return true;
  }
  
   }

  const initializeMemberValues = {
    memberId:
      serviceAuthData &&
      serviceAuthData.basicServicesDetailsVO &&
      serviceAuthData.basicServicesDetailsVO.serviceAuthHeaderDetails &&
      serviceAuthData.basicServicesDetailsVO.serviceAuthHeaderDetails.memberID
      ? serviceAuthData.basicServicesDetailsVO.serviceAuthHeaderDetails.memberID
      : '',
    lastName:
      serviceAuthData &&
        serviceAuthData.basicServicesDetailsVO &&
        serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO &&
        serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO.lastName
        ? serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO.lastName
        : serviceAuthData &&
          serviceAuthData.basicServicesDetailsVO &&
          serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO &&
          serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO
            .submittedSASubscriberInfo &&
          serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO
            .submittedSASubscriberInfo.name &&
          serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO
            .submittedSASubscriberInfo.name.lastName
          ? serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO
            .submittedSASubscriberInfo.name.lastName
          : '',
    firstName:
      serviceAuthData &&
        serviceAuthData.basicServicesDetailsVO &&
        serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO &&
        serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO.firstName
        ? serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO.firstName
        : serviceAuthData &&
          serviceAuthData.basicServicesDetailsVO &&
          serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO &&
          serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO
            .submittedSASubscriberInfo &&
          serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO
            .submittedSASubscriberInfo.name &&
          serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO
            .submittedSASubscriberInfo.name.firstName
          ? serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO
            .submittedSASubscriberInfo.name.firstName
          : '',
    middleInitial:
      serviceAuthData &&
        serviceAuthData.basicServicesDetailsVO &&
        serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO &&
        serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO.middleInitial
        ? serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO
          .middleInitial
        : serviceAuthData &&
          serviceAuthData.basicServicesDetailsVO &&
          serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO &&
          serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO
            .submittedSASubscriberInfo &&
          serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO
            .submittedSASubscriberInfo.name &&
          serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO
            .submittedSASubscriberInfo.name.middleName
          ? serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO
            .submittedSASubscriberInfo.name.middleName
          : '',
    suffix:
      serviceAuthData &&
        serviceAuthData.basicServicesDetailsVO &&
        serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO &&
        serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO.suffix
        ? serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO.suffix
        : serviceAuthData &&
          serviceAuthData.basicServicesDetailsVO &&
          serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO &&
          serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO
            .submittedSASubscriberInfo &&
          serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO
            .submittedSASubscriberInfo.name &&
          serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO
            .submittedSASubscriberInfo.name.suffixName
          ? serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO
            .submittedSASubscriberInfo.name.suffixName
          : '',
    prefix:
      serviceAuthData &&
        serviceAuthData.basicServicesDetailsVO &&
        serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO &&
        serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO.prefix
        ? serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO.prefix
        : serviceAuthData &&
          serviceAuthData.basicServicesDetailsVO &&
          serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO &&
          serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO
            .submittedSASubscriberInfo &&
          serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO
            .submittedSASubscriberInfo.name &&
          serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO
            .submittedSASubscriberInfo.name.titleName
          ? serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO
            .submittedSASubscriberInfo.name.titleName
          : '',
    dateOfBirth:
      serviceAuthData &&
      serviceAuthData.basicServicesDetailsVO &&
      serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO &&
      serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO.dateOfBirth
      ? serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO.dateOfBirth
      : '',
    age:
      serviceAuthData &&
      serviceAuthData.basicServicesDetailsVO &&
      serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO &&
      serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO.age
      ? serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO.age
      : '',
    gender:
      serviceAuthData &&
      serviceAuthData.basicServicesDetailsVO &&
      serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO &&
      serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO.gender
      ? serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO.gender
      : '',
    ssn:
      serviceAuthData &&
      serviceAuthData.basicServicesDetailsVO &&
      serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO &&
      serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO.ssn
      ? serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO.ssn
      : '',
    addressLine1:
      serviceAuthData &&
        serviceAuthData.basicServicesDetailsVO &&
        serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO &&
        serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO
          .memberAddressVO &&
        serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO.memberAddressVO
          .addressLine1
        ? serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO
          .memberAddressVO.addressLine1
        : serviceAuthData &&
          serviceAuthData.basicServicesDetailsVO &&
          serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO &&
          serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO
            .submittedSASubscriberInfo &&
          serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO
            .submittedSASubscriberInfo.address &&
          serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO
            .submittedSASubscriberInfo.address.addressLine1
          ? serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO
            .submittedSASubscriberInfo.address.addressLine1
          : '',
    addressLine2:
      serviceAuthData &&
        serviceAuthData.basicServicesDetailsVO &&
        serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO &&
        serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO
          .memberAddressVO &&
        serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO.memberAddressVO
          .addressLine2
        ? serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO
          .memberAddressVO.addressLine2
        : serviceAuthData &&
          serviceAuthData.basicServicesDetailsVO &&
          serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO &&
          serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO
            .submittedSASubscriberInfo &&
          serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO
            .submittedSASubscriberInfo.address &&
          serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO
            .submittedSASubscriberInfo.address.addressLine2
          ? serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO
            .submittedSASubscriberInfo.address.addressLine2
          : '',
    city:
      serviceAuthData &&
        serviceAuthData.basicServicesDetailsVO &&
        serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO &&
        serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO
          .memberAddressVO &&
        serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO.memberAddressVO
          .cityName
        ? serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO
          .memberAddressVO.cityName
        : serviceAuthData &&
          serviceAuthData.basicServicesDetailsVO &&
          serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO &&
          serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO
            .submittedSASubscriberInfo &&
          serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO
            .submittedSASubscriberInfo.address &&
          serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO
            .submittedSASubscriberInfo.address.cityName
          ? serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO
            .submittedSASubscriberInfo.address.cityName
          : '',
    state:
      serviceAuthData &&
        serviceAuthData.basicServicesDetailsVO &&
        serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO &&
        serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO
          .memberAddressVO &&
        serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO.memberAddressVO
          .stateCode
        ? serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO
          .memberAddressVO.stateCode
        : serviceAuthData &&
          serviceAuthData.basicServicesDetailsVO &&
          serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO &&
          serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO
            .submittedSASubscriberInfo &&
          serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO
            .submittedSASubscriberInfo.address &&
          serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO
            .submittedSASubscriberInfo.address.stateCode
          ? serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO
            .submittedSASubscriberInfo.address.stateCode
          : '',
    zipExtension:
      serviceAuthData &&
        serviceAuthData.basicServicesDetailsVO &&
        serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO &&
        serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO
          .memberAddressVO &&
        serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO.memberAddressVO
          .zipCode
        ? serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO
          .memberAddressVO.zipCode.split('-')[0]
        : serviceAuthData &&
          serviceAuthData.basicServicesDetailsVO &&
          serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO &&
          serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO
            .submittedSASubscriberInfo &&
          serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO
            .submittedSASubscriberInfo.address &&
          serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO
            .submittedSASubscriberInfo.address.zipCode
          ? serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO
            .submittedSASubscriberInfo.address.zipCode.split('-')[0]
          : '',
    extension:
      serviceAuthData &&
      serviceAuthData.basicServicesDetailsVO &&
      serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO &&
      serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO
        .memberAddressVO &&
      serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO.memberAddressVO
        .zipCode
      ? serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO
        .memberAddressVO.zipCode.split('-')[1]
      : serviceAuthData &&
        serviceAuthData.basicServicesDetailsVO &&
        serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO &&
        serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO
          .submittedSASubscriberInfo &&
        serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO
          .submittedSASubscriberInfo.address &&
        serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO
          .submittedSASubscriberInfo.address.zipCode
        ? serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO
          .submittedSASubscriberInfo.address.zipCode.split('-')[1]
        : '',
    countryCode:
      serviceAuthData &&
        serviceAuthData.basicServicesDetailsVO &&
        serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO &&
        serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO
          .memberAddressVO &&
        serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO.memberAddressVO
          .countryCode
        ? serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO
          .memberAddressVO.countryCode
        : serviceAuthData &&
          serviceAuthData.basicServicesDetailsVO &&
          serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO &&
          serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO
            .submittedSASubscriberInfo &&
          serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO
            .submittedSASubscriberInfo.address &&
          serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO
            .submittedSASubscriberInfo.address.countryCode
          ? serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO
            .submittedSASubscriberInfo.address.countryCode
          : '',
    countrySubdivisionCode:
      serviceAuthData &&
        serviceAuthData.basicServicesDetailsVO &&
        serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO &&
        serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO
          .memberAddressVO &&
        serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO.memberAddressVO
          .countrySubdivisionCode
        ? serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO
          .memberAddressVO.countrySubdivisionCode
        : serviceAuthData &&
          serviceAuthData.basicServicesDetailsVO &&
          serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO &&
          serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO
            .submittedSASubscriberInfo &&
          serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO
            .submittedSASubscriberInfo.address &&
          serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO
            .submittedSASubscriberInfo.address.countrySubdivisionCode
          ? serviceAuthData.basicServicesDetailsVO.serviceAuthMemberVO
            .submittedSASubscriberInfo.address.countrySubdivisionCode
          : '',
  };

  const initializeStatusValues = {
    headerStatus: "Z",
    reasonForStatusChange: "",
    assignedUserIdOverride: "",
    assignedLocationOverride: "",
    serviceAuthorizedBy: "",
    saEnteredBy: "",
  };

  const [memberValues, setMemberValues] = useState(initializeMemberValues);

  const [statusValues, setStatusValues] = useState(initializeStatusValues);

  const [letterCommentValues, setLetterCommentValues] = useState({
    letterComment1: null,
    letterComment2: null,
    letterComment3: null,
    letterComment4: null,
    letterComment5: null,
    text: null,
    textApproved: null,
  });

  const initialServiceReviewLocationInfoValues = {
    requestCategory:
      serviceAuthData &&
      serviceAuthData.basicServicesDetailsVO &&
      serviceAuthData.basicServicesDetailsVO.saHealthCareServiceReviewInfoVO &&
      serviceAuthData.basicServicesDetailsVO.saHealthCareServiceReviewInfoVO
        .requestedCategoryCode &&
      serviceAuthData.basicServicesDetailsVO.saHealthCareServiceReviewInfoVO.requestedCategoryCode.split(
        "-"
      )[0]||"-1",
    certificationType:
      serviceAuthData &&
      serviceAuthData.basicServicesDetailsVO &&
      serviceAuthData.basicServicesDetailsVO.saHealthCareServiceReviewInfoVO &&
      serviceAuthData.basicServicesDetailsVO.saHealthCareServiceReviewInfoVO
        .certificationTypeCode &&
      serviceAuthData.basicServicesDetailsVO.saHealthCareServiceReviewInfoVO.certificationTypeCode.split(
        "-"
      )[0]||"-1",
    serviceType:
      serviceAuthData &&
      serviceAuthData.basicServicesDetailsVO &&
      serviceAuthData.basicServicesDetailsVO.saHealthCareServiceReviewInfoVO &&
      serviceAuthData.basicServicesDetailsVO.saHealthCareServiceReviewInfoVO
        .serviceTypeCode &&
      serviceAuthData.basicServicesDetailsVO.saHealthCareServiceReviewInfoVO.serviceTypeCode.split(
        "-"
      )[0]||"-1",
    levelOfCare:
      serviceAuthData &&
      serviceAuthData.basicServicesDetailsVO &&
      serviceAuthData.basicServicesDetailsVO.saHealthCareServiceReviewInfoVO &&
      serviceAuthData.basicServicesDetailsVO.saHealthCareServiceReviewInfoVO
        .levelOfServiceCode &&
      serviceAuthData.basicServicesDetailsVO.saHealthCareServiceReviewInfoVO.levelOfServiceCode.split(
        "-"
      )[0]|| "-1",
    facilityType:
      serviceAuthData &&
      serviceAuthData.basicServicesDetailsVO &&
      serviceAuthData.basicServicesDetailsVO.saHealthCareServiceReviewInfoVO &&
      serviceAuthData.basicServicesDetailsVO.saHealthCareServiceReviewInfoVO
        .facilityTypeCode
        ?serviceAuthData.basicServicesDetailsVO.saHealthCareServiceReviewInfoVO
        .facilityTypeCode
        : '',
    facilitytypequalifier:
      serviceAuthData &&
      serviceAuthData.basicServicesDetailsVO &&
      serviceAuthData.basicServicesDetailsVO.saHealthCareServiceReviewInfoVO &&
      serviceAuthData.basicServicesDetailsVO.saHealthCareServiceReviewInfoVO
        .facilityTypeQualifierCode &&
      serviceAuthData.basicServicesDetailsVO.saHealthCareServiceReviewInfoVO.facilityTypeQualifierCode.split(
        "-"
      )[0]||"-1",
      certificationIssueDate: '',
  };

  const [
    serviceReviewLocationInfoValues,
    setServiceReviewLocationInfoValues,
  ] = useState(initialServiceReviewLocationInfoValues);

  const [headerNotes, setHeaderNotes] = useState({
    notes: serviceAuthData && serviceAuthData.note ? serviceAuthData.note: "",
  });

  const initilaPatientEventNumberTraceValues = {
    firstPatientEventTraceNumber:
      serviceAuthData &&
      serviceAuthData.sa278PatientEventVO &&
      serviceAuthData.sa278PatientEventVO.patientTrace1EventTrackingID ?
      serviceAuthData.sa278PatientEventVO
        .patientTrace1EventTrackingID
        :'',
    firstTraceAssignEntityIdentifier:
      serviceAuthData &&
      serviceAuthData.sa278PatientEventVO &&
      serviceAuthData.sa278PatientEventVO.patientTrace1OriginalID ?
      serviceAuthData.sa278PatientEventVO.patientTrace1OriginalID
      : '',
        // .traceAssigningEntityIdentifierOne,
    firstTraceAssignEntityAdditionalIdentifier:
      serviceAuthData &&
      serviceAuthData.sa278PatientEventVO &&
      serviceAuthData.sa278PatientEventVO.patientTrace1OriginalAdditionalID ?
      serviceAuthData.sa278PatientEventVO.patientTrace1OriginalAdditionalID
      :'',
        // .traceAssigningEntityAddIdentifierOne,
    secondPatientEventTraceNumber:
      serviceAuthData &&
      serviceAuthData.sa278PatientEventVO &&
      serviceAuthData.sa278PatientEventVO.patientTrace2EventTrackingID ?
      serviceAuthData.sa278PatientEventVO.patientTrace2EventTrackingID
      : '',
        // .patientEventTraceNumTwo,
    secondTraceAssignEntityIdentifier:
      serviceAuthData &&
      serviceAuthData.sa278PatientEventVO &&
      serviceAuthData.sa278PatientEventVO.patientTrace2OriginalID ?
      serviceAuthData.sa278PatientEventVO.patientTrace2OriginalID
      :'',
        // .traceAssigningEntityIdentifierTwo,
    secondTraceAssignEntityAdditionalIdentifier:
      serviceAuthData &&
      serviceAuthData.sa278PatientEventVO &&
      serviceAuthData.sa278PatientEventVO.patientTrace2OriginalAdditionalID ?
      serviceAuthData.sa278PatientEventVO.patientTrace2OriginalAdditionalID
      :'',
        // .traceAssigningEntityAddIdentifierTwo,
  };

  const [
    patientEventNumberTraceValues,
    setPatientEventNumberTraceValues,
  ] = useState(initilaPatientEventNumberTraceValues);

  const [datesofServiceValues, setDatesofServiceValues] = useState({
    requestedBeginDate: serviceAuthData &&
    serviceAuthData.basicServicesDetailsVO &&
    serviceAuthData.basicServicesDetailsVO.serviceAuthHeaderDetails &&
    serviceAuthData.basicServicesDetailsVO.serviceAuthHeaderDetails.requestedBeginDate || "",
    requestedEndDate: serviceAuthData &&
    serviceAuthData.basicServicesDetailsVO &&
    serviceAuthData.basicServicesDetailsVO.serviceAuthHeaderDetails &&
    serviceAuthData.basicServicesDetailsVO.serviceAuthHeaderDetails.requestedEndDate || "",
  });

  const [saApprovedUnits, setSAApprovedUnits] = useState({
    approvedUnits: null,
    approval: null,
    period: null,
  });

  const [saServiceDeliveryInfo, setSAServiceDeliveryInfo] = useState({
    serviceQuantity: null,
    serviceQuantityType: null,
    serviceFrequencyCount: null,
    frequencyPeriod: null,
    serviceDurationCount: null,
    durationOfServices: null,
    calendarPattern: null,
    timeOfDay: null,
  });

  const printRef = useRef();
  function a11yProps(index) {
    return {
      id: `scrollable-auto-tab-${index}`,
      "aria-controls": `scrollable-auto-tabpanel-${index}`,
    };
  }
  const [codesAndIndTableData, setCodesAndIndTableData] = React.useState([]);
  const [errorMessages, setErrorMessages] = React.useState([]);
  const [successMessages, setSuccessMessages] = React.useState([]);
  const [alertsData, setAlertsData] = useState([]);
  const [additionalAddresseeData, setAdditionalAddresseeData] = useState([]);
  const [supplementalProvData, setSupplementalProvData] = useState([]);
  const [providerTableData, setProviderTableData] = useState([]);
  const [paperWorkData, setPaperWorkData] = useState(
    serviceAuthData &&
      serviceAuthData.basicServicesDetailsVO &&
      serviceAuthData.basicServicesDetailsVO.healthCareServicesReviewVO &&
      serviceAuthData.basicServicesDetailsVO.paperworkAttachments
      ? serviceAuthData &&
      serviceAuthData.basicServicesDetailsVO &&
      serviceAuthData.basicServicesDetailsVO.healthCareServicesReviewVO &&
      serviceAuthData.basicServicesDetailsVO.paperworkAttachments
      : []
  );
  const [
    additionalProviderTableData,
    setAdditionalProviderTableData,
  ] = useState([]);
  const [diagnosisData, setDiagnosisData] = useState([]);
  const [alerts, setAlertsServiceAuth] = useState([]);
  const [minorSuccessMessages, setMinorSuccessMessages] = React.useState([]);
  const [
    {
      dtsNotInHdrLvl,
      showCIBeginDateError,
      showCIEndDateError,
      showCIBgdtGTEnddtErr,
      beginCIDtInvalidErr,
      endCIDtInvalidErr,
      minAgGTMaxAgeErr,
      abortGendErr,
      hystGendErr,
    },
    setCIShowError,
  ] = React.useState(false);
  const [showIndicators, setShowIndicators] = useState(false);
  const [showErrDetailLevel, setShowErrDetailLevel] = useState(false);
  const [
    {
      saMediaTypeErr,
      saReceivedDateErr,
      saReceivedDateFutureErr,
      saReceivedInvDateErr,
      saRequestedBgnInvDateErr,
      saRequestedEndInvDateErr,
      saRequestedEndGreatDateErr,
      saInputSourceErr,
      memberIdErr,
      memberZipErr,
      lineItemMinReq,
      firstNameReqErr,
      lastNameReqErr,
      dobReqErr,
      dobError,
      invalidDobError,
      headerStatusErr,
      validHeaderStatusErr,
      externalSAError,
      reasonStatusError,
      validateFNErr,
      validateLNErr,
      validateMIErr,
      validateSuffixErr,
      validateDOBErr,
      validateAgeErr,
      validateSSNErr,
    },
    setShowError,
  ] = useState(false);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState("");

  const [selectDeleteArray, setSelectDeleteArray] = useState([]);

  const onDropdowns = (values) => dispatch(GET_SYSTEMLIST_DROPDOWN(values));

  const addDropdowns = useSelector((state) => state.appDropDowns.sysdropdowns);
  const [PEDFieldErrors, setPEDFieldErrors] = useState({});

  const dispatch = useDispatch();
  const handleChanges = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSpecialConsideration = (name) => (event) => {
    event.preventDefault();
    setValues({
      ...values,
      specialConsiderations: !values.specialConsiderations,
    });
  };

  const handleMemberChanges = (name) => (event) => {
    enableNavigation(true)
    setMemberValues({
      ...memberValues,
      [name]: event.target.value,
    });
  };

  const handleStatusChanges = (name) => (event) => {
    setStatusValues({ ...statusValues, [name]: event.target.value });
  };

  const handleLetterCommentChanges = (name) => (event) => {
    setLetterCommentValues({
      ...letterCommentValues,
      [name]: event.target.value,
    });
  };

  const handleServiceReviewLocationInfoValues = (name) => (event) => {
    enableNavigation(true)
    setServiceReviewLocationInfoValues({
      ...serviceReviewLocationInfoValues,
      [name]: event.target.value,
    });
  };

  const handleSAApprovedUnits = (name) => (event) => {
    setSAApprovedUnits({
      ...saApprovedUnits,
      [name]: event.target.value,
    });
  };

  const handleServiceDeliveryInfo = (name) => (event) => {
    setSAServiceDeliveryInfo({
      ...saServiceDeliveryInfo,
      [name]: event.target.value,
    });
  };

  const handleHeaderNotes = (name) => (event) => {
    setHeaderNotes({
      ...headerNotes,
      [name]: event.target.value,
    });
  };

  const handlePatientEventTraceNumber = (name) => (event) => {
    enableNavigation(true)
    setPatientEventNumberTraceValues({
      ...patientEventNumberTraceValues,
      [name]: event.target.value,
    });
  };

  const handleDCDtChange = (name, date) => {
    enableNavigation(true)
    setValues({ ...values, [name]: date });
  };

  const handleDatesofServiceChange = (name, date) => {
    enableNavigation(true)
    setDatesofServiceValues({ ...datesofServiceValues, [name]: date });
  };

  const handleDCDtMemberChange = (name, date) => {
    setMemberValues({ ...memberValues, [name]: date });
  };

  useEffect(() => {
    onDropdowns({
      inputList: [
        Dropdowns.SA_CATEGORY_CODE_NEW,
        Dropdowns.SA_CATEGORY_From_Code_9,
        Dropdowns.SA_CATEGORY_From_Code_10,
        Dropdowns.SA_CATEGORY_From_Code_11,
        Dropdowns.SA_CATEGORY_From_Code_12,
        Dropdowns.G_US_STATE_CD,
        Dropdowns.DM_SFX_NAM,
        Dropdowns.X12_TOOTH_SURF_CD,
        Dropdowns.ICD_VERSION,
        Dropdowns.X12_ADMIT_TY_CD,
        Dropdowns.X12_ADMIT_SRC_CD,
        Dropdowns.A_HDR_STAT_CD,
        Dropdowns.X12_ENTY_CD_TYPE,
        Dropdowns.X12_ENTY_CD,
        Dropdowns.X12_PROV_CD,
        Dropdowns.A_PROV_ID_HIPAA_TY_CD,
        Dropdowns.A_PROV_ID_HIPAA_TY_CD_SVC,
        Dropdowns.A_PROV_ID_HIPAA_TY_CD_LINE_SVC_PROV,
        Dropdowns.X12_ENTY_CD_EVENT_PRV,
        Dropdowns.A_PROV_CD,
        Dropdowns.X12_DIAG_QLFR_CD,
        Dropdowns.G_NAM_PREFX_CD,
        Dropdowns.X12_UM_REVW_REQ_CAT_CD,
        Dropdowns.X12_CERT_TY_CD,
        Dropdowns.X12_UM_SVC_TY_CD,
        Dropdowns.X12_UM_LVL_OF_SVC_CD,
        Dropdowns.X12_FACI_QLFR_CD,
        Dropdowns.X12_ATTACH_TRNSMSN_CD_SA,
        Dropdowns.A_ATTACH_CD_SA,
        Dropdowns.X12_LVL_OF_CARE_CD,
        Dropdowns.SERVICE_QUANTITY_TYPE,
        Dropdowns.FREQUENCY_PERIOD,
        Dropdowns.DURATION_OF_SERVICES,
        Dropdowns.CALENDAR_PATTERN,
        Dropdowns.TIME_OF_DAY,
        Dropdowns.X12_RLTD_CAUSE_CD_SA,
        Dropdowns.X12_RLTD_CAUSE_CD_SA1069,
        Dropdowns.X12_SVC_QLFR_CD_SA_LI,
        Dropdowns.X12_UM_CURR_COND_CD,
        Dropdowns.X12_UM_PROGN_CD,
        Dropdowns.X12_UM_DELAY_RSN_CD,
        Dropdowns.X12_UM_RLS_OF_INFO_CD,
        Dropdowns.X12_RLTD_CAUSE_CD_SA1070,
        Dropdowns.G_CNTRY_CD,
        Dropdowns.X12_SA_CLM_ADMIT_PAT_STAT_CD,
        Dropdowns.X12_SA_CLM_CMdS_RES_STAT_CD,
        Dropdowns.X12_AMBLNC_CERT_COND_CD1433,
        Dropdowns.A_AMBLNC_TRNSPRT_CD,
        Dropdowns.A_AMBLNC_TRNSPRT_RSN_CD,
        Dropdowns.X12_CHIR_CERT_CD,
        Dropdowns.X12_SA_CHIR_SUBLXTN_LVL_CD,
        Dropdowns.X12_SPNL_COND_CD1104,
        Dropdowns.X12_OXY_THPY_CERT_COND_CD,
        Dropdowns.X12_SA_OXY_EQUIP_TY_CD,
        Dropdowns.X12_OXY_DLVRY_SYS_CD,
        Dropdowns.A_HH_PROGN_CD,
        Dropdowns.A_HH_MCARE_CVRG_CD,
        Dropdowns.A_HH_SURG_PROC_QLFR_CD,
        Dropdowns.X12_HOME_HLTH_DISCH_FACI_TY_CD,
        Dropdowns.X12_DME_CERT_COND_CD,
        Dropdowns.X12_FUNC_LMT_CERT_COND_CD,
        Dropdowns.X12_ACTV_PRMTD_CERT_COND_CD,
        Dropdowns.X12_MENTL_STAT_CERT_COND_CD,
        Dropdowns.OralCavityCode,
        Dropdowns.X12_SVC_QLFR_CD_0132,
        Dropdowns.X12_SVC_QLFR_CD_0140,
        Dropdowns.A_HH_RLTD_SURG_PROC_QLFR_CD,
        Dropdowns.A_HH_CERT_TY_CD,
        Dropdowns.X12_TOOTH_NUM,
        Dropdowns.PROSTHESIS_CODE,
        Dropdowns.X12_UNIT_BASIS_MSR_CD_133
      ],
    });

    /* 
    return () => {
      switch (props.from) {
          dispatch(resetTemplateDetailsData());
          break;
        case "manageTemplate":
          dispatch(resetManageTemplate());
      }
    }; */
  }, []);

  const eventProviderData =
    providerTableData &&
    providerTableData.length > 0 &&
    providerTableData.filter((obj) => {
      return obj.translevel === "Event Provider";
    });

  eventProviderData &&
    eventProviderData.map((item, index) => {
      item.sequenceNumber = index + 1;
    });

  const requestingProviderData =
    providerTableData &&
    providerTableData.length > 0 &&
    providerTableData.filter((obj) => {
      return obj.translevel === "Request Provider";
    });

  requestingProviderData &&
    requestingProviderData.map((item, index) => {
      item.sequenceNumber = index + 1;
    });

  const serviceProviderData =
    providerTableData &&
    providerTableData.length > 0 &&
    providerTableData.filter((obj) => {
      return obj.translevel === "Service Provider";
    });

  serviceProviderData &&
    serviceProviderData.map((item, index) => {
      item.sequenceNumber = index + 1;
    });

  const majorValidations = (pedErrors) => {
    setErrorMessages([]);
    setSuccessMessages([]);
    setMinorSuccessMessages([]);
    let reqFieldArr = [];

    setShowError({
       /*saMediaTypeErr:
        values.saMediaType === "" || values.saMediaType === "-1"
          ? (() => {
              reqFieldArr.push(ServiceAuthConstants.SA_MEDIA_TYPE_ERROR);
              return true;
            })()
          : false,
      saReceivedDateFutureErr:
        values.saReceivedDate && new Date(values.saReceivedDate) > new Date()
          ? (() => {
              reqFieldArr.push(ServiceAuthConstants.Received_Dt_Future_ERR);
              return true;
            })()
          : false,
      saReceivedDateErr: values.saReceivedDate
        ? false
        : (() => {
            reqFieldArr.push(ServiceAuthConstants.SA_RECEIVED_DATE_ERROR);
            return true;
          })(),
      saReceivedInvDateErr:
        values.saReceivedDate &&
        new Date(values.saReceivedDate).toString() == "Invalid Date"
          ? (() => {
              reqFieldArr.push(ServiceAuthConstants.INVALID_REC_DATE);
              return true;
            })()
          : false,
      saRequestedBgnInvDateErr:
        values.saRequestedBeginDate &&
        new Date(values.saRequestedBeginDate).toString() == "Invalid Date"
          ? (() => {
              reqFieldArr.push(ServiceAuthConstants.INVALID_REQ_BGN_DATE);
              return true;
            })()
          : false,
      saRequestedEndInvDateErr:
        values.saRequestedEndDate &&
        new Date(values.saRequestedEndDate).toString() == "Invalid Date"
          ? (() => {
              reqFieldArr.push(ServiceAuthConstants.INVALID_REQ_END_DATE);
              return true;
            })()
          : false,
      saRequestedEndGreatDateErr:
        values.saRequestedEndDate &&
        values.saRequestedEndDate < values.saRequestedBeginDate
          ? (() => {
              reqFieldArr.push(
                ServiceAuthConstants.END_DATE_LESS_THAN_BEGIN_DATE
              );
              return true;
            })()
          : false,
      saInputSourceErr:
        values.saInputSource === "" || values.saInputSource === "-1"
          ? (() => {
              reqFieldArr.push(ServiceAuthConstants.SA_INPUT_SOURCE_ERROR);
              return true;
            })()
          : false, */
      memberZipErr:
        isAllNull(memberValues.zipExtension) && memberValues.extension
          ? (() => {
            reqFieldArr.push(ServiceAuthConstants.MEMBER_ZIP_REQ_ERROR);
            return true;
          })()
          : false,
      lineItemMinReq:
        serviceAuthLIData &&
          serviceAuthLIData.data &&
          serviceAuthLIData.data.length > 0
          ? false
          : (() => {
            reqFieldArr.push(ServiceAuthConstants.MIN_LI_REQ);
            return true;
          })(),
      memberIdErr: memberValues.memberId
        ? false
        : (() => {
          reqFieldArr.push(ServiceAuthConstants.MEMBER_ID_ERROR);
          return true;
        })(),
      firstNameReqErr: memberValues.firstName
        ? false
        : (() => {
          reqFieldArr.push(ServiceAuthConstants.FIRST_NAME_Error);
          return true;
        })(),
      lastNameReqErr: memberValues.lastName
        ? false
        : (() => {
          reqFieldArr.push(ServiceAuthConstants.LAST_NAME_Error);
          return true;
        })(),
      dobReqErr: memberValues.dateOfBirth
        ? false
        : (() => {
          reqFieldArr.push(ServiceAuthConstants.DOB_Error);
          return true;
        })(),
      invalidDobError:
        memberValues.dateOfBirth &&
          memberValues.dateOfBirth.toString() === "Invalid Date"
          ? (() => {
            reqFieldArr.push(
              ServiceAuthConstants.INVALID_DATE_OF_BIRTH_ERROR
            );
            return true;
          })()
          : false,
      dobError:
        memberValues.dateOfBirth &&
          new Date(memberValues.dateOfBirth) > new Date()
          ? (() => {
            reqFieldArr.push(ServiceAuthConstants.DOB_ERR);
            return true;
          })()
          : false,
      /*validateLNErr:
           memberValues.lastName
                    ? false
                    : (() => {
                        reqFieldArr.push(
                          ServiceAuthConstants.VALIDATE_LAST_NAME_ERROR
                        );
                        return true;
                      })(),
                validateFNErr:
                  res.data.indexOf(
                    ServiceAuthConstants.VALIDATE_FIRST_NAME_ERROR
                  ) < -1
                    ? false
                    : (() => {
                        reqFieldArr.push(
                          ServiceAuthConstants.VALIDATE_FIRST_NAME_ERROR
                        );
                        return true;
                      })(), */
      /* headerStatusEr
      r: statusValues.headerStatus
        ? false
        : (() => {
            reqFieldArr.push(ServiceAuthConstants.SA_HEADER_STATUS);
            return true;
          })(),
      validHeaderStatusErr:
        statusValues.headerStatus === "A" ||
        statusValues.headerStatus === "D" ||
        statusValues.headerStatus === "V" ||
        statusValues.headerStatus === "P"
          ? false
          : (() => {
              reqFieldArr.push(ServiceAuthConstants.VALID_HEADER_STATUS_ERR);
              return true;
            })(),
      providerError:
        providerTableData.length > 0
          ? false
          : (() => {
              reqFieldArr.push(ServiceAuthConstants.SA_PROVIDER_ERROR);
              return true;
            })(),
      facilityTypeErr:
        ((serviceReviewLocationInfoValues.facilityType &&
          serviceReviewLocationInfoValues.facilityType !== "") ||
          (serviceReviewLocationInfoValues.facilityType &&
            serviceReviewLocationInfoValues.facilityType !== null)) &&
        serviceReviewLocationInfoValues.facilitytypequalifier &&
        serviceReviewLocationInfoValues.facilitytypequalifier === "-1"
          ? (() => {
              reqFieldArr.push(
                ServiceAuthConstants.SA_ANCILARY_FACILITY_TYPE_ERR
              );
              return true;
            })()
          : false,
      facilityTypeQualErr:
        serviceReviewLocationInfoValues.facilityType === "" &&
        serviceReviewLocationInfoValues.facilitytypequalifier !== "-1" &&
        serviceReviewLocationInfoValues.facilitytypequalifier !== null
          ? (() => {
              reqFieldArr.push(
                ServiceAuthConstants.SA_ANCILARY_FACILITY_TYPE_QUALIFIER_ERR
              );
              return true;
            })()
          : false,
      requestProviderErr:
        requestingProviderData.length > 0
          ? false
          : (() => {
              reqFieldArr.push(ServiceAuthConstants.SA_RQ_PROVIDER_ERROR);
              return true;
            })(),
      externalSAError:
        (values.saInputSource === "B" || values.saInputSource === "O") &&
        !values.externalSAId
          ? (() => {
              reqFieldArr.push(ServiceAuthConstants.EXTERNAL_SA_ID_ERROR);
              return true;
            })()
          : false,
      reasonStatusError:
        (statusValues.headerStatus === "D" ||
          statusValues.headerStatus === "V") &&
        !statusValues.reasonForStatusChange
          ? (() => {
              reqFieldArr.push(ServiceAuthConstants.HEADER_STATUS_REASON_ERROR);
              return true;
            })()
          : false, */
    });
    if (reqFieldArr.length || pedErrors.length) {
      setErrorMessages(reqFieldArr.concat(pedErrors));
      return false;
    }
    return true;
  };

  const filter_array = (array) => {
    return array.filter((x) => x !== "null");
  };

  const majorSave = (optnType) => {
    // Patient event Validations new code - start
    let tempArray = [];
    let responseObj = validatePEDetails(PEDValues, tempArray);
    setPEDFieldErrors(responseObj.fieldErrors);
    tempArray=responseObj.tempArray
    /* return */
    // end

    let operationType = "";
    if (optnType === "Edit") {
      operationType = "editSA";
      setOperationType("editSA");
    }
    if (isCopySA) {
      operationType = "addSA";
      setOperationType("addSA");
    }
    if (optnType === "Add") {
      operationType = "";
      setOperationType("");
    }
    setErrorMessages([]);
    setSuccessMessages([]);
    setMinorSuccessMessages([]);
    setCIShowError({});
    setShowError({});
    //setSuccessDetailLevel(true);
    let reqFieldArr = [];

    const saLineItemDataJsonForSave = [];
    serviceAuthLIData &&
      serviceAuthLIData.data &&
      serviceAuthLIData.data.map((item, index) => {        
        const saListObjVo = {
          auditUserID: null,
          auditTimeStamp: null,
          addedAuditUserID: null,
          addedAuditTimeStamp: null,
          versionNo: 0,
          dbRecord: false,
          sortColumn: null,
          auditKeyList: [],
          auditKeyListFiltered: false,
          healthCareServicesReviewVO: {
            auditUserID: null,
            auditTimeStamp: null,
            addedAuditUserID: null,
            addedAuditTimeStamp: null,
            versionNo: 0,
            dbRecord: false,
            sortColumn: null,
            auditKeyList: [],
            auditKeyListFiltered: false,
            requestCategory:
              item.healthCareServicesValues &&
                item.healthCareServicesValues.requestCategory
                ? item.healthCareServicesValues &&
                item.healthCareServicesValues.requestCategory
                : null,
            requestCategoryDesc: null,
            certificationType:
              item.healthCareServicesValues &&
                item.healthCareServicesValues.certificationType
                ? item.healthCareServicesValues.certificationType
                : null,
            certificationTypeDesc: null,
            serviceType:
              item.healthCareServicesValues &&
                item.healthCareServicesValues.serviceType
                ? item.healthCareServicesValues.serviceType
                : null,
            serviceTypeDesc: null,
            levelOfCare:
              item.healthCareServicesValues &&
                item.healthCareServicesValues.levelOfCare
                ? item.healthCareServicesValues &&
                item.healthCareServicesValues.levelOfCare
                : null,
            levelOfCareDesc: null,
            nursingHomeStatus:
              item.healthCareServicesValues &&
                item.healthCareServicesValues.nursingHomeStatus
                ? item.healthCareServicesValues &&
                item.healthCareServicesValues.nursingHomeStatus
                : null,
            nursingHomeStatusDesc: null,
            facilityType:
              item.serviceLocationInfoValues &&
              item.serviceLocationInfoValues.facilityType,
            facilitytypequalifier:
              item.serviceLocationInfoValues &&
              item.serviceLocationInfoValues.facilityTypeQualifier,
            facilitytypequalifierDesc: null,
            levelOfService: "U",
            requestedBeginDate: item.beginDate ? item.beginDate : null,
            requestedEndDate: item.endDate ? item.endDate : null,
            certificationIssueDate: null,
            approvedBeginDate: item.approvedBeginDate
              ? item.approvedBeginDate
              : null,
            approvedEndDate: item.approvedEndDate ? item.approvedEndDate : null,
            patientEventTraceNumOne: null,
            traceAssigningEntityIdentifierOne: null,
            traceAssigningEntityAddIdentifierOne: null,
            patientEventTraceNumTwo: null,
            traceAssigningEntityIdentifierTwo: null,
            traceAssigningEntityAddIdentifierTwo: null,
            isSaWithEPSDT: null,
            isSaWithEPSDTDesc: null,
            saHierarchicalInfo: null,
            previousReviewAdminCode: null,
            previousReviewAdminQualifierCode: null,
            previousCertificationID: null,
            previousCertficationQualiferCode: null,
            requestedCategoryCode: null,
            serviceTypeCode: null,
            saSupplementalHealthCareServiceReviewInfo: null,
            saAmbulanceCertification: null,
            saAmbulanceTransport: null,
            saOtherUMODenialReason: null,
            saOtherUmoName: null,
            saAmbulanceAddress: null,
            saActivitiesPermittedCertification: null,
            saHomeHealthCareInfo: null,
            saOxygenTherapyInfo: null,
            saOxygenTherapyCertification: null,
            saRelatedCauseInfo: null,
            saServiceDeliveryInfo: null,
            certificationNumber: null,
            certificationIndicator: null,
            adminReferenceNumber: null,
            adminReferenceNumberQualifier: null,
            certificationTypeCode: null,
            estimatedDOBPeriodQlfCode: null,
            estimatedDOBQlfCode: null,
            eventDatePeriodQlfCode: null,
            eventDateQlfCode: null,
            levelOfServiceCode: null,
            patientTrace3EventTrackingID: null,
            patientTrace3OriginalAdditionalID: null,
            patientTrace3OriginalID: null,
            patientTrace1TypeCode: null,
            patientTrace2TypeCode: null,
            patientTrace3TypeCode: null,
            certificationPeriodQlfCode: null,
            lastAdmissionPeriodQlfCode: null,
          },
          versionNoClobLine: 0,
          lineItemNumber: index + 1,
          versionNo278Line: 0,
          prvLIPaperworkAttachmentsVO: {
            auditUserID: null,
            auditTimeStamp: null,
            addedAuditUserID: null,
            addedAuditTimeStamp: null,
            versionNo: 0,
            dbRecord: false,
            sortColumn: null,
            auditKeyList: [],
            auditKeyListFiltered: false,
            description: null,
            lineNumber: 0,
            sequenceNumber: 0,
            attachmentCode: null,
            typeOfPaperwork: null,
            typeOfPaperworkShortDesc: null,
            transmissionCode: null,
            transmissionCodeShortDesc: null,
            externalControl: null,
            attachmentIDQualifierCode: null,
            attachmentDescription: null,
          },
          prvLIPaperworkAttachmentsList: [],
          prvLineItemDiagnosisVO: {
            auditUserID: null,
            auditTimeStamp: null,
            addedAuditUserID: null,
            addedAuditTimeStamp: null,
            versionNo: 0,
            dbRecord: false,
            sortColumn: null,
            diagnosisCode: null,
            diagnosisQualifierCode: null,
            sequenceNumber: null,
            tcn: null,
            memberSystemID: null,
          },
          lineItemDiagnosisVOOne: {
            auditUserID: null,
            auditTimeStamp: null,
            addedAuditUserID: null,
            addedAuditTimeStamp: null,
            versionNo: 0,
            dbRecord: false,
            sortColumn: null,
            diagnosisCode: null,
            diagnosisQualifierCode: null,
            sequenceNumber: null,
            tcn: null,
            memberSystemID: null,
          },
          lineItemDiagnosisVOTwo: {
            auditUserID: null,
            auditTimeStamp: null,
            addedAuditUserID: null,
            addedAuditTimeStamp: null,
            versionNo: 0,
            dbRecord: false,
            sortColumn: null,
            diagnosisCode: null,
            diagnosisQualifierCode: null,
            sequenceNumber: null,
            tcn: null,
            memberSystemID: null,
          },
          lineItemDiagnosisVOThree: {
            auditUserID: null,
            auditTimeStamp: null,
            addedAuditUserID: null,
            addedAuditTimeStamp: null,
            versionNo: 0,
            dbRecord: false,
            sortColumn: null,
            diagnosisCode: null,
            diagnosisQualifierCode: null,
            sequenceNumber: null,
            tcn: null,
            memberSystemID: null,
          },
          lineItemDiagnosisVOFour: {
            auditUserID: null,
            auditTimeStamp: null,
            addedAuditUserID: null,
            addedAuditTimeStamp: null,
            versionNo: 0,
            dbRecord: false,
            sortColumn: null,
            diagnosisCode: null,
            diagnosisQualifierCode: null,
            sequenceNumber: null,
            tcn: null,
            memberSystemID: null,
          },
          lineItemDiagnosisVOFive: {
            auditUserID: null,
            auditTimeStamp: null,
            addedAuditUserID: null,
            addedAuditTimeStamp: null,
            versionNo: 0,
            dbRecord: false,
            sortColumn: null,
            diagnosisCode: null,
            diagnosisQualifierCode: null,
            sequenceNumber: null,
            tcn: null,
            memberSystemID: null,
          },
          prvLineItemDiagnosisList: [],
          lineItemToothVO: {
            auditUserID: null,
            auditTimeStamp: null,
            addedAuditUserID: null,
            addedAuditTimeStamp: null,
            versionNo: 0,
            dbRecord: false,
            sortColumn: null,
            seqNum: null,
            quadrant: null,
            toothNumber: null,
            toothSurface1: null,
            toothSurface2: null,
            toothSurface3: null,
            toothSurface4: null,
            toothSurface5: null,
            tplAmount: null,
            oralCavity: null,
            toothQualifierCode: null,
          },
          prvLineItemDMEList: [
            {
              auditUserID: null,
              auditTimeStamp: null,
              addedAuditUserID: null,
              addedAuditTimeStamp: null,
              versionNo: 0,
              dbRecord: false,
              sortColumn: null,
              serialNumber:
                item.prvLineItemDMEList && item.prvLineItemDMEList.serialNumber
                  ? item.prvLineItemDMEList.serialNumber
                  : null,
              acquisitionCost:
                item.prvLineItemDMEList &&
                  item.prvLineItemDMEList.acquisitionCost
                  ? item.prvLineItemDMEList.acquisitionCost
                  : null,
              msrp:
                item.prvLineItemDMEList && item.prvLineItemDMEList.msrp
                  ? item.prvLineItemDMEList.msrp
                  : null,
              monthlyRental:
                item.prvLineItemDMEList && item.prvLineItemDMEList.monthlyRental
                  ? item.prvLineItemDMEList.monthlyRental
                  : null,
              condition:
                item.prvLineItemDMEList && item.prvLineItemDMEList.condition
                  ? item.prvLineItemDMEList.condition
                  : null,
            },
          ],
          lineItemDMEVO: {
            auditUserID: null,
            auditTimeStamp: null,
            addedAuditUserID: null,
            addedAuditTimeStamp: null,
            versionNo: 0,
            dbRecord: false,
            sortColumn: null,
            serialNumber:
              item.prvLineItemDMEList && item.prvLineItemDMEList.serialNumber
                ? item.prvLineItemDMEList.serialNumber
                : null,
            acquisitionCost:
              item.prvLineItemDMEList && item.prvLineItemDMEList.acquisitionCost
                ? item.prvLineItemDMEList.acquisitionCost
                : null,
            msrp:
              item.prvLineItemDMEList && item.prvLineItemDMEList.msrp
                ? item.prvLineItemDMEList.msrp
                : null,
            monthlyRental:
              item.prvLineItemDMEList && item.prvLineItemDMEList.monthlyRental
                ? item.prvLineItemDMEList.monthlyRental
                : null,
            condition:
              item.prvLineItemDMEList && item.prvLineItemDMEList.condition
                ? item.prvLineItemDMEList.condition
                : null,
          },
          lineItemToothList: [],
          claimUpdatesList: [],
          claimUpdatesVO: {
            auditUserID: null,
            auditTimeStamp: null,
            addedAuditUserID: null,
            addedAuditTimeStamp: null,
            versionNo: 0,
            dbRecord: false,
            sortColumn: null,
            date: null,
            tcn: null,
            claimLineItemNumber: 1,
            saLineItemNumber: 1,
            memberSysID: null,
          },
          appealList: [],
          appealVO: {
            auditUserID: null,
            auditTimeStamp: null,
            addedAuditUserID: null,
            addedAuditTimeStamp: null,
            versionNo: 0,
            dbRecord: false,
            sortColumn: null,
            appealID: null,
            appealType: null,
            appealStatus: null,
            appealDate: null,
            appealResult: null,
          },
          saExceptions: [],
          saLIExceptionVO: {
            auditUserID: null,
            auditTimeStamp: null,
            addedAuditUserID: null,
            addedAuditTimeStamp: null,
            versionNo: 0,
            dbRecord: false,
            sortColumn: null,
            lineNumber: null,
            exceptionCode: null,
            status: null,
            longDescription: null,
            shortDescription: null,
            resolutionText: null,
            securityClerkID: null,
            locationCode: null,
            locationText: null,
            exceptionWindowLineNumber: null,
            dispositionCode: null,
            saID: null,
            headerStatus: null,
          },
          approvedRate: item.approvedRate ? item.approvedRate : null,
          usedUnits: null,
          approvalPeriod:
            item.approvedUnitsValues && item.approvedUnitsValues.approval
              ? item.approvedUnitsValues.approval
              : null,
          approvedFreq:
            item.approvedUnitsValues && item.approvedUnitsValues.approvedUnits
              ? item.approvedUnitsValues.approvedUnits
              : null,
          approvedLength:
            item.approvedUnitsValues && item.approvedUnitsValues.period
              ? item.approvedUnitsValues.period
              : null,
          admBeginDate: null,
          admEndDate: null,
          certificationType: null,
          currentHealth: null,
          delayReason: null,
          dateOfOnset: null,
          dischargeDate: null,
          facilityType: null,
          facilityTypeQualifier: null,
          levelOfService: null,
          prevCertificateID: null,
          prognosisCode: "1",
          releaseInformation: null,
          requestCategory: null,
          serviceTypeCode: item.serviceType ? item.serviceType : null,
          providerServiceTypeCode: null,
          surgeryDate: null,
          receivedDate: null,
          status: item.status,
          statusDate: "04/02/2013",
          authorizingId: null,
          approvalDate: "04/02/2013",
          notes: null,
          approvedAmount: item.approvedAmount ? item.approvedAmount : null,
          approvedUnits: item.approvedUnits ? item.approvedUnits : null,
          remainingAmount: null,
          remainingUnits: null,
          beginDate: item.beginDate,
          endDate: item.endDate,
          approvedBeginDate: item.approvedBeginDate
            ? item.approvedBeginDate
            : null,
          renderingProvID: null,
          renderingProviderMediId: item.renderingProviderMediId
            ? item.renderingProviderMediId
            : null,
          renderingProviderNPI: item.renderingProviderNPI
            ? item.renderingProviderNPI
            : null,
          serviceCodeType: null,
          serviceCodeTypeShortDesc: null,
          serviceCode: item.serviceCodeFromDesc
            ? item.serviceCodeFromDesc
            : null,
          serviceCodeModifiers: null,
          serviceCodeTo: item.serviceCodeToDesc ? item.serviceCodeToDesc : null,
          requestedAmount: item.requestedAmount ? item.requestedAmount : null,
          requestedRate: item.requestedRate ? item.requestedRate : null,
          appealType: null,
          appealStatus: null,
          appealDate: null,
          appealResult: null,
          requestedUnits: item.requestedUnits ? item.requestedUnits : null,
          usedAmount: null,
          healthCareServicesVO: {
            auditUserID: null,
            auditTimeStamp: null,
            addedAuditUserID: null,
            addedAuditTimeStamp: null,
            versionNo: 0,
            dbRecord: false,
            sortColumn: null,
            serviceQuantity:
              item.healthCareServicesDeliveryValues &&
                item.healthCareServicesDeliveryValues.serviceQuantity
                ? item.healthCareServicesDeliveryValues &&
                item.healthCareServicesDeliveryValues.serviceQuantity
                : null,
            serviceQuantityType:
              item.healthCareServicesDeliveryValues &&
                item.healthCareServicesDeliveryValues.serviceQuantityType
                ? item.healthCareServicesDeliveryValues &&
                item.healthCareServicesDeliveryValues.serviceQuantityType
                : null,
            serviceFrequencyCount:
              item.healthCareServicesDeliveryValues &&
                item.healthCareServicesDeliveryValues.serviceFrequencyCount
                ? item.healthCareServicesDeliveryValues &&
                item.healthCareServicesDeliveryValues.serviceFrequencyCount
                : null,
            frequencyPeriod:
              item.healthCareServicesDeliveryValues &&
                item.healthCareServicesDeliveryValues.frequencyPeriod
                ? item.healthCareServicesDeliveryValues &&
                item.healthCareServicesDeliveryValues.frequencyPeriod
                : null,
            serviceDurationCount:
              item.healthCareServicesDeliveryValues &&
                item.healthCareServicesDeliveryValues.serviceDurationCount
                ? item.healthCareServicesDeliveryValues &&
                item.healthCareServicesDeliveryValues.serviceDurationCount
                : null,
            durationOfServices:
              item.healthCareServicesDeliveryValues &&
                item.healthCareServicesDeliveryValues.durationOfServices
                ? item.healthCareServicesDeliveryValues &&
                item.healthCareServicesDeliveryValues.durationOfServices
                : null,
            calendarPattern:
              item.healthCareServicesDeliveryValues &&
                item.healthCareServicesDeliveryValues.calendarPattern
                ? item.healthCareServicesDeliveryValues &&
                item.healthCareServicesDeliveryValues.calendarPattern
                : null,
            timeOfDay:
              item.healthCareServicesDeliveryValues &&
                item.healthCareServicesDeliveryValues.timeOfDay
                ? item.healthCareServicesDeliveryValues &&
                item.healthCareServicesDeliveryValues.timeOfDay
                : null,
          },
          patientConditionVO: {
            auditUserID: null,
            auditTimeStamp: null,
            addedAuditUserID: null,
            addedAuditTimeStamp: null,
            versionNo: 0,
            dbRecord: false,
            sortColumn: null,
            conditionCategory: null,
            conditionCategoryShortDesc: null,
            conditionCode1: null,
            conditionCode1ShortDesc: null,
            conditionCode2: null,
            conditionCode2ShortDesc: null,
            conditionCode3: null,
            conditionCode3ShortDesc: null,
            conditionCode4: null,
            conditionCode4ShortDesc: null,
            conditionCode5: null,
            conditionCode5ShortDesc: null,
            certificationIndicator: null,
          },
          activitiyPermitted: {
            auditUserID: null,
            auditTimeStamp: null,
            addedAuditUserID: null,
            addedAuditTimeStamp: null,
            versionNo: 0,
            dbRecord: false,
            sortColumn: null,
            conditionCategory: null,
            conditionCategoryShortDesc: null,
            conditionCode1: null,
            conditionCode1ShortDesc: null,
            conditionCode2: null,
            conditionCode2ShortDesc: null,
            conditionCode3: null,
            conditionCode3ShortDesc: null,
            conditionCode4: null,
            conditionCode4ShortDesc: null,
            conditionCode5: null,
            conditionCode5ShortDesc: null,
            certificationIndicator: null,
          },
          mentalStatus: {
            auditUserID: null,
            auditTimeStamp: null,
            addedAuditUserID: null,
            addedAuditTimeStamp: null,
            versionNo: 0,
            dbRecord: false,
            sortColumn: null,
            conditionCategory: null,
            conditionCategoryShortDesc: null,
            conditionCode1: null,
            conditionCode1ShortDesc: null,
            conditionCode2: null,
            conditionCode2ShortDesc: null,
            conditionCode3: null,
            conditionCode3ShortDesc: null,
            conditionCode4: null,
            conditionCode4ShortDesc: null,
            conditionCode5: null,
            conditionCode5ShortDesc: null,
            certificationIndicator: null,
          },
          dmepatientConditionVO: {
            auditUserID: null,
            auditTimeStamp: null,
            addedAuditUserID: null,
            addedAuditTimeStamp: null,
            versionNo: 0,
            dbRecord: false,
            sortColumn: null,
            conditionCategory: null,
            conditionCategoryShortDesc: null,
            conditionCode1: null,
            conditionCode1ShortDesc: null,
            conditionCode2: null,
            conditionCode2ShortDesc: null,
            conditionCode3: null,
            conditionCode3ShortDesc: null,
            conditionCode4: null,
            conditionCode4ShortDesc: null,
            conditionCode5: null,
            conditionCode5ShortDesc: null,
            certificationIndicator: null,
          },
          patientConditionList: [],
          institutionalClaimVO: {
            auditUserID: null,
            auditTimeStamp: null,
            addedAuditUserID: null,
            addedAuditTimeStamp: null,
            versionNo: 0,
            dbRecord: false,
            sortColumn: null,
            admissionTypeCode: null,
            admissionSourceCode: null,
            patientStatusCode: null,
            nursingHomeStatus: null,
            admissionBeginDate: null,
            dischargeDate: null,
            admissionEndDate: null,
          },
          ambulanceVO: {
            auditUserID: null,
            auditTimeStamp: null,
            addedAuditUserID: null,
            addedAuditTimeStamp: null,
            versionNo: 0,
            dbRecord: false,
            sortColumn: null,
            transportCode: " ",
            transportReasonCode: null,
            tripPurposeDescription: "",
            stretcherDescription: "",
            nameRrOrganization: "",
            nameRrOrganization2: null,
            nameRrOrganization3: null,
            nameRrOrganization4: null,
            nameRrOrganization5: null,
            transportAddrLine21: null,
            transportAddrLine22: null,
            transportAddrLine31: null,
            transportAddrLine32: null,
            transportAddrLine41: null,
            transportAddrLine42: null,
            transportAddrLine51: null,
            transportAddrLine52: null,
            transportStateCode2: null,
            transportStateCode3: null,
            transportStateCode4: null,
            transportStateCode5: null,
            transportZipCode2: null,
            transportZipCode3: null,
            transportZipCode4: null,
            transportZipCode5: null,
            reasonCode: " ",
            transportDistance: null,
            patientWeight: null,
            roundTripPurpose: null,
            strecherPurpose: null,
            conditionInd: null,
            condition1: " ",
            condition2: " ",
            condition3: " ",
            condition4: " ",
            condition5: " ",
            pickupAddress1: null,
            pickupAddress2: null,
            pickupCity: null,
            pickupState: null,
            pickupZip: null,
            pickupExtenstion: null,
            pickupSubdivisionCode: null,
            pickupCountry: null,
            dropoffAddress1: null,
            dropoffAddress2: null,
            dropoffCity: null,
            dropoffState: null,
            dropoffZip: null,
            dropoffExtenstion: null,
            dropoffSubdivisionCode: null,
            dropoffCountry: null,
            ambulanceDropoffLocation: null,
            patientCount: null,
            conditionCategory: null,
            conditionCategoryShortDesc: null,
            transportCityName2: null,
            transportCityName3: null,
            transportCityName4: null,
            transportCityName5: null,
            li: 0,
          },
          spinalManipulationVO: {
            auditUserID: null,
            auditTimeStamp: null,
            addedAuditUserID: null,
            addedAuditTimeStamp: null,
            versionNo: 0,
            dbRecord: false,
            sortColumn: null,
            xrayIndicator: "N",
            treatmentSeriesNo: null,
            treatmentSeriesCount: null,
            subluxationCode1: null,
            subluxationCode2: null,
            unitForMeasurement: null,
            treatmentPeriodCount: null,
            monthlyTreatmentCount: null,
            patientConditionCode: null,
            complicationIndicator: "N",
            patientConditionDesc1: null,
            patientConditionDesc2: null,
          },
          homeOxyTherapyVO: {
            auditUserID: null,
            auditTimeStamp: null,
            addedAuditUserID: null,
            addedAuditTimeStamp: null,
            versionNo: 0,
            dbRecord: false,
            sortColumn: null,
            conditionCode1: null,
            conditionCode2: null,
            conditionCode3: null,
            conditionCode4: null,
            conditionCode5: null,
            conditionCategoryCode: null,
            certificationIndicator: null,
            condition1Ot: null,
            authConditionCodeOt: null,
            equipmentTypeCode1: null,
            equipmentTypeCode2: null,
            equipmentReasonDesc: null,
            oxygenFlowRate: null,
            oxygenUsedTimes: null,
            oxygenUserHours: null,
            respTherapistOrdTxt: null,
            arterialBloodGasQty: null,
            oxygenSaturationQty: null,
            oxygenTestCondCode: null,
            oxygenTestFindingCode: [],
            portableOxygenFlowRt: null,
            oxygenDeliverySystemCode: null,
            oxygenEquipCode: null,
          },
          homeHealthCareVO: {
            auditUserID: null,
            auditTimeStamp: null,
            addedAuditUserID: null,
            addedAuditTimeStamp: null,
            versionNo: 0,
            dbRecord: false,
            sortColumn: null,
            numofVisits: null,
            projectedVisits: null,
            totalVisits: null,
            timeCode: " ",
            patternCode: " ",
            timePattern: " ",
            surgeryDate: null,
            startDate: null,
            surgicalProcedureCode: null,
            lastVisitDate: null,
            surgicalProcedureQualifierCode: null,
            lastAdmissionEndDate: null,
            prognosisCode: "1",
            lastAdmissionPeriodQlfCode: null,
            certificationPeriodTo: null,
            physicianContactDate: null,
            medicareCoverageIndicator: null,
            dischargeFacilityType: null,
            certificationTypeCode: null,
            certificationPeriodFrom: null,
            certificationPeriodQlfCode: null,
            lastAdmissionBeginDate: null,
            physicianOrderDate: null,
            durVisitCount: "",
            durVisits: null,
            numofUnits: null,
            unitsType: " ",
            freqCount: " ",
            freqPeriod: " ",
            freqofVisit: " ",
            disciplineType: " ",
            certificationVisitCount: null,
            li: null,
          },
          modifiersVO: {
            auditUserID: null,
            auditTimeStamp: null,
            addedAuditUserID: null,
            addedAuditTimeStamp: null,
            versionNo: 0,
            dbRecord: false,
            sortColumn: null,
            modFrom1: item.modFrom1,
            modFrom2: item.modFrom2,
            modFrom3: item.modFrom3,
            modFrom4: item.modFrom4,
            modTo1: null,
            modTo2: null,
            modTo3: null,
            modTo4: null,
          },
          authType: serviceAuthDataO && serviceAuthDataO.authType,
          saCategoryCode: item.saCategoryCode ? item.saCategoryCode : null,
          businessUnit: null,
          statusChangeReason: item.statusChangeReason
            ? item.statusChangeReason
            : null,
          lineItemNoteSetVO: {
            auditUserID: null,
            auditTimeStamp: null,
            addedAuditUserID: null,
            addedAuditTimeStamp: null,
            versionNo: 0,
            dbRecord: false,
            sortColumn: null,
            tableName: null,
            noteSetSK: null,
            noteSourceName: null,
            notesList: [],
            globalNotesList: [],
            checkAll: false,
            addNewLinkRender: true,
            filterLinkRender: true,
            printLinkRender: true,
            completeNotesList: [],
          },
          liIdValue: null,
          diagnosisLineItemList: [],
          diagnosisVO: {
            auditUserID: null,
            auditTimeStamp: null,
            addedAuditUserID: null,
            addedAuditTimeStamp: null,
            versionNo: 0,
            dbRecord: false,
            sortColumn: null,
            diagnosisCode: null,
            diagnosisQualifierCode: null,
            sequenceNumber: null,
            tcn: null,
            memberSystemID: null,
          },
          renderingProvName: null,
          provIdTypeCode: null,
          approvedEndDate: item.approvedEndDate ? item.approvedEndDate : null,
          viewInformation:
            item.viewInformation && item.viewInformation == "yes"
              ? true
              : false,
          liEnteredDate: null,
          factorCode: null,
          allowedAmount: null,
          source: null,
          reason: null,
          maxUnit: null,
          associatedPaperWorkVO: {
            auditUserID: null,
            auditTimeStamp: null,
            addedAuditUserID: null,
            addedAuditTimeStamp: null,
            versionNo: 0,
            dbRecord: false,
            sortColumn: null,
            auditKeyList: [],
            auditKeyListFiltered: false,
            lineNumber: 0,
            sequenceNumber: 0,
            typeOfAttachment: null,
            deliveryMethod: null,
            providerTracking: null,
            tempDeliveryMethodDesc: null,
            tempTypeOfAttachmentDesc: null,
            description: null,
          },
          associatedPaperWorkLineItemList: item.paperWorkData,
          viewBeginDate: null,
          viewEndDate: null,
          serviceCodeFromDesc: null,
          serviceCodeToDesc: null,
          updateAddFlag: false,
          lineItemFlag: false,
          liAuthorizationType: null,
          noOfCharLeft: -1,
          chiropracticCertificationVO: {
            auditUserID: null,
            auditTimeStamp: null,
            addedAuditUserID: null,
            addedAuditTimeStamp: null,
            versionNo: 0,
            dbRecord: false,
            sortColumn: null,
            conditionCategoryCode: null,
            certificationIndicator: null,
            conditionCode1: null,
            conditionCode2: null,
            conditionCode3: null,
            conditionCode4: null,
            conditionCode5: null,
            treatmentSeriesNumber: null,
            saChiropracticTreatmentQuantity: null,
            subluxationLevelCode1: null,
            subluxationLevelCode2: null,
            patientConditionCode: null,
            complicationIndicator: null,
            patientConditionDescription1: null,
            patientConditionDescription2: null,
            xRayAvailabilityIndicator: null,
          },
          diagPointersList: [
            {
              sequenceNumber: 1,
              primary:
                item.diagPointerData && item.diagPointerData.diagPointerOne
                  ? item.diagPointerData.diagPointerOne
                  : null,
              second:
                item.diagPointerData && item.diagPointerData.diagPointerTwo
                  ? item.diagPointerData.diagPointerTwo
                  : null,
              thrid:
                item.diagPointerData && item.diagPointerData.diagPointerThree
                  ? item.diagPointerData.diagPointerThree
                  : null,
              fourth:
                item.diagPointerData && item.diagPointerData.diagPointerFour
                  ? item.diagPointerData.diagPointerFour
                  : null,
            },
          ],
          prvLIServiceLevelTraceNumberVO: {
            auditUserID: null,
            auditTimeStamp: null,
            addedAuditUserID: null,
            addedAuditTimeStamp: null,
            versionNo: 0,
            dbRecord: false,
            sortColumn: null,
            seviceLevelTraceNumberOne:
              item.serviceLevelTraceValues &&
                item.serviceLevelTraceValues.serviceLevelTraceNumberOne
                ? item.serviceLevelTraceValues.serviceLevelTraceNumberOne
                : null,
            seviceLevelTraceNumberTwo:
              item.serviceLevelTraceValues &&
                item.serviceLevelTraceValues.serviceLevelTraceNumberTwo
                ? item.serviceLevelTraceValues.serviceLevelTraceNumberTwo
                : null,
            traceAssigningEntityIdentifierOne:
              item.serviceLevelTraceValues &&
                item.serviceLevelTraceValues.traceAssigningEntityIdentifierOne
                ? item.serviceLevelTraceValues.traceAssigningEntityIdentifierOne
                : null,
            traceAssigningEntityIdentifierTwo:
              item.serviceLevelTraceValues &&
                item.serviceLevelTraceValues.traceAssigningEntityIdentifierTwo
                ? item.serviceLevelTraceValues.traceAssigningEntityIdentifierTwo
                : null,
            traceAssigningEntityAdditionalIdentifierOne:
              item.serviceLevelTraceValues &&
                item.serviceLevelTraceValues
                  .traceAssigningEntityAdditionalIdentifierOne
                ? item.serviceLevelTraceValues
                  .traceAssigningEntityAdditionalIdentifierOne
                : null,
            traceAssigningEntityAdditionalIdentifierTwo:
              item.serviceLevelTraceValues &&
                item.serviceLevelTraceValues
                  .traceAssigningEntityAdditionalIdentifierTwo
                ? item.serviceLevelTraceValues
                  .traceAssigningEntityAdditionalIdentifierTwo
                : null,
            seviceLevelTraceNumberThree: null,
            traceAssigningEntityIdentifierThree: null,
            traceAssigningEntityAdditionalIdentifierThree: null,
          },
          tempStatusDate: null,
          lineItemDentalVO: {
            auditUserID: null,
            auditTimeStamp: null,
            addedAuditUserID: null,
            addedAuditTimeStamp: null,
            versionNo: 0,
            dbRecord: false,
            sortColumn: null,
            auditKeyList: [],
            auditKeyListFiltered: false,
            prosthesisInlayCode:
              item.lineItemDentalVO && item.lineItemDentalVO.prosthesisInlayCode
                ? item.lineItemDentalVO.prosthesisInlayCode
                : null,
            reasonForReplacement:
              item.lineItemDentalVO &&
                item.lineItemDentalVO.reasonForReplacement
                ? item.lineItemDentalVO.reasonForReplacement
                : null,
            oralCavity1:
              item.lineItemDentalVO && item.lineItemDentalVO.oralCavity1
                ? item.lineItemDentalVO.oralCavity1
                : null,
            oralCavity2:
              item.lineItemDentalVO && item.lineItemDentalVO.oralCavity2
                ? item.lineItemDentalVO.oralCavity2
                : null,
            oralCavity3:
              item.lineItemDentalVO && item.lineItemDentalVO.oralCavity3
                ? item.lineItemDentalVO.oralCavity3
                : null,
            oralCavity4:
              item.lineItemDentalVO && item.lineItemDentalVO.oralCavity4
                ? item.lineItemDentalVO.oralCavity4
                : null,
            oralCavity5:
              item.lineItemDentalVO && item.lineItemDentalVO.oralCavity5
                ? item.lineItemDentalVO.oralCavity5
                : null,
            lineItemToothList: item.lineItemToothList
              ? item.lineItemToothList 
              : [
                {
                  toothNumber: null,
                  toothSurface1: null,
                  toothSurface2: null,
                  toothSurface3: null,
                  toothSurface4: null,
                  toothSurface5: null,
                  tableData: {
                    id: 0,
                  },
                  seqNum: 0,
                },
              ],            
            dentalIetmProtected: false,
            toothLimitReached: false,
            toothInfonextSeqNum: 0,
            tplAmount:
              item.lineItemDentalVO && item.lineItemDentalVO.tplAmount
                ? item.lineItemDentalVO.tplAmount
                : null,
          },
          lineTrackingID: null,
          unitsOfMeasure: item.unitsOfMeasure ? item.unitsOfMeasure : null,
          serviceDescription: item.additionalServiceDesc,
          revenueCode: item.revenueCode,
          serviceIdQualifier: item.serviceQualifier && item.serviceQualifier === 'AD-Dental'
            ? "AD" : item.serviceQualifier === 'HC-HCPCS' ?
              "HC" : item.serviceQualifier === 'ID-ICD-9-CM'
                ? "ID" : 'AD',
          serviceLevelCode: serviceLevelCode,
          serviceCode:
            (item.serviceType == "0" ||
              item.serviceType == "3" ||
              item.serviceType == "8") &&
              item.serviceCode
              ? item.serviceCode
              : null,
          svcFrmListVal: item.list ? item.list : null,
          otherProviderID: null,
          otherProviderIDType: null,
          servicingProviderLineItemList: item.servicingProviderLineItemList
            ? item.servicingProviderLineItemList
            : [],
          medicaidServProviderID: null,
          eventProviderIDTypeList: [],
          messageText: item.lineNotesValues && 
          item.lineNotesValues.notes && item.lineNotesValues.notes || "",
          lob: null,
          hierarchicalLevelCode: null,
          hierarchicalChildCode: null,
          hierarchicalID: null,
          hierarchicalParentID: null,
          serviceDateQlfCode: null,
          traceTypeCode1: null,
          serviceDatePeriodQlfCode: null,
        };
        saLineItemDataJsonForSave.push(saListObjVo);
      });
      let suppList = []
      //To generate required backedn key's
      supplementalProvData&&supplementalProvData.map((item,index)=>{
        suppList.push({
          providerID:item.providerID,
          providerIDType:item.providerIDType&&item.providerIDType.split('-')[0],
          sequenceId:item.rowId,
          sequenceNumber:0,
        })
      }) 
      //To generate sequenceNumber 
      eventProviderDetailsList&&eventProviderDetailsList.map((item)=>{
        item.sequenceNumber = item.index +1
        item.medicaidSupplementalProviderVO= {
          auditUserID: null,
          auditTimeStamp: null,
          addedAuditUserID: null,
          addedAuditTimeStamp: null,
          versionNo: 0,
          dbRecord: false,
          sortColumn: null,
          auditKeyList: [],
          auditKeyListFiltered: false,
          providerID: item.medicaidID,
          providerIDType: '1D',
          providerIDTypeDesc: null,
          providerName: null,
          licenseState: null,
          usedIndicator: null,
          sequenceId: null,
          sequenceNumber: null,
          evPrvSuppPsysIdList: null
          }
      }

      )
    const data = {
      dbRecord: false,
      sortColumn: null,
      operationType: serviceAuthDataO && serviceAuthDataO.subOrSaveAuth === 'save'?serviceAuthData &&
      serviceAuthData.basicServicesDetailsVO &&
      serviceAuthData.basicServicesDetailsVO.serviceAuthHeaderDetails &&
      serviceAuthData.basicServicesDetailsVO.serviceAuthHeaderDetails
        .serviceAuthID?"editSA":"addSA":operationType,
      basicServicesDetailsVO: {
        auditUserID: "DWILLIAMS150891",
        auditTimeStamp: null,
        addedAuditUserID: "DWILLIAMS150891",
        addedAuditTimeStamp: null,
        versionNo: 0,
        dbRecord: false,
        sortColumn: null,
        healthCareServicesReviewVO: {
          auditUserID: null,
          auditTimeStamp: null,
          addedAuditUserID: null,
          addedAuditTimeStamp: null,
          versionNo: 0,
          dbRecord: false,
          sortColumn: null,
          auditKeyList: [],
          auditKeyListFiltered: false,
          requestCategory: serviceReviewLocationInfoValues.requestCategory !== "-1"?
          serviceReviewLocationInfoValues.requestCategory:null,
          requestCategoryDesc: null,
          certificationType: serviceReviewLocationInfoValues.certificationType !== "-1"?
          serviceReviewLocationInfoValues.certificationType:null,
          certificationTypeDesc: null,
          serviceType: serviceReviewLocationInfoValues.serviceType,
          serviceTypeDesc: null,
          levelOfCare: serviceReviewLocationInfoValues.levelOfCare,
          levelOfCareDesc: null,
          nursingHomeStatus: null,
          nursingHomeStatusDesc: null,
          facilityType: serviceReviewLocationInfoValues.facilityType,
          facilitytypequalifier:
            serviceReviewLocationInfoValues.facilitytypequalifier,
          facilitytypequalifierDesc: null,
          levelOfService: serviceReviewLocationInfoValues.levelOfCare,
          requestedBeginDate: datesofServiceValues.requestedBeginDate,
          requestedEndDate: datesofServiceValues.requestedEndDate,
          certificationIssueDate: null,
          approvedBeginDate: null,
          approvedEndDate: null,
          patientEventTraceNumOne:
            patientEventNumberTraceValues.firstPatientEventTraceNumber,
          traceAssigningEntityIdentifierOne:
            patientEventNumberTraceValues.firstTraceAssignEntityIdentifier,
          traceAssigningEntityAddIdentifierOne:
            patientEventNumberTraceValues.firstTraceAssignEntityAdditionalIdentifier,
          patientEventTraceNumTwo:
            patientEventNumberTraceValues.secondPatientEventTraceNumber,
          traceAssigningEntityIdentifierTwo:
            patientEventNumberTraceValues.secondTraceAssignEntityIdentifier,
          traceAssigningEntityAddIdentifierTwo:
            patientEventNumberTraceValues.secondTraceAssignEntityAdditionalIdentifier,
          isSaWithEPSDT: null,
          isSaWithEPSDTDesc: null,
          saHierarchicalInfo: null,
          previousReviewAdminCode: null,
          previousReviewAdminQualifierCode: null,
          previousCertificationID: null,
          previousCertficationQualiferCode: null,
          requestedCategoryCode: null,
          serviceTypeCode: null,
          saSupplementalHealthCareServiceReviewInfo: null,
          saAmbulanceCertification: null,
          saAmbulanceTransport: null,
          saOtherUMODenialReason: null,
          saOtherUmoName: null,
          saAmbulanceAddress: null,
          saActivitiesPermittedCertification: null,
          saHomeHealthCareInfo: null,
          saOxygenTherapyInfo: null,
          saOxygenTherapyCertification: null,
          saRelatedCauseInfo: null,
          saServiceDeliveryInfo: null,
          certificationNumber: null,
          certificationIndicator: null,
          adminReferenceNumber: null,
          adminReferenceNumberQualifier: null,
          certificationTypeCode: null,
          estimatedDOBPeriodQlfCode: null,
          estimatedDOBQlfCode: null,
          eventDatePeriodQlfCode: null,
          eventDateQlfCode: null,
          levelOfServiceCode: null,
          patientTrace3EventTrackingID: null,
          patientTrace3OriginalAdditionalID: null,
          patientTrace3OriginalID: null,
          patientTrace1TypeCode: null,
          patientTrace2TypeCode: null,
          patientTrace3TypeCode: null,
          certificationPeriodQlfCode: null,
          lastAdmissionPeriodQlfCode: null,
        },
        idValue1: null,
        idValue2: null,
        idValue3: null,
        liIdValue: null,
        versionNoForClob: 0,
        versionNoClobContent: 0,
        saHealthCareServiceReviewInfoVO: null,
        paperworkAttachmentsVO: {
          auditUserID: null,
          auditTimeStamp: null,
          addedAuditUserID: null,
          addedAuditTimeStamp: null,
          versionNo: 0,
          dbRecord: false,
          sortColumn: null,
          auditKeyList: [],
          auditKeyListFiltered: false,
          description: null,
          lineNumber: 0,
          sequenceNumber: 0,
          attachmentCode: null,
          typeOfPaperwork: null,
          typeOfPaperworkShortDesc: null,
          transmissionCode: null,
          transmissionCodeShortDesc: null,
          externalControl: null,
          attachmentIDQualifierCode: null,
          attachmentDescription: null,
        },
        paperworkAttachments: paperWorkData,
        headerDiagnosisVO: null,
        internalHeaderDiagnosisVO: {
          auditUserID: null,
          auditTimeStamp: null,
          addedAuditUserID: null,
          addedAuditTimeStamp: null,
          versionNo: 0,
          dbRecord: false,
          sortColumn: null,
          diagnosisCode: null,
          diagnosisQualifierCode: null,
          sequenceNumber: null,
          tcn: null,
          memberSystemID: null,
        },
        headerDiagnosisList: diagnosisData,
        serviceAuthLineItemsList: saLineItemDataJsonForSave,
        letter: {
          auditUserID: null,
          auditTimeStamp: null,
          addedAuditUserID: null,
          addedAuditTimeStamp: null,
          versionNo: 0,
          dbRecord: false,
          sortColumn: null,
          letterComment1: letterCommentValues.letterComment1,
          letterComment2: letterCommentValues.letterComment2,
          letterComment3: letterCommentValues.letterComment3,
          letterComment4: letterCommentValues.letterComment4,
          letterComment5: letterCommentValues.letterComment5,
          letterType: null,
          authID: null,
          text: letterCommentValues.text,
          letterCexVersionNo: 0,
          letterCexIDValue: null,
          textApproved: null,
        },
        additionalAddrVO: {
          auditUserID: null,
          auditTimeStamp: null,
          addedAuditUserID: null,
          addedAuditTimeStamp: null,
          versionNo: 0,
          dbRecord: false,
          sortColumn: null,
          auditKeyList: [],
          auditKeyListFiltered: false,
          lastName: null,
          firstName: null,
          middleInitial: null,
          suffix: null,
          addressLine1: null,
          addressLine2: null,
          city: null,
          zip5: null,
          zip4: null,
          country: null,
          state: null,
          name: null,
          address: null,
          zip: null,
          addressSK: null,
          addressUsageTypeCode: null,
          addressUsageSequenceNumber: null,
          dummyInd: null,
          commonEntitySK: null,
          addressUsageVersionNo: 0,
          addressUsageBeginDate: null,
          addressUsageEndDate: null,
          commonEntityTypeCode: null,
          commonEntityVersionNo: 0,
          commonEntityVoidIndicator: null,
          specificEntityVersionNo: 0,
          additionalAddressVersionNo: 0,
        },
        additionalAddresseeList: additionalAddresseeData,
        rejectReasonVO: {
          auditUserID: null,
          auditTimeStamp: null,
          addedAuditUserID: null,
          addedAuditTimeStamp: null,
          versionNo: 0,
          dbRecord: false,
          sortColumn: null,
          rejectSequenceNumber: null,
          requestCode: null,
          lineNumber: null,
          rejectReason: null,
          rejectReasonDesc: null,
          followUpActionCode: null,
        },
        rejectReasonList: null,
        headerStatusHistoryVO: {
          auditUserID: null,
          auditTimeStamp: null,
          addedAuditUserID: null,
          addedAuditTimeStamp: null,
          versionNo: 0,
          dbRecord: false,
          sortColumn: null,
          date: null,
          userID: null,
          status: null,
          reason: null,
          historyUserName: null,
          tempDate: null,
          reasonCode: null,
          statusCode: null,
        },
        headerStatusHistoryList: [],
        serviceAuthHeaderDetails: {
          auditUserID: null,
          auditTimeStamp: null,
          addedAuditUserID: null,
          addedAuditTimeStamp: null,
          versionNo: 0,
          dbRecord: false,
          sortColumn: null,
          auditKeyList: [],
          auditKeyListFiltered: false,
          alertType: null,
          alertReason: null,
          alertSent: null,
          billingProviderID: null,
          billingProviderIDType: null,
          billingProviderName: null,
          referringProviderID: null,
          referringProviderIDType: null,
          referringProviderName: null,
          requestingProviderID: null,
          requestingProviderIDType: null,
          requestingProviderName: null,
          alertDate: null,
          authorizingID: null,
          currentStatus: statusValues.headerStatus,
          origAuthUserName: null,
          originalStatus: null,
          originalStatusDate: null,
          serviceAuthorizedBy: statusValues.serviceAuthorizedBy,
          saEnteredBy: statusValues.saEnteredBy,
          lastSavedUser: null,
          assignedUser:
            statusValues && statusValues.assignedUserIdOverride
              ? statusValues.assignedUserIdOverride
              : "DWILLIAMS150891", // hardcoded becuase of lack of login service
          saInputSource: values.saInputSource,
          overrideLocation: statusValues.assignedLocationOverride,
          overrideUserID: statusValues.assignedUserIdOverride,
          reasonCode: statusValues.reasonForStatusChange,
          saStatusChangeDate: null,
          memberID: memberValues.memberId,
          submitterID: values.submitterID,
          serviceAuthID: isCopySA
            ? null
            : serviceAuthData &&
            serviceAuthData.basicServicesDetailsVO &&
            serviceAuthData.basicServicesDetailsVO.serviceAuthHeaderDetails &&
            serviceAuthData.basicServicesDetailsVO.serviceAuthHeaderDetails
              .serviceAuthID,
          transactionSK: null,
          externalSAID: values.externalSAId,
          authType: serviceAuthDataO && serviceAuthDataO.authType,
          authTypeHCBC: null,
          saCategoryCode: null,
          beginDate: null,
          endDate: null,
          receivedDate: values.saReceivedDate || "01/01/2020",
          requestedBeginDate: values.saRequestedBeginDate,
          requestedEndDate: values.saRequestedEndDate,
          businessUnit: null,
          paperWork: "N",
          specialConsiderations: values.specialConsiderations,
          lineOfBusiness: null,
          benefitPlanID: "259",
          currentUser: null,
          currentLocation: null,
          enteredDate: null,
          mediaType: values.saMediaType,
          alertUserId: null,
          saSearchDateLimit: null,
          userPageFlag: null,
          inputSource: values.saInputSource,
          saSubmissionDate: null,
          saSubmissionTime: null,
          showCurrentLocation: null,
          saHcbcFlag: false,
          isLocationOverride: false,
          originalStatusDesc: null,
          reasonCodeDesc: null,
          currentStatusDesc: null,
          submitterName: null,
          saSequenceNumber: null,
          julianDateNumber: null,
          authorizationTypeDesc: null,
          mediaTypeDesc: null,
          saInputSourceDesc: null,
          billingProviderIDTypeDesc: null,
          liAuthType: level + " Service",
          serviceAuthorizedByDesc: null,
          assignedUserDesc: null,
          billingSysId: null,
          renderingSysId: null,
          referringSysId: null,
          messageText: null,
          submitterTranscationID: null,
          hierarchicalStructureCode: null,
          sa278HeaderInfoUMO: null,
          sa278HeaderDependent: null,
          transactionSetCreationDate: null,
          saHierarchicalInfo: null,
          saAdditionalPatientContactInfo: null,
          tempstatusChangeDate: null,
          tempOriginalStatusChangeDate: null,
          trasactionTypeCode: null,
          transcationSetIdentifierCode: null,
          transactionSetControlNumber: null,
          trasactionPurposeCode: null,
          implementationGuideVersionName: null,
          memberAltIDTypeCode: null,
        },
        serviceAuthMemberVO: {
          auditUserID: null,
          auditTimeStamp: null,
          addedAuditUserID: null,
          addedAuditTimeStamp: null,
          versionNo: 0,
          dbRecord: false,
          sortColumn: null,
          subscriberID: memberValues.memberId,
          lastName: memberValues.lastName,
          titleName: memberValues.prefix == "-1" ? "" : memberValues.prefix,
          firstName: memberValues.firstName,
          dateOfBirth: memberValues.dateOfBirth
            ? formatDatemmddyyyy(memberValues.dateOfBirth)
            : null,
          age: memberValues.age,
          genderCode: memberValues.gender,
          middleName: memberValues.middleInitial,
          ssn: memberValues.ssn,
          addressLine1: memberValues.addressLine1,
          addressLine2: memberValues.addressLine2,
          cityName: memberValues.city,
          stateCode: memberValues.state,
          zipCode: memberValues.zipExtension,
          countryCode: memberValues.countryCode,
          countrySubdivisionCode: memberValues.countrySubdivisionCode,
          submittedSASubscriberInfo: {
            subscriberID: memberValues.memberId,
            name: {
              lastName: memberValues.lastName,
              titleName: memberValues.prefix == "-1" ? "" : memberValues.prefix,
              firstName: memberValues.firstName,
              middleName: memberValues.middleInitial,
            },
            dateOfBirth: memberValues.dateOfBirth
              ? formatDateYYYYMMdd(memberValues.dateOfBirth)
              : null,
            age: memberValues.age,
            genderCode: memberValues.gender,
            ssn: memberValues.ssn,
            address: {
              addressLine1: memberValues.addressLine1,
              addressLine2: memberValues.addressLine2,
              cityName: memberValues.city,
              stateCode: memberValues.state,
              zipCode: memberValues.extension ? memberValues.zipExtension + '-' + memberValues.extension : memberValues.zipExtension,
              countryCode: memberValues.countryCode,
              countrySubdivisionCode: memberValues.countrySubdivisionCode,
            },
          },
        },
        documentsList: [
          {
            auditUserID: null,
            auditTimeStamp: null,
            addedAuditUserID: null,
            addedAuditTimeStamp: null,
            versionNo: 0,
            dbRecord: false,
            sortColumn: null,
            controlNumber: null,
            type: null,
            requestedDate: null,
            sentDate: null,
            receivedDate: "01/01/2020",
          },
        ],
        locationHistoryVO: {
          auditUserID: null,
          auditTimeStamp: null,
          addedAuditUserID: null,
          addedAuditTimeStamp: null,
          versionNo: 0,
          dbRecord: false,
          sortColumn: null,
          location: null,
          user: null,
          date: null,
          sequenceNumber: null,
          locationHistoryUserName: null,
          templocDate: null,
        },
        locationHistoryList: null,
        noteSetVO: null,
        saExceptions: [],
        saExceptionVO: {
          auditUserID: null,
          auditTimeStamp: null,
          addedAuditUserID: null,
          addedAuditTimeStamp: null,
          versionNo: 0,
          dbRecord: false,
          sortColumn: null,
          lineNumber: null,
          exceptionCode: null,
          status: null,
          longDescription: null,
          shortDescription: null,
          resolutionText: null,
          securityClerkID: null,
          locationCode: null,
          locationText: null,
          exceptionWindowLineNumber: null,
          dispositionCode: null,
          saID: null,
          headerStatus: null,
        },
        saHeaderData: false,
        saLineItemData: false,
        specializedServices: false,
        claimsUpdatesList: [],
        transactionSK: null,
        saWebTrans: null,
        status: null,
        authType: serviceAuthDataO && serviceAuthDataO.authType,
        serviceAuthId: null,
        exceptionCodeList: null,
        commentsVoList: [],
        requestingProviderDetailsVO: {
          medicaidId: orgId || '',
          providerID: otherProviderID && otherProviderID.providerID,
          providerIDType: "XX",
          entityCode: requestingProvInfo.entityCode||"1P",
          entityType: requestingProvInfo.entityType||"1",
          providerCode: requestingProvInfo.providerCd,
          taxonomyCode: requestingProvInfo.taxonomyCode,
          provName: requestingProvInfo.provName,
          lastName: requestingProvInfo.lastName,
          firstName: requestingProvInfo.firstName,
          middleInitial: requestingProvInfo.middleInitial,
          suffix: requestingProvInfo.suffix,
          addressLine1: requestingProvInfo.addressLine1,
          addressLine2: requestingProvInfo.addressLine2,
          city: requestingProvInfo.city,
          state: requestingProvInfo.state,
          zip: requestingProvInfo.zip,
          zip4: requestingProvInfo.zip4,
          country: requestingProvInfo.country,
          countrySubdiv: requestingProvInfo.countrySubdiv,
          medicaidSupplementalProviderVO: {
            auditUserID: null,
            auditTimeStamp: null,
            addedAuditUserID: null,
            addedAuditTimeStamp: null,
            versionNo: 0,
            dbRecord: false,
            sortColumn: null,
            auditKeyList: [],
            auditKeyListFiltered: false,
            providerID: orgId,
            providerIDType: "1D",
            providerIDTypeDesc: null,
            providerName: null,
            licenseState: null,
            usedIndicator: null,
            sequenceId: null,
            sequenceNumber: null,
            evPrvSuppPsysIdList: null,
          },
          sAContactInfoVO: reqPrvContractInfo ? {
            auditUserID: null,
            auditTimeStamp: null,
            addedAuditUserID: null,
            addedAuditTimeStamp: null,
            versionNo: 0,
            dbRecord: false,
            sortColumn: null,
            email: reqPrvContractInfo.email || null,
            fax: reqPrvContractInfo.fax || null,
            extension: reqPrvContractInfo.extension || null,
            phone: reqPrvContractInfo.phone || null,
            name: reqPrvContractInfo.name || null,
            contactOne: reqPrvContractInfo.phone || null,
            contactTwo: reqPrvContractInfo.extension || null,
            contactThree: reqPrvContractInfo.fax ? reqPrvContractInfo.fax : reqPrvContractInfo.email,
            contactQualifier1: 'TE',
            contactQualifier2: 'EX',
            contactQualifier3: reqPrvContractInfo.fax ? 'FX' : 'EM',
            contactFunctionCode: null
          } : {},
          //mapping the Addsupp list
          supplementalProviderList:suppList,
        },
        listOfAlertVOs: alertsData,
        eventProviderDetailsList: eventProviderDetailsList
          ? eventProviderDetailsList
          : [],
      },
      otherServicesDetailsVO: {
        auditUserID: null,
        auditTimeStamp: null,
        addedAuditUserID: null,
        addedAuditTimeStamp: null,
        versionNo: 0,
        dbRecord: false,
        sortColumn: null,
        providerSAInfo: {
          auditUserID: null,
          auditTimeStamp: null,
          addedAuditUserID: null,
          addedAuditTimeStamp: null,
          versionNo: 0,
          dbRecord: false,
          sortColumn: null,
          sequenceNum: null,
          notes: null,
          relatedCause1: null,
          relatedCause2: null,
          relatedCause3: null,
          autoAccidentState: null,
          autoAccidentCountry: null,
          accidentDate: null,
          accidentTime: null,
          lastMenstrualPeriod: null,
          estimatedDOB: null,
        },
        renderingProvider: {
          auditUserID: null,
          auditTimeStamp: null,
          addedAuditUserID: null,
          addedAuditTimeStamp: null,
          versionNo: 0,
          dbRecord: false,
          sortColumn: null,
          sequenceNumber: null,
          entityCode: null,
          entityCodeDesc: null,
          entityType: null,
          entityTypeDesc: null,
          providerID: null,
          providerIDTypeDesc: null,
          providerCodeDesc: null,
          providerIDType: null,
          providerCode: null,
          providerName: null,
          taxonomyCode: null,
          firstName: null,
          lastName: null,
          contactInfoVO: {
            auditUserID: null,
            auditTimeStamp: null,
            addedAuditUserID: null,
            addedAuditTimeStamp: null,
            versionNo: 0,
            dbRecord: false,
            sortColumn: null,
            contactInfoVOList: [],
            sequenceNumber: null,
            email: null,
            fax: null,
            ext: null,
            phone: null,
            name: null,
            li: null,
            contactInfoList: [],
          },
          sAContactInfoVO: {
            auditUserID: null,
            auditTimeStamp: null,
            addedAuditUserID: null,
            addedAuditTimeStamp: null,
            versionNo: 0,
            dbRecord: false,
            sortColumn: null,
            name: reqPrvContractInfo.name,
            phone: reqPrvContractInfo.phone,
            extension: reqPrvContractInfo.extension,
            fax: reqPrvContractInfo.fax,
            email: reqPrvContractInfo.email,
            contactOne: null,
            contactTwo: null,
            contactThree: null,
            contactQualifier1: null,
            contactQualifier2: null,
            contactQualifier3: null,
            contactFunctionCode: null,
          },
          supplementalProviderList: [],
          suffix: null,
          prefix: null,
          addressLine1: null,
          addressLine2: null,
          city: null,
          country: null,
          countrySubdiv: null,
          middleInitial: null,
          state: null,
          zip: null,
          zip4: null,
          rendProviderNPIDesc: null,
          usedIndicator: null,
          supplnLimitReached: false,
          prov: null,
          usedButton: "N",
          otherUsedIndicator: null,
          usedIndicatorMedicaidOrOther: null,
          providerSysIDInfo: null,
          medicaidUsedIndicator: null,
          medicaidSupplementalProviderVO: {
            auditUserID: null,
            auditTimeStamp: null,
            addedAuditUserID: null,
            addedAuditTimeStamp: null,
            versionNo: 0,
            dbRecord: false,
            sortColumn: null,
            auditKeyList: [],
            auditKeyListFiltered: false,
            providerID: null,
            providerIDType: null,
            providerIDTypeDesc: null,
            providerName: null,
            licenseState: null,
            usedIndicator: null,
            sequenceId: null,
            sequenceNumber: null,
            evPrvSuppPsysIdList: null,
          },
          taxonomyQualifierCode: null,
          provSysIDList: [],
          supplementalProviderVO: {
            auditUserID: null,
            auditTimeStamp: null,
            addedAuditUserID: null,
            addedAuditTimeStamp: null,
            versionNo: 0,
            dbRecord: false,
            sortColumn: null,
            auditKeyList: [],
            auditKeyListFiltered: false,
            providerID: null,
            providerIDType: null,
            providerIDTypeDesc: null,
            providerName: null,
            licenseState: null,
            usedIndicator: null,
            sequenceId: null,
            sequenceNumber: null,
            evPrvSuppPsysIdList: null,
          },
          rqPovSysIDList: [],
        },
        referringProvider: {
          auditUserID: null,
          auditTimeStamp: null,
          addedAuditUserID: null,
          addedAuditTimeStamp: null,
          versionNo: 0,
          dbRecord: false,
          sortColumn: null,
          sequenceNumber: null,
          entityCode: null,
          entityCodeDesc: null,
          entityType: null,
          entityTypeDesc: null,
          providerID: null,
          providerIDTypeDesc: null,
          providerCodeDesc: null,
          providerIDType: null,
          providerCode: null,
          providerName: null,
          taxonomyCode: null,
          firstName: null,
          lastName: null,
          contactInfoVO: {
            auditUserID: null,
            auditTimeStamp: null,
            addedAuditUserID: null,
            addedAuditTimeStamp: null,
            versionNo: 0,
            dbRecord: false,
            sortColumn: null,
            contactInfoVOList: [],
            sequenceNumber: null,
            email: null,
            fax: null,
            ext: null,
            phone: null,
            name: null,
            li: null,
            contactInfoList: [],
          },
          sAContactInfoVO: {
            auditUserID: null,
            auditTimeStamp: null,
            addedAuditUserID: null,
            addedAuditTimeStamp: null,
            versionNo: 0,
            dbRecord: false,
            sortColumn: null,
            name: null,
            phone: null,
            extension: null,
            fax: null,
            email: null,
            contactOne: null,
            contactTwo: null,
            contactThree: null,
            contactQualifier1: null,
            contactQualifier2: null,
            contactQualifier3: null,
            contactFunctionCode: null,
          },
          supplementalProviderList: [],
          suffix: null,
          prefix: null,
          addressLine1: null,
          addressLine2: null,
          city: null,
          country: null,
          countrySubdiv: null,
          middleInitial: null,
          state: null,
          zip: null,
          zip4: null,
          rendProviderNPIDesc: null,
          usedIndicator: null,
          supplnLimitReached: false,
          prov: null,
          usedButton: "N",
          otherUsedIndicator: null,
          usedIndicatorMedicaidOrOther: null,
          providerSysIDInfo: null,
          medicaidUsedIndicator: null,
          medicaidSupplementalProviderVO: {
            auditUserID: null,
            auditTimeStamp: null,
            addedAuditUserID: null,
            addedAuditTimeStamp: null,
            versionNo: 0,
            dbRecord: false,
            sortColumn: null,
            auditKeyList: [],
            auditKeyListFiltered: false,
            providerID: null,
            providerIDType: null,
            providerIDTypeDesc: null,
            providerName: null,
            licenseState: null,
            usedIndicator: null,
            sequenceId: null,
            sequenceNumber: null,
            evPrvSuppPsysIdList: null,
          },
          taxonomyQualifierCode: null,
          provSysIDList: [],
          supplementalProviderVO: {
            auditUserID: null,
            auditTimeStamp: null,
            addedAuditUserID: null,
            addedAuditTimeStamp: null,
            versionNo: 0,
            dbRecord: false,
            sortColumn: null,
            auditKeyList: [],
            auditKeyListFiltered: false,
            providerID: null,
            providerIDType: null,
            providerIDTypeDesc: null,
            providerName: null,
            licenseState: null,
            usedIndicator: null,
            sequenceId: null,
            sequenceNumber: null,
            evPrvSuppPsysIdList: null,
          },
          rqPovSysIDList: [],
        },
        requestingProvider: {
          auditUserID: null,
          auditTimeStamp: null,
          addedAuditUserID: null,
          addedAuditTimeStamp: null,
          versionNo: 0,
          dbRecord: false,
          sortColumn: null,
          sequenceNumber: null,
          entityCode: null,
          entityCodeDesc: null,
          entityType: null,
          entityTypeDesc: null,
          providerID: null,
          providerIDTypeDesc: null,
          providerCodeDesc: null,
          providerIDType: null,
          providerCode: null,
          providerName: null,
          taxonomyCode: null,
          firstName: null,
          lastName: null,
          contactInfoVO: {
            auditUserID: null,
            auditTimeStamp: null,
            addedAuditUserID: null,
            addedAuditTimeStamp: null,
            versionNo: 0,
            dbRecord: false,
            sortColumn: null,
            contactInfoVOList: [],
            sequenceNumber: null,
            email: null,
            fax: null,
            ext: null,
            phone: null,
            name: null,
            li: null,
            contactInfoList: [],
          },
          sAContactInfoVO: {
            auditUserID: null,
            auditTimeStamp: null,
            addedAuditUserID: null,
            addedAuditTimeStamp: null,
            versionNo: 0,
            dbRecord: false,
            sortColumn: null,
            name: null,
            phone: null,
            extension: null,
            fax: null,
            email: null,
            contactOne: null,
            contactTwo: null,
            contactThree: null,
            contactQualifier1: null,
            contactQualifier2: null,
            contactQualifier3: null,
            contactFunctionCode: null,
          },
          supplementalProviderList: [],
          suffix: null,
          prefix: null,
          addressLine1: null,
          addressLine2: null,
          city: null,
          country: null,
          countrySubdiv: null,
          middleInitial: null,
          state: null,
          zip: null,
          zip4: null,
          rendProviderNPIDesc: null,
          usedIndicator: null,
          supplnLimitReached: false,
          prov: null,
          usedButton: "N",
          otherUsedIndicator: null,
          usedIndicatorMedicaidOrOther: null,
          providerSysIDInfo: null,
          medicaidUsedIndicator: null,
          medicaidSupplementalProviderVO: {
            auditUserID: null,
            auditTimeStamp: null,
            addedAuditUserID: null,
            addedAuditTimeStamp: null,
            versionNo: 0,
            dbRecord: false,
            sortColumn: null,
            auditKeyList: [],
            auditKeyListFiltered: false,
            providerID: null,
            providerIDType: null,
            providerIDTypeDesc: null,
            providerName: null,
            licenseState: null,
            usedIndicator: null,
            sequenceId: null,
            sequenceNumber: null,
            evPrvSuppPsysIdList: null,
          },
          taxonomyQualifierCode: null,
          provSysIDList: [],
          supplementalProviderVO: {
            auditUserID: null,
            auditTimeStamp: null,
            addedAuditUserID: null,
            addedAuditTimeStamp: null,
            versionNo: 0,
            dbRecord: false,
            sortColumn: null,
            auditKeyList: [],
            auditKeyListFiltered: false,
            providerID: null,
            providerIDType: null,
            providerIDTypeDesc: null,
            providerName: null,
            licenseState: null,
            usedIndicator: null,
            sequenceId: null,
            sequenceNumber: null,
            evPrvSuppPsysIdList: null,
          },
          rqPovSysIDList: [],
        },
        eventProvider: {
          auditUserID: null,
          auditTimeStamp: null,
          addedAuditUserID: null,
          addedAuditTimeStamp: null,
          versionNo: 0,
          dbRecord: false,
          sortColumn: null,
          sequenceNumber: null,
          entityCode: null,
          entityCodeDesc: null,
          entityType: null,
          entityTypeDesc: null,
          providerID: null,
          providerIDTypeDesc: null,
          providerCodeDesc: null,
          providerIDType: null,
          providerCode: null,
          providerName: null,
          taxonomyCode: null,
          firstName: null,
          lastName: null,
          contactInfoVO: {
            auditUserID: null,
            auditTimeStamp: null,
            addedAuditUserID: null,
            addedAuditTimeStamp: null,
            versionNo: 0,
            dbRecord: false,
            sortColumn: null,
            contactInfoVOList: [],
            sequenceNumber: null,
            email: null,
            fax: null,
            ext: null,
            phone: null,
            name: null,
            li: null,
            contactInfoList: [],
          },
          sAContactInfoVO: {
            auditUserID: null,
            auditTimeStamp: null,
            addedAuditUserID: null,
            addedAuditTimeStamp: null,
            versionNo: 0,
            dbRecord: false,
            sortColumn: null,
            name: null,
            phone: null,
            extension: null,
            fax: null,
            email: null,
            contactOne: null,
            contactTwo: null,
            contactThree: null,
            contactQualifier1: null,
            contactQualifier2: null,
            contactQualifier3: null,
            contactFunctionCode: null,
          },
          supplementalProviderList: [],
          suffix: null,
          prefix: null,
          addressLine1: null,
          addressLine2: null,
          city: null,
          country: null,
          countrySubdiv: null,
          middleInitial: null,
          state: null,
          zip: null,
          zip4: null,
          rendProviderNPIDesc: null,
          usedIndicator: null,
          supplnLimitReached: false,
          prov: null,
          usedButton: "N",
          otherUsedIndicator: null,
          usedIndicatorMedicaidOrOther: null,
          providerSysIDInfo: null,
          medicaidUsedIndicator: null,
          medicaidSupplementalProviderVO: {
            auditUserID: null,
            auditTimeStamp: null,
            addedAuditUserID: null,
            addedAuditTimeStamp: null,
            versionNo: 0,
            dbRecord: false,
            sortColumn: null,
            auditKeyList: [],
            auditKeyListFiltered: false,
            providerID: null,
            providerIDType: null,
            providerIDTypeDesc: null,
            providerName: null,
            licenseState: null,
            usedIndicator: null,
            sequenceId: null,
            sequenceNumber: null,
            evPrvSuppPsysIdList: null,
          },
          taxonomyQualifierCode: null,
          provSysIDList: [],
          supplementalProviderVO: {
            auditUserID: null,
            auditTimeStamp: null,
            addedAuditUserID: null,
            addedAuditTimeStamp: null,
            versionNo: 0,
            dbRecord: false,
            sortColumn: null,
            auditKeyList: [],
            auditKeyListFiltered: false,
            providerID: null,
            providerIDType: null,
            providerIDTypeDesc: null,
            providerName: null,
            licenseState: null,
            usedIndicator: null,
            sequenceId: null,
            sequenceNumber: null,
            evPrvSuppPsysIdList: null,
          },
          rqPovSysIDList: [],
        },
        patientEventDetailVO: {
          auditUserID: null,
          auditTimeStamp: null,
          addedAuditUserID: null,
          addedAuditTimeStamp: null,
          versionNo: 0,
          dbRecord: false,
          sortColumn: null,
          relatedCausesVO: {
            auditUserID: null,
            auditTimeStamp: null,
            addedAuditUserID: null,
            addedAuditTimeStamp: null,
            versionNo: 0,
            dbRecord: false,
            sortColumn: null,
            accidentremployment: null,
            onerelatedcause: null,
            tworelatedcause: null,
            threerelatedcause: null,
            autoaccistate: null,
            autoaccicountry: null,
            accidate: null,
            accitime: null,
            pregnancyrelate: null,
            lastmenstrualperiod: null,
            estimateddob: null,
            accidentDateQlfCode: null,
            accidentDatePeriodQlfCode: null,
            lastMenstrualDateQlfCode: null,
            lastMenstrualDatePeriodQlfCode: null,
          },
          admissionReviewInstitutionalClaimVO: {
            patientadmissionbegindate: null,
            patientadmissionendate: null,
            patientdischargedate: null,
            patientadmissiontypecode: null,
            patientadmissionsrcode: null,
            patientpatstatuscode: null,
            patientnursinghrstatuscode: null,
            admissionDatePeriodQlfCode: null,
            admissionDateQlfCode: null,
            dischargeDateQlfCode: null,
            dischargeDatePeriodQlfCode: null,
          },
          healthCareDeliveryVO: {
            auditUserID: null,
            auditTimeStamp: null,
            addedAuditUserID: null,
            addedAuditTimeStamp: null,
            versionNo: 0,
            dbRecord: false,
            sortColumn: null,
            patientservicequantlabel: null,
            patientservicequantype: null,
            patientservicefreqcount: null,
            patientfreqperiod: null,
            patientservicedurationcount: null,
            patientdurationofservices: null,
            patientcalendarpattern: null,
            patientimeofday: null,
          },
          ambulanceVO: {
            auditUserID: null,
            auditTimeStamp: null,
            addedAuditUserID: null,
            addedAuditTimeStamp: null,
            versionNo: 0,
            dbRecord: false,
            sortColumn: null,
            patientWeight: null,
            patientcondcodeapply: "",
            patientfirstcondition: null,
            patienttwocondition: null,
            patienthreecondition: null,
            patientfourcondition: null,
            patientfivecondition: null,
            patientransportcode: null,
            patientransportreasoncode: null,
            patientroundtripurposedescription: null,
            patientstretcherpurposedescription: null,
            patientransportdistance: null,
            patientpatweight: null,
          },
          pickUpLocationVO: {
            auditUserID: null,
            auditTimeStamp: null,
            addedAuditUserID: null,
            addedAuditTimeStamp: null,
            versionNo: 0,
            dbRecord: false,
            sortColumn: null,
            patientlnamerorg: null,
            patientaddrlineone: null,
            patientaddrlinetwo: null,
            patientcity: null,
            patientstate: null,
            patientzipcode: null,
            patientZipCode1: null,
            patientZipCode2: null,
          },
          finalSchedDestAddrVO: {
            auditUserID: null,
            auditTimeStamp: null,
            addedAuditUserID: null,
            addedAuditTimeStamp: null,
            versionNo: 0,
            dbRecord: false,
            sortColumn: null,
            mainStop: {
              mspatientlnamerorg: null,
              mspatientaddrlineone: null,
              mspatientaddrlinetwo: null,
              mspatientcity: null,
              mspatientstate: null,
              patientzipcode: null,
              fspatientlnamerorg: null,
              fspatientaddrlineone: null,
              fspatientaddrlinetwo: null,
              fspatientcity: null,
              fspatientstate: null,
              sspatientlnamerorg: null,
              sspatientaddrlineone: null,
              sspatientaddrlinetwo: null,
              sspatientcity: null,
              sspatientstate: null,
              tspatientlnamerorg: null,
              tspatientaddrlineone: null,
              tspatientaddrlinetwo: null,
              tspatientcity: null,
              tspatientstate: null,
              patientFinZipCode1: null,
              patientFirStopZipCode1: null,
              patientSecStopZip1: null,
              patientThirdStopZipCode1: null,
              patientFinZipCode2: null,
              patientFirStopZipCode2: null,
              patientSecStopZip2: null,
              patientThirdStopZipCode2: null,
            },
            firstStop: {
              mspatientlnamerorg: null,
              mspatientaddrlineone: null,
              mspatientaddrlinetwo: null,
              mspatientcity: null,
              mspatientstate: null,
              patientzipcode: null,
              fspatientlnamerorg: null,
              fspatientaddrlineone: null,
              fspatientaddrlinetwo: null,
              fspatientcity: null,
              fspatientstate: null,
              sspatientlnamerorg: null,
              sspatientaddrlineone: null,
              sspatientaddrlinetwo: null,
              sspatientcity: null,
              sspatientstate: null,
              tspatientlnamerorg: null,
              tspatientaddrlineone: null,
              tspatientaddrlinetwo: null,
              tspatientcity: null,
              tspatientstate: null,
              patientFinZipCode1: null,
              patientFirStopZipCode1: null,
              patientSecStopZip1: null,
              patientThirdStopZipCode1: null,
              patientFinZipCode2: null,
              patientFirStopZipCode2: null,
              patientSecStopZip2: null,
              patientThirdStopZipCode2: null,
            },
            secondStop: {
              mspatientlnamerorg: null,
              mspatientaddrlineone: null,
              mspatientaddrlinetwo: null,
              mspatientcity: null,
              mspatientstate: null,
              patientzipcode: null,
              fspatientlnamerorg: null,
              fspatientaddrlineone: null,
              fspatientaddrlinetwo: null,
              fspatientcity: null,
              fspatientstate: null,
              sspatientlnamerorg: null,
              sspatientaddrlineone: null,
              sspatientaddrlinetwo: null,
              sspatientcity: null,
              sspatientstate: null,
              tspatientlnamerorg: null,
              tspatientaddrlineone: null,
              tspatientaddrlinetwo: null,
              tspatientcity: null,
              tspatientstate: null,
              patientFinZipCode1: null,
              patientFirStopZipCode1: null,
              patientSecStopZip1: null,
              patientThirdStopZipCode1: null,
              patientFinZipCode2: null,
              patientFirStopZipCode2: null,
              patientSecStopZip2: null,
              patientThirdStopZipCode2: null,
            },
            thirdStop: {
              mspatientlnamerorg: null,
              mspatientaddrlineone: null,
              mspatientaddrlinetwo: null,
              mspatientcity: null,
              mspatientstate: null,
              patientzipcode: null,
              fspatientlnamerorg: null,
              fspatientaddrlineone: null,
              fspatientaddrlinetwo: null,
              fspatientcity: null,
              fspatientstate: null,
              sspatientlnamerorg: null,
              sspatientaddrlineone: null,
              sspatientaddrlinetwo: null,
              sspatientcity: null,
              sspatientstate: null,
              tspatientlnamerorg: null,
              tspatientaddrlineone: null,
              tspatientaddrlinetwo: null,
              tspatientcity: null,
              tspatientstate: null,
              patientFinZipCode1: null,
              patientFirStopZipCode1: null,
              patientSecStopZip1: null,
              patientThirdStopZipCode1: null,
              patientFinZipCode2: null,
              patientFirStopZipCode2: null,
              patientSecStopZip2: null,
              patientThirdStopZipCode2: null,
            },
          },
          supplementalHealthCareReviewVO: {
            auditUserID: null,
            auditTimeStamp: null,
            addedAuditUserID: null,
            addedAuditTimeStamp: null,
            versionNo: 0,
            dbRecord: false,
            sortColumn: null,
            patientcurrenthealth: null,
            patientprognosiscode: null,
            patientdelayreason: null,
            patientreleaseofinfo: null,
            dateofOnset: null,
            dateOfOnset: null,
          },
          showPatientEventData: false,
          homeOxyTherapyVO: {
            auditUserID: null,
            auditTimeStamp: null,
            addedAuditUserID: null,
            addedAuditTimeStamp: null,
            versionNo: 0,
            dbRecord: false,
            sortColumn: null,
            conditionCode1: null,
            conditionCode2: null,
            conditionCode3: null,
            conditionCode4: null,
            conditionCode5: null,
            conditionCategoryCode: null,
            certificationIndicator: null,
            condition1Ot: null,
            authConditionCodeOt: null,
            equipmentTypeCode1: null,
            equipmentTypeCode2: null,
            equipmentReasonDesc: null,
            oxygenFlowRate: null,
            oxygenUsedTimes: null,
            oxygenUserHours: null,
            respTherapistOrdTxt: null,
            arterialBloodGasQty: null,
            oxygenSaturationQty: null,
            oxygenTestCondCode: null,
            oxygenTestFindingCode: [],
            portableOxygenFlowRt: null,
            oxygenDeliverySystemCode: null,
            oxygenEquipCode: null,
          },
          homeHealthCareVO: {
            auditUserID: null,
            auditTimeStamp: null,
            addedAuditUserID: null,
            addedAuditTimeStamp: null,
            versionNo: 0,
            dbRecord: false,
            sortColumn: null,
            prognosisCode: PEDValues.prognosisCode || null,
            startDate: PEDValues.startDate&&moment(PEDValues.startDate).format('MM/DD/YYYY') || null,
            certificationPeriodFrom: PEDValues.certificationPeriodFrom&&moment(PEDValues.certificationPeriodFrom).format('MM/DD/YYYY') || null,
            certificationPeriodTo: PEDValues.certificationPeriodTo&&moment(PEDValues.certificationPeriodTo).format('MM/DD/YYYY') || null,
            memMedicareCovg: PEDValues.medicareCoverageIndicator || null,
            certificationTypeCode: PEDValues.certificationTypeCode || null,
            surgeryDate: PEDValues.surgeryDate&&moment(PEDValues.surgeryDate).format('MM/DD/YYYY') || null,
            authProcedureCode: PEDValues.isProcCodeAuth || null,
            procedureCode: PEDValues.surgicalProcedureCode || null,
            physicianOrderDate: PEDValues.physicianOrderDate&&moment(PEDValues.physicianOrderDate).format('MM/DD/YYYY') || null,
            lastVisitDate:PEDValues.lastVisitDate&&moment(PEDValues.lastVisitDate).format('MM/DD/YYYY') || null,
            physicianContactDate: PEDValues.physicianContactDate&&moment(PEDValues.physicianContactDate).format('MM/DD/YYYY') || null,
            lastAdmissionBeginDate: PEDValues.lastAdmissionBeginDate&& moment(PEDValues.lastAdmissionBeginDate).format('MM/DD/YYYY') || null,
            patientLocation: PEDValues.patientLocation || null,
            lastAdmissionEndDate: PEDValues.lastAdmissionEndDate&&moment(PEDValues.lastAdmissionEndDate).format('MM/DD/YYYY') || null,
          },
          homeChiropracticVO: {
            auditUserID: null,
            auditTimeStamp: null,
            addedAuditUserID: null,
            addedAuditTimeStamp: null,
            versionNo: 0,
            dbRecord: false,
            sortColumn: null,
            authConditionCodeCp: null,
            condition1Cp: null,
            condition2: null,
            condition3: null,
            condition4: null,
            condition5: null,
            xrayIndicator: null,
            treatmentSeriesNo: null,
            treatmentSeriesCount: null,
            subluxationCode1: null,
            subluxationCode2: null,
            patientConditionCode: null,
            complicationIndicator: null,
            patientConditionDesc1: null,
            patientConditionDesc2: null,
          },
          homeMentalStatusVO: {
            auditUserID: null,
            auditTimeStamp: null,
            addedAuditUserID: null,
            addedAuditTimeStamp: null,
            versionNo: 0,
            dbRecord: false,
            sortColumn: null,
            authConditionCodeMs: null,
            condition1Ms: null,
            condition2: null,
            condition3: null,
            condition4: null,
            condition5: null,
          },
          homeDMEPatientVO: {
            auditUserID: null,
            auditTimeStamp: null,
            addedAuditUserID: null,
            addedAuditTimeStamp: null,
            versionNo: 0,
            dbRecord: false,
            sortColumn: null,
            authConditionCodeDp: null,
            condition1Dp: null,
            condition2: null,
            condition3: null,
            condition4: null,
            condition5: null,
          },
          homeFuncLimitationVO: {
            auditUserID: null,
            auditTimeStamp: null,
            addedAuditUserID: null,
            addedAuditTimeStamp: null,
            versionNo: 0,
            dbRecord: false,
            sortColumn: null,
            authConditionCodeFl: null,
            condition1Fl: null,
            condition2: null,
            condition3: null,
            condition4: null,
            condition5: null,
          },
          homeActvtsPermittVO: {
            auditUserID: null,
            auditTimeStamp: null,
            addedAuditUserID: null,
            addedAuditTimeStamp: null,
            versionNo: 0,
            dbRecord: false,
            sortColumn: null,
            authConditionCodeap: null,
            condition1ap: null,
            condition2: null,
            condition3: null,
            condition4: null,
            condition5: null,
          },
        },
        billingProvider: {
          auditUserID: null,
          auditTimeStamp: null,
          addedAuditUserID: null,
          addedAuditTimeStamp: null,
          versionNo: 0,
          dbRecord: false,
          sortColumn: null,
          sequenceNumber: null,
          entityCode: null,
          entityCodeDesc: null,
          entityType: null,
          entityTypeDesc: null,
          providerID: null,
          providerIDTypeDesc: null,
          providerCodeDesc: null,
          providerIDType: null,
          providerCode: null,
          providerName: null,
          taxonomyCode: null,
          firstName: null,
          lastName: null,
          contactInfoVO: {
            auditUserID: null,
            auditTimeStamp: null,
            addedAuditUserID: null,
            addedAuditTimeStamp: null,
            versionNo: 0,
            dbRecord: false,
            sortColumn: null,
            contactInfoVOList: [],
            sequenceNumber: null,
            email: null,
            fax: null,
            ext: null,
            phone: null,
            name: null,
            li: null,
            contactInfoList: [],
          },
          sAContactInfoVO: {
            auditUserID: null,
            auditTimeStamp: null,
            addedAuditUserID: null,
            addedAuditTimeStamp: null,
            versionNo: 0,
            dbRecord: false,
            sortColumn: null,
            name: null,
            phone: null,
            extension: null,
            fax: null,
            email: null,
            contactOne: null,
            contactTwo: null,
            contactThree: null,
            contactQualifier1: null,
            contactQualifier2: null,
            contactQualifier3: null,
            contactFunctionCode: null,
          },
          supplementalProviderList: [],
          suffix: null,
          prefix: null,
          addressLine1: null,
          addressLine2: null,
          city: null,
          country: null,
          countrySubdiv: null,
          middleInitial: null,
          state: null,
          zip: null,
          zip4: null,
          rendProviderNPIDesc: null,
          usedIndicator: null,
          supplnLimitReached: false,
          prov: null,
          usedButton: "N",
          otherUsedIndicator: null,
          usedIndicatorMedicaidOrOther: null,
          providerSysIDInfo: null,
          medicaidUsedIndicator: null,
          medicaidSupplementalProviderVO: {
            auditUserID: null,
            auditTimeStamp: null,
            addedAuditUserID: null,
            addedAuditTimeStamp: null,
            versionNo: 0,
            dbRecord: false,
            sortColumn: null,
            auditKeyList: [],
            auditKeyListFiltered: false,
            providerID: null,
            providerIDType: null,
            providerIDTypeDesc: null,
            providerName: null,
            licenseState: null,
            usedIndicator: null,
            sequenceId: null,
            sequenceNumber: null,
            evPrvSuppPsysIdList: null,
          },
          taxonomyQualifierCode: null,
          provSysIDList: [],
          supplementalProviderVO: {
            auditUserID: null,
            auditTimeStamp: null,
            addedAuditUserID: null,
            addedAuditTimeStamp: null,
            versionNo: 0,
            dbRecord: false,
            sortColumn: null,
            auditKeyList: [],
            auditKeyListFiltered: false,
            providerID: null,
            providerIDType: null,
            providerIDTypeDesc: null,
            providerName: null,
            licenseState: null,
            usedIndicator: null,
            sequenceId: null,
            sequenceNumber: null,
            evPrvSuppPsysIdList: null,
          },
          rqPovSysIDList: [],
        },
        headerDiagnosisList: [],
        ambulanceVO: null,
        paperworkAttachmentsList: [],
        billingproviderinformation: {
          auditUserID: null,
          auditTimeStamp: null,
          addedAuditUserID: null,
          addedAuditTimeStamp: null,
          versionNo: 0,
          dbRecord: false,
          sortColumn: null,
          billingProviderMedicaidID: null,
          npi: null,
          renderingProviderMedicaidID: null,
          renderingNPI: null,
          providerCode: null,
          taxonomyCode: null,
          lastName: null,
          firstName: null,
          middleInitial: null,
          suffix: null,
          address: null,
          city: null,
          state: null,
          zip: null,
          country: null,
          providerRelatedQuestion: null,
        },
      },
    };
    setspinnerLoader(true);
    if (operationType === "" &&
    majorValidations(tempArray) && valiDateProv()) {
      Axios.post(`${serviceEndPoint.SA_SAVE}`, data)
        .then((res) => {
          if (res.data === "success") {
            setspinnerLoader(false);
            setSuccessMessages(["System successfully saved the Information."]);
          } else {
            setErrorMessages([
              "There was an error processing the request. Please retry the transaction.",
            ]);
            setspinnerLoader(false);
          }
        })
        .catch((e) => {
          setspinnerLoader(false);
          setErrorMessages([e.message]);
        });
    }
    let memberName = `${memberValues.firstName} ${memberValues.middleInitial} ${memberValues.lastName}`;

    const formInfo = new FormData();

    formInfo.append("serviceAuthRequestVO", JSON.stringify(data));
    if (
      (operationType === "editSA" || operationType === "addSA") &&
      majorValidations(tempArray) && valiDateProv()
    ) {
      Axios.post(`${serviceEndPoint.VALIDATE_MEMBER}`, data)
        .then((res) => {
          if (res.data === "") {
            Axios.post(
              `${serviceEndPoint.SERVICE_AUTHORIZATION_ADD_ENDPOINT}`,
              formInfo, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
            )
              .then((res) => {
                if (res.data.errCode === "001") {
                  res.data.validate = true;
                  setspinnerLoader(false);
                  setAuthData(res.data);
                  enableNavigation(false);
                  localStorage.setItem("SAmemberName", memberName);
                  localStorage.setItem("memberId", memberValues.memberId);
                  localStorage.setItem("serviceAuthId", res.data.serviceAuthId);
                  if (
                    res.data &&
                    res.data.enterpriseBaseVO &&
                    res.data.enterpriseBaseVO.basicServicesDetailsVO &&
                    res.data.enterpriseBaseVO.basicServicesDetailsVO
                      .serviceAuthHeaderDetails &&
                    res.data.enterpriseBaseVO.basicServicesDetailsVO
                      .serviceAuthHeaderDetails.currentStatus
                  ) {
                    localStorage.setItem(
                      "currentStatus",
                      res.data.enterpriseBaseVO.basicServicesDetailsVO
                        .serviceAuthHeaderDetails.currentStatus
                    );
                  }
                  dispatch(
                    dispatchServiceDataIdSearch({
                      data: res.data && res.data.enterpriseBaseVO,
                    })
                  );
                } else if (
                  res.data &&
                  res.data.error &&
                  res.data.error.errorCode === "002"
                ) {
                  setErrorMessages(
                    filter_array(
                      res.data
                        .replace(/]/gi, "")
                        .replace("Member#[", "")
                        .split(", ")
                    )
                  );
                  setShowError({
                    validateMIErr:
                      res.data.indexOf(
                        ServiceAuthConstants.VALIDATE_MI_ERROR
                      ) <= -1
                        ? false
                        : (() => {
                          reqFieldArr.push(
                            ServiceAuthConstants.VALIDATE_MI_ERROR
                          );
                          return true;
                        })(),
                    validateSuffixErr:
                      res.data.indexOf(
                        ServiceAuthConstants.VALIDATE_SUFFIX_ERROR
                      ) <= -1
                        ? false
                        : (() => {
                          reqFieldArr.push(
                            ServiceAuthConstants.VALIDATE_SUFFIX_ERROR
                          );
                          return true;
                        })(),
                    validateDOBErr:
                      res.data.indexOf(
                        ServiceAuthConstants.VALIDATE_DOB_ERROR
                      ) <= -1
                        ? false
                        : (() => {
                          reqFieldArr.push(
                            ServiceAuthConstants.VALIDATE_DOB_ERROR
                          );
                          return true;
                        })(),
                    validateAgeErr:
                      res.data.indexOf(
                        ServiceAuthConstants.VALIDATE_AGE_ERROR
                      ) <= -1
                        ? false
                        : (() => {
                          reqFieldArr.push(
                            ServiceAuthConstants.VALIDATE_AGE_ERROR
                          );
                          return true;
                        })(),
                    validateSSNErr:
                      res.data.indexOf(
                        ServiceAuthConstants.VALIDATE_SSN_ERROR
                      ) <= -1
                        ? false
                        : (() => {
                          reqFieldArr.push(
                            ServiceAuthConstants.VALIDATE_SSN_ERROR
                          );
                          return true;
                        })(),
                    validateLNErr:
                      res.data.indexOf(
                        ServiceAuthConstants.VALIDATE_LAST_NAME_ERROR
                      ) <= -1
                        ? false
                        : (() => {
                          reqFieldArr.push(
                            ServiceAuthConstants.VALIDATE_LAST_NAME_ERROR
                          );
                          return true;
                        })(),
                    validateFNErr:
                      res.data.indexOf(
                        ServiceAuthConstants.VALIDATE_FIRST_NAME_ERROR
                      ) <= -1
                        ? false
                        : (() => {
                          reqFieldArr.push(
                            ServiceAuthConstants.VALIDATE_FIRST_NAME_ERROR
                          );
                          return true;
                        })(),
                  });
                  setspinnerLoader(false);
                } else {
                  setErrorMessages([
                    "There was an error processing the request. Please retry the transaction.",
                  ]);
                  setspinnerLoader(false);
                }
              })
              .catch((e) => {
                setspinnerLoader(false);
                setErrorMessages([e.message]);
              });
          } else {
            if (res.data) {
              const errorFilter = filter_array(
                res.data
                  .replace(/]/gi, "")
                  .replace("Member#[", "")
                  .split(", ")
              )
              if(errorFilter == "The SSN entered does not match the SSN on the Member file for the entered MID." || errorFilter == "Member ID is Invalid"){
                setErrorMessages(['The member ID was not found in our system. Please enter a valid member ID.'])
              }
              else{
                setErrorMessages(errorFilter)
              }
              /*setErrorMessages(
                filter_array(
                  res.data
                    .replace(/]/gi, "")
                    .replace("Member#[", "")
                    .split(", ")
                )
              );*/
              setShowError({
                validateMIErr:
                  res.data.indexOf(ServiceAuthConstants.VALIDATE_MI_ERROR) >
                    -1 || res.data === ServiceAuthConstants.MI_ERROR
                    ? (() => {
                      reqFieldArr.push(
                        ServiceAuthConstants.VALIDATE_MI_ERROR
                      );
                      return true;
                    })()
                    : false,
                validateSuffixErr:
                  res.data.indexOf(
                    ServiceAuthConstants.VALIDATE_SUFFIX_ERROR
                  ) <= -1
                    ? false
                    : (() => {
                      reqFieldArr.push(
                        ServiceAuthConstants.VALIDATE_SUFFIX_ERROR
                      );
                      return true;
                    })(),
                validateDOBErr:
                  res.data.indexOf(ServiceAuthConstants.VALIDATE_DOB_ERROR) <=
                    -1
                    ? false
                    : (() => {
                      reqFieldArr.push(
                        ServiceAuthConstants.VALIDATE_DOB_ERROR
                      );
                      return true;
                    })(),
                validateAgeErr:
                  res.data.indexOf(ServiceAuthConstants.VALIDATE_AGE_ERROR) <=
                    -1
                    ? false
                    : (() => {
                      reqFieldArr.push(
                        ServiceAuthConstants.VALIDATE_AGE_ERROR
                      );
                      return true;
                    })(),
                validateSSNErr:
                  res.data.indexOf(ServiceAuthConstants.VALIDATE_SSN_ERROR) <=
                    -1
                    ? false
                    : (() => {
                      reqFieldArr.push(
                        ServiceAuthConstants.VALIDATE_SSN_ERROR
                      );
                      return true;
                    })(),
                validateLNErr:
                  res.data.indexOf(
                    ServiceAuthConstants.VALIDATE_LAST_NAME_ERROR
                  ) <= -1
                    ? false
                    : (() => {
                      reqFieldArr.push(
                        ServiceAuthConstants.VALIDATE_LAST_NAME_ERROR
                      );
                      return true;
                    })(),
                validateFNErr:
                  res.data.indexOf(
                    ServiceAuthConstants.VALIDATE_FIRST_NAME_ERROR
                  ) <= -1
                    ? false
                    : (() => {
                      reqFieldArr.push(
                        ServiceAuthConstants.VALIDATE_FIRST_NAME_ERROR
                      );
                      return true;
                    })(),
              });
              setspinnerLoader(false);
            } else {
              setErrorMessages([
                "There was an error processing the request. Please retry the transaction.",
              ]);
              setspinnerLoader(false);
            }
            setspinnerLoader(false);
          }
        })
        .catch((e) => {
          setspinnerLoader(false);
          setErrorMessages([e.message]);
        });      
    } else {
      setspinnerLoader(false);
    }
  };

  const serviceSuccessHandel = (msg) => {
    if (msg.validate == true) {
      setSuccessMessages([msg.errMsg]);
    } else {
      setSuccessMessages([
        msg.errMsg + " " + "Service Auth ID:" + " " + msg.serviceAuthId,
      ]);
    }
    setspinnerLoader(false);
  };

  const searchProcedureCode = () => {
    setCancelType(true);
    dispatch(setCancel(true));
    props.history.push({
      pathname: "/ViewEditAuthRequest",
    });
  };

  const multiDelete = () => {
    setDialogOpen(false);
    setDialogType("");
    setErrorMessages([]);
    setSuccessMessages([]);
    setMinorSuccessMessages([]);
    if (selectDeleteArray.length > 0) {
      let CI = codesAndIndTableData;
      selectDeleteArray.map((value, index) => {
        let curIndex = CI.findIndex((i) =>
          moment(i.dateRangeVO.beginDate).isSame(value.dateRangeVO.beginDate)
        );
        CI.splice(curIndex, 1);
      });
      setCodesAndIndTableData(CI);
      setSelectDeleteArray([]);
    }
  };

  const [isMajorReset, setIsMajorReset] = useState({
    isReset: false,
    isResetAgain: false,
  });

  const majorReset = () => {
    if (isMajorReset.isReset) {
      setIsMajorReset({ isReset: false, isResetAgain: true });
    } else {
      setIsMajorReset({ isReset: true, isResetAgain: false });
    }
    setProviderTableData([]);
    setErrorMessages([]);
    setSuccessMessages([]);
    setMinorSuccessMessages([]);
    setCIShowError({});
    setShowError({});
    setValues(initializeValues);
    setMemberValues(initializeMemberValues);
    setDiagnosisData([]);
    setStatusValues(initializeStatusValues);
    setAlertsData([]);
    setAdditionalAddresseeData([]);
    setServiceReviewLocationInfoValues(initialServiceReviewLocationInfoValues);
    setRequestingProvInfo(initialRequestingProvHeader);
    setReqPrvContractInfo(initialContractInfo);
    setPEDValues(inititalPEDValues);
    setPatientEventNumberTraceValues(initilaPatientEventNumberTraceValues);
  };
  const [navLevel,setNavLevel]=useState(
    {
      name:'',
      url:''
    }
  ); 
  const resetDataForSameLocation=()=>{
    enableNavigation(false)
    majorReset()
  }

  return (
    <div className="pos-relative">
      {spinnerLoader ? <Spinner /> : null}
      <UnsavedChangesMessage 
      allowNavigation={allowNavigation}
      handelPromptSet={handelPromptSet}
      confirm={confirm}
      navName={navLevel.name}
      navUrl={navLevel.url}
      cancelType={cancelType} 
      prompt={prompt}
      setCancelType={setCancelType}
      setPrompt={setPrompt} 
      resetDataForSameLocation={resetDataForSameLocation}
      />

      {errorMessages.length > 0 ? (
        <div
          className="alert alert-danger custom-alert"
          role="alert"
        >
          {errorMessages.map((message) => (
            <li>{message}</li>
          ))}
        </div>
      ) : null}
      {successMessages.length > 0 ? (
        <div
          className="alert alert-success custom-alert hide-on-print"
          role="alert"
        >
          {successMessages.map((message) => (
            <li>{message}</li>
          ))}
        </div>
      ) : null}
      <Dialog
        open={dialogOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="custom-alert-box"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure that you want to delete?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              dialogType == "multiDelete" ? multiDelete() : null;
            }}
            color="primary"
            className="btn btn-success"
          >
            Ok
          </Button>
          <Button
            onClick={() => {
              setDialogOpen(false);
              setDialogType("");
            }}
            color="primary"
            autoFocus
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <div className="mb-2">
        <BreadCrumbs
          parent="Service Authorization"
          child2="Update Service Authorization"
          path="ServiceAuthorization"
        />
      </div>
      <div className="tabs-container" ref={printRef}>
        <div className="tab-header">
          <h1 className="tab-heading page-heading float-left">
            Update Service Authorization
          </h1>
          <div className="float-right th-btnGroup">
            <Button
              title="Save"
              variant="outlined"
              color="primary"
              className="btn btn-ic btn-save"
              onClick={() => majorSave("Edit")}
              disabled={isProtected == true || readOnly}

            >
              SUBMIT
            </Button>
            <Button
              title="Save"
              variant="outlined"
              color="primary"
              className="btn btn-ic btn-save"
              onClick={() => majorSave("Add")}
              disabled={isSaveDisabled || isProtected == true || readOnly}
            >
              SAVE
            </Button>
            <Button
              title="Copy"
              variant="outlined"
              color="primary"
              className="btn btn-ic btn-reset"
              onClick={() => handleServiceAuthCopy()}
              disabled={readOnly}
              

            >
              COPY
            </Button>
            <Button
              title="Reset"
              variant="outlined"
              color="primary"
              className="btn btn-ic btn-reset"
              onClick={() => majorReset()}
              disabled={readOnly}

            >
              RESET
            </Button>
            <Button
              title="Cancel"
              variant="outlined"
              color="primary"
              className="btn btn-cancel"
              onClick={() => searchProcedureCode()}
            >
              CANCEL
            </Button>
          </div>
        </div>
        <div></div>
        {/* Strts */}
        <div className="clm-inquiry-tabData tab-body pull-left">
          <div className="tabs-holder">
            <div className="tab-body-bordered collapsable-panel">
              <div className="custom-panel">
                <div className="panel-header">
                  <span> Service Authorization </span>
                </div>
                <ServiceAuthForm
                  level={level}
                  serviceLevel={serviceLevel}
                  values={values}
                  dropdowns={addDropdowns}
                  handleChanges={handleChanges}
                  handleSpecialConsideration={handleSpecialConsideration}
                  handleDCDtChange={handleDCDtChange}
                  errors={{
                    saMediaTypeErr,
                    saReceivedDateErr,
                    saReceivedDateFutureErr,
                    saReceivedInvDateErr,
                    saRequestedBgnInvDateErr,
                    saRequestedEndInvDateErr,
                    saRequestedEndGreatDateErr,
                    saInputSourceErr,
                    externalSAError,
                  }}
                />
              </div>
            </div>
          </div>
          <div className="tab-holder custom-tabber fit-tab-1 my-3">
            <AppBar position="static" color="default">
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                indicatorColor="primary"
                textColor="primary"
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
              >
                <Tab title="Main Tab" label="Main Tab" {...a11yProps(0)} />
                <Tab
                  title="Ancillary Tab"
                  label="Ancillary Tab"
                  {...a11yProps(1)}
                />
                <Tab
                  title="Patient Event Detail"
                  label="Patient Event Detail"
                  {...a11yProps(1)}
                />
              </Tabs>
            </AppBar>

            <TabPanel value={tabValue} index={0}>
              <SABasicAddForm
                level={level}
                initialSP={initialSP}
                setSupplementalProvData={setSupplementalProvData}
                setproVen={setProEven}
                requestingProvInfo={requestingProvInfo}
                setRequestingProvInfo={setRequestingProvInfo}
                eventProviderDetailsList={eventProviderDetailsList}
                setEventProviderDetailsList={setEventProviderDetailsList}
                reqPrvContractInfo={reqPrvContractInfo}
                initialContractInfo={initialContractInfo}
                setReqPrvContractInfo={setReqPrvContractInfo}
                serviceLevel={serviceLevel}
                isCopy={isCopy}
                values={values}
                statusValues={statusValues}
                dataListData={{ alerts: alerts }}
                dropdowns={addDropdowns}
                locationDropdown={locationDropdown}
                userDropDown={userDropDown}
                handleDCDtChange={handleDCDtMemberChange}
                handleMemberChanges={handleMemberChanges}
                handleStatusChanges={handleStatusChanges}
                handleLetterCommentChanges={handleLetterCommentChanges}
                errors={{
                  memberZipErr,
                  memberIdErr,
                  lineItemMinReq,
                  firstNameReqErr,
                  lastNameReqErr,
                  dobReqErr,
                  headerStatusErr,
                  validHeaderStatusErr,
                  dobError,
                  invalidDobError,
                  reasonStatusError,
                  validateFNErr,
                  validateLNErr,
                  validateMIErr,
                  validateSuffixErr,
                  validateDOBErr,
                  validateAgeErr,
                  validateSSNErr,
                }}
                memberValues={memberValues}
                letterCommentValues={letterCommentValues}
                alertsData={alertsData}
                setAlertsData={setAlertsData}
                additionalAddresseeData={additionalAddresseeData}
                setAdditionalAddresseeData={setAdditionalAddresseeData}
                supplementalProvData={supplementalProvData}
                providerTableData={providerTableData}
                setProviderTableData={setProviderTableData}
                additionalProviderTableData={additionalProviderTableData}
                setAdditionalProviderTableData={setAdditionalProviderTableData}
                setDiagnosisData={setDiagnosisData}
                isMajorReset={isMajorReset}
                authData={authData}
                isSAADD={false}
                isProtected={isProtected}
              />
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              <SABasicAddAncillaryForm
                isInquiry={isProtected}
                level={level}
                serviceLevel={serviceLevel}
                dropdowns={addDropdowns}
                headerPaperWorkData={paperWorkData}
                setHeaderPaperWorkData={setPaperWorkData}
                handleServiceReviewLocationInfoValues={
                  handleServiceReviewLocationInfoValues
                }
                serviceReviewLocationInfoValues={
                  serviceReviewLocationInfoValues
                }
                saApprovedUnits={saApprovedUnits}
                handleSAApprovedUnits={handleSAApprovedUnits}
                handleServiceDeliveryInfo={handleServiceDeliveryInfo}
                saServiceDeliveryInfo={saServiceDeliveryInfo}
                handleHeaderNotes={handleHeaderNotes}
                headerNotes={headerNotes}
                handlePatientEventTraceNumber={handlePatientEventTraceNumber}
                patientEventNumberTraceValues={patientEventNumberTraceValues}
                handleDatesofServiceChange={handleDatesofServiceChange}
                datesofServiceValues={datesofServiceValues}
                isProtected={isProtected}
              />
            </TabPanel>
            <TabPanel value={tabValue} index={2}>
              <SAPatientEventDetails
                errors={PEDFieldErrors}
                isProtected={isProtected}
                changePEDValues={changePEDValues}
                PEDValues={PEDValues}
                dropdowns={addDropdowns}
                headerPaperWorkData={paperWorkData}
                setHeaderPaperWorkData={setPaperWorkData}
                handleServiceReviewLocationInfoValues={
                  handleServiceReviewLocationInfoValues
                }
                serviceReviewLocationInfoValues={
                  serviceReviewLocationInfoValues
                }
                saApprovedUnits={saApprovedUnits}
                handleSAApprovedUnits={handleSAApprovedUnits}
                handleServiceDeliveryInfo={handleServiceDeliveryInfo}
                saServiceDeliveryInfo={saServiceDeliveryInfo}                

              />
            </TabPanel>
          </div>
        </div>
        <div className="clm-inquiry-exceptionData pull-left mb-3">
          <QuickLinks links={quickLinks} enableExpand={true} />
          <div
            className="card border-light mb-3"
            style={{ width: "18rem", marginTop: "1.3rem" }}
          >
            <div className="card-header side-container">News</div>
            <div className="card-body">
              <p className="card-text card-notes-container">
                Provider Training Session starts on September 1st ,2020.
              </p>
            </div>
          </div>

          <div className="clearfix"></div>
        </div>
        <div className="clearfix"></div>
        {/* Ends */}
        <Footer print />
      </div>
    </div>
  );
}
export default withRouter(ServiceAuthorizationUpdate);
