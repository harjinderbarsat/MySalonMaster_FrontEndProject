export class ServiceModel {
    id: number;
    categoryId: number;
    status: string;

    name: string;
    category_name?: string;
    description: string;
    createdDate: string;
    price: number;
    duration: number;
    isThisInitialPrice?: string;
    isSelected?: boolean
    created_at?: string;
    updated_at?: string;
}

export class ServiceCategoryModel {
    id: number;
    status: string;
    name: string;
    description: string;
    createdDate: string;
    services: Array<ServiceModel>
    isSelected?: boolean;
    created_at?: string;
    updated_at?: string;
}

export class permissonResponseModel {
    id: number;
    admin_id: number;
    branch_id: number;
    branch_name: string;
    category_id: number;
    serviceIds: Array<ServiceModel>

    created_at?: string;
    updated_at?: string;
}

export enum OfferType {
    percentage = 'Percentage',
    absolute = 'Absolute'
}

export const defaultServiceCategoryData: any = {
    "categories": [
        {
            "name": "Waxing",
            "description": "",
            "services": [
                {
                    "name": "Full Arms",
                    "description": "",
                    "price": 10
                },
                {
                    "name": "Under Arms",
                    "description": "",
                    "price": 10
                },
                {
                    "name": "Half Arms",
                    "description": "",
                    "price": 10
                },
                {
                    "name": "3/4 Arms",
                    "description": "",
                    "price": 10
                },
                {
                    "name": "Full Legs",
                    "description": "",
                    "price": 10
                },
                {
                    "name": "Half Legs",
                    "description": "",
                    "price": 10
                },
                {
                    "name": "3/4 Legs",
                    "description": "",
                    "price": 10
                },
                {
                    "name": "Nostrils",
                    "description": "",
                    "price": 10
                },
                {
                    "name": "Brazilian Wax",
                    "description": "",
                    "price": 10,
                    "isThisInitialPrice": true
                },
                {
                    "name": "Bikni Line",
                    "description": "",
                    "price": 10,
                    "isThisInitialPrice": true
                },
                {
                    "name": "Brazilian Wax + Buttocks",
                    "description": "",
                    "price": 10
                },
                {
                    "name": "Stomach",
                    "description": "",
                    "price": 10
                },
                {
                    "name": "Full back",
                    "description": "",
                    "price": 10
                },
                {
                    "name": "Back side of Neck",
                    "description": "",
                    "price": 10
                },
                {
                    "name": "Full body",
                    "description": "(Full legs, Full arms, Under arms, Stomach)",
                    "price": 10
                },
                {
                    "name": "Full Arms + Legs",
                    "description": "",
                    "price": 10
                }
            ]
        },
        {
            "id": 2,
            "name": "Henna Tattoo",
            "description": "",
            "services": [
                {
                    "name": "Henna Tattoo",
                    "description": "Price may vary on size and pattern of tattoo",
                    "price": 5,
                    "isThisInitialPrice": true
                }
            ]
        },
        {
            "name": "Threading & Waxing",
            "description": "",
            "services": [
                {
                    "name": "Eyebrow Shaping",
                    "description": "",
                    "price": 15
                },
                {
                    "name": "Upper Lip",
                    "description": "",
                    "price": 5
                },
                {
                    "name": "Lower Lip",
                    "description": "",
                    "price": 5
                },
                {
                    "name": "Chin",
                    "description": "",
                    "price": 5
                },
                {
                    "name": "Under Chin",
                    "description": "",
                    "price": 5
                },
                {
                    "name": "Forehead",
                    "description": "",
                    "price": 5
                },
                {
                    "name": "Sides",
                    "description": "",
                    "price": 15
                },
                {
                    "name": "Neck",
                    "description": "",
                    "price": 10
                },
                {
                    "name": "Full face",
                    "description": "(Eyebrow + Upper lip + Lower lip + chin + sides + forehead)",
                    "price": 40,
                    "hasOffer": true,
                    "offerType": "OfferType.absolute",
                    "offerValue": 10,
                    "offerDiscription": "Save $10"
                },
                {
                    "name": "Full Face+Under Chin",
                    "description": "",
                    "price": 45
                }
            ]
        },
        {
            "id": 3,
            "name": "Facials",
            "description": "(All facial include cleanse, scrub, exfoliating dead skin , remove black head and white head , moisturising , face mask and steam )",
            "services": [
                {
                    "name": "Deep Cleansing Facial",
                    "description": "(60 Mins)",
                    "price": 60
                },
                {
                    "name": "30 min Facia",
                    "description": "",
                    "price": 35
                },
                {
                    "name": "40 Min Facial",
                    "description": "",
                    "price": 40
                },
                {
                    "name": "Face Cleansing",
                    "description": "(For 15 Mins",
                    "price": 15
                },
                {
                    "name": "Face Bleach",
                    "description": "",
                    "price": 15
                },
                {
                    "name": "Face Bleach + Neck",
                    "description": "",
                    "price": 20
                }
            ]
        },
        {
            "id": 4,
            "name": "Men’s Services",
            "description": "",
            "services": [
                {
                    "name": "Men’s Eyebrow",
                    "description": "",
                    "price": 20
                },
                {
                    "name": "Cheeks",
                    "description": "",
                    "price": 15
                },
                {
                    "name": "Monobrow",
                    "description": "",
                    "price": 10
                },
                {
                    "name": "Ears",
                    "description": "",
                    "price": 15
                },
                {
                    "name": "Men’s Arms",
                    "description": "",
                    "price": 40,
                    "isThisInitialPrice": true
                },
                {
                    "name": "Men’s Legs",
                    "description": "",
                    "price": 50,
                    "isThisInitialPrice": true
                },
                {
                    "name": "Shoulder Waxing",
                    "description": "",
                    "price": 20
                },
                {
                    "name": "Stomach and Chest",
                    "description": "",
                    "price": 50,
                    "isThisInitialPrice": true
                },
                {
                    "name": "Back",
                    "description": "",
                    "price": 40
                }
            ]
        },
        {
            "id": 5,
            "name": "Eyebrow & EyelashTinting",
            "description": "",
            "services": [
                {
                    "name": "Eyebrow Tinting",
                    "description": "",
                    "price": 15
                },
                {
                    "name": "Eyebrow Tinting",
                    "description": "",
                    "price": 20
                },
                {
                    "name": "Eyelash Perming",
                    "description": "",
                    "price": 55
                },
                {
                    "name": "Eyebrow Henna Tattoo",
                    "description": "",
                    "price": 40
                },
                {
                    "name": "Eyelash perming + Eyelash Tinting",
                    "description": "",
                    "price": 65,
                    "isThisInitialPrice": true
                },
                {
                    "name": "Eyebrow+ Eyelash Tinting",
                    "description": "",
                    "price": 30
                }
            ]
        },
        {
            "id": 6,
            "name": "Eyelash Extensions",
            "description": "",
            "services": [
                {
                    "name": "Natural Set",
                    "description": "(40-50 lashes)",
                    "price": 95
                },
                {
                    "name": "Full Set",
                    "description": "(50-60 lashes)",
                    "price": 115
                },
                {
                    "name": "Eyelash Infills",
                    "description": "",
                    "price": 40,
                    "isThisInitialPrice": true
                },
                {
                    "name": "Eyelash Removal",
                    "description": "",
                    "price": 25
                }
            ]
        },
        {
            "name": "Massage",
            "description": "",
            "services": [
                {
                    "name": "Body Massage",
                    "description": "(For 15 Mins)",
                    "price": 15
                },
                {
                    "name": "Body Massage",
                    "description": "(For 30 Mins)",
                    "price": 35
                },
                {
                    "name": "Body Massage",
                    "description": "(For 60 Mins)",
                    "price": 60
                },
                {
                    "name": "Indian Head Massage/Face Massage",
                    "description": "(For 15 Mins)",
                    "price": 15
                },
                {
                    "name": "Indian Head Massage/Face Massage",
                    "description": "(For 10 Mins)",
                    "price": 10
                }
            ]
        }
    ]
}