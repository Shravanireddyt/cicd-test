exports.fatcaXML = (data) => {

    let date = data.net_worth_date;
    let months = ['Jan', 'Feb', "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    date = new Date(date).getDate() + '-' + months[new Date(date).getMonth()] + "-" + new Date(date).getFullYear();
    let xml = `
    <NMFIIService>
        <service_request>
            <appln_id>MFS169982</appln_id>
            <password>COT06IW0NQ5BWR19</password>
            <broker_code>ARN-169982</broker_code>
            <pan>${data.pan}</pan>
            <tax_status>${data.tax_type}</tax_status>
            <investor_name>${data.company_name}</investor_name>
            <chkExempIndValid>${data.exemption !== "N" ? "Y" : "N"}</chkExempIndValid>
            <editor_id>MFS169982</editor_id>
            <ubo_applicable_count>${data.users ? data.users.length : ''}</ubo_applicable_count>
            <KYC>
                <app_income_code>${data.app_income_code}</app_income_code>
                <net_worth_sign></net_worth_sign>
                <net_worth>${data.net_worth}</net_worth>
                <net_worth_date>${date}</net_worth_date>
                <pep>N</pep>
                <occ_code>${data.occ_code}</occ_code>
                <source_wealth></source_wealth>
                <corp_servs>${data.corp_servs}</corp_servs>
            </KYC>
            <Fatca>
                <dob>31-Jul-1987</dob>
                <addr_type>${data.addr_type}</addr_type>
                <data_src>E</data_src>
                <log_name>${data.mf_email}</log_name>
                <country_of_birth>${data.country_of_birth}</country_of_birth>
                <place_birth>${data.place_birth}</place_birth>
                <tax_residency>${data.tax_residence}</tax_residency>
                <country_tax_residency1>${data.country_tax_residency1 ? data.country_tax_residency1 : ''}</country_tax_residency1>
                <tax_payer_identityno1>${data.tax_payer_identityno1 ? data.tax_payer_identityno1 : ''}</tax_payer_identityno1>
                <id1_type>${data.id1_type ? data.id1_type :''}</id1_type>
                <country_tax_residency2>${data.country_tax_residency2 ? data.country_tax_residency2 : ''}</country_tax_residency2>
                <tax_payer_identityno2>${data.tax_payer_identityno2 ?data.tax_payer_identityno2 :''}</tax_payer_identityno2>
                <id2_type>${data.id2_type ? data.id2_type :''}</id2_type>
                <country_tax_residency3>${data.country_tax_residency3 ? data.country_tax_residency3 :''}</country_tax_residency3>
                <tax_payer_identityno3>${data.tax_payer_identityno3 ? data.tax_payer_identityno3 :''}</tax_payer_identityno3>
                <id3_type>${data.id3_type ? data.id3_type : ''}</id3_type>
                <country_tax_residency4>${data.country_tax_residency4 ? data.country_tax_residency4 :''}</country_tax_residency4>
                <tax_payer_identityno4>${data.tax_payer_identityno4 ? data.tax_payer_identityno4 :''}</tax_payer_identityno4>
                <id4_type>${data.id4_type ? data.id4_type : ''}</id4_type>
                <ffi_drnfe>${data.ffi_drnfe}</ffi_drnfe>
                <nffe_catg>${data.nffe_catg ? data.nffe_catg :''}</nffe_catg>
                <nature_bus>${data.nature_bus ? data.nature_bus : ''}</nature_bus>
                <act_nfe_subcat>${data.act_nfe_subcat ? data.act_nfe_subcat : ''}</act_nfe_subcat>
                <stock_exchange>${data.stock_exchange ? data.stock_exchange :''}</stock_exchange>
                <listed_company>${data.listed_company ? data.listed_company :''}</listed_company>
                <us_person>N</us_person>
                <exemp_code></exemp_code>
                <giin_applicable>${data.giin_applicable ? data.giin_applicable :''}</giin_applicable>
                <giin>${data.giin ? data.giin : ''}</giin>
                <giin_exem_cat>${data.giin_exem_cat ? data.giin_exem_cat : ''}</giin_exem_cat>
                <sponcer_availability>${data.sponcer_availability ? data.sponcer_availability: ''}</sponcer_availability>
                <sponcer_entity>${data.sponcer_entity ? data.sponcer_entity : ''}</sponcer_entity>
                <giin_not_app>${data.giin_not_app ? data.giin_not_app : ''}</giin_not_app>
                <fatca_dec_received>Y</fatca_dec_received>
            </Fatca>`

    if (data.tax_type !== '01') {
        for (let elem of data.users) {
            let xmlUbo = `<ubo>
                <ubo_add1>${elem.ubo_addr ? elem.ubo_addr : ''}</ubo_add1>
                <ubo_add2>${elem.ubo_addr ? elem.ubo_addr : ''}</ubo_add2>
                <ubo_add3>${elem.ubo_addr ? elem.ubo_addr : ''}</ubo_add3>
                <ubo_master_codes>${elem.ubo_master_codes ? elem.ubo_master_codes : ''}</ubo_master_codes>
                <ubo_pan_no>${elem.ubo_pan_no ? elem.ubo_pan_no : ''}</ubo_pan_no>
                <ubo_name>${elem.ubo_name ? elem.ubo_name : ''}</ubo_name>
                <ubo_country_tax_residency>${elem.ubo_country_tax_residency ? elem.ubo_country_tax_residency : ''}</ubo_country_tax_residency>
                <ubo_cob>${elem.ubo_cob ? elem.ubo_cob : ''}</ubo_cob>
                <ubo_cocn></ubo_cocn>
                <ubo_country>${elem.ubo_country ? elem.ubo_country : ''}</ubo_country>
                <ubo_dob></ubo_dob>
                <ubo_father_nam></ubo_father_nam>
                <ubo_gender></ubo_gender>
                <ubo_holding_perc>${elem.ubo_hold_percent ? elem.ubo_hold_percent + '%' : ''}</ubo_holding_perc>
                <ubo_occ_code></ubo_occ_code>
                <ubo_tel_no></ubo_tel_no>
                <ubo_mobile></ubo_mobile>
                <ubo_pincode>${elem.ubo_pin ? elem.ubo_pin : ''}</ubo_pincode>
                <ubo_city>${elem.ubo_city ? elem.ubo_city : ''}</ubo_city>
                <ubo_state>${elem.ubo_state ? elem.ubo_state :''}</ubo_state>
                <ubo_add_type>${elem.ubo_add_type ? elem.ubo_add_type : ''}</ubo_add_type>
                <ubo_id_type>${elem.ubo_pan_no ? 'C' : ''}</ubo_id_type>
                <ubo_tin_no>${elem.ubo_pan_no ? elem.ubo_pan_no : ''}</ubo_tin_no>
            </ubo>`
            xml = xml + '\n' + xmlUbo
        }
    }

    xml = xml + '\n' + '</service_request></NMFIIService>'

    return xml

}