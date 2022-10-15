export class Article{

   public  source: {id: string, name: string};
    public author: string;
    public title: string;
    public description: string;
    public url: string;
    public urlToImage: string,
    public publishedAt: string,
    public content: any



  constructor(name: string, desc: string, imagePath: string, ingredients: Ingredient[]) {
    this.name = name;
    this.description = desc;
    this.imagePath = imagePath;
    this.ingredients = ingredients;
  }
}
