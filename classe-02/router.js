const express = require("express");
const router = express();
const { validateVote } = require("./controllers/validate-vote");
const { listVotes, votingResults } = require("./controllers/voting-results");

router.post("/votacao/:pais/:ip", validateVote);
router.get("/votacao/lista", listVotes);
router.get("/votacao/resultados", votingResults);

module.exports = router;