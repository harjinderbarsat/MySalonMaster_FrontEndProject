export class Payment {
    id: number;
    adminId: number;
    branchId: number;
    type: string = "cash";// 'cash' or 'card'
    date: number;
    cardPaid: number;
    cashPaid: number;
    amount: number;
    pendingAmount: number;
    appointmentId: number;
    productSaleId: number;
    clientId: number;
    clientName: string;
    employeeId: number;
    createdAt: string;
    updatedAt: string;
    payFor: string; // 'product' Or 'appointment'
    status: string;
}

export class transactionSummary {
    appoinmentsCount: number = 0;
    appoinmentsAmmount: number = 0;
    productSaleCount: number = 0;
    productSaleAmmount: number = 0;
    totalSale: number = 0;
}

export class cashMovementSummary {
    CashAmmount: number = 0;
    cardAmmount: number = 0;
    totalSale: number = 0;
}