export class ProductModel {
    id: number;
    branchId: number;
    adminId: number;
    categoryId: number;
    mainCategoryId: number;
    categoryName: number;
    name: string;
    status: string;
    mrp:number;
    description: string;
    imageUrl: string;
    qty: number;
    isSelected: boolean;
    price: number;
    brand: string;
    weight: string;
    weightType: string; //liter, ML, KG 
    height: string;
    width: string;
    sizeType: string; //cm,inch
    createdAt: string;
    updatedAt: string;
    productQty: number;
}

export class ProductCategoryModel {
    id: number;
    branchId: number;
    adminId: number;
    isSelected: boolean;
    mainCategory: string;
    status: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
}

export class ProductParentCategoryModel {
    id: number;
    name: string;
    visibility: boolean;
}