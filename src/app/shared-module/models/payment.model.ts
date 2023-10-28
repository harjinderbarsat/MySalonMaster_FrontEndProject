export class Payment {
    id: number;
    type: string;// 'cash' or 'card'
    date: number;
    cash_paid: number;
    card_paid: number;
    amount: number;
    pending_amount: number;
    appointmentId: number;
    appointment_id: number;
    product_sale_id: number;
    client_id: number;
    client_name: string;
    employee_id: number;
    created_at: string;
    pay_for: string; // 'product' Or 'appointment'
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