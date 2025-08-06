import java.util.ArrayList;

public class ResidentList {
    private ArrayList<Animal> residents = new ArrayList<>();

    public ResidentList() {
        // 초기 동물 주민 추가
        addResident(new Mouse("치즈"));
        addResident(new Bear("쿠마"));
        addResident(new Rabbit("토토"));
        addResident(new Hamster("햄찌"));
        addResident(new Wolf("울프"));
        addResident(new Cat("나비"));
        addResident(new Dog("초코"));
        addResident(new Penguin("펭펭"));
        addResident(new Crocodile("크로"));
        addResident(new Tiger("호돌이"));
        addResident(new Eagle("이글"));
        addResident(new Deer("루나"));
    }

    public void addResident(Animal animal) {
        residents.add(animal);
    }

    public void removeResident(int index) {
        if (index >= 0 && index < residents.size()) {
            residents.remove(index);
        }
    }

    public Animal getResident(int index) {
        if (index >= 0 && index < residents.size()) {
            return residents.get(index);
        }
        return null;
    }

    public int size() {
        return residents.size();
    }

    public void printResidents() {
        System.out.println("\n[주민 리스트]");
        for (int i = 0; i < residents.size(); i++) {
            Animal a = residents.get(i);
            System.out.println((i+1) + ". " + a.getName() + " (" + a.getSpecies() + ")");
        }
    }

    public ArrayList<Animal> getAllResidents() {
        return residents;
    }
}
