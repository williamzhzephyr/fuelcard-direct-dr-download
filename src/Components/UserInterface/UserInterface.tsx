import { useState } from "react";

const userInterface: React.FC = (): JSX.Element => {

    const [inputDate, setInputDate] = useState<string>("");
    const [message, setMessage] = useState<string>("");

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setInputDate(e.target.value);
    };

    return <>
        <form>
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
        </form>
        <div>{message}</div>
    </>
};

export default userInterface;