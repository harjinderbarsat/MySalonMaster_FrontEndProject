export class ProductSaleModel {
    id: number;
    admin_id: number;
    branch_id: number;
    productSaleId:number;
    employeeUniqueId: string;
    branch_name: string;
    sold_by_id: number; // it will be employee Id
    sold_by_name: string; // it will be employee Name
    appointmentId: number;
    client_id: number;
    client_name: string;
    clientContact: number;
    sale_type: string; //'dirtectSale' 2. 'withappointment'
    total_amount: number;
    products: Array<ProductSaleDetailsModel>;
    created_at: string;
    updatedAt: string;
}

  

export class ProductSaleDetailsModel {
    productId: number;
    productName: string;
    qty: number=0;
    price: number=0;
    total_amount: number=0;
}
