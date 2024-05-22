export interface PostObject {
    id: string;
    fuelCompany: string;
    fuelCardType: string;
    cardNumber: string;
    vehicleRego: string;
    registeredPerson: string;
    productCode: string;
    litres: number;
    totalAmount: number;
    gstAmount: number;
    netAmount: number;
    rebateAmount: number;
    price: number;
    contractType: string;
    site: string;
    transactionDate: string;
    invoiceNumber: string;
    directDebitExtractDate: string;
    fileName: string;
    invoiceDate: string;
    uploadDate: string;
    odometer: number;
};

export interface PagedResult {
    "$type": string;
    Items: GenericEntityData[];
    Offset: number;
    Limit: number;
    Count: number;
    TotalCount: number;
    NextPageLink: string;
    HasNext: boolean;
    NextOffset: number;
};

export interface GenericEntityData {
    "$type": string;
    Properties: {
        "$type": string;
        "$values": {
            $type: string;
            Name: string;
            Value: string | {
                "$type": string;
                "$value": string | number
            }  
        }[];
    };
};

export interface GenericPropertyDataCollection {
    "$type": string;
    "$values": GenericPropertyData[];
};

export interface GenericPropertyData {
    "$type": string,
    name: string;
    value: object;
};

export interface Value {
    type: string;
    innerValue: object;
};

export interface Token {
    ".expires": string;
    ".issued": string;
    access_token: string;
    expires_in: number;
    token_type: string;
    userName: string;
};