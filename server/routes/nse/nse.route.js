var express = require("express");
var router = express.Router();
const axios = require("axios");
const { fatcaXML } = require("../../helpers/xml.helper");


router.post("/nse/post_ucc", (req, res) => {
    console.log(req.body)
    let data = req.body;
    var xml = `
     <NMFIIService>
      <service_request>
        <appln_id>MFS169982</appln_id>
        <password>COT06IW0NQ5BWR19</password>
        <broker_code>ARN-169982</broker_code>
        <process_mode>${data.process_mode}</process_mode>
        <iin_conf_flag>Y</iin_conf_flag>
        <title></title>
        <inv_name>${data.company_name}</inv_name>
        <pan>${data.pan}</pan>
        <valid_pan>Y</valid_pan>
        <exemption>${data.exemption}</exemption>
        <exempt_category></exempt_category>
        <exempt_ref_no></exempt_ref_no>
        <dob></dob>
        <hold_nature>${data.holding_nature}</hold_nature> 
        <tax_status>${data.tax_type}</tax_status>
        <kyc>Y</kyc>
        <fh_ckyc>N</fh_ckyc>
        <fh_ckyc_refno></fh_ckyc_refno>
        <occupation></occupation>
        <mfu_can></mfu_can>
        <dp_id></dp_id>
        <father_name></father_name>
        <mother_name></mother_name>
        <trxn_acceptance>Ph</trxn_acceptance>
        <addr1>${data.address1}</addr1>
        <addr2></addr2>
        <addr3></addr3>
        <city>${data.city}</city>
        <state>${data.state}</state>
        <pincode>${data.pincode}</pincode>
        <country>IND</country>
        <mobile_no>${data.mf_phone}</mobile_no>
        <res_phone></res_phone>
        <off_phone></off_phone>
        <res_fax></res_fax>
        <off_fax></off_fax>
        <email>${data.mf_email}</email>
        <nri_addr1></nri_addr1>
        <nri_addr2></nri_addr2>
        <nri_addr3></nri_addr3>
        <nri_city></nri_city>
        <nri_state></nri_state>
        <nri_pincode></nri_pincode>
        <nri_country></nri_country>
        <bank_name>${data.bank}</bank_name>
        <acc_no>${data.acc_no}</acc_no>
        <acc_type>${data.acc_type}</acc_type>
        <ifsc_code>${data.ifsc}</ifsc_code>
        <branch_name>${data.branch_name}</branch_name>
        <branch_addr1>${data.branch_addr}</branch_addr1>
        <branch_addr2></branch_addr2>
        <branch_addr3></branch_addr3>
        <branch_city></branch_city>
        <branch_pincode>431201</branch_pincode>
        <branch_country>IND</branch_country>
        <jh1_name></jh1_name>
        <jh1_pan></jh1_pan>
        <jh1_valid_pan></jh1_valid_pan>
        <jh1_exemption></jh1_exemption>
        <jh1_exempt_category></jh1_exempt_category>
        <jh1_exempt_ref_no></jh1_exempt_ref_no>
        <jh1_dob></jh1_dob>
        <jh1_kyc></jh1_kyc>
        <jh1_ckyc></jh1_ckyc>
        <jh1_ckyc_refno></jh1_ckyc_refno>
        <jh1_email></jh1_email>
        <jh1_mobile_no></jh1_mobile_no>
        <jh2_name></jh2_name>
        <jh2_pan></jh2_pan>
        <jh2_valid_pan></jh2_valid_pan>
        <jh2_exemption></jh2_exemption>
        <jh2_exempt_category></jh2_exempt_category>
        <jh2_exempt_ref_no></jh2_exempt_ref_no>
        <jh2_dob></jh2_dob>
        <jh2_kyc></jh2_kyc>
        <jh2_ckyc></jh2_ckyc>
        <jh2_ckyc_refno></jh2_ckyc_refno>
        <jh2_email></jh2_email>
        <jh2_mobile_no></jh2_mobile_no>
        <no_of_nominee>0</no_of_nominee>
        <nominee1_type></nominee1_type>
        <nominee1_name></nominee1_name>
        <nominee1_dob></nominee1_dob>
        <nominee1_addr1></nominee1_addr1>
        <nominee1_addr2></nominee1_addr2>
        <nominee1_addr3></nominee1_addr3>
        <nominee1_city></nominee1_city>
        <nominee1_state></nominee1_state>
        <nominee1_pincode></nominee1_pincode>
        <nominee1_relation></nominee1_relation>
        <nominee1_percent></nominee1_percent>
        <nominee1_guard_name></nominee1_guard_name>
        <nominee1_guard_pan></nominee1_guard_pan>
        <nominee2_type></nominee2_type>
        <nominee2_name></nominee2_name>
        <nominee2_dob></nominee2_dob>
        <nominee2_relation></nominee2_relation>
        <nominee2_percent></nominee2_percent>
        <nominee2_guard_name></nominee2_guard_name>
        <nominee2_guard_pan></nominee2_guard_pan>
        <nominee3_type></nominee3_type>
        <nominee3_Name></nominee3_Name>
        <nominee3_dob></nominee3_dob>
        <nominee3_relation></nominee3_relation>
        <nominee3_percent></nominee3_percent>
        <nominee3_guard_name></nominee3_guard_name>
        <nominee3_guard_pan></nominee3_guard_pan>
        <guard_name></guard_name>
        <guard_pan></guard_pan>
        <guard_valid_pan></guard_valid_pan>
        <guard_exemption></guard_exemption>
        <guard_exempt_category></guard_exempt_category>
        <guard_pan_ref_no></guard_pan_ref_no>
        <guard_dob></guard_dob>
        <guard_kyc></guard_kyc>
        <guard_ckyc></guard_ckyc>
        <guard_ckyc_refno></guard_ckyc_refno>
        <micr_no></micr_no>
        <FD_Flag></FD_Flag>
        <App_Key></App_Key>
      </service_request>
    </NMFIIService>`;

    var config = {
        method: 'post',
        url: 'https://www.nsenmf.com/NMFIITrxnService/NMFTrxnService/CREATECUSTOMER',
        headers: {
            'Content-Type': 'application/xml',
            'Cookie': 'ASP.NET_SessionId=l4gf1fxvgt3mpkw2vfdhu0pc'
        },
        data: xml
    };

    axios(config)
        .then(function(response) {
            // console.log(JSON.stringify(response.data));
            res.send(response.data)
        })
        .catch(function(error) {
            console.log(error)
            return res.status(400).json({ status: 400, message: error.message })
        });
})

router.post("/nse/get_iin_status", (req, res) => {
    let iin = req.body.iin
    let xml = `
    <NMFIIService> 
    <service_request>
        <appln_id>MFS169982</appln_id> 
        <password>COT06IW0NQ5BWR19</password> 
        <broker_code>ARN-169982</broker_code> 
        <iin>${iin}</iin>
    </service_request>
</NMFIIService>
`

    var config = {
        method: 'post',
        url: 'https://www.nsenmf.com/NMFIITrxnService/NMFTrxnService/IINDETAILS',
        headers: {
            'Content-Type': 'application/xml',
            'Cookie': 'ASP.NET_SessionId=l4gf1fxvgt3mpkw2vfdhu0pc'
        },
        data: xml
    };

    axios(config)
        .then(function(response) {
            // console.log(JSON.stringify(response.data));
            res.send(response.data)
        })
        .catch(function(error) {
            console.log(error);
            return res.status(400).json({ status: 400, message: error.message })
        });
})

router.post("/nse/retrigger_iin", (req, res) => {

    let iin = req.body.iin;
    let pan = req.body.pan
    let xml = `
        <NMFIIService> 
            <service_request>
                <appln_id>MFS169982</appln_id> 
                <password>COT06IW0NQ5BWR19</password> 
                <broker_code>ARN-169982</broker_code>
                <iin>${iin}</iin>
                <pan_pekrn>${pan}</pan_pekrn>
                <process_mode>ICL</process_mode>
                <return_flag>Y</return_flag>
            </service_request> 
        </NMFIIService>`

    var config = {
        method: 'post',
        url: 'https://www.nsenmf.com/NMFIITrxnService/NMFTrxnService/FATCAIINRETRIGGEREMAIL',
        headers: {
            'Content-Type': 'application/xml',
            'Cookie': 'ASP.NET_SessionId=l4gf1fxvgt3mpkw2vfdhu0pc'
        },
        data: xml
    };

    axios(config)
        .then(function(response) {
            // console.log(JSON.stringify(response.data));
            res.send(response.data)
        })
        .catch(function(error) {
            console.log(error);
            return res.status(400).json({ status: 400, message: error.message })
        });
})

router.post("/nse/post_fatca_ubo", (req, res) => {
    let xml = fatcaXML(req.body)
    console.log(xml)
    var config = {
        method: 'post',
        url: 'https://www.nsenmf.com/NMFIITrxnService/NMFTrxnService/FATCAKYCUBOREG',
        headers: {
            'Content-Type': 'application/xml',
            'Cookie': 'ASP.NET_SessionId=l4gf1fxvgt3mpkw2vfdhu0pc'
        },
        data: xml
    };

    axios(config)
        .then(function(response) {
            console.log(JSON.stringify(response.data));
            res.send(response.data)
        })
        .catch(function(error) {
            console.log(error);
            return res.status(400).json({ status: 400, message: error.message })
        });
})

router.post("/nse/edit_customer", (req, res) => {
    let data = req.body
    console.log(data)
    var xml = `
     <NMFIIService>
      <service_request>
        <appln_id>MFS169982</appln_id>
        <password>COT06IW0NQ5BWR19</password>
        <broker_code>ARN-169982</broker_code>
        <iin>${data.iin}</iin>
        <title></title>
        <inv_name>${data.company_name}</inv_name>
         <dob>24-May-1998</dob>
        <occupation></occupation>
        <mfu_can></mfu_can>
        <dp_id></dp_id>
        <father_name></father_name>
        <mother_name></mother_name>
        <trxn_acceptance>Ph</trxn_acceptance>
        <addr1>${data.address1}</addr1>
        <addr2></addr2>
        <addr3></addr3>
        <city>${data.city}</city>
        <state>${data.state}</state>
        <pincode>${data.pincode}</pincode>
        <country>IND</country>
        <mobile_no>${data.mf_phone}</mobile_no>
        <res_phone></res_phone>
        <off_phone></off_phone>
        <res_fax></res_fax>
        <off_fax></off_fax>
        <email>${data.mf_email}</email>
        <nri_addr1></nri_addr1>
        <nri_addr2></nri_addr2>
        <nri_addr3></nri_addr3>
        <nri_city></nri_city>
        <nri_state></nri_state>
        <nri_pincode></nri_pincode>
        <nri_country></nri_country>
        <bank_name>${data.bank}</bank_name>
        <acc_no>${data.acc_no}</acc_no>
        <acc_type>${data.acc_type}</acc_type>
        <ifsc_code>${data.ifsc}</ifsc_code>
        <branch_name>${data.branch_name}</branch_name>
        <branch_addr1>${data.branch_addr}</branch_addr1>
        <branch_addr2></branch_addr2>
        <branch_addr3></branch_addr3>
        <branch_city></branch_city>
        <branch_pincode></branch_pincode>
        <branch_country></branch_country>
        <no_of_nominee>0</no_of_nominee>
        <nominee1_type></nominee1_type>
        <nominee1_name></nominee1_name>
        <nominee1_dob></nominee1_dob>
        <nominee1_addr1></nominee1_addr1>
        <nominee1_addr2></nominee1_addr2>
        <nominee1_addr3></nominee1_addr3>
        <nominee1_city></nominee1_city>
        <nominee1_state></nominee1_state>
        <nominee1_pincode></nominee1_pincode>
        <nominee1_relation></nominee1_relation>
        <nominee1_percent></nominee1_percent>
        <nominee1_guard_name></nominee1_guard_name>
        <nominee1_guard_pan></nominee1_guard_pan>
        <nominee2_type></nominee2_type>
        <nominee2_name></nominee2_name>
        <nominee2_dob></nominee2_dob>
        <nominee2_relation></nominee2_relation>
        <nominee2_percent></nominee2_percent>
        <nominee2_guard_name></nominee2_guard_name>
        <nominee2_guard_pan></nominee2_guard_pan>
        <nominee3_type></nominee3_type>
        <nominee3_Name></nominee3_Name>
        <nominee3_dob></nominee3_dob>
        <nominee3_relation></nominee3_relation>
        <nominee3_percent></nominee3_percent>
        <nominee3_guard_name></nominee3_guard_name>
        <nominee3_guard_pan></nominee3_guard_pan>
        <micr_no></micr_no>
      </service_request>
    </NMFIIService>`;

    var config = {
        method: 'post',
        url: 'https://www.nsenmf.com/NMFIITrxnService/NMFTrxnService/EDITCUSTOMER',
        headers: {
            'Content-Type': 'application/xml',
            'Cookie': 'ASP.NET_SessionId=l4gf1fxvgt3mpkw2vfdhu0pc'
        },
        data: xml
    };

    axios(config)
        .then(function(response) {
            // console.log(JSON.stringify(response.data));
            res.send(response.data)
        })
        .catch(function(error) {
            console.log(error)
            return res.status(400).json({ status: 400, message: error.message })
        });
})



module.exports = router