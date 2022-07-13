const express = require("express");
const router = express();
const { searchCompany } = require("./controllers/search-companies");

router.get("/empresas/:dominioEmpresa", searchCompany);

module.exports = router;