export class DocumentsModel {
    id: number;
    file: string;
    type: DocumentType;
    docType: string;

    createdBy: string;
    updatedBy: string;
    created_at: string;
    updated_at: string;
}

export enum DocumentType {
    Identity_Proof = 1,
    Experience_Certificate = 2,
    Training_Certificate = 3,
    Education_Proof = 4,
    Other = 5
}

export class EmployeeDocs {
    index: number;
    type: DocumentType
    typeName: string
    isAvalible: boolean;
    data?: DocumentsModel
}