import { DateObject, inputDateHelper, uploadDateHelper } from "./HelperFunctions/dateHelper";
import config from "../../Config/config";
import { PagedResult, Token } from "../Interfaces";
import { generateToken, query } from "./iMISApi";
import { AxiosResponse } from "axios";

const extractDataJson = async (inputDate: string, setMessage: (newValue: string) => void): boolean => {

    const dateObject: DateObject = inputDateHelper(inputDate);
    const invoiceDate: string = `${dateObject.year}-${dateObject.month}-${dateObject.day}`;
    const staffSite: string | undefined = config.developmentUri;
    const queryPath: string | undefined = config.directDebitQueryPath;
    const requiredParameter: string = "&parameter=eq:" + invoiceDate + "&limit=5000";

    if (!queryPath || !staffSite) throw new Error("iMIS IQA query is missing");

    const url: string = staffSite + queryPath + requiredParameter;
    const token: Token = await generateToken();
    const queryResult: AxiosResponse = await query(url, "GET", null, token.access_token);

    console.log({ statusCode: queryResult.status })

    //If response status is not 200, then return false and exit operation
    if (queryResult.status !== 200) {
        return false;
    }

    const data: PagedResult = queryResult.data;
    const count: number = data.Count;

    if (count === 0) {
        setMessage("No records to display on selected date");
        return false;
    }

    setMessage("Processing data...");
    
    let value: number = 0;
    let transactionCount: number = 0;
    let csv: string = "";
    const currentDate: DateObject = uploadDateHelper();
    let fileCreationDate: string = currentDate.year + currentDate.month + currentDate.day;
    const header: string = "1,0202931,,,0205600276048000,6," + fileCreationDate + "," + fileCreationDate + ", ";



    return false;

};

export default extractDataJson;