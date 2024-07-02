import { DateObject, inputDateHelper, uploadDateHelper } from "./HelperFunctions/dateHelper";
import config from "../../Config/config";
import { GenericEntityData, GenericPropertyData, PagedResult, Token } from "../Interfaces";
import { generateToken, query } from "./iMISApi";
import { AxiosResponse } from "axios";

const getValue = (array: GenericPropertyData[], name: string, setMessage: (newValue: string) => void): string => {
    const found = array.find(val => {
        return val.Name === name;
    });

    if (found) {
        return (found.Value).toString();
    }

    setMessage("Something went wrong...")
    return "";
}

const extractDataJson = async (inputDate: string, setMessage: (newValue: string) => void): Promise<string> => {

    if (!inputDate || inputDate === "") {
        setMessage("Please select a valid date");
        return "Select a valid date";
    }

    // const dateObject: DateObject = inputDateHelper(inputDate);
    // const invoiceDate: string = `${dateObject.year}-${dateObject.month}-${dateObject.day}`;
    const staffSite: string | undefined = config.developmentUri;
    const queryPath: string | undefined = config.directDebitQueryPath;
    const requiredParameter: string = "&parameter=eq:" + inputDate + "&limit=5000";

    if (!queryPath || !staffSite) {
        setMessage("iMIS IQA query is missing");
        return "iMIS IQA query is missing";
    }

    const url: string = staffSite + "/api/IQA?QueryName=" + "$" + queryPath + requiredParameter;
    const token: Token = await generateToken();
    const queryResult: AxiosResponse = await query(url, "GET", null, token.access_token);

    //If response status is not 200, then return false and exit operation
    if (queryResult.status !== 200) {
        setMessage("Failed to retrieve data: " + queryResult.status);
        return "Failed to retrieve data: " + queryResult.status;
    }

    if (queryResult.status === 200) {
        const data: PagedResult = queryResult.data;
        const count: number = data.Count;

        if (count === 0) {
            setMessage("No records to display on selected date");
            return "No records to display on selected date"
        }

        try {
            setMessage("Processing data...");

            const array: GenericEntityData[] = data.Items["$values"];
    
            let value: number = 0;
            let transactionCount: number = 0;
            let csv: string = "";
            const currentDate: DateObject = uploadDateHelper();
            let fileCreationDate: string = currentDate.year.slice(2, 4) + currentDate.month + currentDate.day;
            const header: string = "1,0202931,,,0205600276048000,6," + fileCreationDate + "," + fileCreationDate + ", ";
            csv = header;
            csv +="\r\n";
            let readValues: string;
            let hashTag: number = 0;
    
            const valuesArray: GenericPropertyData[][] = array.map(item => item.Properties["$values"]);
    
            valuesArray.forEach(innerArray => {
                let rt = getValue(innerArray, "RT", setMessage);
                let bankAccount = getValue(innerArray, "Bank_Account", setMessage);
                let tCode = getValue(innerArray, "TCode", setMessage);
                let totalAmount = getValue(innerArray, "tAmt", setMessage);
                let opn = getValue(innerArray, "OPN", setMessage);
                if (opn.length > 10) {
                    opn = opn.substring(0, 20);
                }
                let opr = getValue(innerArray, "OPR", setMessage);
                let opc = getValue(innerArray, "OPC", setMessage);
                let opar = getValue(innerArray, "OPAR", setMessage);
                let opp = getValue(innerArray, "OPP", setMessage);
                let yn = getValue(innerArray, "YN", setMessage);
                let yc = getValue(innerArray, "YC", setMessage);
                let yr = getValue(innerArray, "YR", setMessage);
                let yp = getValue(innerArray, "YP", setMessage);
    
                hashTag += +(bankAccount.substring(2, 2 + 11));
    
                readValues = rt + ',' + bankAccount + ',' + tCode + ',' + totalAmount + ',' + opn + ',' + opr + ',' + opc + ',' + ',' + ',' + yn + ',' + ',' + yr + ',';
                csv += readValues;
                value += +totalAmount;
                csv += "\r\n";
    
                transactionCount++;
            });
    
            const convertedString: string = "0000" + hashTag.toString();
            csv += "3," + value + "," + transactionCount + "," + convertedString.slice(-11);
    
            setMessage("Finished processing data");
            return csv; 
        } catch (err: any) {
            setMessage("An error occurred processing download data: " + err + "\n" + "Please contact the administrator");
            throw new Error (err)
        }
    }

    setMessage("Error creating CSV file, please contact the administrator")
    return "Error Error creating CSV file";

};

export default extractDataJson;