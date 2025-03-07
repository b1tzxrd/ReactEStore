export interface ICartItem {
    id: string,
    gameId: string,
    name: string,
    platform: "ps" | "xbox" | "pc",
    colorPalette: "blue" | "teal" | "green",
    genre: string,
    price: number,
    image: string,
}