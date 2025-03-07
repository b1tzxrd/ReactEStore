export interface IProduct {
    id: string;
    name: string;
    platform: "ps" | "xbox" | "pc";
    colorPalette: "blue" | "green" | "teal",
    genre: string;
    language: string;
    publisher: string;
    ageLimit: string;
    version: string;
    description: string;
    price: number;
    image: string;
    gallery: string[];
}