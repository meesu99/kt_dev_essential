public class PairProgramming{

    public static void main(String[] args) {
        Order o = new Order();
        int itemId = o.getItemId();
        System.out.println(itemId);  
    }

    public static void processOrder(Order o) {
        // 1) 재고 확인
        //if (o.getQuantity() > inventory.get(o.getItemId())) {
            // 2) 결제 처리
            //paymentService.charge(o.getUser(), o.getTotal());
            // 3) 배송 요청
            //shippingService.ship(o);
        //} else {
            //System.out.println("재고 부족");
    }
}
