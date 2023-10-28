export class ProductModel {
    id: number;
    branch_id: number;
    admin_id: number;
    category_id: number;
    mainCategoryId: number;
    category_name: number;
    name: string;
    status: string;
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
    created_at: string;
    updatedAt: string;
    productQty: number;
}

export class ProductCategoryModel {
    id: number;
    branch_id: number;
    admin_id: number;
    isSelected: boolean;
    mainCategory: string;
    status: string;
    name: string;
    description: string;
    created_at: string;
    updatedAt: string;
}

export class ProductParentCategoryModel {
    id: number;
    name: string;
    visibility: boolean;
}