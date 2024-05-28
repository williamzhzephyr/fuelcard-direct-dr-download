const downloadCSVFile = (csv: string, setMessage: (newValue: string) => void): void => {
    try {
        setMessage("Downloading CSV")
        let csvFile = new Blob([csv], { type: 'text/csv' });
        let downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(csvFile);
        downloadLink.download = 'DirectDebitfile.afi';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    } catch (err) {
        setMessage("Download failed: " + err);
    }
};

export default downloadCSVFile;