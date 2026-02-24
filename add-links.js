const fs = require('fs');
const path = require('path');

// The extracted URLs from your old file
const extractedUrls = {
    "1": "https://drive.google.com/file/d/1BC91UNEkudSYls091HV_6aseGGv-SA0R/view?usp=sharing",
    "2": "https://drive.google.com/file/d/1BC91UNEkudSYls091HV_6aseGGv-SA0R/view?usp=sharing",
    "3": "https://drive.google.com/file/d/1kyYlBFpQl4nu3zXTcbhmmWicpyelNWI4/view?usp=sharing",
    "4": "https://drive.google.com/file/d/10oxTn5C9eJDi-hpj2bDoy7M_VRNCcJO8/view?usp=sharing",
    "5": "https://drive.google.com/file/d/1BC91UNEkudSYls091HV_6aseGGv-SA0R/view?usp=sharing",
    "6": "https://drive.google.com/file/d/1BC91UNEkudSYls091HV_6aseGGv-SA0R/view?usp=sharing",
    "7": "https://drive.google.com/file/d/1BC91UNEkudSYls091HV_6aseGGv-SA0R/view?usp=sharing",
    "8": "https://drive.google.com/file/d/1BC91UNEkudSYls091HV_6aseGGv-SA0R/view?usp=sharing",
    "9": "https://drive.google.com/file/d/1BC91UNEkudSYls091HV_6aseGGv-SA0R/view?usp=sharing",
    "10": "https://drive.google.com/file/d/1u4e5m43u9oM_WkHwjaVRmRDDEA2VdsUS/view?usp=sharing",
    "11": "https://drive.google.com/file/d/1WkOMMNB17wnpSrpOSRg68PFc6CBkw_MF/view?usp=sharing",
    "12": "https://drive.google.com/file/d/12l6vPYlw8CIfxrJsEapht67-cp9IRoAX/view?usp=sharing",
    "13": "https://biostar.pl/wp-content/uploads/2023/04/2023.04.05-GRUPA-INCO_Ecocert-Detergents-Certificate-31.03.2024.pdf",
    "14": "https://biostar.pl/wp-content/uploads/2023/04/2023.04.05-GRUPA-INCO_Ecocert-Detergents-Certificate-31.03.2024.pdf",
    "15": "https://biostar.pl/wp-content/uploads/2023/04/2023.04.05-GRUPA-INCO_Ecocert-Detergents-Certificate-31.03.2024.pdf",
    "16": "https://biostar.pl/wp-content/uploads/2023/04/2023.04.05-GRUPA-INCO_Ecocert-Detergents-Certificate-31.03.2024.pdf",
    "17": "https://biostar.pl/wp-content/uploads/2023/04/2023.04.05-GRUPA-INCO_Ecocert-Detergents-Certificate-31.03.2024.pdf",
    "18": "https://biostar.pl/wp-content/uploads/2023/06/PL-019-009-003-1-Biostar-naczynia.pdf",
    "19": "https://biostar.pl/wp-content/uploads/2023/06/PL-015-001-004-1-Biostar-tabletki.pdf",
    "20": "https://biostar.pl/wp-content/uploads/2023/06/PL-020-018-007-1-Biostar-WC.pdf",
    "22": "https://drive.google.com/file/d/1kE20FmNz_ca6wkn1JS2FQa1t0_qtxd3b/view?usp=sharing",
    "23": "https://drive.google.com/file/d/1kE20FmNz_ca6wkn1JS2FQa1t0_qtxd3b/view?usp=sharing",
    "24": "https://drive.google.com/file/d/1kE20FmNz_ca6wkn1JS2FQa1t0_qtxd3b/view?usp=sharing",
    "25": "https://drive.google.com/file/d/1kE20FmNz_ca6wkn1JS2FQa1t0_qtxd3b/view?usp=sharing",
    "26": "https://drive.google.com/file/d/1kE20FmNz_ca6wkn1JS2FQa1t0_qtxd3b/view?usp=sharing",
    "27": "https://drive.google.com/file/d/1KlXJp4z7tZ2AJJsk3uzy1Tlbth_cNThx/view?usp=sharing",
    "28": "https://drive.google.com/file/d/1kE20FmNz_ca6wkn1JS2FQa1t0_qtxd3b/view?usp=sharing",
    "29": "https://drive.google.com/file/d/1kE20FmNz_ca6wkn1JS2FQa1t0_qtxd3b/view?usp=sharing",
    "32": "https://drive.google.com/file/d/1oEhSEhPay_gpKrfaXP3kAEjkkcKcqX9Z/view?usp=sharing",
    "33": "https://drive.google.com/file/d/1hm8ZlnIpTPO9nH7VvA1fPWc_reO5RnNc/view?usp=sharing",
    "34": "https://drive.google.com/file/d/10JLg9GRc91pm7ki-PfbAP8RjZDHpt2_e/view?usp=sharing",
    "35": "https://drive.google.com/file/d/1-jA-Kj1T5mKyokgMCM-lqZ1vi6IMdYh7/view?usp=sharing",
    "36": "https://drive.google.com/file/d/1fq6ob4P0KS0uSB-GqMSvIBxc9i0kR-uZ/view?usp=sharing",
    "37": "https://drive.google.com/file/d/1SoW_9Ay73Rk_AYqTjxctJN9wC9fPqohe/view?usp=sharing",
    "38": "https://drive.google.com/file/d/1SoW_9Ay73Rk_AYqTjxctJN9wC9fPqohe/view?usp=sharing",
    "39": "https://drive.google.com/file/d/1SoW_9Ay73Rk_AYqTjxctJN9wC9fPqohe/view?usp=sharing",
    "40": "https://drive.google.com/file/d/1SoW_9Ay73Rk_AYqTjxctJN9wC9fPqohe/view?usp=sharing",
    "41": "https://drive.google.com/file/d/1SoW_9Ay73Rk_AYqTjxctJN9wC9fPqohe/view?usp=sharing"
};

const dataPath = path.join(__dirname, 'data', 'strapi-data.json');
const rawData = fs.readFileSync(dataPath, 'utf8');
const data = JSON.parse(rawData);

// Add the links and clean up the old Markdown texts from the descriptions
data.products = data.products.map(product => {
    if (extractedUrls[product.id]) { // <-- Fixed variable name here
        product.safetyDataSheetUrl = extractedUrls[product.id]; // <-- Fixed variable name here
    }

    // Clean up old markdown links like [Информация...](http...) from descriptions
    const markdownRegex = /\n*\[.*?\]\(http.*?\)/g;
    if (product.description) {
        product.description = product.description.replace(markdownRegex, '');
    }
    if (product.marketingDescription) {
        product.marketingDescription = product.marketingDescription.replace(markdownRegex, '');
    }

    // Clean up leftover text like "Информация за безопасност" without links
    const textRegex = /\n*Информация за безопасност/g;
    if (product.description) {
        product.description = product.description.replace(textRegex, '');
    }
    if (product.marketingDescription) {
        product.marketingDescription = product.marketingDescription.replace(textRegex, '');
    }

    return product;
});

fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
console.log('SUCCESS: Safety Data Sheet links were successfully added to strapi-data.json!');