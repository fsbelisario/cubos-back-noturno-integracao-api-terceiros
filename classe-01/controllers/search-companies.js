const fs = require("fs/promises");
const axios = require("axios");

const searchCompany = async (req, res) => {
    const api_key = "34a8499969c4401daf6a685935323c1d"
    const domain = req.params.dominioEmpresa;
    let companyEnrolled;
    try {
        const company = await axios.get(`https://companyenrichment.abstractapi.com/v1/?api_key=${api_key}&domain=${domain}`);
        if (company.data.name !== null && company.data.name !== undefined) {
            let companiesList = [];
            companyEnrolled = false;
            const readCompaniesList = await fs.readFile("./data/companies.json");
            if (readCompaniesList.length > 0) {
                companiesList = JSON.parse(readCompaniesList);
                for (const item of companiesList) {
                    if (item.name === company.data.name) {
                        companyEnrolled = true;
                        break;
                    }
                }
            }
            if (!companyEnrolled) {
                companiesList.push(company.data);
                fs.writeFile("./data/companies.json", JSON.stringify(companiesList));
                res.json(company.data);
            } else {
                res.json(`A empresa ${company.data.name} já se encontra cadastrada.`);
            }
        } else {
            res.json(`O domínio <${domain}> não retornou uma razão social válida.`);
        }
    } catch (error) {
        res.json(`O domínio <${domain}> é inválido.`);
    }
};

module.exports = { searchCompany };