import axios from 'axios'

const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
}

export const getDataContractPurchaseOrder = async (idcase) => {
    const response = await axios.get('http://188.166.68.70:3004/api/v1/task/getContractPurchaseOrder/' + idcase, { headers: headers });
    return response.data.body
};

export const getDataContractLead = async (idcase) => {
    const response = await axios.get('http://188.166.68.70:3004/api/v1/task/getContractLead/' + idcase, { headers: headers });
    return response.data.body
};

export const postExecuteTask = async (contracts, idcase) => {
    const response = await axios.post('http://188.166.68.70:3004/api/v1/task/executewithallcontractbyidcase/' + idcase, { contracts }, { headers: headers });
    return response.data.body
};
