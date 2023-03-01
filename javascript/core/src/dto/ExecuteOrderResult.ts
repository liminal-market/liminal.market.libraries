import OrderDto from "./OrderDto";

export default interface ExecuteOrderResult {
    success : boolean;
    message : string;
    order : OrderDto;

}