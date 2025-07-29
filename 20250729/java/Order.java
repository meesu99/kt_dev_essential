public class Order {
    private int quantity;
    private int itemId;
    private int total;
    private String user;

    // setter
    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
    public void setItemId(int itemId) {
        this.itemId = itemId;
    }
    public void setTotal(int total) {
        this.total = total;
    }
    public void setUser(String user) {
        this.user = user;
    }

    // getter
    public int getQuantity(){
        return this.quantity;
    }
    public int getItemId() {
        return this.itemId;
    }
    public int getTotal() {
        return this.total;
    }
    public String getUser() {
        return this.user;
    }
}
