export class ProductSaleModel {
    id: number;
    adminId: number;
    branchId: number;
    productSaleId:number;
    employeeUniqueId: string;
    branchName: string;
    soldById: number; // it will be employee Id
    soldByName: string; // it will be employee Name
    appointmentId: number;
    clientId: number;
    clientName: string;
    clientContact: number;
    saleType: string; //'dirtectSale' 2. 'withappointment'
    totalAmount: number;
    products: Array<ProductSaleDetailsModel>;
    createdAt: string;
    updatedAt: string;
}

  

export class ProductSaleDetailsModel {
    productId: number;
    productName: string;
    qty: number=0;
    price: number=0;
    totalAmount: number=0;
}
