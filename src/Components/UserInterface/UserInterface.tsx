import { useState } from "react";
import extractDataJson from "../Functions/extractDataJson";
import downloadCSVFile from "../Functions/downloadCSVFile";
import "./UserInterface.css"

const UserInterface: React.FC = (): JSX.Element => {

    const [inputDate, setInputDate] = useState<string>("");
    const [message, setMessage] = useState<string>("");

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setInputDate(e.target.value);
    };

    const submit = async (e: React.FormEvent<HTMLFormElement>): Promise<boolean> => {
        e.preventDefault();
        setMessage("Processing data...");
        try {
            const result = await extractDataJson(inputDate, setMessage);

            if (result === "Error") {
                setMessage("Something went wrong, cannot download CSV file");
                throw new Error("Something went wrong, cannot download CSV file");
            }
    
            downloadCSVFile(result, setMessage);
            return true;
            
        } catch (err: any) {
            throw new Error("Unable to generate file, please contact the administrator");
        }
       
    }

    setTimeout(() => {
        setMessage("");
    }, 1000);

    return <>
        <form onSubmit={(e) => submit(e)}>
        <label>Please select invoice date:</label>
            <table>
                <tbody>
                    <tr>
                        <th colSpan={3}>
                            <input
                                type="date"
                                value={inputDate}
                                onChange={handleDateChange}
                            />
                        </th>
                    </tr>
                </tbody>
            </table>
            <button type="submit" className="TextButton">Export File</button>
            <div style={{ marginTop: "10px" }}>{message}</div>
        </form>
        <p>iPart Version: 1.1.0</p>
    </>
};

export default UserInterface;
