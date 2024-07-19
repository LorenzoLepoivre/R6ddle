class CharacterObject {
  constructor(id, name, camp, type, hp, speed, difficulty, year, birthplace, image, today) {
    this.id = id;
    this.name = name;
    this.camp = camp;
    this.type = type;
    this.hp = hp;
    this.speed = speed;
    this.difficulty = difficulty;
    this.year = year;
    this.birthplace = birthplace;
    this.image = image;
    this.today = today;
  }
}

export { CharacterObject };
