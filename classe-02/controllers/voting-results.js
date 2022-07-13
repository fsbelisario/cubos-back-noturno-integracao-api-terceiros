const fs = require("fs/promises");

const listVotes = async (req, res) => {
    let votingList = [];
    const readVotingList = await fs.readFile("./data/votos.json");
    if (readVotingList.length > 0) {
        votingList = JSON.parse(readVotingList);
        res.status(200);
        res.json(votingList);
    } else {
        res.status(200);
        res.json("Nenhum voto registrado até o momento.")
    }
};

const votingResults = async (req, res) => {
    let votingList = [];
    const readVotingList = await fs.readFile("./data/votos.json");
    if (readVotingList.length > 0) {
        votingList = JSON.parse(readVotingList);
        const totalVotes = votingList.length;
        const votesInFavour = votingList.filter(item => item.voto).length;
        const votesAgainst = votingList.filter(item => !item.voto).length;
        const result = `Total de votos: ${totalVotes} | Votos favoráveis: ${votesInFavour} (${((votesInFavour / totalVotes) * 100).toFixed(1)}%) | Votos contrários: ${votesAgainst} (${((votesAgainst / totalVotes) * 100).toFixed(1)}%)`;
        res.status(200);
        res.json(result);
    } else {
        res.status(200);
        res.json("Nenhum voto registrado até o momento.")
    }
};

module.exports = { listVotes, votingResults };