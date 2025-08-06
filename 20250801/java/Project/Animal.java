// 곰/고양이/악어/사슴/개/독수리/햄스터/쥐/펭귄/토끼/호랑이/여우
public abstract class Animal {
    protected String name; // 이름
    protected String species; // 종류
    protected String personality; // 성격

    public Animal(String name, String species, String personality) {
        this.name = name;
        this.species = species;
        this.personality = personality;
    }

    public abstract void doAction(); // 고유 행동 출력

    public String getName() {
        return name;
    }

    public String getSpecies() {
        return species;
    }
}