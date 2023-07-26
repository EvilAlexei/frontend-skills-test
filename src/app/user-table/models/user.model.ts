export class User {
  id: string;
  name: string;
  charSum: number;
  score: number;

  constructor(name: string, id: string, charSum: number) {
    this.name = name;
    this.id = id;
    this.charSum = charSum;
    this.score = charSum;
  }
}
