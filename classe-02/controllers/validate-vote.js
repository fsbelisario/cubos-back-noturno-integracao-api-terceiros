const fs = require("fs/promises");
const axios = require("axios");

const validateVote = async (req, res) => {
    const apiKey = "58cafbe4558f425d8e8c731e3b26fbe0"
    const country = req.params.pais;
    const ipAddress = req.params.ip;
    const vote = req.body.voto;
    let voteRegistered;

    try {
        const ipValidation = await axios.get(`https://ipgeolocation.abstractapi.com/v1/?api_key=${apiKey}&ip_address=${ipAddress}`);
        if (ipValidation.data.country.length > 0) {
            if (ipValidation.data.country === country) {
                let votingList = [];
                voteRegistered = false;
                const readVotingList = await fs.readFile("./data/votos.json");
                if (readVotingList.length > 0) {
                    votingList = JSON.parse(readVotingList);
                    for (const item of votingList) {
                        if (item.ip === ipAddress) {
                            voteRegistered = true;
                            break;
                        }
                    }
                }
                if (!voteRegistered) {
                    const voteLog = { ip: ipAddress, voto: vote };
                    votingList.push(voteLog);
                    fs.writeFile("./data/votos.json", JSON.stringify(votingList));
                    res.status(200);
                    res.json(`Voto registrado para o IP ${ipAddress}.`);
                } else {
                    res.status(400);
                    res.json(`Jà existe voto registrado para o IP informado (${ipAddress}).`);
                }
            } else {
                res.status(400);
                res.json(`O IP informado (${ipAddress}) não coincide com o país de votação.`);
            }
            res.json(ipValidation.data.country);
        } else {
            res.status(400);
            res.json(`O IP informado (${ipAddress}) não retornou dados.`);
        }
    } catch (error) {
        res.status(400);
        res.json(`O formato do IP informado (${ipAddress}) não é inválido.`);
    }
};

module.exports = { validateVote };